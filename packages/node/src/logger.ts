/* eslint-disable no-console */
import { cyan, green, red, yellow } from 'colorette';

import { isUnicodeSupported } from './utils';

const hasUnicode = isUnicodeSupported();

const figures = {
  error: hasUnicode ? '✖' : '×',
  warning: hasUnicode ? '⚠' : '‼',
  success: hasUnicode ? '✔' : '√',
  info: hasUnicode ? 'ℹ' : 'i',
};

const error = (message: string) => console.log(red(`${figures.error} ${message}`));
const warning = (message: string) => console.log(yellow(`${figures.warning} ${message}`));
const success = (message: string) => console.log(green(`${figures.success} ${message}`));
const info = (message: string) => console.log(cyan(`${figures.info} ${message}`));

export const logger = { error, warning, success, info };

/* eslint-enable no-console */
