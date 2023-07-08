import {SET_WORKOUTS} from '../actions.js';
import {ADD_PREVIOUS_WORKOUT} from '../actions.js';
import dbgPost from '../../dbg.js';

const workoutsReducer = function(state, action) {
    var output = {
    }

    switch(action.type) {
        case(SET_WORKOUTS):
            output = action.payload;
            break;
        case(ADD_PREVIOUS_WORKOUT):
            if (typeof state !== 'undefined') {
                output = state;
            }
            dbgPost(JSON.stringify(action.payload));
            output.push(action.payload);
            break;
        default: 
            if (typeof state !== 'undefined') {
                output = state;
            }
            break;
    }
    return output;
}

export default workoutsReducer;
