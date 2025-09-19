# Airbnb MCP Agent

A sophisticated Model Context Protocol agent that provides accommodation search, property details, and neighborhood intelligence through a comprehensive mock data service. This agent demonstrates advanced filtering capabilities, realistic data generation, and location-based services for travel and hospitality applications.

## 🏠 Agent Overview

**Name:** `airbnb-mcp-server`  
**Version:** `1.0.0`  
**Protocol:** Model Context Protocol (MCP)  
**Data Source:** Intelligent mock data service (demonstrates real-world API patterns)  
**Transport:** JSON-RPC over stdio

## 🔧 Available Tools

### 1. search_airbnb_listings
Search for accommodations with comprehensive filtering options.

**Input Parameters:**
- `location` (required): City or location to search (e.g., "Paris", "New York", "Tokyo")
- `checkin` (optional): Check-in date in YYYY-MM-DD format
- `checkout` (optional): Check-out date in YYYY-MM-DD format  
- `guests` (optional): Number of guests (1-16, default: 2)
- `priceMin` (optional): Minimum price per night in local currency
- `priceMax` (optional): Maximum price per night in local currency
- `propertyType` (optional): Property type - "any" (default), "apartment", "house", "unique", "hotel"
- `instantBook` (optional): Only show instant book properties (default: false)

**Example Usage:**
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

**Response Format:**
- List of matching properties with key details
- Pricing, ratings, and availability information
- Property type, bedroom/bathroom counts
- Host information and response rates
- Quick overview with essential booking details

### 2. get_listing_details
Retrieve comprehensive information about a specific property.

**Input Parameters:**
- `listingId` (required): Unique listing identifier from search results

**Example Usage:**
```json
{
  "name": "get_listing_details",
  "arguments": {
    "listingId": "listing_1_1634567890"
  }
}
```

**Response Format:**
- Complete property description and amenities
- Detailed ratings breakdown (cleanliness, location, value, etc.)
- Host profile with superhost status and response metrics
- Full pricing details and booking policies
- Property rules and minimum stay requirements
- Virtual tour information and photo count

### 3. search_neighborhoods
Discover popular neighborhoods with accommodation insights.

**Input Parameters:**
- `location` (required): City or location to explore neighborhoods
- `limit` (optional): Maximum neighborhoods to return (1-20, default: 10)

**Example Usage:**
```json
{
  "name": "search_neighborhoods",
  "arguments": {
    "location": "Amsterdam",
    "limit": 8
  }
}
```

**Response Format:**
- Neighborhood names and descriptions
- Average pricing and listing availability
- Area highlights and attractions
- Geographic coordinates and boundaries
- Local insights and travel recommendations

## 🚀 Agent Setup

