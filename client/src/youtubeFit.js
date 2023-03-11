const express = require("express");
const app = express();
const port = 1234;
const { google } = require("googleapis");
const request = require("request");
const cors = require("cors");
const urlParse = require("url-parse");
const qs = require("qs");
const bodyParser = require("body-parser");
const axios = require("axios");

let dates = [];
let scores = []

let oauth2Client;

const credentials = {
  client_id: "615751381258-5asppho2f9df9ppe0vh91t51t01vg1gi.apps.googleusercontent.com",
  client_secret: "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",
  redirect_uris: ["http://localhost:1234/steps"],
};

oauth2Client = new google.auth.OAuth2(
  credentials.client_id,
  credentials.client_secret,
  credentials.redirect_uris[0]
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/getURLTing", (req, res) => {
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

app.get("/steps", async (req, res) => {
  const queryURL = new urlParse(req.url);
  const code = qs.parse(queryURL.query).code;
  const oauth2Client = new google.auth.OAuth2(
    "615751381258-5asppho2f9df9ppe0vh91t51t01vg1gi.apps.googleusercontent.com",
    "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",
    "http://localhost:1234/steps",
  );

  const tokens = await oauth2Client.getToken(code);
  // console.log(tokens);
  res.send("HELLO");

  let stepArray = [];

  try {
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
            startTimeMillis: 1675496640000,
            endTimeMillis: 1677915566346
        },
    });
    // console.log(result);
    stepArray = result.data.bucket;
  } catch (e) {
    console.log(e)
  }
  try {
    for (const dataSet of stepArray) {
        //console.log(dataSet);
        for (const points of dataSet.dataset) {
            //console.log(points)
            for (const steps of points.point) {
              const valueArrays = steps.value
              const intVal = valueArrays[0].intVal;
              if (!(dates.includes(steps.startTimeNanos))) {
                dates.push(steps.startTimeNanos)
                scores.push(intVal)
              }
              //console.log(steps.value)
            }
        }
    }
    console.log(dates)
    console.log(scores)
  } catch (e) {
    console.log(e)
  }

});

app.listen(port, () => console.log(`GOOGLE FIT IS LISTENING ON PORT ${port}`));
