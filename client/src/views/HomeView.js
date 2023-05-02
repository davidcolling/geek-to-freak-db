import React from 'react';
import {WideButton, Centered} from '../elements/elements.js';

export function HomeView({viewWorkoutAdder, viewEquipmentView}) {
    return (
        <div>
            <Centered height={"600px"} >
                <WideButton onClick={viewWorkoutAdder} >Add Workout</WideButton>
                <br />
                <WideButton onClick={viewEquipmentView} >Equipment</WideButton>
            </Centered>
        </div>
    );
}

export default HomeView;

