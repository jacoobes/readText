
import { readdir } from "fs/promises";
import  { resolve }  from 'path'

export async function getFiles(dir: string) : Promise<string[] | string> {
    const dirents = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return files.flat()
  }

export async function makeWorker() {

    
}  