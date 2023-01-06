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
	insertEquipment(name, isFreeWeight) {
		this.query(
			"INSERT INTO equipment (name, isFreeWeight) " +
			    "SELECT '" + name + "', " + isFreeWeight + " " +
			    "FROM dual " +
			    "WHERE NOT EXISTS ( " +
				            "SELECT name, isFreeWeight " +
				            "FROM equipment " +
				            "WHERE equipment.name='" + name + "' AND equipment.isFreeWeight=" + isFreeWeight + ") LIMIT 1; ",
			"workout server: inserting equipment to db;"
		)
	}
	insertSet(movement, reps, weight) {
		this.query(
			"insert into sets(startTime, endTime, movement, equipment, reps, lastRepComplete, weight, isLR, isL, notes) values(CURTIME(), CURTIME(), '" + movement + "', 1, " + reps + ", 1, " + weight + ", 1, 0, null);",
			"workout server: inserting set to db;"
		)

	}
}
var facade = new WorkoutDBFacade(db, keys.DB_DATABASE);

// initialize db
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
			"name text not null unique, " +
			"isFreeWeight boolean not null, " +
			"notes text, " +
			"primary key (id) )", 
		"workout db: table 'equipment' exists;"
	);
	facade.insertEquipment("incline press", 0);
	facade.insertEquipment("chest press", 0);
	facade.insertEquipment("leg press", 0);
	facade.insertEquipment("leg curl", 0);
	facade.insertEquipment("leg extension", 0);
});

// define api
app.post('/dbg', function(request, response) {
	console.log("workoutdb client debug message: " + request.body.message);
})

app.post('/api', function(request, response) {
	console.log('workout server: test request received');
	facade.insertSet(request.body.movement, request.body.reps, request.body.weight);
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

// start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})

