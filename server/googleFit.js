const express = require("express");
const app = express();
const port = 1001;
const { google } = require("googleapis");
const request = require("request");
const cors = require("cors");
const urlParse = require("url-parse");
const qs = require("qs");
const bodyParser = require("body-parser");
const axios = require("axios");
const fs = require('fs');
const { listenerCount } = require("events");

let dates = [];
let scores = [];
let dateData = {};
let mainDict = {};
let cycleLength;

let oauth2Client;

const credentials = {
  client_id: "173285732369-tefattcjqd7j9lmahul2qki4hsgjtbr8.apps.googleusercontent.com",
  client_secret: "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",
  redirect_uris: ["http://localhost:1000/data"],
};

oauth2Client = new google.auth.OAuth2(
  credentials.client_id,
  credentials.client_secret,
  credentials.redirect_uris[0]
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/getData", (req, res) => {
  const scopes = [
    "https://www.googleapis.com/auth/fitness.reproductive_health.read",
    "profile",
    "email",
    "openid",
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    state: JSON.stringify({
      callbackUrl: req.body.callbackUrl,
      userID: req.body.userid,
    }),
  });

  request(url, (err, response, body) => {
    console.log("error ", err);
    console.log("statusCode ", response && response.statusCode);
    res.send({ url });
  });
});

