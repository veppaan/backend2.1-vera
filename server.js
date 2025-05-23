const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
//Databas
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/resume.db", (err) => {
    if(err){
        console.error("Fel vid databasanslutning: " + err);
    }
});

///Middleware
app.use(express.json());
app.use(cors());

//Routes

//Hämta alla rader i resume-databas
app.get("/", (req, res) => {
    db.all("SELECT * FROM resume ORDER BY id DESC;", (err, row) => {
        if(err){
            console.error(err.message);
        }
        res.json(row);
    })
});
//Hämta resume-tabellens värden GET
app.get("/resume/:id", (req, res) => {
    let id = req.params.id;

        //Query to database
        const stmt = db.get("SELECT * FROM resume WHERE id=?;", id, (err, job) => {
            if(err){
                res.status(500).json({error: err.message});
                return;
            }
        if(!job){
            res.status(500).json({error: "Inga rader i id hittad"});
            return;
        }

        res.json({ message: "Job to show", job});
        stmt.finalize();
        });
}); 
//POST-method
app.post("/resume/add", (req, res) => {
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
    //Query to database
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

///DELETE-method
app.delete("/resume/delete/:id", (req, res) => {
    let id = req.params.id;

    //Delete job with query to database
    db.run("DELETE FROM resume WHERE id=?;", id, function (err) {
        if(err){
            console.error(err.message);
        }
        //Check to see changes
        if(this.changes === 0){
            res.status(404).json ({ error: `Job with id (${id}) does not exist`});
            return;
        }
        res.status(200).json({ message: "Job deleted with id: " + id});
    })
})
///PUT-method
app.put("/resume/update/:id", (req, res) => {
    let id = req.params.id;

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
    const stmt = db.prepare("UPDATE resume SET companyname=?, jobtitle=?, location=? WHERE id=?");
    stmt.run(companyname, jobtitle, location, id);
    stmt.finalize();
    //Check to see changes
    if(this.changes === 0){
        res.status(404).json ({ error: `Job with id (${id}) does not exist`});
        return;
    }
    res.status(200).json({ message: "Job updated with id: " + id});

    let job = {
        companyname: companyname,
        jobtitle: jobtitle,
        location: location
    }

    res.json({ message: `Job updated`, job});
    
  }
});

app.listen(port, () => {
    console.log("Server running on port: " + port);
})