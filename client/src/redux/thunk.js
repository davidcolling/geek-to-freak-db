import {setView} from './actions.js';
import {setEquipmentSuccess} from './actions.js';
import {POSTED_VIEW} from './views.js';

export const postEquipment = () => {
    return async (dispatch, getState) => {
        const s = await getState().currentEquipment;
        const response = await fetch('/equipment', {
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
    return async (dispatch, setState) => {
        const response = await fetch('/equipment');
        const data = await response.json();

        dispatch(setEquipmentSuccess(data));
    }
}


