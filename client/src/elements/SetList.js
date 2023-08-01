import React from 'react';
import {Spacer, ShadeBG, P} from './elements.js';

export const SetList = ({list, darkMultiple}) => {
    var dm ;
    if (typeof darkMultiple === 'undefined') {
        dm = 1;
    } else {
        dm = darkMultiple;
    }
    return (
        <div>
            <ShadeBG darkMultiple={dm}>
                <table
                    style={{
                        width: "100%"
                    }}
                >
                    <tr><th><P>Movement</P></th><th><P>Reps</P></th><th><P>Weight</P></th></tr>
                    {
                        list.map(
                            (set) => (
                                <tr><td><P>{set.movement}</P></td><td><P>{set.reps}</P></td><td><P>{set.weight}</P></td></tr>
                            )
                        )
                    }
                </table>
            </ShadeBG>
            <Spacer />
        </div>
    )
}

export default SetList;

