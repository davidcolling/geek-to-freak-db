import React from 'react';
import {CenteredHorizontally, WideButton} from '../Elements.js';

export const WorkoutAdder = ({getCurrentWorkoutConnected, addSet}) => {
    return (
        <div>
            {getCurrentWorkoutConnected.sets.map( (item) => (<p>set</p>) )} 
            <br />
            <WideButton onClick={addSet}> Add Set </WideButton>
        </div>
    )

}

export default WorkoutAdder;

