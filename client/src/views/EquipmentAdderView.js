import React from 'react';
import {BigTextInput, TextInput, P, WideButton} from '../elements/elements.js';
import Check from '../elements/Check.js';

export const EquipmentAdderView = ({post, handleChange, currentEquipment, isFreeWeightClick}) => {
    return (
        <div>
            <P>Name</P>
            <TextInput id="name" type="text" onChange={(e) => handleChange(e)} />
            <P>This is a free-weight.</P>
            <Check id="isFreeWeight" checked={currentEquipment.isFreeWeight} onClick={(e) => isFreeWeightClick({target: {id: "isFreeWeight"}})} />
            <P>Notes</P>
            <BigTextInput id="notes" type="text" onChange={(e) => handleChange(e)} />
            <WideButton onClick={post}>Add</WideButton>
        </div>
    )
}

export default EquipmentAdderView;

