import React, { Component } from 'react';

var dropDownStyle = {
	border: "none",
	borderRadius: "0px",
	color: "#000000",
	fontFamily: "Courier"
}

class GeekToFreakDB extends React.Component {
	render() {
  		return <GeekToFreakWorkoutAdder />
	}
}

class GeekToFreakWorkoutAdder extends React.Component {
	render() {
		return (
			<div>
				<MovementSelect id="movementSelector" />
				<RepsCountEntry />
				<WeightEntry />
			</div>
		);
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
			<input type="number" min="0" max="8"/>
		);
	}
}

class WeightEntry extends React.Component {
	render() {
		return (
			<div>
				<input type="number" min="0" max="5000" />
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
    return (
	    <GeekToFreakDB />
    );
  }
}

export default App;

