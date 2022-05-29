
const initialState = {
    data: [],
    rating_aggs: {5: 0, 4: 0, 3: 0, 2: 0, 1: 0},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_REVIEWS':
            return action.payload;
        case 'RESET_REVIEWS':
            return [];
        default:
            return state;
    }
};