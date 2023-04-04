import React from 'react';

import {HOME_VIEW, WORKOUT_ADDER_VIEW, EQUIPMENT_VIEW, EQUIPMENT_ADDER_VIEW, POSTED_VIEW, SET_ADDER_VIEW} from './redux/views.js';
import HomeViewConnected from './redux/views/HomeViewConnected.js';
import WorkoutAdderConnected from './redux/views/WorkoutAdderConnected.js';
import EquipmentViewConnected from './redux/views/EquipmentViewConnected.js';
import EquipmentAdderViewConnected from './redux/views/EquipmentAdderViewConnected.js';
import SetAdderConnected from './redux/views/SetAdderConnected.js';
import PostedView from './views/PostedView.js';
import {Spacer, LineDivider, Button, SquareButton} from './Elements.js';

function WorkoutDB ({view, home}) {
      return (
        <div style={
            {
            }
        }>
            {view === HOME_VIEW && <HomeViewConnected />}
            {view === WORKOUT_ADDER_VIEW && <WorkoutAdderConnected />}
            {view === EQUIPMENT_VIEW && <EquipmentViewConnected />}
            {view === EQUIPMENT_ADDER_VIEW && <EquipmentAdderViewConnected />}
            {view === POSTED_VIEW && <PostedView />}
            {view === SET_ADDER_VIEW && <SetAdderConnected />}
            <div
                style={
                    {
                        padding: "10px",
                        position: "fixed",
                        bottom: "0",
                        width: "100%"
                    }
                }
            >
                <Spacer />
                <LineDivider />
                <Spacer />
                <SquareButton onClick={home}>H</SquareButton>
            </div>
        </div>
    )
}

export default WorkoutDB;

