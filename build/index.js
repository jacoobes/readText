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
(async () => {
    console.log(await readImages("E:\\Downloads\\result"));
})();
async function readImages(dir) {
    const arrayOfFiles = await getFiles(dir);
    for (const png of arrayOfFiles) {
        const worker = (0, tesseract_js_1.createWorker)();
        await worker.load();
        await worker.loadLanguage("eng");
        await worker.initialize('eng');
        await worker.setParameters({
            tessedit_pageseg_mode: "3" /* AUTO */,
        });
        const { data: { text } } = await worker.recognize(png);
        console.log(text);
        await worker.terminate();
    }
    // const worker = createWorker()
    //   await worker.load()
    //   await worker.loadLanguage("eng")
    //   await worker.initialize('eng')
    //   await worker.setParameters({
    //     tessedit_pageseg_mode: PSM.AUTO,
    //   })
    //   const { data: {text} } = await worker.recognize(dir)
    //   await worker.terminate()
}
//# sourceMappingURL=index.js.map