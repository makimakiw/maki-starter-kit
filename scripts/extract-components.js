#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import chalk from 'chalk';
import fs from 'fs-extra';
import { extractToPencil } from '../lib/extract-to-pencil.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  console.log(chalk.bold.blue('\n🎨 Component Extraction Tool\n'));
  
  // Get project directory from argument or current directory
  const projectDir = process.argv[2] || process.cwd();
  
  if (!await fs.pathExists(projectDir)) {
    console.error(chalk.red('❌ Project directory not found:', projectDir));
    process.exit(1);
  }
  
  // Read project info from package.json
  const packageJsonPath = resolve(projectDir, 'package.json');
  
  if (!await fs.pathExists(packageJsonPath)) {
    console.error(chalk.red('❌ package.json not found in:', projectDir));
    process.exit(1);
  }
  
  const packageJson = await fs.readJson(packageJsonPath);
  const projectName = packageJson.name || 'unknown';
  
  // Read globals.css to get primary color
  const globalsPath = resolve(projectDir, 'app', 'globals.css');
  let primaryColor = '#5749F4'; // default
  
  if (await fs.pathExists(globalsPath)) {
    const globalsContent = await fs.readFile(globalsPath, 'utf-8');
    const colorMatch = globalsContent.match(/--color-primary:\s*([^;]+);/);
    if (colorMatch) {
      primaryColor = colorMatch[1].trim();
    }
  }
  
  const projectInfo = {
    projectName,
    primaryColor
  };
  
  console.log(chalk.cyan('Project:'), chalk.white(projectName));
  console.log(chalk.cyan('Primary Color:'), chalk.white(primaryColor));
  console.log();
  
  // Run extraction
  const success = await extractToPencil(projectDir, projectInfo);
  
  if (success) {
    console.log(chalk.green.bold('✅ Extraction complete!\n'));
    console.log(chalk.dim('Check design-system/PENCIL-EXTRACTION.md for details.\n'));
  } else {
    console.log(chalk.yellow.bold('⚠️  Extraction completed with warnings.\n'));
    console.log(chalk.dim('See above messages for details.\n'));
  }
}

main().catch(error => {
  console.error(chalk.red('\n❌ Error:'), error.message);
  process.exit(1);
});
