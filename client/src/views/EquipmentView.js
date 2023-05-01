import React from 'react';
import {P, WideButton} from '../Elements.js';

export const EquipmentView = ({viewEquipmentAdder, list}) => {
    return (
        <div>
            {list.map( 
                (item) => (
                    <div>
                        <P>{item.name}</P>
                        {item.isFreeWeight ? <P>FW</P> : <P></P> }
                    </div>
                )
            )}
            <br />
            <WideButton onClick={viewEquipmentAdder}>Add</WideButton>
        </div>
    )
}

export default EquipmentView;

