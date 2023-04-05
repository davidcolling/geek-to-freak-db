import React from 'react';
import {WideButton, Centered} from '../Elements.js';

export function HomeView({viewWorkoutAdder, viewEquipmentView, testAPI, list}) {
    return (
        <div>
            <Centered height={"600px"} >
                <WideButton onClick={viewWorkoutAdder} >Add Workout</WideButton>
                <br />
                <WideButton onClick={viewEquipmentView} >Manage Equipment</WideButton>
            </Centered>
        </div>
    );
}

export default HomeView;

