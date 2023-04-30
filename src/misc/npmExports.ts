import RequestManager from "../models/classes/RequestManager";
import { blue, cyan, reset } from "./logColors";


export default
function initA3GPT(
    includeBatchFile:boolean = false
    ){
        const path = require('path');
        const rootFolder = process.cwd();
        const isNpm = rootFolder.includes("node_modules");

        //since this will be run both from the npm package and from the source code
        //It is important to make sure the necesary data is present in the project using npm.
        //I should probably think of a way to only copy that folder when needed...

        const npmDataFolder = path.join(__dirname, "..", "..", "data");
        const newDataFolder = path.join(rootFolder, "data");
        
        copyFolderSync(npmDataFolder, newDataFolder);
        console.log(blue+"A3GPT: "+reset+"Data folder updated.");



        const RequestManager = require("../models/classes/RequestManager").default;
        const mngr = new RequestManager(
            rootFolder, 
            newDataFolder,
            includeBatchFile
            );
        
        
        
        mngr.A3GPTstream();
        mngr.sendVersion();
        
        //@ts-ignore
        process.DcoRqMngr = mngr;
        process.on("exit", ingameCrashMsg);
        
        return mngr;
};

function ingameCrashMsg() {
  //@ts-ignore
  const mngr = process.DcoRqMngr as RequestManager;
  const text = "<t shadow='2'><t size='1.5'>[<t color='#ff3838'>DCO-GPT</t>]</t><br/><br/>"
             + "<t color='#00ffff'>The DCO-GPT API has crashed.</t><br/><br/>"
             + "<t size='0.75'>If you are the admin simply run it again to get back online.<br/>"
             + "You may need to restart the mission if you were generating profiles<br/><br/>"

  mngr.globalHint(text);
  
};

function copyFolderSync(source:string, target:string) {
  const fs   = require('fs');
  const path = require('path');

if (!fs.existsSync(target)) {
  fs.mkdirSync(target);
}

fs.readdirSync(source).forEach((file:string) => {
  const sourcePath = path.join(source, file);
  const targetPath = path.join(target, file);

  if (fs.lstatSync(sourcePath).isDirectory()) {
    copyFolderSync(sourcePath, targetPath);
  } else {
    if (!fs.existsSync(targetPath)) {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
});
  
};