import {useDispatch} from 'react-redux';
import HomeView from '../../views/HomeView.js';
import {WORKOUT_ADDER_VIEW, EQUIPMENT_VIEW} from '../views.js';
import {setView, showPopup, hidePopup} from '../actions.js';
import React from 'react';

export const HomeViewConnected = () => {
    const dispatch = useDispatch();
    const viewWorkoutAdder = () => dispatch(setView(WORKOUT_ADDER_VIEW));
    const viewEquipmentView = () => dispatch(setView(EQUIPMENT_VIEW));
    const hidePopupConnected = () => dispatch(hidePopup());
    const launchPopup = () => dispatch(showPopup({
        message: "test",
        cb: hidePopupConnected
    }));
    
    return(
        <HomeView viewWorkoutAdder={viewWorkoutAdder} viewEquipmentView={viewEquipmentView} launchPopup={launchPopup} />
    );
}

export default HomeViewConnected;

