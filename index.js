const express = require("express");
const app = express();
const ejs = require("ejs");
const https = require("https");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/", (req, res) => {
  const loc = req.body.input;
  const str =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    loc +
    "&appid=0a38acc0b052e485c75bcc32189984de&units=metric";
  let temp = "";
  let ico = "";
  https.get(str, (reqq) => {
    if (reqq.statusCode === 200) {
      reqq.on("data", (data) => {
        const newData = JSON.parse(data);
        temp = newData.main.temp;
        ico = newData.weather[0].icon;
        res.render("display", { temperature: temp, city: loc, icon: ico });
      });
    } else {
      res.send("Please Enter Valid City Name");
    }
  });
});

app.listen(3000, () => {
  console.log("server is up and running");
});
