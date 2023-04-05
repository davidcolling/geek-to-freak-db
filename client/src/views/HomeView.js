import React from 'react';
import {WideButton} from '../Elements.js';

export function HomeView({viewWorkoutAdder, viewEquipmentView, testAPI, list}) {
    return (
        <div>
            <WideButton onClick={viewWorkoutAdder} >Add Workout</WideButton>
            <br />
            <WideButton onClick={viewEquipmentView} >Manage Equipment</WideButton>
        </div>
    );
}

export default HomeView;

