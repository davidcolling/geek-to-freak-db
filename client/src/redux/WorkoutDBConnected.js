import {useDispatch, useSelector} from 'react-redux';
import WorkoutDB from '../WorkoutDB.js';
import React from 'react';
import {getView} from './selectors.js';
import {setView} from './actions.js';
import {HOME_VIEW} from './views.js';

export const WorkoutDBConnected = () => {
    const dispatch = useDispatch();
    const getViewConnected = useSelector(getView);
    const home = () => dispatch(setView(HOME_VIEW));
    
    return (
        <WorkoutDB view={getViewConnected} home={home} />
    );
}

export default WorkoutDBConnected;
