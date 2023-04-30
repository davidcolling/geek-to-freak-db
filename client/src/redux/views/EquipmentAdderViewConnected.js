import {useSelector, useDispatch} from 'react-redux';
import EquipmentAdderView from '../../views/EquipmentAdderView';
import React from 'react';
import {postEquipment} from '../thunk.js';
import {setCurrentEquipment} from '../actions.js';
import {getCurrentEquipment} from '../selectors.js';

export const EquipmentAdderViewConnected = () => {
    const dispatch = useDispatch();
    const post = () => dispatch(postEquipment());
    const handleChange = e => dispatch(setCurrentEquipment(e));
    const handleFreeWeight = e => dispatch(setCurrentEquipment(e));
    const getCurrentEquipmentConnected = () => useSelector(getCurrentEquipment);

    return (
        <EquipmentAdderView post={post} handleChange={handleChange} currentEquipment={getCurrentEquipmentConnected()} isFreeWeightClick={handleFreeWeight} />
    )
}

export default EquipmentAdderViewConnected;

