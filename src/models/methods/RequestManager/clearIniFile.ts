import path from "path";
import fs from "fs";
// const config = require(path.join(__dirname, "/../../../../../a3.gpt-config.json"));
// const {iniFolder} = config;

// Deletes all content in the ini file, used to clear the input and output files
// after all requests have been processed.

export default
function clearIniFile(fileName:"A3-GPT_out" | "A3-GPT_in", iniFolder:string) {
    const header = "["+fileName+"]";
    const completeFileName = fileName+".ini";
    const filePath = path.join(iniFolder, completeFileName);
    try{fs.writeFileSync(filePath, header);}catch(e){console.log("error clear ini: " + e)};
};