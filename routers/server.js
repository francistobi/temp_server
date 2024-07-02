require("dotenv").config();
const express = require("express");
const router = express.Router();
const geoip = require("geoip-lite");
const axios = require("axios");
const api_key = process.env.OPENWEATHER_APIKEY;

router.get("/hello", async (req, res) => {
  try {
    const name = req.query.visitor_name;
    const ip = "46.219.52.63";
    // const ip = req.ip;
    const geo = geoip.lookup(ip);
    console.log(geo)
    if(!geo.city){
      res.status(404).send({ error: "couldn't find the city for this ip address" });
        }

    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: geo.city,
          units: "metric",
          appid: api_key,
        },
      }
    );
    const temp = weatherRes.data.main.temp;

    res.send({
      client_ip: ip,
      location: geo.city,
      greeting: `Hello, ${name}!, the temperature is ${temp} degrees Celcius in ${geo.city}`,
    });

    console.log(temp);
  } catch (error) {
    res.status(500).send({ error: "unable to fetch weather data" });
  }
});

module.exports = router;
