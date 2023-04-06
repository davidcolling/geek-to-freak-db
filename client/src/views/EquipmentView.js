import React from 'react';
import {P, WideButton} from '../Elements.js';

export const EquipmentView = ({viewEquipmentAdder, list}) => {
    return (
        <div>
            <P>{list.map( (item) => (<P>{item.name}</P>))}</P>
            <br />
            <WideButton onClick={viewEquipmentAdder}>Add</WideButton>
        </div>
    )
}

export default EquipmentView;

