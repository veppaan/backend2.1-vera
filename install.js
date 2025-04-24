//Installering för SQLite
require("dotenv").config();
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(process.env.DB_PATH);

db.serialize(() =>{
    db.run("DROP TABLE IF EXISTS resume");
    db.run(`
        CREATE TABLE resume (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            companyname VARCHAR(50) NOT NULL,
            jobtitle VARCHAR(50) NOT NULL,
            location VARCHAR (50) NOT NULL,
            job_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `);
});


db.close();