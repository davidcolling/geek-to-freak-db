import React from 'react';
import {WideButton, RightAlign, Bar, P} from '../elements/elements.js';

export const WorkoutsView = ({list, fetchSetsForWorkoutConnected}) => {
    return (
        <div>
            {list.map( 
                (item) => (
                    <div>
                        <Bar>
                            <button onClick={() => fetchSetsForWorkoutConnected(item.id)}></button>
                            <P>{item.startTime}</P>
                            <RightAlign>
                                <Bar>
                                    {item.endTime}
                                </Bar>
                            </RightAlign>
                       </Bar>
                        {
                            typeof item.set1 === 'object' &&
                            item.set1.map(
                                (set) => (
                                    <P>{set.movement}</P>
                                )
                            )
                        }
                    </div>
                 )
            )}
            <br />
        </div>
    )
}

export default WorkoutsView;

