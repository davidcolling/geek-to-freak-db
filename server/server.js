const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const keys = require('./config');
const PORT = process.env.PORT || 5000;

const app = express();

const {capitalize, makeCallbackResponse, facade2} = require('./src');

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

const query = (query, successMessage, cb) => facade2.query(db, query, successMessage, cb);

class WorkoutDBFacade {
    constructor(con, db) {
        this.con = con;
        this.db = db;
    }
    insertEquipment(name, isFreeWeight, cb) {
        var formattedName = capitalize(name);
        query(
            `INSERT INTO 
                equipment (
                    name, 
                    isFreeWeight) SELECT '${formattedName}', 
                    ${isFreeWeight} 
                    FROM dual WHERE NOT EXISTS ( 
                        SELECT name, isFreeWeight 
                        FROM equipment 
                        WHERE 
                            equipment.name='${formattedName}' 
                            AND 
                            equipment.isFreeWeight=${isFreeWeight}) 
                        LIMIT 1; 
            `,
            "workout server: inserting equipment to db;",
            cb
        )
    }
    insertSet(movement, reps, weight, lastRepComplete, isLR, isL, notes, cb) {
        query(
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
    selectWorkouts(cb, id) {
        var idClause = '';
        if (typeof id !== 'undefined') {
            idClause = `where id=${id}`;
        }
        return query(
            `select * from workouts ${idClause};`,
            "workout server: workout seleted from db",
            cb
        )
    }
    deleteEquipment(id) {
        query(
            `delete from equipment where id=${id};`,
            "workout server: deleteing equipment from db"
        )
    }
    insertWorkout(workout, cb) {
        var sets = [];
        for (var i = 0; i < 10; i++) {
            if (i < workout.sets.length) {
                sets.push(workout.sets[i].id);
            } else {
                sets.push(null);
            }
        }
        query(
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
                    ${sets[0]},
                    ${sets[1]},
                    ${sets[2]},
                    ${sets[3]},
                    ${sets[4]},
                    ${sets[5]},
                    ${sets[6]},
                    ${sets[7]},
                    ${sets[8]},
                    ${sets[9]},
                    null
                );
            `,
            "workout server: inserting workout to db",
            cb
        )
    }
    selectSetsForWorkout(id, cb) {
        return query(
            `select id, movement
            from sets as s
            where 
            s.id in (select set1 from workouts where id=${id})
            or 
            s.id in (select set2 from workouts where id=${id})
            or 
            s.id in (select set3 from workouts where id=${id})
            or 
            s.id in (select set4 from workouts where id=${id})
            or 
            s.id in (select set5 from workouts where id=${id})
            or 
            s.id in (select set6 from workouts where id=${id})
            or 
            s.id in (select set7 from workouts where id=${id})
            or 
            s.id in (select set8 from workouts where id=${id})
            or 
            s.id in (select set9 from workouts where id=${id})
            or 
            s.id in (select set10 from workouts where id=${id}) ;`,
            "workout server: selecting sets from db",
            cb
        )
    }
}
var facade = new WorkoutDBFacade(db, keys.DB_DATABASE);

// initialize db
db.connect( (err) => {
    if(err) throw err;
    console.log('MySQL Connected...');
    query("CREATE DATABASE IF NOT EXISTS " + keys.DB_DATABASE + "; ", "workout db: exists;");
    query("USE " + keys.DB_DATABASE + ";", "workout db: selected;");
    query(
        `create table if not exists 
            workouts ( id int auto_increment, 
                    startTime datetime not null, 
                    endTime datetime not null, 
                    set1 int not null,  
                    set2 int, 
                    set3 int, 
                    set4 int, 
                    set5 int, 
                    set6 int, 
                    set7 int, 
                    set8 int, 
                    set9 int, 
                    set10 int, 
                    notes text, 
                    primary key (id) ) 
        `, 
        "workout db: table 'workouts' exists;"
    );
    query(
        `create table if not exists 
            sets (
                id int auto_increment, 
                    startTime datetime not null, 
                    endTime datetime not null, 
                    movement text not null, 
                    equipment int not null, 
                    reps tinyint not null, 
                    lastRepComplete boolean not null, 
                    weight float not null, 
                    isLR boolean not null, 
                    isL boolean not null, 
                    notes text, 
                    primary key (id) )
        `, 
        "workout db: table 'sets' exists;"
    );
    query(
        `create table if not exists equipment ( 
            id int auto_increment, 
            name text not null unique, 
            isFreeWeight boolean not null, 
            notes text, 
            primary key (id) )`,
        "workout db: table 'equipment' exists;"
    );
    query(
        `create table if not exists movement ( 
            id int auto_increment, 
            name text , 
            upCadence int not null , 
            downCadence int not null, 
            notes text, 
            primary key (id) )`,
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
    if ( request.body.type === "new" ) {
       facade.insertWorkout(
            request.body.payload, 
            makeCallbackResponse(response)
        );
    } else {
        facade.selectSetsForWorkout(request.body.payload.id, makeCallbackResponse(response));
    }
});

// start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})

