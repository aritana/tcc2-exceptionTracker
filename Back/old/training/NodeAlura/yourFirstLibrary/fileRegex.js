import path from 'path';
import { fileURLToPath } from 'url';
import FindFiles from 'file-regex'

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);



 
const result = await FindFiles(__dirname, /\.js$/);
 
console.log(result)