import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {StdioServerTransport} from "@modelcontextprotocol/sdk/server/stdio.js";
import { addMeteoTools } from "./tools.js";
// Create server instance
const server = new McpServer({
  name: "meteo",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

addMeteoTools(server);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Meteo MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
