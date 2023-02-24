import React, { Component } from 'react';

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
class WorkoutDB extends React.Component {
    render() {
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
                {this.props.view}
            </div>
        )
    }

}

class WorkoutDBContainer extends React.Component {
    constructor(props) {
        super(props);
        var homeView = <HomeViewContainer viewWorkoutAdderEvent={this.viewWorkoutAdder} viewEquipmentViewEvent={this.viewEquipment}/>;
        this.viewEquipment = this.viewEquipment.bind(this);
        this.viewSetAdder = this.viewSetAdder.bind(this);
        this.fetcher = new WorkoutAPIFetcher();
        this.state = {
            homeView: homeView,
            currentView: homeView,
            workoutAdder: <WorkoutAdderContainer viewSetAdderEvent={this.viewSetAdder} />
        }
    }
    
    render() {
        return (
            <WorkoutDB view={this.state.currentView} />
        )
    }

    viewWorkoutAdder = () => {
        this.setState( (state, props) => {
            return {
                currentView: state.workoutAdder, 
                homeView: <HomeViewContainer />, 
                workoutAdder: state.workoutAdder
            }
        });
    }

    viewSetAdder = async () => {
        await this.fetcher.retreiveEquipment();
        await this.setState( (state, props) => {
            return {
                currentView: <SetAdder 
                    viewPostedViewEvent={this.viewPostedView} 
                    viewWorkoutAdderEvent={this.viewWorkoutAdder} 
                    equipment={this.fetcher.equipment.map( (item) => { return item })} />, 
                homeView: <HomeViewContainer />, 
                workoutAdder: state.workoutAdder
            }
        });
    }

    viewEquipment = async () => {
        await this.fetcher.retreiveEquipment();
        await this.setState( (state, props) => {
            return {
                currentView: <EquipmentView 
                    viewEquipmentAdderEvent={this.viewEquipmentAdder} 
                    fetcher={this.fetcher} 
                    names={this.fetcher.equipment.map( (item) => (item.name) )}/>, 
                homeView: <HomeViewContainer />, 
                workoutAdder: state.workoutAdder
            }
        });
    }
    viewEquipmentAdder = () => {
        this.setState( (state, props) => {
            return {
                currentView: <EquipmentAdderContainer 
                    viewPostedViewEvent={this.viewPostedView} 
                    fetcher={this.fetcher}/>, 
                homeView: <HomeViewContainer />, 
                workoutAdder: state.workoutAdder
            }
        });
    }
    viewPostedView = () => {
        this.setState( (state, props) => {
            return {
                currentView: <PostedView />, 
                homeView: <HomeViewContainer />, 
                workoutAdder: state.workoutAdder
            }
        });
    }
}

class HomeView extends React.Component {
    viewWorkoutAdderEvent: React.PropTypes.func;
    viewEquipmentViewEvent: React.PropTypes.func;

    constructor(props) {
        super(props);
        this.viewWorkoutAdderEvent = this.props.viewWorkoutAdderEvent;
        this.viewEquipmentViewEvent = this.props.viewEquipmentViewEvent;
    }

    render() {
        return (
            <div>
                <button onClick={this.viewWorkoutAdderEvent} style={buttonStyle}>Add Workout</button>
                <br />
                <button onClick={this.viewEquipmentViewEvent} style={buttonStyle}>Manage Equipment</button>
            </div>
        );
    }
}

class HomeViewContainer extends React.Component {
    viewWorkoutAdderEvent: React.PropTypes.func;
    viewEquipmentViewEvent: React.PropTypes.func;

    constructor(props) {
        super(props);
        this.viewWorkoutAdderEvent = this.props.viewWorkoutAdderEvent;
        this.viewEquipmentViewEvent = this.props.viewEquipmentViewEvent;
    }

    render() {
        return (
            <div>
                <HomeView 
                    viewWorkoutAdderEvent={this.viewWorkoutAdderEvent}
                    viewEquipmentViewEvent={this.viewEquipmentViewEvent}
                />
            </div>
        )
    }

}

class PostedView extends React.Component {
    render() {
        return (
            <div>
                <p>The data was successfully posted.</p>
            </div>
        )
    }

}

class EquipmentView extends React.Component {
    viewEquipmentAdderEvent: React.PropTypes.func;

    constructor(props) {
        super(props);
        this.viewEquipmentAdderEvent = this.props.viewEquipmentAdderEvent;
    }

    render() {
        return (
            <div>
                {this.props.names.map( (item) => (<p>{item}</p>))}
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
                <input id="name" type="text" onChange={this.handleChange} value={this.props.name} />
                <p>This is a free-weight.</p>
                <input id="isFreeWeight" type="checkbox" onChange={this.handleChange} checked={this.props.isFreeWeight} />
                <p>Notes</p>
                <input id="notes" type="text" onChange={this.handleChange} value={this.props.notes} />
                <button onClick={this.post}>Add</button>
            </div>
        )
    }

}
class EquipmentAdderContainer extends React.Component {
    viewPostedViewEvent: React.PropTypes.func;

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.viewPostedViewEvent = this.props.viewPostedViewEvent;
        this.post = this.post.bind(this);
        this.state = {
            name: "",
            isFreeWeight: false,
            notes: ""
        }
    }
    render() {
        return (
            <div>
                <EquipmentAdder {...this.state} />
            </div>
        )
    }

    handleChange(e) {
        var id = e.target.id;
        var input = e.target.value;

        this.setState( (state, props) => {
            return {
                name: (id === "name") ? input : state.name,
                isFreeWeight: (id === "isFreeWeight") ? !state.isFreeWeight : state.isFreeWeight,
                notes : (id === "notes") ? input : state.notes
            }
        });
    }
    post() {
        fetch('/equipment', {
            method: 'post',
            body: JSON.stringify({name: this.state.name, isFreeWeight: this.state.isFreeWeight}),
                headers: {
                "Content-Type": "application/json"
            }
        });
        this.viewPostedViewEvent();
    }
}

class WorkoutAdder extends React.Component {
    render() {
        return (
            <div>
                {this.props.list.map( (item) => {return item;} )}
            </div>
        )
    }

}
class WorkoutAdderContainer extends React.Component {
    viewSetAdderEvent: React.PropTypes.func;

    constructor(props) {
        super(props);
        this.viewSetAdderEvent = this.props.viewSetAdderEvent;
        this.state = {
            list: [ <button onClick={this.viewSetAdderEvent} style={buttonStyle}>Add Set</button> ]
        }
    }

    render() {
        return (
            <WorkoutAdder {...this.state} />
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
                <EquipmentSelectorContainer list={this.props.equipment} />
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

class EquipmentSelector extends React.Component {
    render() {
        return (
            <div>
                <select id="movement" style={dropDownStyle} value={this.props.selected} onChange={this.props.onChange} >
                    {this.props.list.map( (item) => (<option value={item.name}>{item.name}</option>) )}
                </select>
            </div>
        )
    }
}
class EquipmentSelectorContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            selected: ""
        }
    }
    render() {
        return (
            <EquipmentSelector {...this.state} {...this.props}  onChange={this.handleChange} />
        )
    }
    handleChange(e) {
        this.setState( (state, props) => {
            return {
                selected: e.value 
            }
        });
    }
}

class App extends Component {
    render() {
        return <WorkoutDBContainer />;
    }
}

export default App;

