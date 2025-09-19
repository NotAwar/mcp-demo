# MCP Demo Agents

This repository contains two powerful Model Context Protocol (MCP) agents that provide real-world data access for AI assistants and applications. These agents demonstrate how to build production-ready MCP servers with comprehensive API integrations, error handling, and filtering capabilities.

## 🤖 Available Agents

### 🌤️ Weather Agent
**Location:** `weather-server/`  
**Purpose:** Provides comprehensive weather data and forecasting capabilities  
**Data Source:** OpenWeatherMap API

The Weather Agent gives AI systems access to:
- Real-time weather conditions for any global location
- 1-5 day weather forecasts with detailed meteorological data
- Location search and geocoding services
- Multi-unit support (Celsius, Fahrenheit, Kelvin)

### 🏠 Airbnb Agent  
**Location:** `airbnb-server/`  
**Purpose:** Enables accommodation search and location intelligence  
**Data Source:** Mock data service (demonstrates real-world API patterns)

The Airbnb Agent provides AI systems with:
- Advanced accommodation search with comprehensive filtering
- Detailed property information and amenities
- Neighborhood discovery and insights
- Pricing and availability data

## 🚀 Quick Agent Setup

### Prerequisites
- Node.js 18+
- OpenWeatherMap API key (required for Weather Agent)
- OpenCage API key (optional, improves Airbnb Agent location accuracy)

### Installation
```bash
# Clone and install
git clone https://github.com/NotAwar/mcp-demo.git
cd mcp-demo
npm run install-all

# Configure API keys
export OPENWEATHER_API_KEY=your_openweather_api_key
export OPENCAGE_API_KEY=your_opencage_api_key  # optional

# Build agents
npm run build

# Run in development mode
npm run dev
```

## 🔧 Agent Integration

### Claude Desktop Integration
1. Copy `claude_desktop_config.json` to your Claude Desktop config directory
2. Update paths to match your installation
3. Set environment variables for API keys
4. Restart Claude Desktop

### JSON-RPC Usage
Each agent runs as a standalone MCP server that accepts JSON-RPC requests over stdio:

```bash
# Weather Agent
cd weather-server
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' | node build/index.js

# Airbnb Agent  
cd airbnb-server
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' | node build/index.js
```

## 🛠️ Agent Capabilities

### Weather Agent Tools
- **get_current_weather** - Current conditions for any location
- **get_weather_forecast** - Multi-day forecasts with customizable duration
- **search_locations** - Find and validate geographic locations

### Airbnb Agent Tools
- **search_airbnb_listings** - Find accommodations with advanced filters
- **get_listing_details** - Comprehensive property information  
- **search_neighborhoods** - Discover popular areas and pricing insights

## 🎯 Use Cases

### Weather Agent
- Travel planning with weather forecasts
- Location-based recommendations
- Weather-aware scheduling and alerts
- Geographic data validation

### Airbnb Agent
- Accommodation discovery and booking research
- Travel itinerary planning
- Market analysis for property investments
- Neighborhood exploration and insights

## 🔍 Technical Details

### Architecture
- **Protocol:** Model Context Protocol (MCP) specification
- **Transport:** JSON-RPC over stdio
- **Language:** TypeScript with Node.js runtime
- **Validation:** Zod schemas for type safety
- **Error Handling:** Comprehensive error management with user-friendly messages

### Data Flow
1. AI assistant sends JSON-RPC request to MCP server
2. Agent validates input parameters using Zod schemas
3. Agent fetches data from external APIs (OpenWeatherMap, geocoding)
4. Agent processes and formats response data
5. Agent returns structured response to AI assistant

### Response Format
All agents return responses in the MCP standard format:
```json
{
  "content": [
    {
      "type": "text", 
      "text": "Formatted response data"
    }
  ]
}
```

## 📚 Documentation

- **Main README:** `/README.md` - Repository overview and setup
- **Weather Agent:** `/weather-server/AGENTS.md` - Detailed weather agent documentation
- **Airbnb Agent:** `/airbnb-server/AGENTS.md` - Detailed Airbnb agent documentation
- **Examples:** `/EXAMPLES.md` - JSON-RPC usage examples and integration guides

## 🤝 Contributing

Contributions welcome! These agents serve as examples for building MCP servers. Consider:
- Adding new data sources and APIs
- Enhancing existing agent capabilities
- Improving error handling and validation
- Creating additional MCP agents

## 📄 License

MIT License - Use these agents as foundations for your own MCP server implementations.