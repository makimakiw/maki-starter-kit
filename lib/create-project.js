import { execa } from 'execa';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';

export async function createNextJsProject(projectInfo) {
  const { projectName } = projectInfo;
  const targetDir = path.resolve(process.cwd(), projectName);

  // Clean up if directory already exists
  if (await fs.pathExists(targetDir)) {
    console.log(chalk.yellow(`\n⚠️  Directory "${projectName}" already exists. Removing it...\n`));
    await fs.remove(targetDir);
  }

  console.log(chalk.cyan.bold('\n📦 Creating Next.js Project...\n'));
  console.log(chalk.dim('This will take 1-2 minutes (installing dependencies)...\n'));

  try {
    // Create Next.js project using create-next-app
    // Show full output so user can see actual progress
    await execa('npx', [
      'create-next-app@latest',
      projectName,
      '--typescript',
      '--tailwind',
      '--app',
      '--no-src-dir',
      '--import-alias', '@/*',
      '--eslint',
      '--no-turbopack',
      '--no-experimental-react-compiler',
      '--use-npm'
    ], {
      stdio: 'inherit', // Show all output
      cwd: process.cwd()
    });

    console.log(chalk.green('\n✔ Next.js project created!\n'));

    // Show what was created
    console.log(chalk.dim('  Created project structure:'));
    console.log(chalk.dim('    ├── app/'));
    console.log(chalk.dim('    ├── public/'));
    console.log(chalk.dim('    ├── package.json'));
    console.log(chalk.dim('    ├── tsconfig.json'));
    console.log(chalk.dim('    └── postcss.config.mjs (Tailwind v4)'));

    return targetDir;

  } catch (error) {
    console.log(chalk.red('\n✖ Failed to create Next.js project\n'));
    
    // Provide helpful error message
    console.log(chalk.yellow('💡 Try these fixes:\n'));
    console.log(chalk.dim('  1. Run: npm cache clean --force'));
    console.log(chalk.dim('  2. Check your internet connection'));
    console.log(chalk.dim('  3. Try again\n'));
    
    throw error;
  }
}

export async function verifyProject(projectDir) {
  console.log(chalk.cyan('\n🔍 Verifying project setup...\n'));

  try {
    // Check for essential files (Tailwind v4 uses postcss.config.mjs now)
    const essentialFiles = [
      'package.json',
      'tsconfig.json',
      'postcss.config.mjs',
      'app/layout.tsx',
      'app/page.tsx'
    ];

    for (const file of essentialFiles) {
      const filePath = path.join(projectDir, file);
      if (!(await fs.pathExists(filePath))) {
        throw new Error(`Missing essential file: ${file}`);
      }
    }

    console.log(chalk.green('✔ Project verified successfully!\n'));
    return true;

  } catch (error) {
    console.log(chalk.red('✖ Project verification failed\n'));
    throw error;
  }
}
