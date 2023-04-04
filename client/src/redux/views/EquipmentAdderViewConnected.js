import {useSelector, useDispatch} from 'react-redux';
import EquipmentAdderView from '../../views/EquipmentAdderView';
import React from 'react';
import {Button} from '../../Elements.js';
import {postEquipment} from '../thunk.js';
import {getCurrentEquipment} from '../selectors.js';
import {setCurrentEquipment} from '../actions.js';

export const EquipmentAdderViewConnected = () => {
    const dispatch = useDispatch();
    const getCurrentEquipmentConnected = useSelector(getCurrentEquipment);
    const post = () => dispatch(postEquipment());
    const handleChange = e => dispatch(setCurrentEquipment(e));

    return (
        <EquipmentAdderView post={post} handleChange={handleChange}/>
    )
}

export default EquipmentAdderViewConnected;

