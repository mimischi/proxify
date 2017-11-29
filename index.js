"use strict";
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;
const API_OPTIONS = {
  headers: { accept: "application/json" },
  timeout: 1000,
  responseType: "text"
};

const API = axios.create({
  baseURL: BASE_URL,
  params: {
    accessId: API_KEY,
    format: "json"
  },
  API_OPTIONS
});

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", function(req, res) {
  API.get(req.body.url, {
    params: req.body.params
  })
    .then(response => {
      res.json(response.data);
    })
    .catch(e => {
      res.json(e);
    });
});

app.listen(PORT, function() {
  console.log('proxify is listening on port %s', PORT)
})