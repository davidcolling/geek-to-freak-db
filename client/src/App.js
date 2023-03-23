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

const getInfo = () => {
    return async (dispatch, setState) => {
        const response = await fetch('/equipment');
        const data = await response.json();

        dispatch(storeInfoSuccess(data));
    }
}

// actions
const SET_VIEW = "SET_VIEW";
const STORE_INFO_SUCCESS = "STORE_INFO_SUCCESS";
const STORE_INFO_FAILURE = "STORE_INFO_FAILURE";

const setView = payload => ({type:SET_VIEW, payload});
const storeInfoSuccess = payload => ({type:STORE_INFO_SUCCESS, payload})
const storeInfoFailure = e => ({type:STORE_INFO_FAILURE, e})

// views
const HOME_VIEW = "HOME";
const WORKOUT_ADDER_VIEW = "WORKOUT_ADDER";
const EQUIPMENT_VIEW = "EQUIPMENT_VIEW";
const EQUIPMENT_ADDER_VIEW = "EQUIPMENT_ADDER_VIEW";

//reducers

const initialState = {
    view: HOME_VIEW,
    info: [{name: "hello"}]
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
    }
    return HOME_VIEW;
}

const infoReducer = function(state, action) {
    if (action.type === STORE_INFO_SUCCESS) {
        return action.payload;
    }
    if (action.type === STORE_INFO_FAILURE) {
        return "failed";
    }
    return "failed";
}

const rootReducer = combineReducers({
    view: viewReducer,
    info: infoReducer
});

// selectors
const getView = state => state.view;
const selectInfo = state => state.info;

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

class WorkoutAPIFetcher {
    constructor() {
        this.retreiveEquipment = this.retreiveEquipment.bind(this);
        this.setEquipment = this.setEquipment.bind(this);
        this.equipment = [];
    }
    async retreiveEquipment() {
        await fetch('/equipment').then(res => {
            if (res.status >= 200 && res.status < 300) {
                return res.json()
            } else {
                throw new Error()
            }
        }).then(
            data=>this.setEquipment(data)
        ).catch(
            err=>console.log('workout client: fetch failed')
        );
    }
    setEquipment(equipment) {
        this.equipment = equipment;
    }
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
            {view === EQUIPMENT_ADDER_VIEW && <EquipmentAdderView />}
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
            <br />
            <button onClick={testAPI} > Test API </button>
            <br />
            <p>{JSON.stringify(list)}</p>
        </div>
    );
}

const HomeViewConnected = () => {
    const dispatch = useDispatch();
    const viewWorkoutAdder = () => dispatch(setView(WORKOUT_ADDER_VIEW));
    const viewEquipmentView = () => dispatch(setView(EQUIPMENT_VIEW));
    const testAPI = () => dispatch(getInfo());
    const selectInfoConnected = () => useSelector(selectInfo);

    return(
        <HomeView viewWorkoutAdder={viewWorkoutAdder} viewEquipmentView={viewEquipmentView} testAPI={testAPI} list={selectInfoConnected()} />
    );
}

const EquipmentView = ({viewEquipmentAdder}) => {
    return (
        <div>
            <button onClick={viewEquipmentAdder}>Add</button>
        </div>
    )
}

const EquipmentViewConnected = () => {
    const dispatch = useDispatch();
    const viewEquipmentAdder = () => dispatch(setView(EQUIPMENT_ADDER_VIEW));

    return (
        <EquipmentView viewEquipmentAdder={viewEquipmentAdder} />
    );
}

class EquipmentAdderView extends React.Component {
    render() {
        return (
            <div>
                <p>Name</p>
                <input id="name" type="text" />
                <p>This is a free-weight.</p>
                <input id="isFreeWeight" type="checkbox" />
                <p>Notes</p>
                <input id="notes" type="text" />
                <button onClick={this.post}>Add</button>
            </div>
        )
    }

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
