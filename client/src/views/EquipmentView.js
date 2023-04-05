import React from 'react';
import {WideButton} from '../Elements.js';

export const EquipmentView = ({viewEquipmentAdder, getEquipment, list}) => {
    return (
        <div>
            <WideButton onClick={getEquipment}>Get Equipment</WideButton>
            <br />
            <p>{list.map( (item) => (<p>{item.name}</p>))}</p>
            <br />
            <WideButton onClick={viewEquipmentAdder}>Add</WideButton>
        </div>
    )
}

export default EquipmentView;

