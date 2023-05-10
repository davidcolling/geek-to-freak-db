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

// return the input with the character after each ' ' uppercase
const capitalize = string => {
    var output = '';
    if (string.length > 0) {
        if (string.charAt(0) !== ' ') {
            output += string.charAt(0).toUpperCase();
        } else {
            output += ' ';
        }
    }

    var previousChar = null;

    for (var i = 0; i < string.length; i++) {
        if(previousChar != null ) {
            if (previousChar === ' '  && string.charAt(i) !== ' ' ) {
                output += string.charAt(i).toUpperCase();
            } else {
                output += string.charAt(i);
            }
        }
        previousChar = string.charAt(i);
    }

    return output;
}

class WorkoutDBFacade {
    constructor(con, db) {
        this.con = con;
        this.db = db;
    }
    query(query, successMessage, cb) {
        if (typeof cb === 'undefined') {
            cb = (err, result) => {
                if (err) {
                    throw err;
                } else {
                    console.log(successMessage);
                    return result;
                }
            }
        }
        return this.con.query(
            query,
            cb
        )
    }
    insertEquipment(name, isFreeWeight, cb) {
        var formattedName = capitalize(name);
        this.query(
            "INSERT INTO equipment (name, isFreeWeight) " +
                "SELECT '" + formattedName + "', " + isFreeWeight + " " +
                "FROM dual " +
                "WHERE NOT EXISTS ( " +
                            "SELECT name, isFreeWeight " +
                            "FROM equipment " +
                            "WHERE equipment.name='" + formattedName + "' AND equipment.isFreeWeight=" + isFreeWeight + ") LIMIT 1; ",
            "workout server: inserting equipment to db;",
            cb
        )
    }
    insertSet(movement, reps, weight, lastRepComplete, isLR, isL, notes, cb) {
        this.query(
            `insert into 
                sets(
                    startTime, 
                    endTime, 
                    movement, 
                    equipment, 
                    reps, 
                    lastRepComplete, 
                    weight, 
                    isLR, 
                    isL, 
                    notes) 
                values(
                    CURTIME(), 
                    CURTIME(), 
                    '${movement}',
                    1, 
                    ${reps},
                    ${lastRepComplete},
                    ${weight},
                    ${isLR},
                    ${isL},
                    '${notes}')
            ;`,
            "workout server: inserting set to db;",
            cb
        )

    }
    selectEquipment(cb) {
        this.con.query(
            "select * from equipment;",
            cb
        )
    }
    selectWorkouts(cb) {
        this.con.query(
            "select * from workouts;",
            cb
        )
    }
    deleteEquipment(id) {
        this.query(
            `delete from equipment where id=${id};`,
            "workout server: deleteing equipment from db"
        )
    }
    insertWorkout(set1, set2, set3, set4, set5, set6, set7, set8, cb) {
        this.query(
            `insert into 
                workouts(
                    startTime,
                    endTime,
                    set1,
                    set2,
                    set3,
                    set4,
                    set5,
                    set6,
                    set7,
                    set8,
                    set9,
                    set10,
                    notes
                )
                values(
                    CURTIME(),
                    CURTIME(),
                    ${set1},
                    ${set2},
                    ${set3},
                    ${set4},
                    ${set5},
                    ${set6},
                    ${set7},
                    null,
                    null,
                    null,
                    null
                );
            `,
            "workout server: inserting workout to db",
            cb
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
    facade.query(
        "create table if not exists movement ( " + 
            "id int auto_increment, " + 
            "name text , " + 
            "upCadence int not null , " + 
            "downCadence int not null, " + 
            "notes text, " + 
            "primary key (id) )", 
        "workout db: table 'movement' exists;"
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

app.post('/set', function(request, response) {
    facade.insertSet(
        request.body.equipment, 
        request.body.reps, 
        request.body.weight, 
        request.body.lastRepComplete, 
        request.body.isLR, 
        request.body.isL, 
        request.body.notes,
        makeCallbackResponse(response)
    )
})

app.post('/equipment', function(request, response) {
    facade.insertEquipment(
        request.body.name, 
        request.body.isFreeWeight, 
        makeCallbackResponse(response)
    );
});

app.delete('/equipment', function(request, response) {
    facade.deleteEquipment(request.body.id);
});

app.get('/equipment', function(request, response) {
    facade.selectEquipment(
        makeCallbackResponse(response)
    );
});

app.get('/workout', function(request, response) {
    facade.selectWorkouts(
        makeCallbackResponse(response)
    );
});

app.post('/workout', function(request, response) {
    var inputSets = [];
    for (var i = 0; i < 8; i ++) {
        if (i < request.body.sets.length) {
            inputSets.push(request.body.sets[i].id);
        } else {
            inputSets.push(null);
        }
    }
    facade.insertWorkout(
        inputSets[0],
        inputSets[1],
        inputSets[2],
        inputSets[3],
        inputSets[4],
        inputSets[5],
        inputSets[6],
        inputSets[7],
        makeCallbackResponse(response)
    );
});

// start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})

// read function name as "make callback (imperative): response (declarative)"
function makeCallbackResponse(response) {
    return function (err, data) {
        if (err) {
            console.log("workout server: ", err);
        } else {
            response.send(data);
        }
    };
}

