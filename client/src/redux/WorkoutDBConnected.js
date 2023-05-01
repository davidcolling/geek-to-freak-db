import {useDispatch, useSelector} from 'react-redux';
import WorkoutDB from '../WorkoutDB.js';
import React from 'react';
import {getView, getPopup} from './selectors.js';
import {setView} from './actions.js';
import {SETTINGS_VIEW, HOME_VIEW} from './views.js';

export const WorkoutDBConnected = () => {
    const dispatch = useDispatch();
    const getViewConnected = useSelector(getView);
    const getPopupConnected = useSelector(getPopup);
    const home = () => dispatch(setView(HOME_VIEW));
    const settings = () => dispatch(setView(SETTINGS_VIEW));
    return (
        <WorkoutDB view={getViewConnected} home={home} settings={settings} popup={getPopupConnected} />
    );
}

export default WorkoutDBConnected;

