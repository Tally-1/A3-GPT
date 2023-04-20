"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestManager_1 = __importDefault(require("./models/classes/RequestManager"));
const path_1 = __importDefault(require("path"));
const rootFolder = process.cwd();
const dataFolder = path_1.default.join(rootFolder, "data");
const mngr = new RequestManager_1.default(rootFolder, dataFolder);
mngr.A3GPTstream();
const initA3GPT = require("./misc/npmExports").default;
exports.initA3GPT = initA3GPT;
