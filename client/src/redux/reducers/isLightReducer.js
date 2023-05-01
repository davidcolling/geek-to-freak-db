import {SET_LIGHT} from '../actions.js';

const isLightReducer = function(state, action) {
    var output = true;

    switch(action.type) {
        case(SET_LIGHT):
            output = !state;
            break;
        default: 
            if (typeof(state) !== 'undefined') {
                output = state;
            }
            break;
    }
    return output;
}

export default isLightReducer;

