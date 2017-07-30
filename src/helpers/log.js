/**
 * @copyright   2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */
/* eslint-disable no-console */

import chalk from 'chalk';

export default {
  log(type: string, ...messages: string[]) {
    console.log(chalk.gray(`[${type}]`.padEnd(8, ' ')), ...messages);
  },

  info(type: string, ...messages: string[]) {
    this.log(type, ...messages);
  },

  title(type: string, ...messages: string[]) {
    this.log(type, ...messages.map(message => chalk.cyan(message)));
  },

  success(type: string, ...messages: string[]) {
    this.log(type, chalk.green('✔'), ...messages.map(message => chalk.green(message)));
  },

  error(type: string, ...messages: string[]) {
    this.log(type, chalk.red('✖'), ...messages.map(message => chalk.red(message)));
  },
};
