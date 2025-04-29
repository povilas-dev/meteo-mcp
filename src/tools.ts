import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { meteoApi } from "./meteo-api.js";
import { z } from "zod";

export const addMeteoTools = (server: McpServer) => {

  server.tool('getMeteoPlaces','Gets the places listed on Lithuanian weather service "meteo". Using the returned place code, you can get the weather forecast for that place.',{
    placeCode: z.string().optional(),
  }, async ({ placeCode}) => {
    const places = await meteoApi.getPlaces(placeCode);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(places),
        },
      ],
    };
  });

  server.tool('getMeteoForecasts', 'Gets available forecast types for a specific place in Lithuania. This helps determine what types of forecasts are available for a given location.', {
    placeCode: z.string(),
  }, async ({ placeCode }) => {
    const forecasts = await meteoApi.getForecasts(placeCode);

    return {
      content: [
        {
          type: "text",
            text: JSON.stringify(forecasts),
        },
      ],
    };
  });

  server.tool('getMeteoWeatherForecast', 'Gets detailed weather forecast for a specific place in Lithuania. Returns temperature, wind, precipitation, and other weather conditions.', {
    placeCode: z.string(),
    forecastType: z.string().optional(),
  }, async ({ placeCode, forecastType }) => {
    const weatherForecast = await meteoApi.getWeatherForecast(placeCode, forecastType);

    return {
      content: [
        {
          type: "text",
            text: JSON.stringify(weatherForecast),
          },
      ],
    };
  });


};
