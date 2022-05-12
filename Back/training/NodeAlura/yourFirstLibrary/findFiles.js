import { readdir, readdirSync } from 'fs';


const dir = '/home/aritana/Downloads/TCC2/Back/microservices-spring-cloud/cloud-loja/src/main/java/alura/br/microservicesspringcloud/';
let dirBuf = Buffer.from(dir);

readdir(dirBuf, (err, files) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log(files)
    }

})
