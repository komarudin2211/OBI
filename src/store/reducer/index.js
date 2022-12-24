import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import wtq1Reducer from './wtq1Reducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    wtq1: wtq1Reducer,
    customization: customizationReducer
});

export default reducer;
