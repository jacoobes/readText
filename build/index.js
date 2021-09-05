"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const path_1 = require("path");
const tesseract_js_1 = require("tesseract.js");
async function getFiles(dir) {
    const dirents = await (0, promises_1.readdir)(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
        const res = (0, path_1.resolve)(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return files.flat();
}
async function readImages(dir, fileBaseName) {
    const arrayOfFiles = (await getFiles(dir));
    for (const [index, png] of arrayOfFiles.entries()) {
        const worker = (0, tesseract_js_1.createWorker)();
        await worker.load();
        await worker.loadLanguage("eng");
        await worker.initialize('eng');
        await worker.setParameters({
            tessedit_pageseg_mode: "3" /* AUTO */,
        });
        const { data: { text } } = await worker.recognize(png);
        await worker.terminate();
        await (0, promises_1.writeFile)(`E:\\Downloads\\outputOfScript\\${fileBaseName}${index}.txt`, text, "utf-8");
    }
}
;
(async () => {
    console.log(await readImages("E:\\Downloads\\result", "output"));
})();
//# sourceMappingURL=index.js.map