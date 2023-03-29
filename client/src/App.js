import React, { Component } from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider, useSelector, useDispatch} from 'react-redux';
import thunk from 'redux-thunk';

const dbgPost = (message) => {
    fetch('/dbg', {
        method: 'post',
        body: JSON.stringify({message: message}),
            headers: {
            "Content-Type": "application/json"
        }
    });
}

// thunks

const postEquipment = () => {
    return async (dispatch, getState) => {
        const s = await getState().currentEquipment;
        const response = await fetch('/equipment', {
            method: 'post',
            body: JSON.stringify(s),
                headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(setView(POSTED_VIEW));
     }
}

const fetchEquipment = () => {
    return async (dispatch, setState) => {
        const response = await fetch('/equipment');
        const data = await response.json();

        dispatch(setEquipmentSuccess(data));
    }
}

// actions
const SET_VIEW = "SET_VIEW";
const SET_EQUIPMENT_SUCCESS = "SET_EQUIPMENT_SUCCESS";
const SET_EQUIPMENT_FAILURE = "SET_EQUIPMENT_FAILURE";
const SET_CURRENT_EQUIPMENT = "SET_CURRENT_EQUIPMENT";
const SET_CURRENT_WORKOUT = "SET_CURRENT_WORKOUT";
const SET_NEW_SET = "SET_NEW_SET";
const SET_CURRENT_SET = "SET_CURRENT_SET"

const setView = payload => ({type:SET_VIEW, payload});
const setEquipmentSuccess = payload => ({type:SET_EQUIPMENT_SUCCESS, payload})
const setEquipmentFailure = e => ({type:SET_EQUIPMENT_FAILURE, e})
const setCurrentEquipment = payload => ({type:SET_CURRENT_EQUIPMENT, payload});
const setCurrentWorkout = payload => ({type: SET_CURRENT_WORKOUT, payload});
const setNewSet = payload => ({type: SET_NEW_SET, payload});
const setCurrentSet = payload => ({type: SET_CURRENT_SET, payload});

// views
const HOME_VIEW = "HOME";
const WORKOUT_ADDER_VIEW = "WORKOUT_ADDER";
const EQUIPMENT_VIEW = "EQUIPMENT_VIEW";
const EQUIPMENT_ADDER_VIEW = "EQUIPMENT_ADDER_VIEW";
const POSTED_VIEW = "POSTED_VIEW";
const SET_ADDER_VIEW = "SET_ADDER_VIEW";

//reducers

const initialState = {
    view: HOME_VIEW,
    equipment: JSON.stringify([{id: 0, name: " ", isFreeWeight: false, notes: " "}]),
    currentEquipment: {
        name: " ", 
        isFreeWeight: false, 
        notes: " "
    },
    currentWorkout: {
        sets: [],
        currentSet: {
            equipment: 20,
            reps: 0,
            weight: 0,
            lastRepComplete: true,
            isLR: true,
            isL: false,
            notes: " "
        }
    },
}

const viewReducer = function (state, action) {
    if (action.type === SET_NEW_SET) {
        return SET_ADDER_VIEW;
    }
    if (action.type === SET_VIEW) {
        return action.payload;
    } else {
        if (typeof state !== 'undefined') {
            return state;
        }
    }
    return HOME_VIEW;
}

const equipmentReducer = function(state, action) {
    if (action.type === SET_EQUIPMENT_SUCCESS) {
        return action.payload;
    } else {
        if (typeof state !== 'undefined') {
            return state;
        }
    }

    return "unknown action";
}

const currentEquipmentReducer = function(state, action) {
    if (action.type === SET_CURRENT_EQUIPMENT && typeof state != 'undefined') {
        var id  = action.payload.target.id;
        var output = {
            name: id == "name" ? action.payload.target.value : state.name,
            isFreeWeight: id == "isFreeWeight" ? action.payload.target.value : state.isFreeWeight,
            notes: id == "notes" ? action.payload.target.value : state.notes
        }
        return output
    }
    return {name: " ", isFreeWeight: false, notes: " "};
}

const currentWorkoutReducer = function(state, action) {
    if (typeof state !== 'undefined') {
        if (action.type === SET_CURRENT_SET ) {
            var id = action.payload.target.id;
            var input = action.payload.target.value;
    
            return {
                sets: [],
                currentSet: {
                    equipment: (id === "equipment") ? input : state.equipment,
                    reps: (id === "reps") ? input : state.reps,
                    weight: (id === "weight") ? input : state.weight,
                    lastRepComplete: (id === "lastRepComplete") ? !state.lastRepComplete : state.lastRepComplete, 
                    isLR: (id === "isLR") ? !state.isLR : state.isLR,
                    isL: (id === "isL") ? !state.isL : state.isL,
                    notes: (id === "notes") ? input : state.notes
                }
            }
        }
    }
 
    return {
        sets: [],
        currentSet: {
            equipment: 20,
            reps: 0,
            weight: 0,
            lastRepComplete: true,
            isLR: true,
            isL: false,
            notes: " "
        }
    }

}

const rootReducer = combineReducers({
    view: viewReducer,
    equipment: equipmentReducer,
    currentEquipment: currentEquipmentReducer,
    currentWorkout: currentWorkoutReducer
});

// selectors
const getView = state => state.view;
const getEquipment = state => state.equipment;
const getCurrentEquipment = state => state.currentEquipment;
const getCurrentWorkout = state => state.currentWorkout;

//store
const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

//css
var buttonStyle = {
    fontFamily: "Courier",
    borderStyle: "solid",
    borderWidth: "1px", 
    borderRadius: "0px",
    color: "black"
}

var dropDownStyle = {
    border: "none",
    borderRadius: "0px",
    color: "#000000",
    fontFamily: "Courier"
}

var inputStyle = {
    borderRadius: "0x",
    fontFamily: "Courier"
}

function WorkoutDB ({view}) {
      return (
        <div style={
            {
                width: '250px', 
                display: 'block', 
                margin: 'auto', 
                borderColor: 'black', 
                borderStyle: 'solid', 
                borderWidth: '1px'
            }
        }>
            {view === HOME_VIEW && <HomeViewConnected />}
            {view === WORKOUT_ADDER_VIEW && <WorkoutAdderConnected />}
            {view === EQUIPMENT_VIEW && <EquipmentViewConnected />}
            {view === EQUIPMENT_ADDER_VIEW && <EquipmentAdderViewConnected />}
            {view === POSTED_VIEW && <PostedView />}
            {view === SET_ADDER_VIEW && <SetAdderConnected />}
        </div>
    )
}

const WorkoutDBConnected = () => {
    const getViewConnected = useSelector(getView);
    
    return (
        <WorkoutDB view={getViewConnected} />
    );
}

function HomeView({viewWorkoutAdder, viewEquipmentView, testAPI, list}) {
    return (
        <div>
            <button onClick={viewWorkoutAdder} >Add Workout</button>
            <br />
            <button onClick={viewEquipmentView} >Manage Equipment</button>
        </div>
    );
}

const HomeViewConnected = () => {
    const dispatch = useDispatch();
    const viewWorkoutAdder = () => dispatch(setView(WORKOUT_ADDER_VIEW));
    const viewEquipmentView = () => dispatch(setView(EQUIPMENT_VIEW));
    return(
        <HomeView viewWorkoutAdder={viewWorkoutAdder} viewEquipmentView={viewEquipmentView} />
    );
}

const EquipmentView = ({viewEquipmentAdder, getEquipment, list}) => {
    return (
        <div>
            <button onClick={viewEquipmentAdder}>Add</button>
            <br />
            <button onClick={getEquipment}>Get Equipment</button>
            <br />
            <p>{JSON.stringify(list)}</p>
        </div>
    )
}

const EquipmentViewConnected = () => {
    const dispatch = useDispatch();
    const viewEquipmentAdder = () => dispatch(setView(EQUIPMENT_ADDER_VIEW));
    const fetchEquipmentConnected = () => dispatch(fetchEquipment());
    const getEquipmentConnected = () => useSelector(getEquipment);


    return (
        <EquipmentView viewEquipmentAdder={viewEquipmentAdder} getEquipment={fetchEquipmentConnected} list={getEquipmentConnected()} />
    );
}

const EquipmentAdderView = ({post, handleChange}) => {
    return (
        <div>
            <p>Name</p>
            <input id="name" type="text" onChange={(e) => handleChange(e)} />
            <p>This is a free-weight.</p>
            <input id="isFreeWeight" type="checkbox" onChange={(e) => handleChange(e)} />
            <p>Notes</p>
            <input id="notes" type="text" onChange={(e) => handleChange(e)} />
            <button onClick={post}>Add</button>
        </div>
    )
}

const EquipmentAdderViewConnected = () => {
    const dispatch = useDispatch();
    const getCurrentEquipmentConnected = useSelector(getCurrentEquipment);
    const post = () => dispatch(postEquipment());
    const handleChange = e => dispatch(setCurrentEquipment(e));

    return (
        <EquipmentAdderView post={post} handleChange={handleChange}/>
    )
}

const WorkoutAdder = ({getCurrentWorkoutConnected, addSet}) => {
    return (
        <div>
            {getCurrentWorkoutConnected.sets.map( (item) => (<p>set</p>) )}
            <br />
            <button onClick={addSet}> Add Set </button>
        </div>
    )

}

const WorkoutAdderConnected = () => {
    const dispatch = useDispatch();
    const addSet = () => dispatch(setNewSet({}));
    const getCurrentWorkoutConnected = useSelector(getCurrentWorkout);

    return (
        <WorkoutAdder getCurrentWorkoutConnected={getCurrentWorkoutConnected} addSet={addSet} />
    );
}

const PostedView = () => {
    return (
        <div>
            <p>Posted</p>
        </div>
    )
}

const SetAdder = ({handleChange, post}) => {
   return (
        <div>
            <p> Equipment Selector </p>
            <p>Reps</p>
            <input id="reps" style={inputStyle} type="number" min="0" max="8" onChange={(e) => handleChange(e)} />
            <br/>
            <input id="weight" style={inputStyle} type="number" min="0" max="5000" onChange={(e) => handleChange(e)} />
            <select id="unit" style={dropDownStyle} onChange={(e) => handleChange(e)} value="pounds" >
                <option value="pounds">Pounds</option>
                <option value="kilograms">Kilograms</option>
            </select>
            <p>Was the last rep complete?</p>
            <input id="lastRepComplete" type="checkbox" onChange={(e) => handleChange(e)} checked="on" />
            <p>Did you lift both sides of your body simultaneously?</p>
            <input id="isLR" type="checkbox" onChange={(e) => handleChange(e)} checked="on" />
            <input id="isL" type="checkbox" onChange={(e) => handleChange(e)} checked="on" />
            <p>Notes</p>
            <input id="notes" type="text" onChange={(e) => handleChange(e)} />
            <button onClick={post} style={buttonStyle}>Add</button>
        </div>
    );
}

const SetAdderConnected = () => {
    const dispatch = useDispatch();
    const handleChange = e => dispatch(setCurrentSet(e));

    return (
        <SetAdder handleChange={handleChange} />
    );
}

class App extends Component {
    render() {
        return <Provider store={store}> <WorkoutDBConnected /> </Provider>;
    }
}

export default App;
