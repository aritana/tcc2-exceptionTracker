
import { readdir } from 'node:fs/promises';

const path = '/home/aritana/Downloads/Cefet/cefet2021-b/Tcc1/code/tcc2-exceptionTracker/Back/microservices-spring-cloud/cloud-entregador-estado/src';

try {
    const files = await readdir(path);
    for (const file of files)
        console.log(file);
} catch (err) {
    console.error(err);
}