import React from 'react';
import {WideButton, Centered} from '../elements/elements.js';

export function SettingsView({toggleLight}) {
    return (
        <div>
            <Centered height={"600px"} >
                <WideButton onClick={toggleLight} >Toggle Color</WideButton>
                <br />
            </Centered>
        </div>
    );
}

export default SettingsView;

