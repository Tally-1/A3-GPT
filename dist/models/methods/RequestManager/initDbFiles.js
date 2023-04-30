"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const cyan = "\x1b[36m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const reset = "\x1b[0m";
function initDbFiles() {
    try {
        const fileNames = ["A3-GPT_out", "A3-GPT_in"];
        for (const fileName of fileNames) {
            const file = `${this.iniDbi2Path}\\${fileName}.ini`;
            if (!fs_1.default.existsSync(file)) {
                const content = `[${fileName}]\n`;
                fs_1.default.writeFileSync(`${this.iniDbi2Path}\\${fileName}.ini`, content);
                console.log(`${cyan}\nA3GPT: ${reset}Created${green}${fileName}.ini${reset}`);
            }
            ;
        }
        ;
        const file = `${this.iniDbi2Path}\\A3-GPT_in.ini`;
        const fileContent = fs_1.default.readFileSync(file, "utf-8");
        let cleanContent = fileContent.replace(/\n{3}/g, "");
        if (!cleanContent.startsWith("[A3-GPT_in]\n"))
            cleanContent = cleanContent.replace("[A3-GPT_in]", "[A3-GPT_in]\n");
        fs_1.default.writeFileSync(file, cleanContent);
    }
    catch (error) {
        console.log(`${cyan}A3GPT: ${reset}${red}Failed to init config files${reset}`);
    }
    ;
}
exports.default = initDbFiles;
;
