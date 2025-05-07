import { combineReducers, createStore } from 'redux';

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
};

const initialStateCustomer = {
    fullName:'',
    nationalID:'',
    createdAt:'',
    status:''
};

function accountReducer(state = initialStateAccount, action) {
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

function customerReducer(state = initialStateCustomer, action) {
 switch (action.type) {
    case 'customer/createCustomer':
        return {
            ...state, 
            fullName:action.payload.fullName, 
            nationalID: action.payload.nationalID, 
            createdAt: action.payload.createdAt 
        };

    case 'customer/updateName':
        return {...state, fullName: action.payload};
    
    default: return state;
 }
}

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});

const store = createStore(rootReducer);

function deposit(amount) {
    return { type: 'account/deposit', payload: amount };
}

function withdraw(amount) {
    return{ type: 'account/withdraw', payload: amount }
}

function requestLoan(amount) {
    return{ 
        type: 'account/requestLoan', 
        payload: { 
            amount: amount,
            purpose: "Buy a car" 
        } 
    }
}

function payLoan() {
    return { type: 'account/payLoan' };
}

function createCustomer(fullname, nationalID) {
    return {
            type: 'customer/createCustomer', 
            payload: {
                fullname, 
                nationalID, 
                createdAt: new Date().toISOString() 
            }
        };
}

function updateName(fullName) {

    return {
        type: 'customer/updateName',
        payload: {fullname: fullName} 
    };
}

store.dispatch(deposit(500));
store.dispatch(withdraw(200));
store.dispatch(requestLoan(1000, "Buy a cheap car"));
store.dispatch(payLoan());
store.dispatch(createCustomer('jhon','23242452'));

