import {useSelector, useDispatch} from 'react-redux';
import EquipmentView from '../../views/EquipmentView.js';
import {EQUIPMENT_ADDER_VIEW} from '../views.js';
import React from 'react';
import {setView} from '../actions.js';
import {getEquipment} from '../selectors.js';
import {fetchEquipment} from '../thunk.js';

export const EquipmentViewConnected = () => {
    const dispatch = useDispatch();
    const viewEquipmentAdder = () => dispatch(setView(EQUIPMENT_ADDER_VIEW));
    const fetchEquipmentConnected = () => dispatch(fetchEquipment());
    const getEquipmentConnected = () => useSelector(getEquipment);


    return (
        <EquipmentView viewEquipmentAdder={viewEquipmentAdder} getEquipment={fetchEquipmentConnected} list={getEquipmentConnected()} />
    );
}

export default EquipmentViewConnected;

