import React from 'react';
import {RightAlign, Bar, P, Spacer, BorderDiv} from './elements.js';
import SetList from './SetList.js';
import removeImg from '../images/remove-square.svg';

export const Workout = ({workout, fetchSetsForWorkoutConnected}) => {
    var dm = 1;
    return (
        <div>
            <BorderDiv onClick={() => fetchSetsForWorkoutConnected(workout.id)}>
                <Spacer />
                <Bar>
                    <P>{workout.startTime}</P>
                    <RightAlign>
                            <img src={removeImg} alt="remove" onClick={() => {}} />
                    </RightAlign>
                </Bar>
                {
                    typeof workout.sets !== 'undefined' && 
                    <SetList list={workout.sets} darkMultiple={dm +1}/>
                }
            </BorderDiv>
            <Spacer />
        </div>
    )
}

export default Workout;

