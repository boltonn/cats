
export default (state = null, action) => {
    switch (action.type) {
        case 'SET_IS_INTERNAL':
            return action.payload;
        case 'RESET_IS_INTERNAL':
            return null;
        default:
            return state;
    }
};