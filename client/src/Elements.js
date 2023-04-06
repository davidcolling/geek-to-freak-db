// basic design objects
import styled from 'styled-components';
import React from 'react';
import lato from 'typeface-lato';

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
    @font-face {
      font-family: lato;
      src: url(${lato}) format('truetype');
      font-weight: 400;
      font-style: normal;
    }
	font-size: 20;
	text-transform: uppercase;
	letter-spacing: 1em;
    font-family: lato;
    border-style: solid;
    border-width: 1px;
    border-radius: 0px;
    color: black;
`

export const WideButton = styled(Button)`
    width: 90%;
    max-width:800px;
    min-width:300px;
    height: 60px;
    display: block;
    margin: auto;
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

export const ContentContainer = styled.div`
    margin: auto;
    display: block;
    max-width: 90%;
    padding-bottom: 30px;
`

