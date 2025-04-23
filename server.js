const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

//Databas
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(process.env.DB_PATH);

/* app.get("/", (req, res) => {
    res.render("index", {
        fullname: "Vera Kippel"
    });
}); */

//Routes

//Hämta alla rader i resume-databas
app.get("/", (req, res) => {
    db.all("SELECT * FROM resume;", (err) => {
        if(err){
            console.error(err.message);
            return;
        }
        res.render("index", {
            error: ""
        })
    });
});