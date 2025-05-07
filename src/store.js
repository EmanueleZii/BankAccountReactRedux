import React from 'react';
import { combineReducers, createStore } from 'redux';
import accountReducer from './features/accounts/accountSlice.js';
import customerReducer from './features/customers/customerSlice.js';

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});

const store = createStore(rootReducer);

export default store;
