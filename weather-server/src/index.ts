#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import fetch from "node-fetch";
import { z } from "zod";

// Weather API configuration
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || "";
const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";

// Validation schemas
const GetCurrentWeatherSchema = z.object({
  location: z.string().describe("City name, state code and country code divided by comma"),
  units: z.enum(["metric", "imperial", "kelvin"]).default("metric").describe("Temperature units"),
});

const GetWeatherForecastSchema = z.object({
  location: z.string().describe("City name, state code and country code divided by comma"),
  days: z.number().min(1).max(5).default(3).describe("Number of days for forecast (1-5)"),
  units: z.enum(["metric", "imperial", "kelvin"]).default("metric").describe("Temperature units"),
});

const SearchLocationSchema = z.object({
  query: z.string().describe("Location search query"),
  limit: z.number().min(1).max(10).default(5).describe("Maximum number of results"),
});

// Types
interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  units: string;
  timestamp: string;
}

interface ForecastData {
  location: string;
  forecasts: Array<{
    date: string;
    temperature: {
      min: number;
      max: number;
    };
    description: string;
    humidity: number;
    windSpeed: number;
  }>;
  units: string;
}

interface LocationData {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

class WeatherMCPServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: "weather-mcp-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
  }

  private setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: "get_current_weather",
            description: "Get current weather information for a specific location",
            inputSchema: {
              type: "object",
              properties: {
                location: {
                  type: "string",
                  description: "City name, state code and country code divided by comma (e.g., 'London,UK' or 'New York,NY,US')",
                },
                units: {
                  type: "string",
                  enum: ["metric", "imperial", "kelvin"],
                  default: "metric",
                  description: "Temperature units (metric=Celsius, imperial=Fahrenheit, kelvin=Kelvin)",
                },
              },
              required: ["location"],
            },
          },
          {
            name: "get_weather_forecast",
            description: "Get weather forecast for a specific location",
            inputSchema: {
              type: "object",
              properties: {
                location: {
                  type: "string",
                  description: "City name, state code and country code divided by comma",
                },
                days: {
                  type: "number",
                  minimum: 1,
                  maximum: 5,
                  default: 3,
                  description: "Number of days for forecast (1-5)",
                },
                units: {
                  type: "string",
                  enum: ["metric", "imperial", "kelvin"],
                  default: "metric",
                  description: "Temperature units",
                },
              },
              required: ["location"],
            },
          },
          {
            name: "search_locations",
            description: "Search for locations by name to get accurate coordinates",
            inputSchema: {
              type: "object",
              properties: {
                query: {
                  type: "string",
                  description: "Location search query (city, state, country)",
                },
                limit: {
                  type: "number",
                  minimum: 1,
                  maximum: 10,
                  default: 5,
                  description: "Maximum number of results to return",
                },
              },
              required: ["query"],
            },
          },
        ] as Tool[],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case "get_current_weather":
            return await this.getCurrentWeather(args);
          case "get_weather_forecast":
            return await this.getWeatherForecast(args);
          case "search_locations":
            return await this.searchLocations(args);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        return {
          content: [
            {
              type: "text",
              text: `Error: ${errorMessage}`,
            },
          ],
        };
      }
    });
  }

  private async getCurrentWeather(args: any) {
    const { location, units } = GetCurrentWeatherSchema.parse(args);

    if (!OPENWEATHER_API_KEY) {
      throw new Error("OpenWeather API key not configured. Please set OPENWEATHER_API_KEY environment variable.");
    }

    const url = `${OPENWEATHER_BASE_URL}/weather?q=${encodeURIComponent(location)}&units=${units}&appid=${OPENWEATHER_API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Location "${location}" not found. Please check the spelling and try again.`);
      }
      throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as any;
    
    const weatherData: WeatherData = {
      location: `${data.name}, ${data.sys.country}`,
      temperature: Math.round(data.main.temp * 10) / 10,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      units: units,
      timestamp: new Date().toISOString(),
    };

    const unitsDisplay = units === "metric" ? "°C" : units === "imperial" ? "°F" : "K";
    const windUnits = units === "metric" ? "m/s" : "mph";

    return {
      content: [
        {
          type: "text",
          text: `**Current Weather for ${weatherData.location}**

🌡️ **Temperature:** ${weatherData.temperature}${unitsDisplay}
🌤️ **Condition:** ${weatherData.description}
💧 **Humidity:** ${weatherData.humidity}%
💨 **Wind Speed:** ${weatherData.windSpeed} ${windUnits}

*Updated: ${new Date(weatherData.timestamp).toLocaleString()}*`,
        },
      ],
    };
  }

  private async getWeatherForecast(args: any) {
    const { location, days, units } = GetWeatherForecastSchema.parse(args);

    if (!OPENWEATHER_API_KEY) {
      throw new Error("OpenWeather API key not configured. Please set OPENWEATHER_API_KEY environment variable.");
    }

    const url = `${OPENWEATHER_BASE_URL}/forecast?q=${encodeURIComponent(location)}&units=${units}&appid=${OPENWEATHER_API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Location "${location}" not found. Please check the spelling and try again.`);
      }
      throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as any;
    
    // Process forecast data (OpenWeather returns 5-day forecast with 3-hour intervals)
    const dailyForecasts = this.processForecastData(data.list, days);
    
    const forecastData: ForecastData = {
      location: `${data.city.name}, ${data.city.country}`,
      forecasts: dailyForecasts,
      units: units,
    };

    const unitsDisplay = units === "metric" ? "°C" : units === "imperial" ? "°F" : "K";
    const windUnits = units === "metric" ? "m/s" : "mph";

    let forecastText = `**${days}-Day Weather Forecast for ${forecastData.location}**\n\n`;
    
    forecastData.forecasts.forEach((forecast, index) => {
      forecastText += `**Day ${index + 1} - ${forecast.date}**\n`;
      forecastText += `🌡️ **Temperature:** ${forecast.temperature.min}${unitsDisplay} - ${forecast.temperature.max}${unitsDisplay}\n`;
      forecastText += `🌤️ **Condition:** ${forecast.description}\n`;
      forecastText += `💧 **Humidity:** ${forecast.humidity}%\n`;
      forecastText += `💨 **Wind Speed:** ${forecast.windSpeed} ${windUnits}\n\n`;
    });

    return {
      content: [
        {
          type: "text",
          text: forecastText.trim(),
        },
      ],
    };
  }

  private async searchLocations(args: any) {
    const { query, limit } = SearchLocationSchema.parse(args);

    if (!OPENWEATHER_API_KEY) {
      throw new Error("OpenWeather API key not configured. Please set OPENWEATHER_API_KEY environment variable.");
    }

    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=${limit}&appid=${OPENWEATHER_API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as any[];
    
    if (data.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `No locations found for "${query}". Please try a different search term.`,
          },
        ],
      };
    }

    const locations: LocationData[] = data.map(item => ({
      name: item.name,
      country: item.country,
      state: item.state,
      lat: item.lat,
      lon: item.lon,
    }));

    let locationsText = `**Found ${locations.length} location(s) for "${query}":**\n\n`;
    
    locations.forEach((location, index) => {
      const displayName = location.state 
        ? `${location.name}, ${location.state}, ${location.country}`
        : `${location.name}, ${location.country}`;
      
      locationsText += `${index + 1}. **${displayName}**\n`;
      locationsText += `   📍 Coordinates: ${location.lat.toFixed(4)}, ${location.lon.toFixed(4)}\n\n`;
    });

    return {
      content: [
        {
          type: "text",
          text: locationsText.trim(),
        },
      ],
    };
  }

  private processForecastData(forecastList: any[], days: number) {
    const dailyData = new Map<string, any[]>();
    
    // Group forecasts by date
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000).toISOString().split('T')[0];
      if (!dailyData.has(date)) {
        dailyData.set(date, []);
      }
      dailyData.get(date)!.push(item);
    });

    const dailyForecasts = [];
    let count = 0;
    
    for (const [date, forecasts] of dailyData.entries()) {
      if (count >= days) break;
      
      // Calculate daily aggregates
      const temps = forecasts.map(f => f.main.temp);
      const minTemp = Math.min(...temps);
      const maxTemp = Math.max(...temps);
      
      // Get most common weather description
      const descriptions = forecasts.map(f => f.weather[0].description);
      const mostCommon = descriptions.sort((a, b) =>
        descriptions.filter(v => v === a).length - descriptions.filter(v => v === b).length
      ).pop();
      
      // Average humidity and wind speed
      const avgHumidity = Math.round(forecasts.reduce((sum, f) => sum + f.main.humidity, 0) / forecasts.length);
      const avgWindSpeed = Math.round(forecasts.reduce((sum, f) => sum + f.wind.speed, 0) / forecasts.length * 10) / 10;

      dailyForecasts.push({
        date: new Date(date).toLocaleDateString(),
        temperature: {
          min: Math.round(minTemp * 10) / 10,
          max: Math.round(maxTemp * 10) / 10,
        },
        description: mostCommon || "Unknown",
        humidity: avgHumidity,
        windSpeed: avgWindSpeed,
      });
      
      count++;
    }
    
    return dailyForecasts;
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Weather MCP Server running on stdio");
  }
}

// Run the server
const server = new WeatherMCPServer();
server.run().catch(console.error);