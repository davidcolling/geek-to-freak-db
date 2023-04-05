import React from 'react';
import {WideButton} from '../Elements.js';

export const EquipmentView = ({viewEquipmentAdder, list}) => {
    return (
        <div>
            <p>{list.map( (item) => (<p>{item.name}</p>))}</p>
            <br />
            <WideButton onClick={viewEquipmentAdder}>Add</WideButton>
        </div>
    )
}

export default EquipmentView;

