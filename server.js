const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
//require("dotenv").config();
//Databas
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/resume.db", (err) => {
    if(err){
        console.error("Fel vid databasanslutning: " + err);
    }
});

///Middleware
app.use(express.json());

//Routes

//Hämta alla rader i resume-databas
app.get("/", (req, res) => {
    res.json({message: "Get resume"})
});
//Hämta resume-tabellens värden GET
app.get("/resume", (req, res) => {
    db.all("SELECT * FROM resume;", (err, row) => {
        if(err){
            console.error(err.message);
        }
        res.json(row);
    })
}); 
//POST-metod
app.post("/resume", (req, res) => {
    let companyname = req.body.companyname;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;

    //Error handling
  let errors = {
    message: "",
    detail: "",
    https_response: {

    }
  };
  if(!companyname || !jobtitle || !location){
    errors.message= "Companyname, jobtitle and location not included";
    errors.detail = "You must include both companyname, jobtitle and location in JSON";

    //Response code
    errors.https_response.message = "Bad Request";
    errors.https_response.code = 400;

    res.status(400).json(errors);

    return;
  }else{
    const stmt = db.prepare("INSERT INTO resume(companyname, jobtitle, location) VALUES(?, ?, ?);");
    stmt.run(companyname, jobtitle, location);
    stmt.finalize();

    let job = {
        companyname: companyname,
        jobtitle: jobtitle,
        location: location
    }

    res.json({ message: "Job added", job});
  }
});

app.listen(port, () => {
    console.log("Server running on port: " + port);
})