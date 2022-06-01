import { getFile } from './index.js';
import chalk from 'chalk';
import { validaURLs } from './http-validation.js';

const path = process.argv;

async function processText(filePath) {
    const result = await getFile(filePath[2]);

    if (filePath[3] === 'validar') {
        console.log(chalk.yellow('validated links'), await validaURLs(result));
    } else {
        console.log(chalk.yellow('list of links'), result);
    }

}

processText(path);

