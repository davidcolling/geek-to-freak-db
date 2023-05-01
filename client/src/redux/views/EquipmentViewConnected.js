import {useSelector, useDispatch} from 'react-redux';
import EquipmentView from '../../views/EquipmentView.js';
import {EQUIPMENT_ADDER_VIEW} from '../views.js';
import React from 'react';
import {setSelectedEquipment, showPopup, hidePopup, setView} from '../actions.js';
import {getEquipment} from '../selectors.js';
import {fetchEquipment, removeEquipment} from '../thunk.js';

export const EquipmentViewConnected = () => {
    const dispatch = useDispatch();
    const viewEquipmentAdder = () => dispatch(setView(EQUIPMENT_ADDER_VIEW));
    const fetchEquipmentConnected = () => dispatch(fetchEquipment());
    const removeEquipmentConnected = () => dispatch(removeEquipment());
    const getEquipmentConnected = () => useSelector(getEquipment);
    const showPopupConnected = payload => dispatch(showPopup(payload));
    const hidePopupConnected = () => dispatch(hidePopup());
    const setSelectedEquipmentConnected  = id => dispatch(setSelectedEquipment(id));
    const removeItem = (message, id) => {
        showPopupConnected({
            message: message,
            cb: (response) => {
                if (response) {
                    setSelectedEquipmentConnected(id);
                    removeEquipmentConnected(id);
                }
                hidePopupConnected();
                fetchEquipmentConnected()
            }
        })
    }
    fetchEquipmentConnected()

    return (
        <EquipmentView viewEquipmentAdder={viewEquipmentAdder} list={getEquipmentConnected()} removeItem={removeItem} />
    );
}

export default EquipmentViewConnected;

