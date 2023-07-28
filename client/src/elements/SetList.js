import React from 'react';
import {P} from './elements.js';

export const SetList = ({list}) => {
    return (
        <div>
	    {
                list.map(
                    (set) => (
                        <P>{set.movement} X {set.reps} at {set.weight}</P>
                    )
                )
            }
        </div>
    )
}

export default SetList;

