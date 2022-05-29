
export default (state = null, action) => {
    switch (action.type) {
        case 'SET_IS_ONLINE':
            return action.payload;
        case 'RESET_IS_ONLINE':
            return null;
        default:
            return state;
    }
};