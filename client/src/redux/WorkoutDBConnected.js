import {useDispatch, useSelector} from 'react-redux';
import WorkoutDB from '../WorkoutDB.js';
import React from 'react';
import {getView, getPopup} from './selectors.js';
import {setView} from './actions.js';
import {HOME_VIEW} from './views.js';

export const WorkoutDBConnected = () => {
    const dispatch = useDispatch();
    const getViewConnected = useSelector(getView);
    const getPopupConnected = useSelector(getPopup);
    const home = () => dispatch(setView(HOME_VIEW));
    return (
        <WorkoutDB view={getViewConnected} home={home} popup={getPopupConnected} />
    );
}

export default WorkoutDBConnected;

