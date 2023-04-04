import {SET_VIEW, ADD_CURRENT_SET} from '../actions.js';
import {WORKOUT_ADDER_VIEW, HOME_VIEW} from '../views.js';

const viewReducer = function (state, action) {
    if (action.type === ADD_CURRENT_SET) {
        return WORKOUT_ADDER_VIEW;
    } else if (action.type === SET_VIEW) {
        return action.payload;
    } else {
        if (typeof state !== 'undefined') {
            return state;
        }
    }
    return HOME_VIEW;
}

export default viewReducer;

