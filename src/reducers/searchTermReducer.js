
export default (state = null, action) => {
    switch (action.type) {
        case 'SET_SEARCH_TERM':
            return action.payload;
        default:
            return state;
    }
};