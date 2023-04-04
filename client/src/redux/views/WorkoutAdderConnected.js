import {useDispatch, useSelector} from 'react-redux';
import WorkoutAdder from '../../views/WorkoutAdder.js';
import React from 'react';
import {SET_ADDER_VIEW} from '../views.js';
import {getCurrentWorkout} from '../selectors.js';
import {setView} from '../actions.js';

export const WorkoutAdderConnected = () => {
    const dispatch = useDispatch();
    const addSet = () => dispatch(setView(SET_ADDER_VIEW));
    const getCurrentWorkoutConnected = useSelector(getCurrentWorkout);

    return (
        <WorkoutAdder getCurrentWorkoutConnected={getCurrentWorkoutConnected} addSet={addSet} />
    );
}

export default WorkoutAdderConnected;

