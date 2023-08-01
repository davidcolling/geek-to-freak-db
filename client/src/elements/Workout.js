import React from 'react';
import {RightAlign, Bar, P, ShadeBG} from './elements.js';
import SetList from './SetList.js';
import removeImg from '../images/remove-square.svg';

export const Workout = ({workout, fetchSetsForWorkoutConnected}) => {
    var dm = 1;
    return (
        <ShadeBG darkMultiple={dm}>
            <Bar>
                <P onClick={() => fetchSetsForWorkoutConnected(workout.id)}>{workout.startTime}</P>
                <RightAlign>
                    <Bar>
                        <img src={removeImg} alt="remove" onClick={() => {}} />
                    </Bar>
                </RightAlign>
            </Bar>
            {
                typeof workout.sets !== 'undefined' && 
                <div>
                    <SetList list={workout.sets} darkMultiple={dm +1}/>
                </div>
            }
        </ShadeBG>
    )
}

export default Workout;

