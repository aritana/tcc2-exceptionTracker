import { readdirSync, lstatSync } from 'node:fs';

const basePath = '/home/aritana/Downloads/Cefet/cefet2021-b/Tcc1/code/tcc2-exceptionTracker/Back/microservices-spring-cloud/cloud-entregador-estado'

const constPath = '/src/main/java/alura/br/microservicesspringcloud'

const path = basePath + constPath;

let file = readdirSync(path).filter(fn => fn.endsWith('ExceptionGenerator.java'));
let dirs = readdirSync(path).filter(fn => fn.search('ExceptionGenerator.java'));
if (file = []) {
    console.log('file', file)
}

for (let dir of dirs) {

    if (lstatSync(path + '/' + dir).isDirectory()) {
        console.log(dir)
    }

}

//let file = readdirSync(path).filter(fn => fn.endsWith('ExceptionGenerator.java'));



