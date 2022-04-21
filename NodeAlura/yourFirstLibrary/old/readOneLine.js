import { readFile } from 'fs';
import nthline from 'nthline';


const filePath = '/home/aritana/Downloads/TCC2/microservices-spring-cloud/cloud-entregador-cidade/src/main/java/alura/br/microservicesspringcloud/MicroservicesSpringCloudApplication.java';
const rowIndex = 12;
 
nthline(rowIndex, filePath).then(line => console.log(line))

/*
readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(data)
})*/

