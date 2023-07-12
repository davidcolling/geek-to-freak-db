import React from 'react';
import {WideButton, RightAlign, Bar, P} from '../elements/elements.js';

export const WorkoutsView = ({list, fetchSetsForWorkoutConnected}) => {
    return (
        <div>
            {list.map( 
                (item) => (
                    <Bar>
                        <button onClick={() => fetchSetsForWorkoutConnected(item.id)}></button>
                        <P>{item.startTime}</P>
                        <RightAlign>
                            <Bar>
                                {item.endTime}
                            </Bar>
                        </RightAlign>
                        <P>{JSON.stringify(item.set1)}</P>
                    </Bar>
                )
            )}
            <br />
        </div>
    )
}

export default WorkoutsView;

