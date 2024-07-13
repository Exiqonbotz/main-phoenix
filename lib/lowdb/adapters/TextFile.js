const fs = require('fs');
const steno = require('steno');

class TextFile {
    constructor(filename) {
        this.filename = filename;
    }

    async read() {
        let data;
        try {
            data = await fs.promises.readFile(this.filename, 'utf-8');
        } catch (e) {
            if (e.code === 'ENOENT') {
                return null;
            }
            throw e;
        }
        return data;
    }

    write(str) {
        return new Promise((resolve, reject) => {
            steno.writeFile(this.filename, str, err => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}

module.exports = { TextFile };
