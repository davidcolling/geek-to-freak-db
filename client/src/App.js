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

class GeekToFreakDB extends React.Component {
	constructor(props) {
		super(props);
		var homeView = <HomeView viewAdderEvent={this.viewAdder}/>;
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

	viewAdder = () => {
		this.setState( (state, props) => {
			return {currentView: <GeekToFreakWorkoutAdder />, homeView: <HomeView />}
		});
	}

	testApi() {
		fetch('/api', {
			method: 'post',
			body: JSON.stringify({message: "test"}),
    			headers: {
				"Content-Type": "application/json"
			}
		});
	}
}

class HomeView extends React.Component {
	viewAdderEvent: React.PropTypes.func;

	constructor(props) {
		super(props);
		this.viewAdderEvent = this.props.viewAdderEvent;
	}

	render() {
		return (
			<div>
				<button onClick={this.viewAdderEvent} style={buttonStyle}>Add</button>
			</div>
		)
	}

}

class GeekToFreakWorkoutAdder extends React.Component {
	constructor(props) {
		super(props);
		this.handleMovementChange = this.handleMovementChange.bind(this)
		this.post = this.post.bind(this)
		this.state = {
			movement: "incline_press",
			reps: 6,
			weight: 160
		}
	}
	render() {
		return (
			<div>
				<select style={dropDownStyle} value={this.state.movement} onChange={this.handleMovementChange}>
					<option value="incline_press">Incline Press</option>
					<option value="decline_press">Decline Press</option>
					<option value="pec_fly">Pec Fly</option>
					<option value="rear_deltoid">Rear Deltoid</option>
						<option value="hip_abduction">Hip Abduction</option>
					<option value="hip_adduction">Hip Adduction</option>
					<option value="squat">Squat</option>
				</select>
				<button onClick={this.post} style={buttonStyle}>Add</button>
			</div>
		);
	}
	handleMovementChange(e) {
		this.setState({
			movement: e.target.value,
			reps: 6,
			weight: 160
		});
	}
	post() {
		fetch('/api', {
			method: 'post',
			body: JSON.stringify({movement: this.state.movement, reps: this.state.reps, weight: this.state.weight}),
    			headers: {
				"Content-Type": "application/json"
			}
		});
	}
}

class MovementSelect extends React.Component {
	render() {
		return (
			<select style={dropDownStyle} id={this.props.id}>
				<option value="incline_press">Incline Press</option>
				<option value="decline_press">Decline Press</option>
				<option value="pec_fly">Pec Fly</option>
				<option value="rear_deltoid">Rear Deltoid</option>
				<option value="hip_abduction">Hip Abduction</option>
				<option value="hip_adduction">Hip Adduction</option>
				<option value="squat">Squat</option>
			</select>
		);
	}
}

class RepsCountEntry extends React.Component {
	render() {
		return (
			<input style={inputStyle} type="number" min="0" max="8"/>
		);
	}
}

class WeightEntry extends React.Component {
	render() {
		return (
			<div>
				<input style={inputStyle} type="number" min="0" max="5000" />
				<select style={dropDownStyle}>
					<option value="pounds">Pounds</option>
					<option value="kilograms">Kilograms</option>
				</select>
			</div>
		);
	}
}

class App extends Component {
	render() {
		return <GeekToFreakDB />;
  	}
}

export default App;

