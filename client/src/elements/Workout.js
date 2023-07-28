import React from 'react';
import {RightAlign, Bar, P} from './elements.js';
import SetList from './SetList.js';

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
		<SetList list={workout.sets} />
            }
        </div>
    )
}

export default Workout;

