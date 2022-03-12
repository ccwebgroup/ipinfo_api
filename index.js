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

//Search Net by Net ID
app.get("/whois/net/:net_id", async (req, res) => {
    const { token } = req.query;
    const net_id = req.params.net_id;
    try {
      const result = await axios.get(`${baseUrl}whois/net/${net_id}?token=${token}`);
      res.json(result.data);
    } catch (error) {
      res.json(error);
    }
  });

//Search Net by IP or IP Range
app.get("/whois/net/:ip", async (req, res) => {
    const { token } = req.query;
    const ip = req.params.ip;
    try {
      const result = await axios.get(`${baseUrl}whois/net/${ip}?token=${token}`);
      res.json(result.data);
    } catch (error) {
      res.json(error);
    }
  });

//Search Net by domain
app.get("/whois/net/:domain", async (req, res) => {
    const { token } = req.query;
    const domain = req.params.domain;
    try {
      const result = await axios.get(`${baseUrl}whois/net/${domain}?token=${token}`);
      res.json(result.data);
    } catch (error) {
      res.json(error);
    }
  });

//Search Net records by ASN
app.get("/whois/net/:asn", async (req, res) => {
    const { token } = req.query;
    const asn = req.params.asn;
    try {
      const result = await axios.get(`${baseUrl}whois/net/${asn}?token=${token}`);
      res.json(result.data);
    } catch (error) {
      res.json(error);
    }
  });

//Search Org records by Org ID
app.get("/whois/org/:id", async (req, res) => {
    const { token } = req.query;
    const id = req.params.id;
    try {
      const result = await axios.get(`${baseUrl}whois/org/${id}?token=${token}`);
      res.json(result.data);
    } catch (error) {
      res.json(error);
    }
  });

//Search POC records by POC ID
app.get("/whois/poc/:id", async (req, res) => {
    const { token } = req.query;
    const id = req.params.id;
    try {
      const result = await axios.get(`${baseUrl}whois/poc/${id}?token=${token}`);
      res.json(result.data);
    } catch (error) {
      res.json(error);
    }
  });

app.listen(PORT, () => console.log(`Server is runninng in port ${PORT}`));
