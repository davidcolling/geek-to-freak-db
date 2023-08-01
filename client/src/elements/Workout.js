import React from 'react';
import {RightAlign, Bar, P, ShadeBG, Spacer} from './elements.js';
import SetList from './SetList.js';
import removeImg from '../images/remove-square.svg';

export const Workout = ({workout, fetchSetsForWorkoutConnected}) => {
    var dm = 1;
    return (
        <div>
            <ShadeBG darkMultiple={dm} onClick={() => fetchSetsForWorkoutConnected(workout.id)}>
                <Bar>
                    <P>{workout.startTime}</P>
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
            <Spacer />
        </div>
    )
}

export default Workout;

