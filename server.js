const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

//Databas
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/resume.db");