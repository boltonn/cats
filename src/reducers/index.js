import { combineReducers } from "redux";
import trainingsReducer from "./trainingsReducer";
import LoadingReducer from "./LoadingReducer";
import reviewsReducer from "./reviewsReducer";
import isOnlineReducer from "./isOnlineReducer";
import isInternalReducer from "./isInternalReducer";
import tagFiltersReducer from "./tagFiltersReducer";
import providerReducer from "./providerReducer";
import searchTermReducer from "./searchTermReducer";


export default combineReducers({
    trainings: trainingsReducer,
    isLoading: LoadingReducer,
    reviews: reviewsReducer,
    isOnline: isOnlineReducer,
    isInternal: isInternalReducer,
    tagFilters: tagFiltersReducer,
    provider: providerReducer,
    searchTerm: searchTermReducer
});