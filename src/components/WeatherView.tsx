import React, { Component } from 'react';

export interface WeatherViewProps {
    region: string;
    weather: {
        temp: string;
        temp_min: number;
        temp_max: number;
        wind_speed: number;
    };
}

export class WeatherView extends Component<WeatherViewProps, {}> {
    render() {
        const {weather} = this.props;
        return (
            <div>
                <div>
                    Температура: {weather.temp}
                </div>
                <div>
                    Температура min: {weather.temp_min}
                </div>
                <div>
                    Температура max: {weather.temp_max}
                </div>
                <div>
                    Скорость ветра: {weather.wind_speed}
                </div>
            </div>
        )
    }
}
