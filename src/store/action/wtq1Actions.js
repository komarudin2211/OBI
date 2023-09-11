export const setList = (wtq1) => {
    return {
        type: 'LIST_WTQ1',
        payload: wtq1
    };
};

export const selectedCustomer = (customer) => {
    return {
        type: 'ActionTypes.SELECTED_CUSTOMER',
        payload: customer
    };
};
