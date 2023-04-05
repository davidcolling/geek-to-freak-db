// basic design objects
import styled from 'styled-components';
import React from 'react';

export const LineDivider = styled.div`
    border-top: solid;
    width: 90%;
    display: block;
    margin: auto;
    border-width: 1px;
`

export const Spacer = styled.div`
    height: ${ (props) => (props.height)};
`

export const Button = styled.button`
    font-family: Courier;
    border-style: solid;
    border-width: 1px;
    border-radius: 0px;
    color: black;
`

export const WideButton = styled(Button)`
    width: 90%;
    max-width:800px;
    height: 60px;
    display: block;
    padding:30px;
`

export const SquareButton = styled(Button)`
    width: 60px;
    height: 60px;
`

const CenteredInner = styled.div`
     margin: 0;
     position: absolute;
     top: 50%;
     left: 50%;
     -ms-transform: translate(-50%, -50%);
     transform: translate(-50%, -50%);
`

export const Centered = ({height, children}) => {
    return (
        <div 
            style={{
                position: "relative",
                height: height
            }}
        >
            <CenteredInner>{children}</CenteredInner>
        </div>
    )
}

