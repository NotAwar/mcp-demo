# MCP Servers Usage Examples

This file contains example JSON-RPC requests to test both MCP servers.

## Weather Server Examples

### 1. Get Current Weather
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "get_current_weather",
    "arguments": {
      "location": "Paris,FR",
      "units": "metric"
    }
  }
}
```

### 2. Get Weather Forecast
```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "get_weather_forecast",
    "arguments": {
      "location": "New York,NY,US",
      "days": 5,
      "units": "imperial"
    }
  }
}
```

### 3. Search Locations
```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "search_locations",
    "arguments": {
      "query": "Springfield",
      "limit": 3
    }
  }
}
```

## Airbnb Server Examples

### 1. Search Listings
```json
{
  "jsonrpc": "2.0",
  "id": 4,
  "method": "tools/call",
  "params": {
    "name": "search_airbnb_listings",
    "arguments": {
      "location": "Barcelona",
      "checkin": "2024-12-15",
      "checkout": "2024-12-22",
      "guests": 4,
      "priceMin": 80,
      "priceMax": 200,
      "propertyType": "apartment",
      "instantBook": true
    }
  }
}
```

### 2. Get Listing Details
```json
{
  "jsonrpc": "2.0",
  "id": 5,
  "method": "tools/call",
  "params": {
    "name": "get_listing_details",
    "arguments": {
      "listingId": "listing_1_1634567890"
    }
  }
}
```

### 3. Search Neighborhoods
```json
{
  "jsonrpc": "2.0",
  "id": 6,
  "method": "tools/call",
  "params": {
    "name": "search_neighborhoods",
    "arguments": {
      "location": "Amsterdam",
      "limit": 5
    }
  }
}
```

## List Available Tools

To see all available tools for any server:

```json
{
  "jsonrpc": "2.0",
  "id": 7,
  "method": "tools/list",
  "params": {}
}
```

## Testing with Command Line

You can test the servers directly using echo and pipes:

### Weather Server Test
```bash
cd weather-server
export OPENWEATHER_API_KEY=your_key_here
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' | node build/index.js
```

### Airbnb Server Test
```bash
cd airbnb-server
export OPENCAGE_API_KEY=your_key_here  # optional
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' | node build/index.js
```

## Integration with Claude Desktop

1. Copy the `claude_desktop_config.json` to your Claude Desktop configuration directory
2. Update the paths to point to your actual installation
3. Add your API keys to the environment variables
4. Restart Claude Desktop
5. The tools will be available in your Claude conversations

## Common Use Cases

### Weather Server
- "What's the weather like in Tokyo?"
- "Give me a 5-day forecast for London"
- "Find all the Springfields in the US"

### Airbnb Server  
- "Find apartments in Barcelona for 4 people under $200/night"
- "Show me details for listing_1_1634567890"
- "What are the best neighborhoods in Paris for Airbnb?"
- "Find instant book properties in Amsterdam"