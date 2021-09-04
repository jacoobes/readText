import { lstatSync } from "fs";
import { readdir } from "fs/promises";
import Tesseract from "tesseract.js";
import  { resolve }  from 'path'
import { createWorker } from "tesseract.js";

import { PSM } from "tesseract.js"

type successPath = string | Error

async function getFiles(dir: string) : Promise<string[] | string> {
    const dirents = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return files.flat()
  }

  (async () => {
   console.log( await getFiles("E:\\Downloads\\result"))

   await readImages("E:\\Downloads\\result\\Chapter 2 - Psychological Research-3.png")
  
  })()

async function readImages(dir: string) {
    

  //  const arrayOfFiles = (await getFiles(dir) as string[])
    const worker = createWorker()
      await worker.load()
      await worker.loadLanguage("eng")
      await worker.initialize('eng')
      await worker.setParameters({
        tessedit_pageseg_mode: PSM.AUTO,
      })
      const { data: {text} } = await worker.recognize(dir)

      await worker.terminate()
   
  
    console.log(text)
   
      
    


}



