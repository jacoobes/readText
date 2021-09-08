
import { readdir } from "fs/promises";
import  { resolve }  from 'path'
import Tesseract, { createWorker, PSM } from "tesseract.js";


export async function getFiles(dir: string) : Promise<string[] | string> {
    const dirents = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return files.flat()
  }

export async function makeWorker(directory : string) : 
  Promise<Tesseract.RecognizeResult> {
  const worker = createWorker()
    await worker.load()
    await worker.loadLanguage("eng")
    await worker.initialize('eng')
    await worker.setParameters({
      tessedit_pageseg_mode: PSM.AUTO,
    })
  const data = await worker.recognize(directory)
  await worker.terminate()

  return data
  }
  