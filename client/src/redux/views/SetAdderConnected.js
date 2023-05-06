import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setCurrentSet} from '../actions.js';
import SetAdder from '../../views/SetAdder.js';
import {getCurrentSet, getEquipment} from '../selectors.js';
import { fetchEquipment, postCurrentSet } from '../thunk.js';

export const SetAdderConnected = () => {
    const dispatch = useDispatch();
    const handleChange = e => dispatch(setCurrentSet(e));
    const post = () => dispatch(postCurrentSet());
    const getCurrentSetConnected = () => useSelector(getCurrentSet);
    const getEquipmentConnected = () => useSelector(getEquipment);
    const handleLastRepComplete = e => dispatch(setCurrentSet(e));
    const fetchEquipmentConnected = () => dispatch(fetchEquipment());
    fetchEquipmentConnected();

    return (
        <SetAdder 
            equipment={getEquipmentConnected()} 
            currentSet={getCurrentSetConnected()} 
            handleChange={handleChange} 
            post={post} 
            handleLastRepComplete={handleLastRepComplete} 
        />
    );
}

export default SetAdderConnected;

