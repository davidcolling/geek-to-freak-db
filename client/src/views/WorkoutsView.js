import React from 'react';
import Workout from '../elements/Workout.js';

export const WorkoutsView = ({list, fetchSetsForWorkoutConnected}) => {
    return (
        <div>
            {list.map( 
                (item) => <Workout workout={item} fetchSetsForWorkoutConnected={fetchSetsForWorkoutConnected} />
            )}
            <br />
        </div>
    )
}

export default WorkoutsView;

