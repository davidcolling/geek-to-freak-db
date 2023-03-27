import React, { Component } from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider, useSelector, useDispatch} from 'react-redux';
import thunk from 'redux-thunk';

class DebugMessager {
    post(message) {
        fetch('/dbg', {
            method: 'post',
            body: JSON.stringify({message: message}),
                headers: {
                "Content-Type": "application/json"
            }
        });
    }
}
var debug = new DebugMessager();

const postEquipment = (payload) => {
    return async (dispatch, setState, payload) => {
        const response = await fetch('/equipment', {
            method: 'post',
            body: JSON.stringify({payload: payload}),
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

const setView = payload => ({type:SET_VIEW, payload});
const setEquipmentSuccess = payload => ({type:SET_EQUIPMENT_SUCCESS, payload})
const setEquipmentFailure = e => ({type:SET_EQUIPMENT_FAILURE, e})
const setCurrentEquipment = payload => ({type:SET_CURRENT_EQUIPMENT, payload});

// views
const HOME_VIEW = "HOME";
const WORKOUT_ADDER_VIEW = "WORKOUT_ADDER";
const EQUIPMENT_VIEW = "EQUIPMENT_VIEW";
const EQUIPMENT_ADDER_VIEW = "EQUIPMENT_ADDER_VIEW";
const POSTED_VIEW = "POSTED_VIEW";

//reducers

const initialState = {
    view: HOME_VIEW,
    equipment: JSON.stringify([{id: 0, name: " ", isFreeWeight: false, notes: " "}]),
    currentEquipment: {
        name: " ", 
        isFreeWeight: false, 
        notes: " "
    }
}

const viewReducer = function (state, action) {
    if (action.type === SET_VIEW) {
        if (action.payload === HOME_VIEW) {
            return HOME_VIEW;
        }
        if (action.payload === WORKOUT_ADDER_VIEW) {
            return WORKOUT_ADDER_VIEW;
        }
        if (action.payload === EQUIPMENT_VIEW) {
            return EQUIPMENT_VIEW;
        }
        if (action.payload === EQUIPMENT_ADDER_VIEW) {
            return EQUIPMENT_ADDER_VIEW
        }
        if (action.payload === POSTED_VIEW) {
            return POSTED_VIEW
        }
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
    } else if (action.type === SET_EQUIPMENT_FAILURE) {
        return "failed";
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
        debug.post("reducer: " + JSON.stringify(output));
        return output
    }
    return {name: " ", isFreeWeight: false, notes: " "};
}

const rootReducer = combineReducers({
    view: viewReducer,
    equipment: equipmentReducer,
    currentEquipment: currentEquipmentReducer
});

// selectors
const getView = state => state.view;
const getEquipment = state => state.equipment;
const getCurrentEquipment = state => state.currentEquipment;

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
            {view === WORKOUT_ADDER_VIEW && <WorkoutAdder />}
            {view === EQUIPMENT_VIEW && <EquipmentViewConnected />}
            {view === EQUIPMENT_ADDER_VIEW && <EquipmentAdderViewConnected />}
            {view === POSTED_VIEW && <PostedView />}
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
    const post = () => dispatch(postEquipment({name: "test", isFreeWeight: false, notes: "test"}));
    const handleChange = e => dispatch(setCurrentEquipment(e));
    const getCurrentEquipmentConnected = () => useSelector(getCurrentEquipment);

    return (
        <EquipmentAdderView post={post} handleChange={handleChange}/>
    )
}

class WorkoutAdder extends React.Component {
    render() {
        return (
            <div>
                <p> Workout Adder </p>
            </div>
        )
    }

}

const PostedView = () => {
    return (
        <div>
            <p>Posted</p>
        </div>
    )
}

class SetAdder extends React.Component {
    viewPostedViewEvent: React.PropTypes.func;
    viewWorkoutAdderEvent: React.PropTypes.func;

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.viewPostedViewEvent = this.props.viewPostedViewEvent;
        this.viewWorkoutAdderEvent = this.props.viewWorkoutAdderEvent;
        this.post = this.post.bind(this)
        this.state = {
            movement: "incline_press",
            reps: 6,
            weight: 160,
            unit: "pounds",
            lastRepComplete: false,
            isLR: true,
            isL: false,
            notes: ""
        }
    }
    render() {
        return (
            <div>
                <p> Equipment Selector </p>
                <p>Reps</p>
                <input id="reps" style={inputStyle} type="number" min="0" max="8" onChange={this.handleChange} value={this.state.reps} />
                <br/>
                <input id="weight" style={inputStyle} type="number" min="0" max="5000" onChange={this.handleChange} value={this.state.weight} />
                <select id="unit" style={dropDownStyle} onChange={this.handleChange} value={this.state.unit}>
                    <option value="pounds">Pounds</option>
                    <option value="kilograms">Kilograms</option>
                </select>
                <p>Was the last rep complete?</p>
                <input id="lastRepComplete" type="checkbox" onChange={this.handleChange} checked={this.state.lastRepComplete} />
                <p>Did you lift both sides of your body simultaneously?</p>
                <input id="isLR" type="checkbox" onChange={this.handleChange} checked={this.state.isLR} />
                <input id="isL" type="checkbox" onChange={this.handleChange} checked={this.state.isL} />
                <p>Notes</p>
                <input id="notes" type="text" onChange={this.handleChange} value={this.state.notes} />
                <button onClick={this.post} style={buttonStyle}>Add</button>
            </div>
        );
    }
    handleChange(e) {
        var id = e.target.id;
        var input = e.target.value;

        this.setState( (state, props) => {
            return {
                movement: (id === "movement") ? input : state.movement,
                reps: (id === "reps") ? input : state.reps,
                weight: (id === "weight") ? input : state.weight,
                unit: (id === "unit") ? input : state.unit,
                lastRepComplete: (id === "lastRepComplete") ? !state.lastRepComplete : state.lastRepComplete, 
                isLR: (id === "isLR") ? !state.isLR : state.isLR,
                isL: (id === "isL") ? !state.isL : state.isL,
                notes: (id === "notes") ? input : state.notes
            }
        });
    }
    post() {
        fetch('/sets', {
            method: 'post',
            body: JSON.stringify({
                movement: this.state.movement, 
                reps: this.state.reps, 
                weight: this.state.weight, 
                lastRepComplete: this.state.lastRepComplete, 
                isLR: this.state.isLR, 
                isL: this.state.isL, 
                notes: this.state.notes
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        this.viewWorkoutAdderEvent();
    }

}

class App extends Component {
    render() {
        return <Provider store={store}> <WorkoutDBConnected /> </Provider>;
    }
}

export default App;
