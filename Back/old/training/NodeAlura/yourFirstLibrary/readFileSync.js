import { readdirSync, lstatSync } from 'node:fs';

const basePath = '/home/aritana/Downloads/Cefet/cefet2021-b/Tcc1/code/tcc2-exceptionTracker/Back/microservices-spring-cloud/cloud-entregador-estado'

const constPath = '/src/main/java/alura/br/microservicesspringcloud'

const path = basePath + constPath;

let file = [];
let dirs = [];




    file = readdirSync(path).filter(fn => fn.endsWith('ExceptionGenerator.java'));
    dirs = readdirSync(path).filter(fn => fn.search('ExceptionGenerator.java'));

    for (let dir of dirs) {

        if (lstatSync(path + '/' + dir).isDirectory()) {

            do {


            } while ();

        }
    }







if (file = []) { // nao encontrou o arquivo
    for (let dir of dirs) {

        if (lstatSync(path + '/' + dir).isDirectory()) {

            do {


            } while ();

        }

    }
}



//let file = readdirSync(path).filter(fn => fn.endsWith('ExceptionGenerator.java'));



