

export default
function parseCfg(cfgPath:string) {
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
  //@ts-ignore
  configData[key.trim()] = value.trim();
}
return configData;
};