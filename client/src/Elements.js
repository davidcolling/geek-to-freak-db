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
    height: 15px;
`

export const Button = styled.button`
    font-family: Courier;
    border-style: solid;
    border-width: 1px;
    border-radius: 0px;
    color: black;
`

export const SquareButton = styled(Button)`
    width: 60px;
    height: 60px;
`
