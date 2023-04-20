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


export default
function initA3GPT(
    includeBatchFile:boolean = false
    ){
        const path = require('path');
        const rootFolder = process.cwd();
        
        //since this will be run both from the npm package and from the source code
        //It is important to make sure the necesary data is present in the project using npm.
        //I should probably think of a way to only copy that folder when needed...

        const npmDataFolder = path.join(__dirname, "..", "..", "data");
        const newDataFolder = path.join(rootFolder, "data");
        
        copyFolderSync(npmDataFolder, newDataFolder);
        console.log("A3GPT: 'Data folder updated.'");



        const RequestManager = require("../models/classes/RequestManager").default;
        const mngr = new RequestManager(
            rootFolder, 
            newDataFolder,
            includeBatchFile
            );
        
        mngr.A3GPTstream();
        mngr.sendVersion();
        return mngr;
};