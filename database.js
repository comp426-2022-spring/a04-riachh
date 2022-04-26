//Ensures errors will be thrown 
"use strict";

const Database = require('better-sqlite3'); //Require better-sqlite.

const db = new Database('log.db');  //Connect to log.db file 

//Is the database initialized or do we need to initialize it?
const stmt = db.prepare(`
    SELECT name FROM sqlite_master WHERE type='table' and name='userinfo';`
);

//Define row using get() from better-sqlite3
let row = stmt.get();

//Check for table, if row undefined, no table exists
if (row === undefined) {
    console.log('Your database appears to be empty. I will initialize it now.');

    //Set a const that will contain your SQL commands to initialize the database
    const sqlInit = `
        CREATE TABLE userinfo ( id INTEGER PRIMARY KEY, username TEXT, password TEXT );
        INSERT INTO userinfo (username, password) VALUES ('user1','supersecurepassword'),('test','anotherpassword');
    `;
    
    //Execute SQL commands that we just wrote above
    db.exec(sqlInit);
    
    console.log('Your database has been initialized with a new table and two entries containing a username and password.');

} else {
    //Else, database exists 
    console.log('Database exists.')
}

//Export all of the above as a module
module.exports = db