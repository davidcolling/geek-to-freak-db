import {SET_SELECTED_EQUIPMENT} from '../actions.js';

const setSelectedEquipmentReducer = function(state, action) {
    var output = false;

    switch(action.type) {
        case(SET_SELECTED_EQUIPMENT):
            output = action.payload;
            break;
        default: 
            if (typeof(state) !== 'undefined') {
                output = state;
            }
            break;
    }
    return output;
}

export default setSelectedEquipmentReducer;

