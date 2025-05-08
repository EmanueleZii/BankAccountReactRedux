import {thunk} from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import accountReducer from './features/accounts/accountSlice.js';
import customerReducer from './features/customers/customerSlice.js';

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

