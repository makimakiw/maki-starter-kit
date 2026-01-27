import fs from 'fs-extra';
import path from 'path';
import os from 'os';

/**
 * Check if Pencil MCP is installed and configured in Cursor
 * Looks for MCP configuration files in common locations
 */
export async function checkPencilMCP() {
  const possibleConfigPaths = [
    // Cursor MCP config locations
    path.join(os.homedir(), '.cursor', 'mcp_config.json'),
    path.join(os.homedir(), '.cursor', 'config', 'mcp.json'),
    path.join(os.homedir(), 'Library', 'Application Support', 'Cursor', 'User', 'globalStorage', 'mcp.json'),
  ];
  
  for (const configPath of possibleConfigPaths) {
    try {
      if (await fs.pathExists(configPath)) {
        const config = await fs.readJSON(configPath);
        
        // Check if Pencil server is configured
        if (config.servers && 
            (config.servers['user-Pencil'] || 
             config.servers['pencil'] || 
             config.servers['Pencil'])) {
          return true;
        }
        
        // Alternative structure
        if (config.mcpServers && 
            (config.mcpServers['user-Pencil'] || 
             config.mcpServers['pencil'] || 
             config.mcpServers['Pencil'])) {
          return true;
        }
      }
    } catch (error) {
      // Silently continue if we can't read a config file
      continue;
    }
  }
  
  return false;
}
