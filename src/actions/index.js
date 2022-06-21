
import catsBackend from "../apis/catsBackend";


const transformRequestOptions = params => {
    let options = '';
    for (const key in params) {
    if (typeof params[key] !== 'object' && params[key]) {
      options += `${key}=${params[key]}&`;
    } else if (typeof params[key] === 'object' && params[key] && params[key].length) {
        params[key].forEach(el => {
            options += `${key}=${el}&`;
     });
    }
  }
  return options ? options.slice(0, -1) : options;
 };

export const fetchTrainings = (page, searchTerm, tagFilters, isOnline, isInternal, provider, sortKey) => async dispatch => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    const response = await catsBackend.get(`/trainings/`, {
        params: {
            page: page,
            per_page: 10,
            text: searchTerm,
            tags: tagFilters,
            is_online: isOnline,
            is_internal: isInternal,
            provider: provider,
            sort: sortKey
        },
        paramsSerializer: params => transformRequestOptions(params)
    });
    dispatch({ type: "FETCH_TRAININGS", payload: response.data });
    dispatch({ type: "SET_IS_LOADING", payload: false });

}

export const fetchReviews = (id) => async dispatch => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    const response = await catsBackend.get(`/trainings/${id}/reviews`);
    dispatch({ type: "FETCH_REVIEWS", payload: response.data });
    dispatch({ type: "SET_IS_LOADING", payload: false });
}

export const setIsInternal = value => dispatch => {
    dispatch({
        type: 'SET_IS_INTERNAL',
        payload: value
    });
};

export const setIsOnline = value => dispatch => {
    dispatch({
        type: 'SET_IS_ONLINE',
        payload: value
    });
};

export const postReview = (trainingId, username, rating, review) => async dispatch => {
    // dispatch({ type: "SET_IS_LOADING", payload: true });
    const payload = {
        params: {
            username: username,
            rating: rating,
            review: review
        }
    };
    console.log(payload);
    const id = await catsBackend.post(`/trainings/${trainingId}/review`, null, payload);
};

export const addTagFilter = value => async dispatch => {
    dispatch({
        type: 'ADD_TAG_FILTER',
        payload: value
    });
};

export const clearTagFilters = () => async dispatch => {
    dispatch({ type: "CLEAR_TAG_FILTERS" });
};

export const setProvider = value => async dispatch => {
    dispatch({
        type: 'SET_PROVIDER',
        payload: value
    });
};

export const setSearchTerm = value => async dispatch => {
    dispatch({
        type: 'SET_SEARCH_TERM',
        payload: value
    });
};

export const setUser = user => async dispatch => {
    dispatch({
        type: 'LOGIN',
        payload: user
    })
}