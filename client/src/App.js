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
        this.equipment = new Array();
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
var fetcher = new WorkoutAPIFetcher();

class WorkoutDB extends React.Component {
	constructor(props) {
		super(props);
		var homeView = <HomeView viewWorkoutAdderEvent={this.viewWorkoutAdder} viewEquipmentViewEvent={this.viewEquipment}/>;
		this.state = {
			homeView: homeView,
			currentView: homeView
		}
	}
	
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
				{this.state.currentView}
			</div>
		)
	}

	viewWorkoutAdder = () => {
		this.setState( (state, props) => {
			return {currentView: <WorkoutAdder viewSetAdderEvent={this.viewSetAdder} />, homeView: <HomeView />}
		});
	}

	viewSetAdder = () => {
		this.setState( (state, props) => {
			return {currentView: <SetAdder />, homeView: <HomeView />}
		});
	}

	viewEquipment = () => {
		this.setState( (state, props) => {
			return {currentView: <EquipmentView viewEquipmentAdderEvent={this.viewEquipmentAdder} />, homeView: <HomeView />}
		});
	}
	viewEquipmentAdder = () => {
		this.setState( (state, props) => {
			return {currentView: <EquipmentAdder />, homeView: <HomeView />}
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
		)
	}

}

class EquipmentView extends React.Component {
	viewEquipmentAdderEvent: React.PropTypes.func;

	constructor(props) {
		super(props);
		this.setEquipment = this.setEquipment.bind(this);
        this.viewEquipmentAdderEvent = this.props.viewEquipmentAdderEvent;
		this.state = {
			names: new Array(), 
            equipment: new Array()
		}
        this.setEquipment();
	}

	render() {
		return (
			<div>
				{this.state.names.map( (item) => (<p>{item}</p>))}
                <button onClick={this.viewEquipmentAdderEvent}>Add</button>
			</div>
		)
	}

	async setEquipment() {
        await fetcher.retreiveEquipment();
		await this.setState( (state, props) => {
			return {names: fetcher.equipment.map( (item) => (item.name) ), equipment: fetcher.equipment}
		});
	}
}

class EquipmentAdder extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            name: "",
            isFreeWeight: false,
            notes: ""
        }
    }
	render() {
		return (
			<div>
				<input id="name" type="text" onChange={this.handleChange} value={this.state.name} />
				<input id="isFreeWeight" type="checkbox" onChange={this.handleChange} checked={this.state.isFreeWeight} />
				<input id="notes" type="text" onChange={this.handleChange} value={this.state.notes} />
			</div>
		)
	}

	handleChange(e) {
		var id = e.target.id;
		var input = e.target.value;

		this.setState( (state, props) => {
			return {
				name: (id == "name") ? input : state.name,
				isFreeWeight: (id == "isFreeWeight") ? !state.isFreeWeight : state.isFreeWeight,
				notes : (id == "notes") ? input : state.notes
			}
		});
	}
}

class WorkoutAdder extends React.Component {
	viewSetAdderEvent: React.PropTypes.func;

	constructor(props) {
		super(props);
		this.viewSetAdderEvent = this.props.viewSetAdderEvent;
	}

	render() {
		return (
			<div>
				<button onClick={this.viewSetAdderEvent} style={buttonStyle}>Add Set</button>
			</div>
		)
	}

}


class SetAdder extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this)
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
                <EquipmentSelector />
				<input id="reps" style={inputStyle} type="number" min="0" max="8" onChange={this.handleChange} value={this.state.reps} />
				<input id="weight" style={inputStyle} type="number" min="0" max="5000" onChange={this.handleChange} value={this.state.weight} />
				<select id="unit" style={dropDownStyle} onChange={this.handleChange} value={this.state.unit}>
					<option value="pounds">Pounds</option>
					<option value="kilograms">Kilograms</option>
				</select>
				<input id="lastRepComplete" type="checkbox" onChange={this.handleChange} checked={this.state.lastRepComplete} />
				<input id="isLR" type="checkbox" onChange={this.handleChange} checked={this.state.isLR} />
				<input id="isL" type="checkbox" onChange={this.handleChange} checked={this.state.isL} />
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
				movement: (id == "movement") ? input : state.movement,
				reps: (id == "reps") ? input : state.reps,
				weight: (id == "weight") ? input : state.weight,
				unit: (id == "unit") ? input : state.unit,
				lastRepComplete: (id == "lastRepComplete") ? !state.lastRepComplete : state.lastRepComplete, 
				isLR: (id == "isLR") ? !state.isLR : state.isLR,
				isL: (id == "isL") ? !state.isL : state.isL,
				notes: (id == "notes") ? input : state.notes
			}
		});
	}
	post() {
		fetch('/api', {
			method: 'post',
			body: JSON.stringify({movement: this.state.movement, reps: this.state.reps, weight: this.state.weight, lastRepComplete: this.state.lastRepComplete, isLR: this.state.isLR, isL: this.state.isL, notes: this.state.notes}),
    			headers: {
				"Content-Type": "application/json"
			}
		});
	}
}

class EquipmentSelector extends React.Component {
    constructor() {
        super();
        this.setList = this.setList.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            list: new Array(),
            selected: ""
        }
        this.setList();
    }
    render() {
        return (
            <div>
				<select id="movement" style={dropDownStyle} value={this.state.selected} onChange={this.handleChange}>
                    {this.state.list.map( (item) => (<option value={item.name}>{item.name}</option>) )}
				</select>
            </div>
        )
    }
    handleChange(e) {
        var input = e.target.value;
        this.setState( (state, props) => {
            return {
                list: state.list, 
                selected: input
            }
        });
    }
    async setList() {
        await fetcher.retreiveEquipment();
        await this.setState( (state, props) => {
            return {
                list: fetcher.equipment,
                selected: state.equipment
            }
        });
    }
}

class App extends Component {
	render() {
		return <WorkoutDB />;
  	}
}

export default App;

