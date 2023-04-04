import React from 'react';
import {Button} from '../Elements.js';

export const WorkoutAdder = ({getCurrentWorkoutConnected, addSet}) => {
    return (
        <div>
            {getCurrentWorkoutConnected.sets.map( (item) => (<p>set</p>) )} 
            <br />
            <Button onClick={addSet}> Add Set </Button>
        </div>
    )

}

export default WorkoutAdder;

