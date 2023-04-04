import {ADD_CURRENT_SET , SET_CURRENT_SET} from '../actions.js';

const currentWorkoutReducer = function(state, action) {
    if (typeof state !== 'undefined') {
        var sets  = state.sets;
        if (action.type === SET_CURRENT_SET ) {
            var id = action.payload.target.id;
            var input = action.payload.target.value;
    
            return {
                sets: sets,
                currentSet: {
                    equipment: (id === "equipment") ? input : state.equipment,
                    reps: (id === "reps") ? input : state.reps,
                    weight: (id === "weight") ? input : state.weight,
                    lastRepComplete: (id === "lastRepComplete") ? !state.lastRepComplete : state.lastRepComplete, 
                    isLR: (id === "isLR") ? !state.isLR : state.isLR,
                    isL: (id === "isL") ? !state.isL : state.isL,
                    notes: (id === "notes") ? input : state.notes
                }
            }
        }
        if (action.type === ADD_CURRENT_SET) {
            sets.push(state.currentSet);
        }

        return {
            sets: sets,
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

    }
 
    return {
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

}

export default currentWorkoutReducer;

