const express = require("express");
const axios = require("axios");
const { IPinfoWrapper } = require("node-ipinfo");

const app = express();
const PORT = process.env.PORT || 3000;
const baseUrl = "https://ipinfo.io/";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to ipinfo.io API");
});

// Get Ip Info
app.get("/ipinfo", async (req, res) => {
  const { token } = req.query;
  try {
    const result = await axios.get(`${baseUrl}json?token=${token}`);
    res.json(result.data);
  } catch (error) {
    res.json(error);
  }
});

//Look up IP
app.get("/lookup-ip/:ip", async (req, res) => {
  const { token } = req.query;
  const ipinfo = new IPinfoWrapper(token);
  const ip = req.params.ip;
  try {
    const response = await ipinfo.lookupIp(ip);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

//Look up ASN
app.get("/lookup-asn/:asn", async (req, res) => {
  const { token } = req.query;
  const ipinfo = new IPinfoWrapper(token);
  const asn = req.params.asn;
  try {
    const response = await ipinfo.lookupASN(asn);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

//Get Domains
app.get("/domains/:ip", async (req, res) => {
  const { token } = req.query;
  const ip = req.params.ip;
  try {
    const result = await axios.get(`${baseUrl}domains/${ip}?token=${token}`);
    res.json(result.data);
  } catch (error) {
    res.json(error);
  }
});

//Get Ranges
app.get("/ranges/:domain", async (req, res) => {
  const { token } = req.query;
  const domain = req.params.domain;
  try {
    const result = await axios.get(`${baseUrl}ranges/${domain}?token=${token}`);
    res.json(result.data);
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => console.log(`Server is runninng in port ${PORT}`));
