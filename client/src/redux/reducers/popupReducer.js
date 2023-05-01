import {SHOW_POPUP, HIDE_POPUP} from '../actions.js';

const popupReducer = function(state, action) {
    var output = false;

    switch(action.type) {
        case(SHOW_POPUP):
            output = action.payload;
            break;
        case(HIDE_POPUP):
            break;
        default: 
            if (typeof(state) !== 'undefined') {
                output = state;
            }
            break;
    }
    return output;
}

export default popupReducer;

