import {useDispatch} from 'react-redux';
import EquipmentAdderView from '../../views/EquipmentAdderView';
import React from 'react';
import {postEquipment} from '../thunk.js';
import {setCurrentEquipment} from '../actions.js';

export const EquipmentAdderViewConnected = () => {
    const dispatch = useDispatch();
    const post = () => dispatch(postEquipment());
    const handleChange = e => dispatch(setCurrentEquipment(e));
    const handleFreeWeight = e => dispatch(setCurrentEquipment(e));

    return (
        <EquipmentAdderView post={post} handleChange={handleChange} isFreeWeight={false} isFreeWeightClick={handleFreeWeight} />
    )
}

export default EquipmentAdderViewConnected;

