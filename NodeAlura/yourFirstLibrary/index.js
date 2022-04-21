import { promises, readFile } from 'fs';
import chalk from 'chalk';

const filePath = './files/text1.md';


function extractLinks(text) {
    //regex must be placed into / / g to global, m to multiline
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;

    const arrayResult = [];
    let temp;

    while ((temp = regex.exec(text)) != null) {
        arrayResult.push({ [temp[1]]: temp[2] });//valor englobado por chaves
    }

    return arrayResult.length === 0 ? 'there are no links' : arrayResult;
}


function treatError(err) {

    throw new Error(chalk.green.red(err.code, chalk.red('There is not file in the given path!')));

}

//https://fegemo.github.io/cefet-web/classes/js7/#28

export async function getFile(filePath) {
    try {
        const encoding = 'utf-8';
        const text = await promises.readFile(filePath, encoding);
        return extractLinks(text);
    } catch (error) {
        treatError(error)
    }
}



