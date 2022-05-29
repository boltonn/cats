
export default (state = [], action) => {
    switch (action.type) {
        case 'ADD_TAG_FILTER':
            // dont want to add the filter twice (maybe inefficient if long but filters should be small)
            const newState = [...state, action.payload];
            var newSetState = new Set(newState);
            return Array.from(newSetState);
        case 'CLEAR_TAG_FILTERS':
            return [];
        default:
            return state;
    }
};