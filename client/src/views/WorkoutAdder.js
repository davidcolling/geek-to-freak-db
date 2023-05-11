import React from 'react';
import {P, WideButton} from '../elements/elements.js';

export const WorkoutAdder = ({getCurrentWorkoutConnected, addSet, post}) => {
    return (
        <div>
            <WideButton onClick={addSet}> Add Set </WideButton>
            <br />
            {getCurrentWorkoutConnected.sets.map( 
                (item) => {
                    var lastRepComplete = item.lastRepComplete ? "" : "to failure";
                    return <P>{item.equipment} x {item.reps}: {item.weight} lbs {lastRepComplete} </P>
                }
            )} 
            <br />
            <WideButton onClick={post}> Add Workout </WideButton>
        </div>
    )

}

export default WorkoutAdder;

