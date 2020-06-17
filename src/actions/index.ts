export const SELECT_CITY = 'SELECT_CITY'
export const WEATHER_IS_LOADING = 'WEATHER_IS_LOADING'
export const WEATHER_HAS_ERRORED = 'WEATHER_HAS_ERRORED'
export const WEATHER_FETCH_DATA_SUCCESS = 'WEATHER_FETCH_DATA_SUCCESS'

export function selectCity(region: string) {
    return {
        type: 'SELECT_CITY',
        region: region
    };
}

export function weatherHasErrored(bool: boolean) {
    return {
        type: 'WEATHER_HAS_ERRORED',
        hasErrored: bool
    };
}

export function weatherIsLoading(bool: boolean) {
    return {
        type: 'WEATHER_IS_LOADING',
        isLoading: bool
    };
}

export function weatherFetchDataSuccess(weather: {}) {
    return {
        type: 'WEATHER_FETCH_DATA_SUCCESS',
        weather: {
            temp: weather.main.temp,
            temp_min: weather.main.temp_min,
            temp_max: weather.main.temp_max,
            wind_speed: weather.wind.speed
        }
    };
}

export function weatherFetchData(url: string) {
    return (dispatch) => {
        dispatch(weatherHasErrored(false));
        dispatch(weatherIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(weatherIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((weather) => dispatch(weatherFetchDataSuccess(weather)))
            .catch(() => dispatch(weatherHasErrored(true)));
    };
}
