export const SET_VIEW = "SET_VIEW";
export const SET_EQUIPMENT_SUCCESS = "SET_EQUIPMENT_SUCCESS";
export const SET_EQUIPMENT_FAILURE = "SET_EQUIPMENT_FAILURE";
export const SET_CURRENT_EQUIPMENT = "SET_CURRENT_EQUIPMENT";
export const SET_CURRENT_WORKOUT = "SET_CURRENT_WORKOUT";
export const SET_CURRENT_SET = "SET_CURRENT_SET"
export const ADD_CURRENT_SET = "ADD_CURRENT_SET";
export const SHOW_POPUP = "SHOW_POPUP";
export const HIDE_POPUP = "HIDE_POPUP";
export const SET_SELECTED_EQUIPMENT = "SET_SELECTED_EQUIPMENT";
export const SET_LIGHT = "SET_LIGHT";
export const CLEAR_CURRENT_WORKOUT = "CLEAR_CURRENT_WORKOUT";
export const SET_WORKOUTS = "SET_WORKOUTS";
export const GET_WORKOUTS = "GET_WORKOUTS";

export const setView = payload => ({type:SET_VIEW, payload});
export const setEquipmentSuccess = payload => ({type:SET_EQUIPMENT_SUCCESS, payload})
export const setEquipmentFailure = e => ({type:SET_EQUIPMENT_FAILURE, e})
export const setCurrentEquipment = payload => ({type:SET_CURRENT_EQUIPMENT, payload});
export const setCurrentWorkout = payload => ({type: SET_CURRENT_WORKOUT, payload});
export const setCurrentSet = payload => ({type: SET_CURRENT_SET, payload});
export const addCurrentSet = payload => ({type: ADD_CURRENT_SET, payload});
export const showPopup = payload => ({type: SHOW_POPUP, payload});
export const hidePopup = () => ({type: HIDE_POPUP});
export const setSelectedEquipment = payload => ({type: SET_SELECTED_EQUIPMENT, payload});
export const setLight = payload => ({type: SET_LIGHT});
export const clearCurrentWorkout = () => ({type: CLEAR_CURRENT_WORKOUT});
export const setWorkouts = payload => ({type: SET_WORKOUTS, payload});
export const getWorkouts = payload => ({type: GET_WORKOUTS, payload});
