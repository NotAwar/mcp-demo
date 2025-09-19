# Weather MCP Agent

A comprehensive Model Context Protocol agent that provides real-time weather data, forecasting, and location services through the OpenWeatherMap API. This agent demonstrates professional-grade API integration with robust error handling, input validation, and flexible data formatting.

## 🌤️ Agent Overview

**Name:** `weather-mcp-server`  
**Version:** `1.0.0`  
**Protocol:** Model Context Protocol (MCP)  
**Data Source:** OpenWeatherMap API  
**Transport:** JSON-RPC over stdio

## 🔧 Available Tools

### 1. get_current_weather
Get real-time weather conditions for any global location.

**Input Parameters:**
- `location` (required): City name, state/country codes (e.g., "London,UK", "New York,NY,US")
- `units` (optional): Temperature units - "metric" (default), "imperial", or "kelvin"

**Example Usage:**
```json
{
  "name": "get_current_weather",
  "arguments": {
    "location": "Tokyo,JP",
    "units": "metric"
  }
}
```

**Response Format:**
- Current temperature, weather description
- Humidity percentage and wind speed
- Location coordinates and timestamp
- Human-readable formatted output with emojis

### 2. get_weather_forecast
Retrieve weather forecasts for 1-5 days ahead.

**Input Parameters:**
- `location` (required): City name with optional state/country codes
- `days` (optional): Number of forecast days (1-5, default: 3)
- `units` (optional): Temperature units - "metric" (default), "imperial", or "kelvin"

**Example Usage:**
```json
{
  "name": "get_weather_forecast",
  "arguments": {
    "location": "Barcelona,ES",
    "days": 5,
    "units": "metric"
  }
}
```

**Response Format:**
- Daily forecasts with min/max temperatures
- Weather descriptions and conditions
- Humidity and wind data for each day
- Formatted timeline with clear date labels

### 3. search_locations
Find and validate geographic locations with coordinates.

**Input Parameters:**
- `query` (required): Location search term (city, landmark, address)
- `limit` (optional): Maximum results to return (1-10, default: 5)

**Example Usage:**
```json
{
  "name": "search_locations",
  "arguments": {
    "query": "Springfield",
    "limit": 10
  }
}
```

**Response Format:**
- List of matching locations with full names
- Geographic coordinates (latitude/longitude)
- Country and state/region information
- Disambiguation for common place names

## 🚀 Agent Setup

### Prerequisites
- Node.js 18 or higher
- OpenWeatherMap API key (free at [openweathermap.org](https://openweathermap.org/api))

### Installation
```bash
cd weather-server
npm install
```

### Configuration
Set your OpenWeatherMap API key:
```bash
export OPENWEATHER_API_KEY=your_api_key_here
```

### Build and Run
```bash
# Build the agent
npm run build

# Development mode with auto-rebuild
npm run dev

# Production mode
npm run start
```

## 🔍 API Integration Details

### OpenWeatherMap APIs Used
- **Current Weather:** `https://api.openweathermap.org/data/2.5/weather`
- **5-Day Forecast:** `https://api.openweathermap.org/data/2.5/forecast`
- **Geocoding:** `https://api.openweathermap.org/geo/1.0/direct`

### Data Processing
- Temperature unit conversion and display
- Weather condition mapping to human-readable descriptions
- Timestamp formatting for local readability
- Geographic coordinate precision rounding

### Error Handling
- Invalid API key detection and messaging
- Location not found graceful handling
- Network error recovery and reporting
- Rate limiting awareness and user feedback
- Input validation with descriptive error messages

## 🎯 Use Cases

### Travel Planning
- "What's the weather like in my destination?"
- "Should I pack warm clothes for next week in London?"
- "Is it going to rain during my weekend trip?"

### Location Intelligence
- "Find all the Springfields in the United States"
- "What are the coordinates of Times Square?"
- "Which Cambridge - UK or Massachusetts?"

### Weather Monitoring
- "Give me a 5-day forecast for my location"
- "What's the current temperature in both Celsius and Fahrenheit?"
- "How windy is it going to be tomorrow?"

## 📊 Response Examples

### Current Weather Response
```
🌤️ **Current Weather for Tokyo, JP**

🌡️ **Temperature:** 22°C (feels like 24°C)
☁️ **Conditions:** Partly cloudy
💧 **Humidity:** 65%
💨 **Wind:** 12 km/h from the SW
📍 **Coordinates:** 35.6762, 139.6503
🕒 **Updated:** 2024-01-15 14:30 JST
```

### Forecast Response
```
🌦️ **5-Day Weather Forecast for Barcelona, ES**

📅 **Monday, Jan 15**
   🌡️ 18°C - 24°C | ☀️ Sunny
   💧 45% humidity | 💨 8 km/h wind

📅 **Tuesday, Jan 16**
   🌡️ 16°C - 22°C | 🌤️ Partly cloudy
   💧 52% humidity | 💨 12 km/h wind
   
[... additional days ...]
```

## 🛠️ Development

### Code Structure
- **Server Setup:** MCP server initialization with tool capabilities
- **Tool Handlers:** Request routing and parameter validation
- **API Clients:** OpenWeatherMap API integration functions
- **Data Formatters:** Response formatting and emoji enhancement
- **Error Management:** Comprehensive error handling and user messaging

### Dependencies
- `@modelcontextprotocol/sdk` - Core MCP functionality
- `node-fetch` - HTTP client for API requests
- `zod` - Runtime type validation and schema definition
- `typescript` - Type safety and modern JavaScript features

### Extending the Agent
To add new weather-related capabilities:
1. Define new tool schema in the tools array
2. Add request handler case in the switch statement
3. Implement data fetching and formatting functions
4. Update type definitions and validation schemas

## 🔒 Security & Privacy

### API Key Security
- Environment variable storage (never hardcoded)
- No API keys logged or exposed in responses
- Graceful degradation when keys are missing

### Data Privacy
- No user location data stored or logged
- API requests contain only necessary parameters
- Response data is ephemeral and not cached

### Rate Limiting
- Respects OpenWeatherMap API rate limits
- Clear error messages when limits are exceeded
- Guidance for users on API usage best practices

## 📚 Resources

- [OpenWeatherMap API Documentation](https://openweathermap.org/api)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Weather Agent Examples](../EXAMPLES.md#weather-server-examples)