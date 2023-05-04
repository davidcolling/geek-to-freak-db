import {useDispatch} from 'react-redux';
import SettingsView from '../../views/SettingsView.js';
import {setLight} from '../actions.js';
import React from 'react';

export const HomeViewConnected = () => {
    const dispatch = useDispatch();
    const setLightConnected = () => dispatch(setLight());
    
    return(
        <SettingsView toggleLight={setLightConnected} />
    );
}

export default HomeViewConnected;

