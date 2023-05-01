import React, { Component } from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './redux/reducers/root.js';
import WorkoutDBConnected from './redux/WorkoutDBConnected.js';
import {HOME_VIEW} from './redux/views.js';

const initialState = {
    view: HOME_VIEW,
    equipment: [{name: " ", isFreeWeight: false, notes: " "}],
    currentEquipment: {
        name: " ", 
        isFreeWeight: false, 
        notes: " "
    },
    selectedEquipment: false,
    currentWorkout: {
        sets: [],
        currentSet: {
            equipment: 20,
            reps: 0,
            weight: 0,
            lastRepComplete: false,
            isLR: true,
            isL: false,
            notes: " "
        }
    },
    popup: false
}

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

class App extends Component {
    render() {
        return <Provider store={store}> <WorkoutDBConnected /> </Provider>;
    }
}

export default App;

