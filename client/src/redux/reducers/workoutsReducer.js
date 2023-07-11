import {SET_WORKOUTS} from '../actions.js';
import {ADD_PREVIOUS_WORKOUT} from '../actions.js';

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
                for (var i = 0; i < output.length; i++) {
                    if (output[i].set1 === action.payload[0].id) {
                        output[i].set1 = action.payload;
                    }
                }
            }
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
