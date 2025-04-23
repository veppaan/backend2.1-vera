//Installering för SQLite
require("dotenv").config();
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(process.env.DB_PATH);

db.serialize(() =>{
    db.run("DROP TABLE IF EXISTS resume");
    db.run(`
        CREATE TABLE resume (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            companyname VARCHAR(40) NOT NULL,
            jobtitle VARCHAR(40) NOT NULL,
            location VARCHAR (40) NOT NULL,
            job_created TIMESTAMP NOT NULL DEFAULT CURENT_TIMESTAMP
        );
    `);
});


db.close();