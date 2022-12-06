const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const keys = require('./config');
const PORT = process.env.PORT || 5000;

const app = express();

//STATIC FOLDER
app.use(express.static(path.join(__dirname,'../client/build')));

// Body Parser Middleware
app.use(bodyParser.json());

//CREATE CONNECTION
const db = mysql.createConnection({
  host     : keys.DB_HOST,
  user     : keys.DB_USER,
  password : keys.DB_PASSWORD,
  database : keys.DB_DATABASE
});

//CONNECT
db.connect( (err) => {
	if(err) throw err;
		console.log('MySQL Connected...');
	var facade = new WorkoutDBFacade(db, keys.DB_DATABASE);
	facade.query("CREATE DATABASE IF NOT EXISTS " + keys.DB_DATABASE + "; ", "workout db: exists;");
	facade.query("USE " + keys.DB_DATABASE + ";", "workout db: selected;");
	facade.query("create table if not exists workouts (startDate varchar(255)) ", "workout db: selected;");
});

class WorkoutDBFacade {
	constructor(con, db) {
		this.con = con;
		this.db = db;
	}
	query(query, successMessage) {
		this.con.query(
			query,
			function (err, result) {
				if (err) {
					throw err;
				} else {
					console.log(successMessage);
				}
			}
		);
	}
}

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})

