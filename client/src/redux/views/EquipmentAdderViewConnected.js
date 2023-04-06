import {useSelector, useDispatch} from 'react-redux';
import EquipmentAdderView from '../../views/EquipmentAdderView';
import React from 'react';
import {postEquipment} from '../thunk.js';
import {setCurrentEquipment} from '../actions.js';
import {getCurrentEquipmentIsFreeWeight} from '../selectors.js';

export const EquipmentAdderViewConnected = () => {
    const dispatch = useDispatch();
    const post = () => dispatch(postEquipment());
    const handleChange = e => dispatch(setCurrentEquipment(e));
    const handleFreeWeight = e => dispatch(setCurrentEquipment(e));
    const getIsFreeWeight = () => useSelector(getCurrentEquipmentIsFreeWeight);

    return (
        <EquipmentAdderView post={post} handleChange={handleChange} isFreeWeight={getIsFreeWeight()} isFreeWeightClick={handleFreeWeight} />
    )
}

export default EquipmentAdderViewConnected;

