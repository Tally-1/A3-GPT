"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseCfg(cfgPath) {
    const fs = require('fs');
    const configFile = fs.readFileSync(cfgPath, 'utf8');
    const lines = configFile.split('\n');
    const configData = {};
    for (const line of lines) {
        if (line.startsWith('#')
            || (!line.includes('='))
            || (line.startsWith('['))) {
            continue;
        }
        const [key, value] = line.split('=');
        configData[key.trim()] = value.trim();
    }
    return configData;
}
exports.default = parseCfg;
;
