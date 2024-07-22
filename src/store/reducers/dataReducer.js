const DEFAULT_STATE = {
    products: [],
    customers: [],
    transactions: [],
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return { ...state, products: action.products };
        case "SET_CUSTOMERS":
            return { ...state, customers: action.customers };
        case "SET_TRANSACTIONS":
            return { ...state, transactions: action.transactions };
        default:
            return state;
    }
}