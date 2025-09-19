# Airbnb MCP Server

A Model Context Protocol (MCP) server that provides Airbnb location lookup and accommodation search capabilities with filtering options.

## Features

- **Listing Search**: Search for Airbnb listings in any location with comprehensive filters
- **Detailed Information**: Get comprehensive details about specific listings
- **Neighborhood Discovery**: Explore popular neighborhoods with accommodation insights
- **Advanced Filtering**: Filter by price, property type, guests, dates, and instant booking
- **Mock Data Service**: Demonstrates functionality with realistic mock data (since Airbnb doesn't provide a public API)

## Prerequisites

- Node.js 18+
- Optional: OpenCage Geocoding API key for accurate location coordinates (free at [opencagedata.com](https://opencagedata.com/))

## Installation

1. Install dependencies:
```bash
npm install
```

2. (Optional) Set up your OpenCage API key for better location accuracy:
```bash
export OPENCAGE_API_KEY=your_api_key_here
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

#### 1. search_airbnb_listings
Search for Airbnb listings in a specific location with filters.

**Parameters:**
- `location` (string, required): City or location to search for listings (e.g., "Paris", "New York", "Tokyo")
- `checkin` (string, optional): Check-in date in YYYY-MM-DD format
- `checkout` (string, optional): Check-out date in YYYY-MM-DD format
- `guests` (number, optional): Number of guests (1-16, default: 2)
- `priceMin` (number, optional): Minimum price per night
- `priceMax` (number, optional): Maximum price per night
- `propertyType` (string, optional): Property type - "any" (default), "apartment", "house", "unique", "hotel"
- `instantBook` (boolean, optional): Only show instant book properties (default: false)

**Example:**
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

#### 2. get_listing_details
Get detailed information about a specific Airbnb listing.

**Parameters:**
- `listingId` (string, required): Airbnb listing ID (obtained from search results)

**Example:**
```json
{
  "name": "get_listing_details",
  "arguments": {
    "listingId": "listing_1_1634567890"
  }
}
```

#### 3. search_neighborhoods
Search for popular neighborhoods in a city with accommodation information.

**Parameters:**
- `location` (string, required): City or location to search for neighborhoods
- `limit` (number, optional): Maximum number of neighborhoods to return (1-20, default: 10)

**Example:**
```json
{
  "name": "search_neighborhoods",
  "arguments": {
    "location": "Amsterdam",
    "limit": 5
  }
}
```

## Data Sources

### Mock Data Implementation
Since Airbnb doesn't provide a public API, this server uses intelligent mock data generation that:

- Creates realistic listings based on the search location
- Applies filters accurately to generated results
- Provides consistent data across requests
- Includes authentic property details, pricing, and amenities
- Generates neighborhood information based on real city knowledge

### Location Data
- **With API Key**: Uses OpenCage Geocoding API for accurate coordinates
- **Without API Key**: Falls back to built-in coordinates for major cities
- Supports major cities including Paris, London, New York, Tokyo, Barcelona, Amsterdam, Berlin, Rome, Lisbon, and Prague

## Response Format

### Search Results
Each listing includes:
- Property title and location
- Pricing information
- Property details (bedrooms, bathrooms, guests)
- Host information and ratings
- Availability and booking options
- Unique listing ID for detailed lookup

### Detailed Listings
Comprehensive information including:
- Complete property specifications
- Detailed ratings breakdown
- Full amenity list
- Host response rates and superhost status
- Booking policies and requirements
- Property description

### Neighborhoods
Neighborhood data includes:
- Average pricing information
- Available listing counts
- Location coordinates
- Area descriptions and highlights
- Local attractions and features

## Configuration

### Environment Variables

- `OPENCAGE_API_KEY`: OpenCage Geocoding API key (optional, improves location accuracy)

### Supported Locations

The server includes built-in support for major cities and can handle any location name. Popular cities have enhanced neighborhood data:

- **Europe**: Paris, London, Barcelona, Amsterdam, Berlin, Rome, Lisbon, Prague
- **Americas**: New York, (easily extensible to other cities)
- **Asia**: Tokyo, (easily extensible to other cities)

## Error Handling

The server handles various scenarios:
- Invalid location searches
- Missing listing IDs
- Geocoding failures
- Network timeouts
- Invalid date formats
- Out-of-range parameters

All errors return user-friendly messages with suggestions for resolution.

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

### Extending the Server

To add real API integration:
1. Replace mock data functions with actual API calls
2. Add proper authentication handling
3. Implement rate limiting and caching
4. Add error handling for API-specific responses

## Limitations

- **Mock Data**: Uses generated data since Airbnb's API is not publicly available
- **Date Validation**: Basic date format validation (real implementation would need availability checking)
- **Pricing**: Mock pricing may not reflect actual market rates
- **Images**: Returns placeholder image references

## Future Enhancements

- Integration with third-party accommodation APIs
- Real-time availability checking
- Price comparison across platforms
- Advanced search filters (amenities, reviews, etc.)
- Map-based location search
- Booking integration capabilities

## License

MIT License