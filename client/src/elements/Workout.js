import React from 'react';
import {Spacer, RightAlign, Bar, P} from './elements.js';
import SetList from './SetList.js';

export const Workout = ({workout, fetchSetsForWorkoutConnected}) => {
    return (
        <div>
            <Bar>
                <P onClick={() => fetchSetsForWorkoutConnected(workout.id)}>{workout.startTime}</P>
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
	    <Spacer />
        </div>
    )
}

export default Workout;

