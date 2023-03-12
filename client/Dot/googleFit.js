const express = require("express");
const app = express();
const port = 1000;
const { google } = require("googleapis");
const request = require("request");
const cors = require("cors");
const urlParse = require("url-parse");
const qs = require("qs");
const bodyParser = require("body-parser");
const axios = require("axios");
const fs = require('fs');

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
    let cycleAvg = 0;
    for (i in cycles) {
      if (i != 0) {
        const currCycle = new Date(cycles[i][0])
        const lastCycle = new Date(cycles[i-1][0])
        const diffInMs = currCycle.getTime() - lastCycle.getTime();
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        console.log(diffInDays);
      }
    }
    
    




    mainDict["Period"] = dateData;
    const jsonData = JSON.stringify(mainDict);


    // Write the JSON data to a file
    fs.writeFileSync('data.json', jsonData);

  } catch (e) {
    console.log(e)
  }

});

app.listen(port, () => console.log(`GOOGLE FIT IS LISTENING ON PORT ${port}`));