### Prerequisites
- Node.js 18 or higher
- OpenCage API key (optional, improves location accuracy - free at [opencagedata.com](https://opencagedata.com/))

### Installation
```bash
cd airbnb-server
npm install
```

### Configuration
Optionally set OpenCage API key for enhanced location accuracy:
```bash
export OPENCAGE_API_KEY=your_api_key_here
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

## 🔍 Data Service Details

### Mock Data Implementation
Since Airbnb doesn't provide a public API, this agent uses intelligent mock data generation:

- **Realistic Properties:** Generated based on actual location characteristics
- **Accurate Filtering:** All search filters work precisely with generated data
- **Consistent Results:** Same search parameters return consistent listings
- **Location Intelligence:** Properties reflect real neighborhood characteristics
- **Pricing Models:** Realistic pricing based on location and property type

### Location Data Sources
- **With API Key:** Uses OpenCage Geocoding for precise coordinates
- **Without API Key:** Falls back to built-in coordinates for major cities
- **Supported Cities:** Paris, London, New York, Tokyo, Barcelona, Amsterdam, Berlin, Rome, Lisbon, Prague, and more

### Data Generation Features
- Property types matched to location characteristics
- Amenities relevant to property type and location
- Realistic host profiles with appropriate response rates
- Pricing that reflects actual market conditions
- Reviews and ratings with authentic distributions

## 🎯 Use Cases

### Travel Planning
- "Find family-friendly apartments in Barcelona under €150/night"
- "Show me unique properties in Tokyo for 2 guests"
- "What are the best neighborhoods in Paris for first-time visitors?"

### Accommodation Research
- "Compare instant book vs. regular properties in Amsterdam"
- "Find spacious houses in London for a group of 8"
- "Show me luxury accommodations with pools in Rome"

### Market Analysis
- "What's the average price range in different Berlin neighborhoods?"
- "Which areas have the most available properties?"
- "Compare amenities offered across different property types"

## 📊 Response Examples

### Search Results Response
```
🏠 **Found 12 Airbnb listings in Barcelona**

🏢 **Modern Apartment in Eixample** ⭐ 4.8/5 (127 reviews)
   💰 €145/night | 👥 4 guests | 🛏️ 2 bedrooms | 🚿 1 bathroom
   ⚡ Instant book | 🏅 Superhost | 📍 Eixample district
   🔑 ID: listing_1_1634567890

🏠 **Charming House near Sagrada Familia** ⭐ 4.6/5 (89 reviews)
   💰 €180/night | 👥 6 guests | 🛏️ 3 bedrooms | 🚿 2 bathrooms
   📅 Available | 🌟 Experienced host | 📍 Gràcia neighborhood
   🔑 ID: listing_2_1634567891

[... additional listings ...]
```

### Listing Details Response
```
🏢 **Luxury Apartment in Barcelona - Complete Details**

📍 **Location:** Eixample, Barcelona
🏠 **Property Type:** Entire apartment
👥 **Capacity:** 4 guests | 🛏️ 2 bedrooms | 🚿 1 bathroom | 🛏️ 3 beds

💰 **Pricing:** €145/night
⭐ **Rating:** 4.8/5 stars (127 reviews)

✨ **Amenities:**
• WiFi • Kitchen • Air conditioning • Washing machine
• Hair dryer • Iron • Essentials • Hangers
• Hot water • Refrigerator • ...and 15 more

👤 **Host: Maria** 🏅 Superhost | 98% response rate

📊 **Detailed Ratings:**
⭐ Accuracy: 4.9/5 | 🧹 Cleanliness: 4.8/5
💬 Communication: 4.9/5 | 📍 Location: 4.7/5 | 💰 Value: 4.6/5

📝 **Description:** Beautiful and modern apartment in the heart of Barcelona...
🖼️ **Images:** 24 photos available
```

### Neighborhoods Response  
```
🏘️ **Popular Neighborhoods in Amsterdam**

🌟 **Jordaan** - Historic charm with canals
   💰 Average: €165/night | 🏠 125 listings
   🎯 Highlights: Anne Frank House, local markets, cozy cafes

🎨 **De Pijp** - Trendy arts district  
   💰 Average: €140/night | 🏠 89 listings
   🎯 Highlights: Heineken Experience, Albert Cuyp Market, nightlife

🏛️ **Museum Quarter** - Cultural hub
   💰 Average: €195/night | 🏠 67 listings
   🎯 Highlights: Van Gogh Museum, Rijksmuseum, Vondelpark

[... additional neighborhoods ...]
```

## 🛠️ Development

### Code Structure
- **Server Setup:** MCP server with comprehensive tool registration
- **Data Generation:** Intelligent mock data creation based on search parameters
- **Location Services:** Geocoding integration with fallback to built-in coordinates
- **Filtering Engine:** Advanced property filtering with multiple criteria
- **Response Formatting:** Rich, user-friendly output with emojis and structure

### Dependencies
- `@modelcontextprotocol/sdk` - Core MCP functionality
- `node-fetch` - HTTP client for geocoding API requests
- `zod` - Runtime type validation and schema definition
- `typescript` - Type safety and modern JavaScript features

### Mock Data Architecture
The agent includes sophisticated data generation:
- **Property Database:** Simulated listings with realistic attributes
- **Location Mapping:** City-specific property characteristics  
- **Filtering Logic:** Accurate application of search criteria
- **Consistency Engine:** Deterministic results for same parameters
- **Pricing Models:** Location and seasonality-aware pricing

## 🔒 Security & Privacy

### API Key Security
- Optional OpenCage API key stored in environment variables
- Graceful degradation when geocoding API is unavailable
- No API keys exposed in responses or logs

### Data Privacy
- No real user booking data or personal information
- Mock data generation doesn't store or track searches
- Location queries are ephemeral and not cached

### Mock Data Benefits
- No real property or host data exposed
- Safe for development and testing environments
- Demonstrates full functionality without privacy concerns
- Consistent performance without external API dependencies

## 🌟 Advanced Features

### Intelligent Filtering
- Price range filtering with currency awareness
- Date availability simulation
- Property type categorization
- Guest capacity matching
- Instant book preference handling

### Location Intelligence
- Neighborhood-specific property generation
- Local pricing models and market characteristics
- Geographic coordinate accuracy
- Multi-language city name support

### Realistic Simulation
- Host profiles with authentic response patterns
- Review distributions matching real-world data
- Amenity combinations that reflect property types
- Seasonal pricing variations

## 📚 Resources

- [OpenCage Geocoding API](https://opencagedata.com/)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Airbnb Agent Examples](../EXAMPLES.md#airbnb-server-examples)