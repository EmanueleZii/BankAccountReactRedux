import { createStore } from 'redux';

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'account/deposit':
            return { ...state, balance: state.balance + action.payload };

        case 'account/withdraw':
            return { ...state, balance: state.balance - action.payload };

        case 'account/requestLoan':
            if (state.loan > 0) return state;
            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount,
            };

        case "account/payLoan":
            if (state.loan === 0) return state;
            return {
                ...state,
                balance: state.balance - state.loan,
                loan: 0,
                loanPurpose: ''
            };

        default:
            return state;
    }
}

const store = createStore(reducer);

// store.dispatch({ type: 'account/deposit', payload: 500 });
// store.dispatch({ type: 'account/withdraw', payload: 200 });
// store.dispatch({ type: 'account/requestLoan', payload: { amount: 1000, purpose: "Buy a car" } });
// store.dispatch({ type: 'account/payLoan' });

// store.dispatch({
//     type: 'account/payLoan',
// });

const ACCOUNT_DEPOSIT = 'account/deposit';

function deposit(amount) {
    return { type: 'account/deposit', payload: amount };
}

function withdraw(amount) {
    return{ type: 'account/withdraw', payload: amount }
}

function requestLoan(amount) {
    return{ type: 'account/requestLoan', payload: { amount: amount, purpose: "Buy a car" } }
}

function payLoan() {
    return { type: 'account/payLoan' };
}

store.dispatch(deposit(500));
store.dispatch(withdraw(200));
store.dispatch(requestLoan(1000));
store.dispatch(payLoan());
