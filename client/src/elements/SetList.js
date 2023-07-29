import React from 'react';
import {Spacer, ShadeBG, P} from './elements.js';

export const SetList = ({list}) => {
    return (
        <div>
            <ShadeBG darkMultiple={1}>
                {
                    list.map(
                        (set) => (
                            <P>{set.movement} X {set.reps} at {set.weight}</P>
                        )
                    )
                }
            </ShadeBG>
            <Spacer />
        </div>
    )
}

export default SetList;

