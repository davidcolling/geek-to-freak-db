import React from 'react';
import {P, WideButton} from '../Elements.js';

export const WorkoutAdder = ({getCurrentWorkoutConnected, addSet}) => {
    return (
        <div>
            {getCurrentWorkoutConnected.sets.map( (item) => (<P>{item.equipment} x {item.reps}</P>) )} 
            <br />
            <WideButton onClick={addSet}> Add Set </WideButton>
        </div>
    )

}

export default WorkoutAdder;

