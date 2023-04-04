import React from 'react';
import {Button} from '../Elements.js';

export const EquipmentView = ({viewEquipmentAdder, getEquipment, list}) => {
    return (
        <div>
            <Button onClick={viewEquipmentAdder}>Add</Button>
            <br />
            <Button onClick={getEquipment}>Get Equipment</Button>
            <br />
            <p>{list.map( (item) => (<p>{item.name}</p>))}</p>
        </div>
    )
}

export default EquipmentView;

