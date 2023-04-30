import React from 'react';
import {TextInput, Check, P, WideButton} from '../Elements.js';

export const EquipmentAdderView = ({post, handleChange, isFreeWeight, isFreeWeightClick}) => {
    return (
        <div>
            <P>Name</P>
            <input id="name" type="text" onChange={(e) => handleChange(e)} />
            <P>This is a free-weight.</P>
            <Check id="isFreeWeight" checked={isFreeWeight} onClick={(e) => isFreeWeightClick({target: {id: "isFreeWeight"}})} />
            <P>Notes</P>
            <TextInput id="notes" type="text" onChange={(e) => handleChange(e)} />
            <WideButton onClick={post}>Add</WideButton>
        </div>
    )
}

export default EquipmentAdderView;

