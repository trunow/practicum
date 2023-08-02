const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DBSOURCE = path.resolve(__dirname, "db.sqlite");

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err;
    } 
    // else {
    //     console.log('Connected to the SQLite database. ' + (new Date).toJSON().slice(11,19));
    // }
});


module.exports = db;