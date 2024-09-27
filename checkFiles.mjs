// checkFiles.mjs
import fs from 'fs';
import path from 'path';

const routesPath = path.resolve('./routes');

fs.readdir(routesPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
    } else {
        console.log('Files in routes directory:', files);
    }
});
