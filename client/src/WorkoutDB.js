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
                    {view === HOME_VIEW && <HomeViewConnected />}
                    {view === WORKOUT_ADDER_VIEW && <WorkoutAdderConnected />}
                    {view === EQUIPMENT_VIEW && <EquipmentViewConnected />}
                    {view === EQUIPMENT_ADDER_VIEW && <EquipmentAdderViewConnected />}
                    {view === POSTED_VIEW && <PostedView />}
                    {view === SET_ADDER_VIEW && <SetAdderConnected />}
                    {view === SETTINGS_VIEW && <SettingsViewConnected />}
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

export default WorkoutDB;

