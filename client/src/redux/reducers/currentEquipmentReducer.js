import {SET_CURRENT_EQUIPMENT} from '../actions.js';

export const currentEquipmentReducer = (state, action) => {
    if (action.type === SET_CURRENT_EQUIPMENT && typeof state !== 'undefined') {
        var id  = action.payload.target.id;
        var output = {
            name: id === "name" ? action.payload.target.value : state.name,
            isFreeWeight: id === "isFreeWeight" ?  !state.isFreeWeight : state.isFreeWeight,
            notes: id === "notes" ? action.payload.target.value : state.notes
        }
        return output
    }
    return {name: " ", isFreeWeight: false, notes: " "};
}

export default currentEquipmentReducer;

