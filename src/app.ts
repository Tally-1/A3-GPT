import RequestManager from "./models/classes/RequestManager";
import path from "path";

const rootFolder = process.cwd();
const dataFolder = path.join(rootFolder, "data");
const mngr = new RequestManager(
    rootFolder,
    dataFolder
);
mngr.A3GPTstream();

const initA3GPT = require("./misc/npmExports").default;
exports.initA3GPT = initA3GPT;