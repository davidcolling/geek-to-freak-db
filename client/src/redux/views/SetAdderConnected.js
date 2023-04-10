import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setCurrentSet, addCurrentSet} from '../actions.js';
import SetAdder from '../../views/SetAdder.js';
import {getCurrentWorkoutCurrentSetLastRepComplete} from '../selectors.js';

export const SetAdderConnected = () => {
    const dispatch = useDispatch();
    const handleChange = e => dispatch(setCurrentSet(e));
    const post = () => dispatch(addCurrentSet());
    const lastRepComplete = () => useSelector(getCurrentWorkoutCurrentSetLastRepComplete);
    const handleLastRepComplete = e => useDispatch(setCurrentSet(e));

    return (
        <SetAdder handleChange={handleChange} post={post} getLastRepComplete={lastRepComplete()} handleLastRepComplete={handleLastRepComplete} />
    );
}

export default SetAdderConnected;

