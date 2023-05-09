// outmost shell of the non-boilerplate side of the application
    // manages view
    // displays persistently visible components
import React from 'react';

import {HOME_VIEW, WORKOUT_ADDER_VIEW, EQUIPMENT_VIEW, EQUIPMENT_ADDER_VIEW, POSTED_VIEW, SET_ADDER_VIEW, SETTINGS_VIEW} from './redux/views.js';
import HomeViewConnected from './redux/views/HomeViewConnected.js';
import WorkoutAdderConnected from './redux/views/WorkoutAdderConnected.js';
import EquipmentViewConnected from './redux/views/EquipmentViewConnected.js';
import EquipmentAdderViewConnected from './redux/views/EquipmentAdderViewConnected.js';
import SetAdderConnected from './redux/views/SetAdderConnected.js';
import SettingsViewConnected from './redux/views/SettingsViewConnected.js';
import PostedView from './views/PostedView.js';
import {FixedFooter, Bar, ClickBlocker, Spacer, LineDivider, SquareButton, ContentContainer} from './elements/elements.js';
import Popup from './elements/Popup.js';
import homeImg from './images/home.svg';
import settingsImg from './images/settings.svg';

function WorkoutDB ({view, home, settings, popup}) {
    return (
        <div>
            <div>
                <ContentContainer>
                    <Spacer height={"30px"} />
                    {matchView(view)}
                </ ContentContainer>
                <Spacer height={"200px"} />
                <FixedFooter>
                    <ContentContainer>
                        <LineDivider />
                        <Spacer height={"30px"} />
                        <Bar>
                            <SquareButton onClick={home}><img src={homeImg} alt="home" /></SquareButton>
                            <SquareButton onClick={settings}><img src={settingsImg} alt="settings" /></SquareButton>
                        </Bar>
                    </ ContentContainer>
                </FixedFooter>
            </div>
            { popup && <ClickBlocker><Popup message={popup.message} cb={popup.cb} /></ClickBlocker> }
        </div>
    )
}

const matchView = view => {
    switch(view){
        case HOME_VIEW: 
            return <HomeViewConnected />
        case WORKOUT_ADDER_VIEW: 
            return <WorkoutAdderConnected />
        case EQUIPMENT_VIEW:
             return <EquipmentViewConnected />
        case EQUIPMENT_ADDER_VIEW:
             return <EquipmentAdderViewConnected />
        case POSTED_VIEW :
            return <PostedView />
        case SET_ADDER_VIEW :
            return <SetAdderConnected />
        case SETTINGS_VIEW :
            return <SettingsViewConnected />
        default:
            return <HomeViewConnected />
    }
}

export default WorkoutDB;

