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
	facade.query(
		"create table if not exists workouts ( " +
			"id int auto_increment, " +
			"startTime datetime not null, " +
			"endTime datetime not null, " +
			"set1 int not null,  " +
			"set2 int, set3 int, set4 int, set5 int, set6 int, set7 int, set8 int, set9 int, set10 int, " +
			"notes text, " +
			"primary key (id) ) ", 
		"workout db: table 'workouts' exists;"
	);
	facade.query(
		"create table if not exists sets (" +
			"id int auto_increment, " +
			"startTime datetime not null, "  +
			"endTime datetime not null, " +
			"movement text not null, " +
			"equipment int not null, " +
			"reps tinyint not null, " +
			"lastRepComplete boolean not null, " +
			"weight float not null, " +
			"isLR boolean not null, " +
			"isL boolean not null, " +
			"notes text, primary key (id) )", 
		"workout db: table 'sets' exists;"
	);
	facade.query(
		"create table if not exists equipment ( " +
			"id int auto_increment, " +
			"name text not null, " +
			"isFreeWeight boolean not null, " +
			"notes text, " +
			"primary key (id) )", 
		"workout db: table 'equipment' exists;"
	);
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

app.get('/test', function (req, res) {
	res.send('Hello World');
	console.log('request received');
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})

