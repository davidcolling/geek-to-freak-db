import React from 'react';
import {Spacer, ShadeBG, P} from './elements.js';

export const SetList = ({list}) => {
    return (
        <div>
            <ShadeBG darkMultiple={1}>
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

