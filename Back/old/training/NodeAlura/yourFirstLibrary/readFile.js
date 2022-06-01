import { promises, readFile } from 'fs';


//const filePath = './files/text1.md';

const filePath = '/home/aritana/Documentos/';



function treatError(err) {

    throw new Error((err.code, 'There is not file in the given path!'));

}


async function getFile(filePath) {
    try {
        const encoding = 'utf-8';
        const text = await promises.readFile(filePath, encoding);
        console.log(text)
        return text
    } catch (error) {
        treatError(error)
    }
}

getFile(filePath);



