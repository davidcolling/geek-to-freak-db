export const SET_VIEW = "SET_VIEW";
export const SET_EQUIPMENT_SUCCESS = "SET_EQUIPMENT_SUCCESS";
export const SET_EQUIPMENT_FAILURE = "SET_EQUIPMENT_FAILURE";
export const SET_CURRENT_EQUIPMENT = "SET_CURRENT_EQUIPMENT";
export const SET_CURRENT_WORKOUT = "SET_CURRENT_WORKOUT";
export const SET_CURRENT_SET = "SET_CURRENT_SET"
export const ADD_CURRENT_SET = "ADD_CURRENT_SET";

export const setView = payload => ({type:SET_VIEW, payload});
export const setEquipmentSuccess = payload => ({type:SET_EQUIPMENT_SUCCESS, payload})
export const setEquipmentFailure = e => ({type:SET_EQUIPMENT_FAILURE, e})
export const setCurrentEquipment = payload => ({type:SET_CURRENT_EQUIPMENT, payload});
export const setCurrentWorkout = payload => ({type: SET_CURRENT_WORKOUT, payload});
export const setCurrentSet = payload => ({type: SET_CURRENT_SET, payload});
export const addCurrentSet = () => ({type: ADD_CURRENT_SET});


