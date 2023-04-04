import {SET_EQUIPMENT_SUCCESS} from '../actions.js';

const equipmentReducer = function(state, action) {
    if (action.type === SET_EQUIPMENT_SUCCESS) {
        return action.payload;
    } else {
        if (typeof state !== 'undefined') {
            return state;
        }
    }

    return "unknown action";
}

export default equipmentReducer;

