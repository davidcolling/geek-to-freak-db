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

const fontFace = `
    @font-face {
      font-family: lato;
      src: url(${lato}) format('truetype');
      font-weight: 400;
      font-style: normal;
    }
`
const textStyles = `
    font-family: lato;
    letter-spacing 0.2em;
    font-weight: 100;
    font-size: 1.1em;
`

const spacing = `
    margin-bottom: 30px;
`
const border = `
    border-style: solid;
    border-color: black;
    border-width: 1px;
    border-radius: 0px;
`

 export const Button = styled.button`
	font-size: 20;
	text-transform: uppercase;
	letter-spacing: 1em;
    color: black;
    background: transparent;
    ${fontFace}
    ${border}
    ${spacing}
`

export const WideButton = styled(Button)`
    width: 90%;
    max-width:800px;
    min-width:300px;
    height: 60px;
    display: block;
    margin: auto;
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
`

export const P = styled.p`
    ${fontFace}
    ${textStyles}
`

const CheckInside = ({color, onClick}) => {
    return (
        <div
            onClick={onClick}
            style={{
                width: "15px",
                height: "15px",
                backgroundColor: color
            }}
        >
        </div>
    )
}

const CheckOutside = ({children}) => {
    return (
        <div
            style={{
                width: "20px",
                height: "20px",
                backgroundColor: "black"
            }}
        >
            {children}
        </div>
    );
}

export const Check = ({checked, onClick}) => {
    return (
        <StyledDiv>
            <CheckOutside>
                <Centered height={"20px"} >
                    <CheckInside color={!checked ? "white" : "black"} onClick={onClick} ></CheckInside>
                </Centered>
            </CheckOutside>
        </StyledDiv>
    );
}

const StyledDiv = styled.div`
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
`

const DropDownSelect = styled.select`
    width: 200px;
    color: black;
    height: 45px;
    ${border}
    ${textStyles}
    ${spacing}
`

const DropDownOption = styled.option`
    width: 200px;
`

export const DropDown = ({items}) => {
    return (
        <div>
            <DropDownSelect>
                {items.map( (item) => (<DropDownOption>{item}</DropDownOption>) )}
            </DropDownSelect>
        </div>
    );
}

