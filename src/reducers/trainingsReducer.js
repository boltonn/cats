
const initialState = {
    data: [],
    tag_aggs: [],
    provider_aggs: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_TRAININGS':
            return action.payload;
        case 'RESET_TRAININGS':
            return [];
        default:
            return state;
    }
};