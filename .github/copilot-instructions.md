# MCP Demo Repository - GitHub Copilot Instructions

**ALWAYS follow these instructions first and only fallback to additional search and context gathering if the information here is incomplete or found to be in error.**

## Repository Overview

MCP Demo is a TypeScript-based repository containing two Model Context Protocol (MCP) servers: Weather Server and Airbnb Server. Both servers are built with Node.js 18+ and provide JSON-RPC over stdio interfaces for AI agent integration.

## Working Effectively

### Prerequisites and Environment Setup
- Ensure Node.js 18+ is installed: `node --version` (validated working with v20.19.5)
- Get an OpenWeatherMap API key from [openweathermap.org](https://openweathermap.org/api) (REQUIRED for Weather Server)
- Optionally get an OpenCage API key from [opencagedata.com](https://opencagedata.com/) (improves Airbnb Server location accuracy)

### Environment Variables Setup
```bash
# REQUIRED for Weather Server functionality
export OPENWEATHER_API_KEY=your_openweather_api_key

# OPTIONAL for Airbnb Server (improves location accuracy)
export OPENCAGE_API_KEY=your_opencage_api_key
```

### Bootstrap and Build Process
Run these commands in order to set up the codebase:

1. **Install all dependencies:**
```bash
npm run install-all
```
- Takes ~5 seconds to complete
- Installs dependencies for both workspace projects

2. **Build all servers:**
```bash
npm run build
```
- Takes ~9 seconds to complete
- Builds both weather-server and airbnb-server TypeScript projects
- Creates build/ directories with compiled JavaScript files

### Individual Server Commands
Work with specific servers using these commands:

```bash
# Navigate to specific server
cd weather-server    # or cd airbnb-server

# Build individual server
npm run build         # Takes ~3-4 seconds

# Development mode (rebuild + run)
npm run dev          # Builds then starts the MCP server

# Production mode
npm run start        # Runs the pre-built server

# Watch mode (auto-rebuild on changes)
npm run watch        # Continuously rebuilds TypeScript on file changes

# Clean build files
npm run clean        # Removes build/ directory
```

### Workspace Commands (run from repository root)
```bash
npm run build        # Build all servers (~9 seconds)
npm run dev          # Run all servers in development mode
npm run start        # Run all servers in production mode  
npm run clean        # Clean all build directories
npm run install-all  # Install all dependencies
```

## Validation and Testing

### Always Validate MCP Server Functionality
After making changes, ALWAYS test both servers using these exact commands:

1. **Test Weather Server:**
```bash
cd weather-server
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' | node build/index.js
```
Expected: JSON response with 3 tools (get_current_weather, get_weather_forecast, search_locations)

2. **Test Airbnb Server:**
```bash
cd airbnb-server
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' | node build/index.js
```
Expected: JSON response with 3 tools (search_airbnb_listings, get_listing_details, search_neighborhoods)

3. **Test Functional Scenarios:**
```bash
# Test Airbnb search (works without API keys)
cd airbnb-server
echo '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"search_airbnb_listings","arguments":{"location":"Paris","guests":2}}}' | node build/index.js
```
Expected: Formatted listing results with properties in Paris

### Manual Validation Requirements
- **Always** test that MCP servers start without errors
- **Always** verify JSON-RPC responses are properly formatted
- **Always** test at least one functional call to ensure data generation works
- For Weather Server: Test with valid API key and verify weather data retrieval
- For Airbnb Server: Test search functionality returns realistic mock data

### API Key Testing
Without proper API keys:
- Weather Server: Will return error messages about missing API key
- Airbnb Server: Works fully (mock data) but location accuracy may be reduced

## Key Files and Directories

### Repository Structure
```
mcp-demo/
├── weather-server/          # Weather MCP server
│   ├── src/index.ts        # Main server implementation
│   ├── build/              # Compiled JavaScript (after npm run build)
│   ├── package.json        # Weather server dependencies
│   ├── tsconfig.json       # TypeScript configuration
│   └── AGENTS.md           # Weather server documentation
├── airbnb-server/           # Airbnb MCP server  
│   ├── src/index.ts        # Main server implementation
│   ├── build/              # Compiled JavaScript (after npm run build)
│   ├── package.json        # Airbnb server dependencies
│   ├── tsconfig.json       # TypeScript configuration
│   └── AGENTS.md           # Airbnb server documentation
├── package.json            # Workspace configuration
├── README.md               # Main repository documentation
├── EXAMPLES.md             # JSON-RPC usage examples
└── claude_desktop_config.json # Claude Desktop integration
```

### Important Files to Check After Changes
- `weather-server/src/index.ts` - Weather server logic
- `airbnb-server/src/index.ts` - Airbnb server logic  
- `package.json` files - Dependencies and scripts
- `tsconfig.json` files - TypeScript configuration
- `AGENTS.md` files - Detailed server documentation

## Common Development Workflows

### Adding New MCP Tools
1. Edit `src/index.ts` in the appropriate server directory
2. Add tool definition to the tools array
3. Add request handler in the switch statement
4. Build and test: `npm run build && npm run dev`
5. Validate with JSON-RPC test call

### Modifying Server Configuration
1. Update tool schemas in the server setup
2. Modify request validation and handling
3. Build and test functionality: `npm run build`
4. Test with both `tools/list` and `tools/call` requests

### Environment and Deployment Changes
1. Update environment variable documentation in README.md
2. Modify `claude_desktop_config.json` if needed
3. Test with both API keys present and missing
4. Validate all functionality still works

## Troubleshooting Common Issues

### Build Errors
- Run `npm run clean` then `npm run build`
- Check TypeScript compilation errors in console output
- Verify all imports are correct in `src/index.ts`

### Runtime Errors
- Check environment variables are set correctly
- Verify API keys are valid (for Weather Server)
- Test JSON-RPC request format matches expected schema

### Server Not Responding
- Ensure server was built: `npm run build`
- Check for syntax errors in TypeScript compilation
- Verify server starts without immediate exit

## Dependencies and Technology Stack

### Core Dependencies
- `@modelcontextprotocol/sdk` - MCP server framework
- `node-fetch` - HTTP client for external API calls
- `zod` - Runtime type validation and schema definition
- `typescript` - Type safety and compilation

### Development Dependencies  
- `@types/node` - Node.js type definitions
- `typescript` - TypeScript compiler

## Integration and Usage

### Claude Desktop Integration
1. Copy `claude_desktop_config.json` to Claude Desktop config directory
2. Update file paths to match your installation location
3. Set environment variables for API keys
4. Restart Claude Desktop
5. Servers will be available as tools in conversations

### Command Line Testing
Use the examples in `EXAMPLES.md` for comprehensive testing scenarios including:
- Weather data retrieval with different units
- Location searches and geocoding
- Airbnb property searches with filters
- Neighborhood discovery

### JSON-RPC Interface
Both servers accept standard MCP JSON-RPC requests via stdio:
- `tools/list` - Get available tools
- `tools/call` - Execute specific tool with parameters
- All responses follow MCP standard format

Always test your changes with real JSON-RPC calls to ensure compatibility with MCP clients.