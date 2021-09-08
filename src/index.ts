
import { createWorker, PSM} from "tesseract.js";
import { getFiles, makeWorker } from "./utils/utils"

type input = string[] | string

async function readImages(dir: string) {
  const data : input = dir.match( /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/ ) 
  ? dir 
  : await getFiles(dir)


  if(Array.isArray(data)) {
    
  for(const png of data) {
   const { data } = await makeWorker(png)
    const text = data.text
    console.log(text)
  }

} else {
  const { data } = await makeWorker(dir)
    
  console.log(data.text)
}
 
};

(async () => {
  console.log( await readImages("https://helpdeskgeek.com/wp-content/pictures/2010/06/word-random-text.png"))
 })();

