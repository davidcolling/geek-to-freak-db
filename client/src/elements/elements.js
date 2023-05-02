// basic design objects
import styled from 'styled-components';
import React from 'react';
import {
    fontFace, 
    textStyles, 
    spacing, 
    border
} from './global.js'

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
	font-size: 20;
	text-transform: uppercase;
	letter-spacing: 1em;
    color: black;
    background: transparent;
    height: 60px;
    ${fontFace}
    ${border}
    ${spacing}
`

export const WideButton = styled(Button)`
    width: 90%;
    max-width:800px;
    min-width:300px;
    display: block;
    margin: auto;
`

export const SquareButton = styled(Button)`
    width: 60px;
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
`

export const P = styled.p`
    ${fontFace}
    ${textStyles}
`

export const StyledDiv = styled.div`
    ${spacing}
    overflow: auto;
`

export const NumberInput = styled.input `
    ${props =>   props.type === 'number' && `
        width: 150px;
    `}
    ${spacing}
`

export const TextInput = styled.input `
    ${props =>   props.type === 'text' && `
        width: 150px;
    `}
    ${spacing}
    ${textStyles}
`

export const BigTextInput = styled.textarea`
    width: 100%;
    height: 150px;
    ${spacing}
    ${textStyles}
`

const BarUnstyled  = styled.div`
    * {
        display: inline;
        margin-right: 15px;
    }
`

export const Bar = ({children}) => {
    return (
        <div 
            style={{
                width: "100%"
            }}
        >
            <StyledDiv><BarUnstyled>{children}</BarUnstyled></StyledDiv>
        </div>
    )
}

export const RightAlign = styled.span`
    float: right;
`

// put this after elements that you want to not be clicked
export const ClickBlocker = styled.div`
    position: fixed;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
`

export const FixedFooter = styled.div`
    position: fixed;
    bottom: 0;
    display: block;
    width: 100%;
    margin: auto;
    backgroundColor: white;
    opacity: 90%;
`

