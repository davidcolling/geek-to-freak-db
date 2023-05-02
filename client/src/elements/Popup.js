import styled from 'styled-components';
import React from 'react';
import {P, Bar, Button} from './elements.js'
import {border} from './global.js'

const PopupContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 65%;
    text-align: center;
    padding: 30px;
    background-color: white;
    opacity: 90%;
    ${border}
`

const Popup = ({message, cb}) => {
    return (
        <PopupContainer>
            <P>{message}</P>
            <Bar>
                <Button onClick={() => cb(true)} >Ok</Button>
                <Button onClick={() => cb(false)} >Cancel</Button>
            </Bar>
        </PopupContainer>
    )
}

export default Popup;

