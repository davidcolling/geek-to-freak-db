import {useSelector, useDispatch} from 'react-redux';
import WorkoutsView from '../../views/WorkoutsView.js';
import React from 'react';
import {getWorkouts} from '../selectors.js';
import {fetchWorkouts, fetchSetsForWorkout} from '../thunk.js';

export const WorkoutsViewConnected = () => {
    const dispatch = useDispatch();
    const fetchSetsForWorkoutConnected = id => dispatch(fetchSetsForWorkout(id));
    const fetchWorkoutsConnected = () => dispatch(fetchWorkouts());
    const getWorkoutsConnected = useSelector(getWorkouts);

    return (
        <WorkoutsView list={getWorkoutsConnected} fetchSetsForWorkoutConnected={fetchSetsForWorkoutConnected} fetchWorkoutsConnected={fetchWorkoutsConnected} />
    );
}

export default WorkoutsViewConnected;

