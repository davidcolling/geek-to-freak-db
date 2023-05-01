import {useSelector, useDispatch} from 'react-redux';
import EquipmentView from '../../views/EquipmentView.js';
import {EQUIPMENT_ADDER_VIEW} from '../views.js';
import React from 'react';
import {showPopup, hidePopup, setView} from '../actions.js';
import {getEquipment} from '../selectors.js';
import {fetchEquipment} from '../thunk.js';

export const EquipmentViewConnected = () => {
    const dispatch = useDispatch();
    const viewEquipmentAdder = () => dispatch(setView(EQUIPMENT_ADDER_VIEW));
    const fetchEquipmentConnected = () => dispatch(fetchEquipment());
    const getEquipmentConnected = () => useSelector(getEquipment);
    const showPopupConnected = payload => dispatch(showPopup(payload));
    const hidePopupConnected = () => dispatch(hidePopup());
    const removeItem = (message) => {
        showPopupConnected({
            message: message,
            cb: () => {
                hidePopupConnected();
            }
        })
    }
    fetchEquipmentConnected()

    return (
        <EquipmentView viewEquipmentAdder={viewEquipmentAdder} list={getEquipmentConnected()} removeItem={removeItem} />
    );
}

export default EquipmentViewConnected;

