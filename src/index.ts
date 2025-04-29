import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { meteo } from "./api/meteo.js";

// Create server instance
const server = new McpServer({
  name: "meteo",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});
