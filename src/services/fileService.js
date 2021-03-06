const fs = require('fs-extra'); // Classic fs
const path = require('path');


function uploadFile(readStreamFiles, filename, mimeType, allowedType, uploadPath) {
    if (filename === '') {
        console.log(`Tried to upload no file.`);
    } else if (mimeType != allowedType) {
        console.log(`File '${filename}' is unsupported.`);
    } else {
        console.log(`Upload of '${filename}' started`);

        // Create a write stream of the new file
        const fstream = fs.createWriteStream(path.join(uploadPath, filename));

        // Pipe it trough
        readStreamFiles.pipe(fstream);

        // On finish of the upload
        fstream.on('close', () => {
            console.log(`Upload of '${filename}' finished`);
        });
    }
}


module.exports = uploadFile;