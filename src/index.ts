
import { createWorker} from "tesseract.js";
import { PSM } from "tesseract.js"
import { getFiles } from "./utils/utils"


async function readImages(dir: string) {
  const input = dir.match( /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/ ) 
  ? dir 
  : await getFiles(dir)

  if(Array.isArray(input)) {
    
  for(const png of input) {
    const worker = createWorker()
      await worker.load()
      await worker.loadLanguage("eng")
      await worker.initialize('eng')
      await worker.setParameters({
        tessedit_pageseg_mode: PSM.AUTO,
      })
      const { data: { text } } = await worker.recognize(png)
      
      await worker.terminate()
  }

} else {
  const worker = createWorker()
    await worker.load()
    await worker.loadLanguage("eng")
    await worker.initialize('eng')
    await worker.setParameters({
      tessedit_pageseg_mode: PSM.AUTO,
    })
  const { data: { text } } = await worker.recognize(dir)
  
  await worker.terminate()
}
 
};

(async () => {
  console.log( await readImages("E:\\Downloads\\result"))
 })();

