import React from 'react';
import CheckConnected from '../redux/elements/CheckConnected.js';
import {P, ContentContainer, WideButton} from '../Elements.js';

export const EquipmentAdderView = ({post, handleChange, handleCheck}) => {
    return (
        <div>
            <ContentContainer>
                <P>Name</P>
                <input id="name" type="text" onChange={(e) => handleChange(e)} />
                <P>This is a free-weight.</P>
                <CheckConnected id="isFreeWeight" onClick={handleCheck} />
                <P>Notes</P>
                <input id="notes" type="text" onChange={(e) => handleChange(e)} />
            </ContentContainer>
            <WideButton onClick={post}>Add</WideButton>
        </div>
    )
}

export default EquipmentAdderView;

