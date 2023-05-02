import React from 'react';
import {
    StyledDiv, 
    Centered, 
} from './elements.js';

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

const Check = ({checked, onClick}) => {
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

export default Check;

