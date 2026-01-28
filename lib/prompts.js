import inquirer from 'inquirer';
import chalk from 'chalk';

export async function gatherProjectInfo() {
  console.log(chalk.bold.blue('\n🚀 MVP Starter Setup\n'));
  console.log(chalk.dim('Answer a few questions to get started...\n'));

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'What is your project name? (parent folder)',
      default: 'my-project',
      validate: (input) => {
        // Check if name is valid (no spaces, special chars except hyphens)
        if (/^[a-z0-9-]+$/.test(input)) {
          return true;
        }
        return 'Please use lowercase letters, numbers, and hyphens only';
      },
      transformer: (input) => {
        return chalk.cyan(input);
      }
    },
    {
      type: 'input',
      name: 'appName',
      message: 'What is your Next.js app name?',
      default: 'app',
      validate: (input) => {
        // Check if name is valid (no spaces, special chars except hyphens)
        if (/^[a-z0-9-]+$/.test(input)) {
          return true;
        }
        return 'Please use lowercase letters, numbers, and hyphens only';
      },
      transformer: (input) => {
        return chalk.cyan(input);
      }
    },
    {
      type: 'input',
      name: 'primaryColor',
      message: 'Primary brand color (hex)?',
      default: '#5749F4',
      validate: (input) => {
        if (/^#[0-9A-F]{6}$/i.test(input)) {
          return true;
        }
        return 'Please enter a valid hex color (e.g., #5749F4)';
      },
      transformer: (input) => {
        if (/^#[0-9A-F]{6}$/i.test(input)) {
          return chalk.hex(input)('█') + ' ' + input;
        }
        return input;
      }
    },
    {
      type: 'confirm',
      name: 'darkMode',
      message: 'Include dark mode support?',
      default: false
    },
    {
      type: 'confirm',
      name: 'categoryColors',
      message: 'Add category/domain colors? (e.g., for different content types)',
      default: false
    }
  ]);

  return answers;
}
