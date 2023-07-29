import React from 'react';
import {P, WideButton} from '../elements/elements.js';
import SetList from '../elements/SetList.js';

export const WorkoutAdder = ({getCurrentWorkoutConnected, addSet, post}) => {
    return (
        <div>
            <WideButton onClick={addSet}> Add Set </WideButton>
            <SetList list={getCurrentWorkoutConnected.sets} />
            <WideButton onClick={post}> Add Workout </WideButton>
        </div>
    )

}

export default WorkoutAdder;

