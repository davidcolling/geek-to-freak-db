import React from 'react';
import {Button} from '../Elements.js';

export function HomeView({viewWorkoutAdder, viewEquipmentView, testAPI, list}) {
    return (
        <div>
            <Button onClick={viewWorkoutAdder} >Add Workout</Button>
            <br />
            <Button onClick={viewEquipmentView} >Manage Equipment</Button>
        </div>
    );
}

export default HomeView;

