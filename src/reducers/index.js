import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import homeReducer from './homeReducer';

const rootReducer = combineReducers({
    routing: routerReducer,
    home: homeReducer,
    form: formReducer
});

export default rootReducer;
