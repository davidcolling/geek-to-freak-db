import {setView} from './actions.js';
import {
    setEquipmentSuccess, 
    addCurrentSet, 
    clearCurrentWorkout, 
    setWorkouts,
    addPreviousWorkout
} from './actions.js';
import {EQUIPMENT_VIEW, WORKOUT_ADDER_VIEW, WORKOUTS_VIEW} from './views.js';

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
        await dispatch(setView(EQUIPMENT_VIEW));
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
        await dispatch(setView(EQUIPMENT_VIEW));
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
        await dispatch(setView(WORKOUT_ADDER_VIEW));
    }
}

export const postCurrentWorkout = () => {
    return async (dispatch, getState) => {
        const workout = await getState().currentWorkout;
        await fetch('/workout', {
            method: 'post',
            body: JSON.stringify({type: 'new', payload: workout}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        await dispatch(clearCurrentWorkout());
        await dispatch(setView(WORKOUTS_VIEW));
    }
}

export const fetchWorkouts = () => {
    return async (dispatch, getState) => {
        const response = await fetch('/workout');
        const data = await response.json();

        dispatch(setWorkouts(data));
    }
}

export const fetchSetsForWorkout = id => {
    return async (dispatch, getState) => {
        const response = await fetch(
            '/workout',
            {
                method: 'post',
                body: JSON.stringify({type: 'old', payload: {id: id}}),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        const data = await response.json();
        dispatch(addPreviousWorkout(data));
    }
}

