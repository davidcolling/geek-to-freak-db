import {combineReducers} from 'redux';
import viewReducer from './viewReducer.js';
import equipmentReducer from './equipmentReducer.js';
import currentEquipmentReducer from './currentEquipmentReducer.js';
import currentWorkoutReducer from './currentWorkoutReducer.js';
import popupReducer from './popupReducer.js';
import selectedEquipmentReducer from './selectedEquipmentReducer.js';
import isLightReducer from './isLightReducer.js';

export const rootReducer = combineReducers({
    view: viewReducer,
    equipment: equipmentReducer,
    currentEquipment: currentEquipmentReducer,
    selectedEquipment: selectedEquipmentReducer,
    currentWorkout: currentWorkoutReducer,
    popup: popupReducer,
    isLight: isLightReducer
});

export default rootReducer;

