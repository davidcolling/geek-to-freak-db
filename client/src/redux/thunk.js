import {setView} from './actions.js';
import {setEquipmentSuccess, addCurrentSet, clearCurrentWorkout} from './actions.js';
import {POSTED_VIEW} from './views.js';

export const postEquipment = () => {
    return async (dispatch, getState) => {
        const s = await getState().currentEquipment;
        await fetch('/equipment', {
            method: 'post',
            body: JSON.stringify(s),
            headers: {
                "Content-Type": "application/json"
            }
        })
        await dispatch(setView(POSTED_VIEW));
     }
}

export const fetchEquipment = () => {
    return async (dispatch, getState) => {
        const response = await fetch('/equipment');
        const data = await response.json();

        dispatch(setEquipmentSuccess(data));
    }
}

export const removeEquipment = () => {
    return async (dispatch, getState) => {
        const id = await getState().selectedEquipment;
        await fetch('/equipment', {
            method: 'delete',
            body: JSON.stringify({id: id}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        await dispatch(setView(POSTED_VIEW));
     }
}

export const postCurrentSet = () => {
    return async (dispatch, getState) => {
        const set = await getState().currentWorkout.currentSet;
        const response = await fetch('/set', {
            method: 'post',
            body: JSON.stringify(set),
            headers: {
                "Content-Type": "application/json"
            }
        })
        var data = await response.json();
        await dispatch(addCurrentSet(data.insertId));
        await dispatch(setView(POSTED_VIEW));
    }
}

export const postCurrentWorkout = () => {
    return async (dispatch, getState) => {
        const workout = await getState().currentWorkout;
        await fetch('/workout', {
            method: 'post',
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": "application/json"
            }
        })
        await dispatch(clearCurrentWorkout());
        await dispatch(setView(POSTED_VIEW));
    }
}
