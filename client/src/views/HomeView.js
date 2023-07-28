import React from 'react';
import {WideButton, Centered} from '../elements/elements.js';

export function HomeView({viewWorkoutAdder, viewEquipmentView, viewWorkoutsView}) {
    return (
        <div>
            <Centered height={"600px"} >
                <WideButton onClick={viewWorkoutAdder} >Add Workout</WideButton>
                <WideButton onClick={viewWorkoutsView} >Workouts</WideButton>
                <WideButton onClick={viewEquipmentView} >Equipment</WideButton>
            </Centered>
        </div>
    );
}

export default HomeView;

