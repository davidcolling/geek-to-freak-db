import React from 'react';
import {RightAlign, Bar, P, WideButton} from '../Elements.js';
import removeImg from '../images/remove-square.svg';

export const EquipmentView = ({viewEquipmentAdder, list, removeItem}) => {
    return (
        <div>
            {list.map( 
                (item) => (
                    <Bar>
                        <P>{item.name}</P>
                        <RightAlign>
                            {item.isFreeWeight ? <P>FW</P> : <P></P> }
                            <img src={removeImg} alt="remove" onClick={() => removeItem(`Remove ${item.name}?`)} />
                        </RightAlign>
                    </Bar>
                )
            )}
            <br />
            <WideButton onClick={viewEquipmentAdder}>Add</WideButton>
        </div>
    )
}

export default EquipmentView;

