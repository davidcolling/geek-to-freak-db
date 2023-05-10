import {SET_WORKOUTS} from '../actions.js';

const workoutsReducer = function(state, action) {
    var output = {
    }

    switch(action.type) {
        case(SET_WORKOUTS):
            output = action.payload;
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
