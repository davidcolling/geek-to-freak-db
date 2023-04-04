import {Provider, useSelector, useDispatch} from 'react-redux';
import HomeView from '../../views/HomeView.js';
import {WORKOUT_ADDER_VIEW, EQUIPMENT_VIEW} from '../views.js';
import {setView} from '../actions.js';
import React from 'react';

export const HomeViewConnected = () => {
    const dispatch = useDispatch();
    const viewWorkoutAdder = () => dispatch(setView(WORKOUT_ADDER_VIEW));
    const viewEquipmentView = () => dispatch(setView(EQUIPMENT_VIEW));
    return(
        <HomeView viewWorkoutAdder={viewWorkoutAdder} viewEquipmentView={viewEquipmentView} />
    );
}

export default HomeViewConnected;

