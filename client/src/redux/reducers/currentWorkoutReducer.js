import {ADD_CURRENT_SET , SET_CURRENT_SET} from '../actions.js';

const currentWorkoutReducer = function(state, action) {
    var output = {
        sets: [],
        currentSet: {
            equipment: 20,
            reps: 0,
            weight: 0,
            lastRepComplete: true,
            isLR: true,
            isL: false,
            notes: " "
        }
    }

    switch(action.type) {
        case(SET_CURRENT_SET):
            if (typeof state !== 'undefined') {

                var id = action.payload.target.id;
                var input = action.payload.target.value;
        
                output.sets = state.sets;
                output.currentSet = {
                    equipment: (id === "equipment") ? input : state.equipment,
                    reps: (id === "reps") ? input : state.reps,
                    weight: (id === "weight") ? input : state.weight,
                    lastRepComplete: (id === "lastRepComplete") ? !state.lastRepComplete : state.lastRepComplete, 
                    isLR: (id === "isLR") ? !state.isLR : state.isLR,
                    isL: (id === "isL") ? !state.isL : state.isL,
                    notes: (id === "notes") ? input : state.notes
                }
            }
            break;
        case(ADD_CURRENT_SET):
            if (typeof state !== 'undefined') {
                output.sets = state.sets;
                output.sets.push(state.currentSet);
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

export default currentWorkoutReducer;

