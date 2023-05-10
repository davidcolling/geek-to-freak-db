import {useSelector, useDispatch} from 'react-redux';
import WorkoutsView from '../../views/WorkoutsView.js';
import React from 'react';
import {getWorkouts} from '../selectors.js';
import {fetchWorkouts} from '../thunk.js';

export const WorkoutsViewConnected = () => {
    const dispatch = useDispatch();
    const fetchWorkoutsConnected = () => dispatch(fetchWorkouts());
    const getWorkoutsConnected = useSelector(getWorkouts);

    fetchWorkoutsConnected();

    return (
        <WorkoutsView list={getWorkoutsConnected} />
    );
}

export default WorkoutsViewConnected;

