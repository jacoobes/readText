import { readdir, readdirSync } from "fs";
import Tesseract from "tesseract.js";

type successPath = string | Error

function readImages(dir: string) {
    const filePath : successPath  = dir.endsWith(".png") ? dir : Error("Not a correct path")
}
