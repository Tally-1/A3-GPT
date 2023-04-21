import RequestManager from "./models/classes/RequestManager";
import path from "path";

const rootFolder = process.cwd();
const dataFolder = path.join(rootFolder, "data");
const mngr = new RequestManager(
    rootFolder,
    dataFolder
);
mngr.A3GPTstream();

// const string = '6.5 mm 100Rnd Sand Mag - Caliber: 6.5x39 mm  Caseless<br />Rounds: 100<br />Used in: MX/C/M/SW/3GL';
// const newString = string.replace(/<br \/>/g, '. ');

// console.log(newString);

const initA3GPT = require("./misc/npmExports").default;
exports.initA3GPT = initA3GPT;