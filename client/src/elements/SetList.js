import React from 'react';
import {ShadeBG, P} from './elements.js';

export const SetList = ({list}) => {
    return (
        <ShadeBG darkMultiple={1}>
            {
                list.map(
                    (set) => (
                        <P>{set.movement} X {set.reps} at {set.weight}</P>
                    )
                )
            }
        </ShadeBG>
    )
}

export default SetList;

