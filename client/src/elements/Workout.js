import React from 'react';
import {RightAlign, Bar, P} from './elements.js';

export const Workout = ({workout, fetchSetsForWorkoutConnected}) => {
    return (
        <div>
            <Bar>
                <button onClick={() => fetchSetsForWorkoutConnected(workout.id)}></button>
                <P>{workout.startTime}</P>
                <RightAlign>
                    <Bar>
                        {workout.endTime}
                    </Bar>
                </RightAlign>
            </Bar>
            {
                typeof workout.sets !== 'undefined' && 
                workout.sets.map(
                    (set) => (
                        <P>{set.movement} X {set.reps} at {set.weight}</P>
                    )
                )
            }
        </div>
    )
}

export default Workout;

