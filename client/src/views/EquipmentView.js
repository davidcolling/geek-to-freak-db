import React from 'react';
import {P, WideButton} from '../Elements.js';

export const EquipmentView = ({viewEquipmentAdder, list}) => {
    return (
        <div>
            {list.map( 
                (item) => (
                    <P>{item.name}</P>
                )
            )}
            <br />
            <WideButton onClick={viewEquipmentAdder}>Add</WideButton>
        </div>
    )
}

export default EquipmentView;

