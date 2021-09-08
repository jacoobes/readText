"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeWorker = exports.getFiles = void 0;
const promises_1 = require("fs/promises");
const path_1 = require("path");
const tesseract_js_1 = require("tesseract.js");
async function getFiles(dir) {
    const dirents = await promises_1.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
        const res = path_1.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return files.flat();
}
exports.getFiles = getFiles;
async function makeWorker(directory) {
    const worker = tesseract_js_1.createWorker();
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize('eng');
    await worker.setParameters({
        tessedit_pageseg_mode: "3" /* AUTO */,
    });
    const data = await worker.recognize(directory);
    await worker.terminate();
    return data;
}
exports.makeWorker = makeWorker;
//# sourceMappingURL=utils.js.map