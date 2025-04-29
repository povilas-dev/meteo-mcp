import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const METEO_API_BASE = "https://api.meteo.lt/v1/";
const USER_AGENT = "meteo-mcp/1.0";

type Coordinates = {
  latitude: number;
  longitude: number;
};

type Place = {
  code: string;
  name: string;
  administrativeDivision: string;
  countryCode: string; //  (ISO 3166-1 alpha-2).
  coordinates: Coordinates; //  (WGS 84 dešimtainiais laipsniais).
};

async function getPlaces(): Promise<Place[]> {
  try {
    const response = await fetch(`${METEO_API_BASE}places`, {
      headers: {
        'User-Agent': USER_AGENT
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch places: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching places:', error);
    throw error;
  }
}

// Create server instance
const server = new McpServer({
  name: "meteo",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// getPlaces().then(console.log);
