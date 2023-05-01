import React from 'react';
import {WideButton, Centered} from '../Elements.js';

export function HomeView({viewWorkoutAdder, viewEquipmentView, launchPopup}) {
    return (
        <div>
            <Centered height={"600px"} >
                <WideButton onClick={viewWorkoutAdder} >Add Workout</WideButton>
                <br />
                <WideButton onClick={viewEquipmentView} >Equipment</WideButton>
                <br />
                <WideButton onClick={launchPopup} >Test PopUp</WideButton>
            </Centered>
        </div>
    );
}

export default HomeView;

