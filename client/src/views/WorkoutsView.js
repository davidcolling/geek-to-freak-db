import React from 'react';
import {RightAlign, Bar, P} from '../elements/elements.js';

export const WorkoutsView = ({list}) => {
    return (
        <div>
            {list.map( 
                (item) => (
                    <Bar>
                        <P>{item.startTime}</P>
                        <RightAlign>
                            <Bar>
                                {item.endTime}
                            </Bar>
                        </RightAlign>
                    </Bar>
                )
            )}
            <br />
        </div>
    )
}

export default WorkoutsView;

