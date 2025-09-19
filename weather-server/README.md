# Weather MCP Server

A Model Context Protocol (MCP) server that provides weather information through REST API integration with OpenWeatherMap.

## Features

- **Current Weather**: Get real-time weather data for any location
- **Weather Forecast**: Get 1-5 day weather forecasts
- **Location Search**: Find locations by name with coordinates
- **Multiple Units**: Support for metric (Celsius), imperial (Fahrenheit), and Kelvin
- **Comprehensive Data**: Temperature, humidity, wind speed, weather conditions

## Prerequisites

- Node.js 18+ 
- OpenWeatherMap API key (free at [openweathermap.org](https://openweathermap.org/api))

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up your OpenWeatherMap API key:
```bash
export OPENWEATHER_API_KEY=your_api_key_here
```

3. Build the server:
```bash
npm run build
```

## Usage

### Running the Server

```bash
# Development mode
npm run dev

# Production mode
npm run start
```

### Available Tools

#### 1. get_current_weather
Get current weather information for a specific location.

**Parameters:**
- `location` (string, required): City name, state code and country code divided by comma (e.g., "London,UK" or "New York,NY,US")
- `units` (string, optional): Temperature units - "metric" (default), "imperial", or "kelvin"

**Example:**
```json
{
  "name": "get_current_weather",
  "arguments": {
    "location": "Paris,FR",
    "units": "metric"
  }
}
```

#### 2. get_weather_forecast
Get weather forecast for a specific location.

**Parameters:**
- `location` (string, required): City name, state code and country code divided by comma
- `days` (number, optional): Number of days for forecast (1-5, default: 3)
- `units` (string, optional): Temperature units - "metric" (default), "imperial", or "kelvin"

**Example:**
```json
{
  "name": "get_weather_forecast",
  "arguments": {
    "location": "Tokyo,JP",
    "days": 5,
    "units": "metric"
  }
}
```

#### 3. search_locations
Search for locations by name to get accurate coordinates.

**Parameters:**
- `query` (string, required): Location search query (city, state, country)
- `limit` (number, optional): Maximum number of results to return (1-10, default: 5)

**Example:**
```json
{
  "name": "search_locations",
  "arguments": {
    "query": "Springfield",
    "limit": 3
  }
}
```

## Configuration

### Environment Variables

- `OPENWEATHER_API_KEY`: Your OpenWeatherMap API key (required)

### Location Format

For best results, use the following format for locations:
- City name only: "London"
- City and country: "London,UK"
- City, state, and country: "New York,NY,US"

## Error Handling

The server handles various error conditions:
- Invalid API key
- Location not found
- Network errors
- Rate limiting
- Invalid parameters

All errors are returned as descriptive text messages to help with troubleshooting.

## Development

### Building
```bash
npm run build
```

### Watching for Changes
```bash
npm run watch
```

### Cleaning Build Files
```bash
npm run clean
```

## API Reference

This server uses the OpenWeatherMap API:
- Current Weather API: `https://api.openweathermap.org/data/2.5/weather`
- 5-Day Forecast API: `https://api.openweathermap.org/data/2.5/forecast`
- Geocoding API: `https://api.openweathermap.org/geo/1.0/direct`

## License

MIT License