app.get("/data", async (req, res) => {
  const queryURL = new urlParse(req.url);
  const code = qs.parse(queryURL.query).code;
  const oauth2Client = new google.auth.OAuth2(
    "173285732369-tefattcjqd7j9lmahul2qki4hsgjtbr8.apps.googleusercontent.com",
    "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",
    "http://localhost:1000/data",
  );

  const tokens = await oauth2Client.getToken(code);
  // console.log(tokens);
  res.send("SIGNED IN");
  

  let stepArray = [];

  try {
    currentDay = new Date();
    startDay = currentDay.setDate(currentDay.getDate()-60)

    const result = await axios({
        method: "POST",
        headers: {
            authorization: "Bearer " + tokens.tokens.access_token 
        },
        "Content-Type": "application/json",
        url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
        data: {
            aggregateBy: [
                {
                  dataTypeName: "com.google.menstruation.delta",
                  dataSourceId: "derived:com.google.menstruation:com.google.android.gms:merged"
                },
            ],
            bucketByTime: { durationMillis: 86400000 },
            startTimeMillis: startDay,
            endTimeMillis: new Date().getTime()
        },
    });
    stepArray = result.data.bucket;
  } catch (e) {
    console.log(e)
  }
  try {
    for (const dataSet of stepArray) {
        for (const points of dataSet.dataset) {
            for (const period of points.point) {
              const valueArrays = period.value
              const intVal = valueArrays[0].intVal;
              if (!(dates.includes(period.startTimeNanos))) {
                dates.push(new Date(period.startTimeNanos/1000000).toUTCString()) // period dates array
                scores.push(intVal) // period scores array
              }
            }
        }
    }
    // Adds user's past period data to mainDict
    for (d in dates) {
      let nestedDict = {}
      nestedDict["startDate"] = dates[d];
      nestedDict["endDate"] = dates[d];
      nestedDict["flow"] = scores[d]
      dateData[dates[d]] = nestedDict;
    }
    mainDict["Period"] = dateData;

    // Get days since last period end
    let date1 = new Date();
    let date2 = new Date(dates[dates.length-1])
    let diffInMs = date1.getTime() - date2.getTime();
    const daysSinceLastPeriod = diffInMs / (1000 * 60 * 60 * 24);

    // Adds user's predicted period to mainDict
      // Separates dates into arrays based on cycle
    let cycles = [];
    let newCycle = []
    for (d in dates) {
      currentDate = dates[d];
      const date1 = new Date(dates[d]);
      const date2 = new Date(dates[d-1]);
      const diffInMs = date1.getTime() - date2.getTime();
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      if (diffInDays > 1) {
        cycles.push(newCycle);
        newCycle = [];
        newCycle.push(currentDate);
      } else  {
        newCycle.push(currentDate);
      }
    }
    cycles.push(newCycle)

      // Calculates cycle length and period length
    let cycleLength = 0;
    let periodLength = 0;
    let lastPeriodStart;

    let counter = 0;
    for (i in cycles) {
      // Attempt to detect if user is currently on period and ignore current cycle for period length count
      // const targetDate = new Date()
      // let lastVal = cycles[i].slice(-1)[0];
      // if (lastVal !== targetDate.toUTCString()) {
      //    counter ++;
      //    periodLength += cycles[i].length;
      //   }

      periodLength += cycles[i].length;

      if (i != 0) {
        const currCycle = new Date(cycles[i][0])
        const lastCycle = new Date(cycles[i-1][0])
        const diffInMs = currCycle.getTime() - lastCycle.getTime();
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        cycleLength += diffInDays;
        lastPeriodStart = cycles[i][0];
      }
    }
    cycleLength = cycleLength/(cycles.length - 1);
    periodLength = Math.round(periodLength/(cycles.length-counter));

    // Predicts next period
    dates = []
    for (let step = 0; step < periodLength; step++) {
      const newDate = new Date(new Date(lastPeriodStart).getTime() + (cycleLength+step) * 24 * 60 * 60 * 1000).toUTCString();
      if (step == 0) {
        const date1 = new Date();
        const date2 = new Date(newDate);
        const diffInMs = date2.getTime() - date1.getTime();
        daysTilNextPeriod = diffInMs / (1000 * 60 * 60 * 24);
      }
      dates.push(newDate);
    }

    // Get day of cycle
    date1 = new Date();
    date2 = new Date(lastPeriodStart);
    diffInMs = date1.getTime() - date2.getTime();
    const dayinCycle = diffInMs / (1000 * 60 * 60 * 24);

    // Calculate phases lengths
    const menstrualDays = periodLength;
    const ovulationDay = Math.round(cycleLength/2);
    const lutealDays = cycleLength - (ovulationDay + 2);
    const follicDays = (ovulationDay-2) - periodLength;
    const ovulDays = 4;
    phases = [menstrualDays, follicDays, ovulDays, lutealDays];
    phasesNames = ["Menstrual", "Follicular", "Ovular", "Luteal"];
  //   nutritionInfo = ['Your menstrual phase is time to rest and replenish. Your body is undergoing a controlled inflammatory response to shed your uterine lining, so nourishing yourself with nutrient-dense, anti-inflammatory and iron-replenishing foods is important. \n\nKey Nutrients: Iron, Vitamin C and Magnesium\n\nRecommended foods:\nIron: beef, lamb, chickpeas, lentils, quinoa, kidney beans\nMagnesium: kale, watercress, spinach, pumpkin seeds, almonds', 
  //   'During this phase, you often have high levels of energy, confidence, creativity, and openness to try new things. Enjoy a normal balanced diet during this phase, incorporating plenty of nourishing foods such as vegetables and lean proteins. \n\nKey Nutrients: Omega-3 Fatty Acids and Fibre\n\nRecommended Foods:\nOmega-3: flaxseed, salmon, sardines\nFibre: fruit (apples, strawberries, avocados), vegetables (brussel sprouts, cabbage broccoli, cauliflower)',
  //   'Over the ovulation period, your oestrogen levels will rise and as a result, your body will need whole foods, rich with nutrients and antioxidants. Vitamin D and zinc become essential during this time, as these nutrients are crucial for reproductive health and can help regulate the menstrual cycle.\n\nKey Nutrients: Vitamin D and Zinc\n\nRecommended Foods: \nVitamin D: mushrooms, milk ,eggs\nZinc: red meat, egg, ginger, seafood, dairy',
  //   ,'The Luteal Phase is often the time when cravings hit for carbs, sugar, fatty foods, etc. Focus on foods rich in vitamin B to combat potential sugar cravings. Your body will also be busy working to prepare for menstruation and needs more fat and proteins to break down. \n\nKey nutrients: healthy fats and vitamin B\n\nRecommended Foods:\nHealthy fats: avocado, salmon, sesame/sunflower seeds\nVitamin B6: red meat, carrots, sweet potato, lentils, oats, walnuts'
  // ]

    // Calculates phase dates and adds to JSON file
    startDate = new Date(lastPeriodStart);
    endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + menstrualDays - 1);
    dateData = {}
    counter = 0;
    for (p in phases) {
      counter ++;
      let nestedDict = {}
      nestedDict["startDate"] = startDate.toUTCString();
      nestedDict["endDate"] = endDate.toUTCString();
      dateData[phasesNames[counter - 1]] = nestedDict;
      startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() + 1);
      endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + phases[counter] - 1);
    }
    mainDict["Phases"] = dateData;

    // Adds period prediction to JSON
    dateData = {}
    for (d in dates) {
      let nestedDict = {}
      nestedDict["startDate"] = dates[d];
      nestedDict["endDate"] = dates[d];
      dateData[dates[d]] = nestedDict;
    }
    mainDict["PredictedPeriod"] = dateData;
    mainDict["cycleLength"] = cycleLength;
    mainDict["periodLength"] = periodLength;
    mainDict["lastPeriodStart"] = lastPeriodStart;
    mainDict["daysinCycle"] = Math.floor(dayinCycle);
    mainDict["daysSinceLastPeriod"] = Math.floor(daysSinceLastPeriod);
    mainDict["daysUntilNextPeriod"] = Math.floor(daysTilNextPeriod);
    

    let jsonData = JSON.stringify(mainDict);
    fs.writeFileSync('data.json', jsonData);

  } catch (e) {
    console.log(e)
  }

});

app.listen(port, () => console.log(`GOOGLE FIT IS LISTENING ON PORT ${port}`));