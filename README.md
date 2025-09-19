# MCP Demo - Weather & Airbnb Servers

A collection of Model Context Protocol (MCP) servers that provide access to weather data and Airbnb location information through REST API integrations. This repository demonstrates how to build functional MCP servers with comprehensive filtering, error handling, and documentation.

## 🌟 Features

This repository contains two fully functional MCP servers:

### 🌤️ Weather Server
- **Current Weather**: Real-time weather data for any location worldwide
- **Weather Forecasts**: 1-5 day weather predictions with detailed information
- **Location Search**: Find and validate locations with coordinates
- **Multiple Units**: Support for Celsius, Fahrenheit, and Kelvin
- **OpenWeatherMap Integration**: Uses official weather API

### 🏠 Airbnb Server  
- **Listing Search**: Find accommodations with advanced filtering
- **Property Details**: Comprehensive listing information
- **Neighborhood Discovery**: Explore popular areas with pricing insights
- **Advanced Filters**: Price range, property type, guests, dates, instant booking
- **Mock Data Service**: Demonstrates functionality with realistic data

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **OpenWeatherMap API Key** - [Get free key](https://openweathermap.org/api)
- **OpenCage API Key** (optional) - [Get free key](https://opencagedata.com/) for better location accuracy in Airbnb server

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/NotAwar/mcp-demo.git
cd mcp-demo
```

2. **Install dependencies:**
```bash
npm run install-all
```

3. **Set up environment variables:**
```bash
# Required for Weather Server
export OPENWEATHER_API_KEY=your_openweather_api_key

# Optional for Airbnb Server (improves location accuracy)
export OPENCAGE_API_KEY=your_opencage_api_key
```

4. **Build both servers:**
```bash
npm run build
```

5. **Start the servers:**
```bash
# Run both servers in development mode
npm run dev

# Or run them individually
cd weather-server && npm run dev
cd airbnb-server && npm run dev
```

## 📁 Project Structure

```
mcp-demo/
├── README.md                 # This file - main documentation
├── package.json              # Workspace configuration
├── .gitignore               # Git ignore rules
├── weather-server/          # Weather MCP Server
│   ├── package.json         # Weather server dependencies
│   ├── tsconfig.json        # TypeScript configuration
│   ├── README.md            # Weather server documentation
│   ├── src/
│   │   └── index.ts         # Weather server implementation
│   └── build/               # Compiled JavaScript (generated)
└── airbnb-server/           # Airbnb MCP Server
    ├── package.json         # Airbnb server dependencies
    ├── tsconfig.json        # TypeScript configuration
    ├── README.md            # Airbnb server documentation
    ├── src/
    │   └── index.ts         # Airbnb server implementation
    └── build/               # Compiled JavaScript (generated)
```

## 🔧 Available Commands

### Workspace Commands (run from root)
```bash
npm run build          # Build all servers
npm run dev            # Run all servers in development mode
npm run start          # Run all servers in production mode
npm run clean          # Clean all build directories
npm run install-all    # Install all dependencies
```

### Individual Server Commands
```bash
cd weather-server      # or airbnb-server
npm run build          # Build this server
npm run dev            # Run in development mode
npm run start          # Run in production mode
npm run clean          # Clean build directory
npm run watch          # Watch for changes and rebuild
```

## 🌤️ Weather Server Usage

The Weather Server provides three main tools:

### get_current_weather
```json
{
  "name": "get_current_weather",
  "arguments": {
    "location": "Paris,FR",
    "units": "metric"
  }
}
```

### get_weather_forecast
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

### search_locations
```json
{
  "name": "search_locations",
  "arguments": {
    "query": "Springfield",
    "limit": 5
  }
}
```

[→ See detailed Weather Server documentation](./weather-server/README.md)

## 🏠 Airbnb Server Usage

The Airbnb Server provides three main tools:

### search_airbnb_listings
```json
{
  "name": "search_airbnb_listings",
  "arguments": {
    "location": "Barcelona",
    "checkin": "2024-06-15",
    "checkout": "2024-06-22",
    "guests": 4,
    "priceMin": 80,
    "priceMax": 200,
    "propertyType": "apartment",
    "instantBook": true
  }
}
```

### get_listing_details
```json
{
  "name": "get_listing_details",
  "arguments": {
    "listingId": "listing_1_1634567890"
  }
}
```

### search_neighborhoods
```json
{
  "name": "search_neighborhoods",
  "arguments": {
    "location": "Amsterdam",
    "limit": 5
  }
}
```

[→ See detailed Airbnb Server documentation](./airbnb-server/README.md)

## 🔐 Configuration

### Environment Variables

| Variable | Required | Description | Where to get |
|----------|----------|-------------|--------------|
| `OPENWEATHER_API_KEY` | Yes (Weather) | OpenWeatherMap API key | [openweathermap.org](https://openweathermap.org/api) |
| `OPENCAGE_API_KEY` | No (Airbnb) | Geocoding API for location accuracy | [opencagedata.com](https://opencagedata.com/) |

### Setting Environment Variables

**Linux/macOS:**
```bash
export OPENWEATHER_API_KEY=your_key_here
export OPENCAGE_API_KEY=your_key_here
```

**Windows (PowerShell):**
```powershell
$env:OPENWEATHER_API_KEY="your_key_here"
$env:OPENCAGE_API_KEY="your_key_here"
```

**Windows (Command Prompt):**
```cmd
set OPENWEATHER_API_KEY=your_key_here
set OPENCAGE_API_KEY=your_key_here
```

## 🧪 Testing the Servers

### Manual Testing

1. **Build and start a server:**
```bash
cd weather-server
npm run build
npm run start
```

2. **Test with MCP client** or send JSON-RPC requests to stdin

3. **Example JSON-RPC request:**
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "get_current_weather",
    "arguments": {
      "location": "London,UK",
      "units": "metric"
    }
  }
}
```

### Integration Testing

Both servers can be integrated into MCP-compatible applications like:
- Claude Desktop
- Custom MCP clients
- IDE extensions
- Chatbot frameworks

## 🛠️ Development

### Adding New Features

1. **Modify the TypeScript source** in `src/index.ts`
2. **Update the schema** and tool definitions
3. **Build and test** your changes
4. **Update documentation** as needed

### Code Structure

Both servers follow the same pattern:
- **Server Setup**: MCP server initialization with capabilities
- **Tool Registration**: Define available tools and schemas
- **Request Handling**: Process tool calls and return formatted responses
- **Error Handling**: Comprehensive error management
- **Data Processing**: Transform API responses into user-friendly formats

### Dependencies

Key dependencies used across both servers:
- **@modelcontextprotocol/sdk**: Core MCP functionality
- **node-fetch**: HTTP requests to external APIs
- **zod**: Runtime type validation and schema definition
- **TypeScript**: Type safety and modern JavaScript features

## 🚨 Troubleshooting

### Common Issues

**"API key not configured"**
- Solution: Set the required environment variable for the API key

**"Location not found"**
- Solution: Check spelling, try different format (e.g., "City,Country")

**"Build errors"**
- Solution: Run `npm install` and ensure Node.js 18+ is installed

**"Permission denied"**
- Solution: Check file permissions and ensure proper npm installation

### Getting Help

1. Check the individual server README files
2. Verify all environment variables are set correctly
3. Ensure dependencies are installed with `npm run install-all`
4. Check that you're using Node.js 18 or higher

## 📄 License

MIT License - feel free to use this code for your own MCP server projects!

## 🤝 Contributing

Contributions are welcome! Please feel free to:
- Add new MCP servers
- Improve existing functionality
- Enhance documentation
- Fix bugs or add tests

## 🔗 Related Resources

- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [MCP SDK Documentation](https://github.com/modelcontextprotocol/typescript-sdk)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [OpenCage Geocoding API](https://opencagedata.com/)