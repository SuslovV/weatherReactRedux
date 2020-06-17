import React, { Component } from 'react';
import { connect } from 'react-redux';
import {WeatherView} from "./WeatherView";
 import {selectCity, weatherFetchData} from "../actions";

const API_URL = 'http://api.openweathermap.org/data/2.5/weather?';
const APP_ID = 'd8954c583ad1e899c3158485a5f7df54';

export const REGIONS = [
    {name: "Moscow,ru", zip: ""},
    {name: "Rome,it", zip: ""},
    {name: "London,uk", zip: ""}
];

interface IProps {
    region: string;
    weather: {
        temp: string;
        temp_min: number;
        temp_max: number;
        wind_speed: number;
    };
    isLoading: boolean;
    hasErrored: boolean;
    weatherFetchData:  Function;
    selectCity: Function;
}

 class _App extends Component<IProps, {}> {
     constructor(props: IProps) {
         super(props);
            this.handleChange = this.handleChange.bind(this);
     }

    componentDidUpdate(prevProps: IProps) {
        if (prevProps.region !== this.props.region) {
            const { weatherFetchData, region } = this.props;
            const url = `${API_URL}q=${region}&appid=${APP_ID}&mode=json&units=metric`;
            weatherFetchData(url);
        }
    }

    handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.props.selectCity(event.currentTarget.value)
    }

    render() {
        const {region, weather, hasErrored, isLoading} = this.props;
        return (
            <div>
                <h1>Weather in</h1>

                <form>
                    <input type="text" value={region} onChange={this.handleChange} list="regionList"/>
                    <datalist id="regionList">
                        {REGIONS.map((region, index) => (
                            <option value={region.name} key={index}/>
                        ))}
                    </datalist>
                </form>
                {hasErrored
                    ? <p>Sorry! There was an error loading the data </p>
                    : (isLoading
                    ? <p>Loading…</p>
                    :
                    <WeatherView
                    region={region}
                    weather={weather}
                    />
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const region = ownProps.match.params.region ? ownProps.match.params.region : state.region;
    return {
        region: region,
        weather: state.weather,
        hasErrored: state.hasErrored,
        isLoading: state.isLoading
    };
};

export const App =  connect(mapStateToProps, {selectCity, weatherFetchData})(_App);

