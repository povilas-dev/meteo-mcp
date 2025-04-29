const METEO_API_BASE = "https://api.meteo.lt/v1/";
const USER_AGENT = "meteo-mcp/1.0";

type Coordinates = {
  latitude: number;
  longitude: number;
};

type Place = {
  code: string;
  name: string;
  administrativeDivision: string;
  country?: string;
  countryCode: string; //  (ISO 3166-1 alpha-2).
  coordinates: Coordinates; //  (WGS 84 dešimtainiais laipsniais).
};

type ForecastType = {
  type: 'long-term';
  description: string;
};

type ForecastResponse = {
  place: Place;
  forecastTypes: ForecastType[];
};

type ConditionCode =
  | 'clear'
  | 'partly-cloudy'
  | 'cloudy-with-sunny-intervals'
  | 'cloudy'
  | 'light-rain'
  | 'rain'
  | 'heavy-rain'
  | 'thunder'
  | 'isolated-thunderstorms'
  | 'thunderstorms'
  | 'heavy-rain-with-thunderstorms'
  | 'light-sleet'
  | 'sleet'
  | 'freezing-rain'
  | 'hail'
  | 'light-snow'
  | 'snow'
  | 'heavy-snow'
  | 'fog'
  | 'null';

type ForecastTimestamp = {
  forecastTimeUtc: string;
  airTemperature: number;
  feelsLikeTemperature: number;
  windSpeed: number;
  windGust: number;
  windDirection: number;
  cloudCover: number;
  seaLevelPressure: number;
  relativeHumidity: number;
  totalPrecipitation: number;
  conditionCode: ConditionCode;
};

type WeatherForecast = {
  place: Place;
  forecastType: string;
  forecastCreationTimeUtc: string;
  forecastTimestamps: ForecastTimestamp[];
};

async function getPlaces(placeCode?: string): Promise<Place | Place[]> {
  try {
    const url = `${METEO_API_BASE}places/${placeCode ?? ''}`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch places: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching places:', error);
    throw error;
  }
}

async function getForecasts(placeCode: string): Promise<ForecastResponse> {
  try {
    const url = `${METEO_API_BASE}places/${placeCode}/forecasts`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch forecasts: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching forecasts:', error);
    throw error;
  }
}

async function getWeatherForecast(placeCode: string, forecastType: string = 'long-term'): Promise<WeatherForecast> {
  try {
    const url = `${METEO_API_BASE}places/${placeCode}/forecasts/${forecastType}`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch weather forecast: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw error;
  }
}

export const meteo = {
  getPlaces,
  getForecasts,
  getWeatherForecast
};

export type {
  Place,
  ForecastResponse,
  WeatherForecast,
  ForecastTimestamp,
  ConditionCode
};
