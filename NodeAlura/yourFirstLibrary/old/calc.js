import chalk from 'chalk';
import {sum,mul} from './mathFile.js'



const soma = sum(1, 2);
const mult = mul(3, 2);
console.log(chalk.blue('Hello world!'));
console.log(chalk.red(soma));
console.log(chalk.red(mult));
