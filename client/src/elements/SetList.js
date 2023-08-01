import React from 'react';
import {Spacer, P} from './elements.js';

export const SetList = ({list}) => {
    return (
        <div>
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
                <Spacer />
        </div>
    )
}

export default SetList;

