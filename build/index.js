"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils/utils");
async function readImages(dir) {
    const data = dir.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/)
        ? dir
        : await utils_1.getFiles(dir);
    if (Array.isArray(data)) {
        for (const png of data) {
            const { data } = await utils_1.makeWorker(png);
            const text = data.text;
            console.log(text);
        }
    }
    else {
        const { data } = await utils_1.makeWorker(dir);
        console.log(data.text);
    }
}
;
(async () => {
    console.log(await readImages("https://helpdeskgeek.com/wp-content/pictures/2010/06/word-random-text.png"));
})();
//# sourceMappingURL=index.js.map