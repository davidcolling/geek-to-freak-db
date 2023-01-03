const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const keys = require('./config');
const PORT = process.env.PORT || 5000;

const app = express();

class WorkoutDBFacade {
	constructor(con, db) {
		this.con = con;
		this.db = db;
	}
	query(query, successMessage) {
		return this.con.query(
			query,
			function (err, result) {
				if (err) {
					throw err;
				} else {
					console.log(successMessage);
					return result;
				}
			}
		)
	}
}

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

var facade = new WorkoutDBFacade(db, keys.DB_DATABASE);
//CONNECT
db.connect( (err) => {
	if(err) throw err;
		console.log('MySQL Connected...');
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
			"notes text, " + 
			"primary key (id) )", 
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

app.post('/dbg', function(request, response) {
	console.log("workoutdb client debug message: " + request.body.message);
})

app.post('/api', function(request, response) {
	console.log('workout server: test request received');
	console.log(request.body.movement);
	console.log(request.body.reps);
	console.log(request.body.weight);
	console.log(request.body.unit);
})
app.get('/api', function(request, response) {
	response.set('Content-Type', 'application/json');
	var out = facade.query(
		"select json_arrayagg(" +
			"json_object(" +
				"'id', 'id', " +
				"'name', 'name', " +
				"'isFreeWeight', 'isFreeWeight'," +
				"'notes', 'notes'" +
			") " +
		") " +
		"from equipment;",
		"workout database: got query"
	)
	response.send('{"message": "workout server: test request received"}');
	console.log(out);
})


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})

