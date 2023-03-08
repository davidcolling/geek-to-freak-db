import React, { Component } from 'react';
import {createStore, combineReducers} from 'redux';
import {Provider, connect, useDispatch} from 'react-redux';

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

// actions
const SET_VIEW = "SET_VIEW";

const setView = view => {
    debug.post(view)
    return {type:SET_VIEW, view}
};

// views
const HOME_VIEW = "HOME";
const WORKOUT_ADDER_VIEW = "WORKOUT_ADDER";
const EQUIPMENT_VIEW = "EQUIPMENT_VIEW";

//reducers

const initialState = {
    view: HOME_VIEW
}

const viewReducer = function (state, action) {
    debug.post(JSON.stringify(action))
    if (action.type === SET_VIEW) {
        if (action.view === HOME_VIEW) {
            return HOME_VIEW;
        }
        if (action.view === WORKOUT_ADDER_VIEW) {
            return WORKOUT_ADDER_VIEW;
        }
        if (action.view === EQUIPMENT_VIEW) {
            return EQUIPMENT_VIEW;
        }
    }
    return HOME_VIEW;
}

const rootReducer = combineReducers({
    view: viewReducer
});

// selectors
const getView = state => state.view;

//store
const store = createStore(rootReducer, initialState);

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
            {view === EQUIPMENT_VIEW && <EquipmentView />}
        </div>
    )
}

const WorkoutDBConnected = connect(
    state => ({
        view: getView(state)
    }),
    null
)(WorkoutDB);

function HomeView({viewWorkoutAdder, viewEquipmentView}) {
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

class EquipmentView extends React.Component {
    render() {
        return (
            <div>
                <button onClick={this.viewEquipmentAdderEvent}>Add</button>
            </div>
        )
    }

}

class EquipmentAdder extends React.Component {
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
