import React from 'react';
import {ContentContainer, RightAlign, Bar, P, Spacer, BorderDiv} from './elements.js';
import SetList from './SetList.js';
import removeImg from '../images/remove-square.svg';

export const Workout = ({workout, fetchSetsForWorkoutConnected}) => {
    var start = new Date(workout.startTime);
    var startTime = start.toTimeString().substring(0, 5);
    var startDate= start.toDateString();
    return (
        <div>
            <BorderDiv onClick={() => fetchSetsForWorkoutConnected(workout.id)}>
                <ContentContainer>
                <Spacer />
                <Bar>
                    <P>{startDate} at {startTime}</P>
                    <RightAlign>
                            <img src={removeImg} alt="remove" onClick={() => {}} />
                    </RightAlign>
                </Bar>
                {
                    typeof workout.sets !== 'undefined' && 
                    <SetList list={workout.sets} />
                }
                </ContentContainer>
            </BorderDiv>
            <Spacer />
        </div>
    )
}

export default Workout;

