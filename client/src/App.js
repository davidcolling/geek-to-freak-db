import React, { Component } from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider, useSelector, useDispatch} from 'react-redux';
import thunk from 'redux-thunk';

import {
    Button,
    SquareButton,
    Spacer,
    LineDivider 
} from './Elements.js';
import rootReducer from './redux/reducers/root.js';
import WorkoutDBConnected from './redux/WorkoutDBConnected.js';
import {HOME_VIEW} from './redux/views.js';

const initialState = {
    view: HOME_VIEW,
    equipment: [{id: 0, name: " ", isFreeWeight: false, notes: " "}],
    currentEquipment: {
        name: " ", 
        isFreeWeight: false, 
        notes: " "
    },
    currentWorkout: {
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
    },
}

//store
const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

class App extends Component {
    render() {
        return <Provider store={store}> <WorkoutDBConnected /> </Provider>;
    }
}

export default App;
