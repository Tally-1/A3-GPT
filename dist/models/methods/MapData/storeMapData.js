"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function storeMapData(reqMngr) {
    reqMngr.currentMap = this.name;
    const mapsFolder = path_1.default.join(reqMngr.dataFolder, "maps");
    const filePath = path_1.default.join(mapsFolder, this.name + ".json");
    const data = JSON.stringify(this, null, 2);
    fs_1.default.writeFileSync(filePath, data);
}
exports.default = storeMapData;
