const initialState = {
    customers: []
};
const wtq1 = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'LIST_WTQ1':
            return { ...state, list: payload };
        case 'ActionTypes.SELECTED_CUSTOMER':
            return { ...state, selectedCustomer: payload };
        default:
            return state;
    }
};

export default wtq1;
