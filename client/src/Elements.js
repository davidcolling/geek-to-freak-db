// basic design objects
import styled from 'styled-components';

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
    margin: auto;
    display: block;
    padding:30px;
`

export const SquareButton = styled(Button)`
    width: 60px;
    height: 60px;
`
