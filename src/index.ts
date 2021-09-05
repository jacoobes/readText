
import { readdir } from "fs/promises";
import  { resolve }  from 'path'
import { createWorker, createScheduler } from "tesseract.js";

import { PSM } from "tesseract.js"

async function getFiles(dir: string) : Promise<string[] | string> {
    const dirents = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return files.flat()
  }

async function readImages(dir: string) {
    

  const arrayOfFiles = (await getFiles(dir) as string[])
  for(const png of arrayOfFiles) {
    const worker = createWorker()
      await worker.load()
      await worker.loadLanguage("eng")
      await worker.initialize('eng')
      await worker.setParameters({
        tessedit_pageseg_mode: PSM.AUTO,
      })
      const { data: {text} } = await worker.recognize(png)
      
      await worker.terminate()
  } 


}


(async () => {
  console.log( await readImages("E:\\Downloads\\result"))
 
 })()

