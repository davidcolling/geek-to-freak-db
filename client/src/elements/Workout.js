import React from 'react';
import {RightAlign, Bar, P} from './elements.js';
import SetList from './SetList.js';
import removeImg from '../images/remove-square.svg';

export const Workout = ({workout, fetchSetsForWorkoutConnected}) => {
    return (
        <div>
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
                    <SetList list={workout.sets} />
                </div>
            }
        </div>
    )
}

export default Workout;

