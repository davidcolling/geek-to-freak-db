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

class WorkoutDB extends React.Component {
	constructor(props) {
		super(props);
		var homeView = <HomeView viewWorkoutAdderEvent={this.viewWorkoutAdder}/>;
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

}

class HomeView extends React.Component {
	viewWorkoutAdderEvent: React.PropTypes.func;

	constructor(props) {
		super(props);
		this.viewWorkoutAdderEvent = this.props.viewWorkoutAdderEvent;
	}

	render() {
		return (
			<div>
				<button onClick={this.viewWorkoutAdderEvent} style={buttonStyle}>Add</button>
			</div>
		)
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
				<select id="movement" style={dropDownStyle} value={this.state.movement} onChange={this.handleChange}>
					<option value="incline_press">Incline Press</option>
					<option value="decline_press">Decline Press</option>
					<option value="pec_fly">Pec Fly</option>
					<option value="rear_deltoid">Rear Deltoid</option>
						<option value="hip_abduction">Hip Abduction</option>
					<option value="hip_adduction">Hip Adduction</option>
					<option value="squat">Squat</option>
				</select>
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
		var input = e.target.value;
		switch(e.target.id) {
			case "movement":
				this.setState( (state, props) => {
					return {
						movement: input,
						reps: state.reps,
						weight: state.weight,
						unit: state.unit,
						lastRepComplete: state.lastRepComplete, 
						isLR: state.isLR,
						isL: state.isL,
						notes: state.notes
					}
				});
				break;
			case "reps":
				this.setState( (state, props) => {
					return {
						movement: state.movement,
						reps: input,
						weight: state.weight,
						unit: state.unit,
						lastRepComplete: state.lastRepComplete, 
						isLR: state.isLR,
						isL: state.isL,
						notes: state.notes
					}
				});
				break;
			case "weight":
				this.setState( (state, props) => {
					return {
						movement: state.movement,
						reps: state.reps,
						weight: input,
						unit: state.unit,
						lastRepComplete: state.lastRepComplete, 
						isLR: state.isLR,
						isL: state.isL,
						notes: state.notes
					}
				});
				break;
			case "unit":
				this.setState( (state, props) => {
					return {
						movement: state.movement,
						reps: state.reps,
						weight: state.weight,
						unit: input,
						lastRepComplete: state.lastRepComplete, 
						isLR: state.isLR,
						isL: state.isL,
						notes: state.notes
					}
				});
				break;
			case "lastRepComplete":
				this.setState( (state, props) => {
					return {
						movement: state.movement,
						reps: state.reps, 
						weight: state.weight, 
						unit: state.unit, 
						lastRepComplete: !state.lastRepComplete, 
						isLR: state.isLR,
						isL: state.isL,
						notes: state.notes
					}
				});
				break;
			case "isLR":
				this.setState( (state, props) => {
					return {
						movement: state.movement,
						reps: state.reps, 
						weight: state.weight, 
						unit: state.unit, 
						lastRepComplete: state.lastRepComplete,
						isLR: !state.isLR,
						isL: state.isL,
						notes: state.notes
					}
				});
				break;
			case "isL":
				this.setState( (state, props) => {
					return {
						movement: state.movement,
						reps: state.reps, 
						weight: state.weight, 
						unit: state.unit, 
						lastRepComplete: state.lastRepComplete,
						isLR: state.isLR,
						isL: !state.isL,
						notes: state.notes
					}
				});
				break;
			case "notes":
				this.setState( (state, props) => {
					return {
						movement: state.movement,
						reps: state.reps, 
						weight: state.weight, 
						unit: state.unit, 
						lastRepComplete: state.lastRepComplete,
						isLR: state.isLR,
						isL: state.isL,
						notes: input
					}
				});
				break;
		}
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

class App extends Component {
	render() {
		return <WorkoutDB />;
  	}
}

export default App;

