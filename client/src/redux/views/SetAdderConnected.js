import React from 'react';
import {useDispatch} from 'react-redux';
import {setCurrentSet, addCurrentSet} from '../actions.js';
import SetAdder from '../../views/SetAdder.js';

export const SetAdderConnected = () => {
    const dispatch = useDispatch();
    const handleChange = e => dispatch(setCurrentSet(e));
    const post = () => dispatch(addCurrentSet());

    return (
        <SetAdder handleChange={handleChange} post={post}/>
    );
}

export default SetAdderConnected;

