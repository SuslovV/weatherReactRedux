import { combineReducers } from 'redux'
import {
    SELECT_CITY, WEATHER_FETCH_DATA_SUCCESS, WEATHER_HAS_ERRORED, WEATHER_IS_LOADING
} from '../actions'

export function selectedCity(state: string = '', action)  {
    switch (action.type) {
        case SELECT_CITY:
            return action.region
        default:
            return state
    }
}

export function weatherHasErrored(state = false, action) {
    switch (action.type) {
        case WEATHER_HAS_ERRORED:
            return action.hasErrored;

        default:
            return state;
    }
}

export function weatherIsLoading(state = false, action) {
    switch (action.type) {
        case WEATHER_IS_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}

const postsWeather = (state = { }, action) => {
    switch (action.type) {
        case WEATHER_FETCH_DATA_SUCCESS:
            return action.weather;

        default:
            return state;
    }
}

export interface StoreState {
    region: string;
    hasErrored: boolean;
    isLoading: boolean;
    weather: {
        temp: string;
    };
}

const rootReducer = combineReducers<StoreState>({
    region: selectedCity,
    hasErrored: weatherHasErrored,
    isLoading: weatherIsLoading,
    weather: postsWeather
})

export default rootReducer
