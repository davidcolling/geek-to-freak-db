import {useSelector, useDispatch} from 'react-redux';
import {Check} from '../../Elements.js';
import React from 'react';

export const CheckConnected = () => {
    const dispatch = useDispatch();
    const tmp = "white";

    return (
        <Check checked={tmp} />
    );
}

export default CheckConnected;

