const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
//require("dotenv").config();
//Databas
//const sqlite3 = require("sqlite3").verbose();
//const db = new sqlite3.Database(process.env.DB_PATH);

//Routes

//Hämta alla rader i resume-databas
app.get("/resume", (req, res) => {
    res.json({message: "Get resume"})
});
/* app.get("/resume/all", (req, res) => {
    res.json({message: "Get resumes"})
}) */

app.listen(port, () => {
    console.log("Server running on port: " + port);
})