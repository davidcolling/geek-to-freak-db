import {ADD_CURRENT_SET , SET_CURRENT_SET, CLEAR_CURRENT_WORKOUT} from '../actions.js';

const currentWorkoutReducer = function(state, action) {
    var output = {
        sets: [],
        currentSet: {
            equipment: 'none',
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
                    equipment: (id === "equipment") ? input : state.currentSet.equipment,
                    reps: (id === "reps") ? input : state.currentSet.reps,
                    weight: (id === "weight") ? input : state.currentSet.weight,
                    lastRepComplete: (id === "lastRepComplete") ? !state.currentSet.lastRepComplete : state.currentSet.lastRepComplete, 
                    isLR: (id === "isLR") ? !state.currentSet.isLR : state.currentSet.isLR,
                    isL: (id === "isL") ? !state.currentSet.isL : state.currentSet.isL,
                    notes: (id === "notes") ? input : state.currentSet.notes
                }
            }
            break;
        case(ADD_CURRENT_SET):
            if (typeof state !== 'undefined') {
                output.sets = state.sets;
                output.sets.push(state.currentSet);
            }
            break;
        case(CLEAR_CURRENT_WORKOUT):
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

