import styled from 'styled-components';
import React from 'react';
import {
    border, 
    textStyles, 
    spacing
} from './global.js';

const DropDownSelect = styled.select`
    width: 200px;
    color: black;
    height: 45px;
    ${border}
    ${textStyles}
    ${spacing}
    text-transform: ${props => props.textTransform};
`

const DropDownOption = styled.option`
    width: 200px;
`

const DropDown = ({items, textTransform, id, onChange}) => {
    return (
        <div>
            <DropDownSelect id={id} textTransform={textTransform} onChange={onChange} >
                {items.map( (item) => (<DropDownOption value={item} >{item}</DropDownOption>) )}
            </DropDownSelect>
        </div>
    );
}

export default DropDown;

