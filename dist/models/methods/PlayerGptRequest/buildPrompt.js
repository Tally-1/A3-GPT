"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const RpProfile_1 = __importDefault(require("../../classes/RpProfile"));
function buildPrompt(previousMessages, dataFolder) {
    const { worldName, status, date, message, player } = this;
    const { name, uid, profileId } = player;
    const { position, location } = status;
    const mapsFolder = path_1.default.join(dataFolder, "maps");
    const mapData = fs_1.default.readFileSync(path_1.default.join(mapsFolder, worldName + ".json"));
    const examplePos = [position[0], position[1] + 100, position[2]];
    let pr0file = {};
    if (profileId !== "") {
        pr0file = RpProfile_1.default.getRpProfileFromId(profileId, dataFolder);
    }
    ;
    let prompt = `You are a AI assistant for ${name} a player in the game Arma 3.\n`
        + `The unit for measuring distance between 2 coordinates is meters.\n`
        + `For example: the distance between [0,0,0] and [0,1,0] is 1 meters.\n`
        + `If the distance is over 1000 meters, the unit is kilometers.\n`
        + `If asked where something is, you should respond with the distance and direction relative to ${name}.\n`
        + `Use this data to find locations: ${mapData}\n`
        + `${name} is at ${location}.\n`
        + `for example: ${name} is at ${position} and asks where the Kyle ${examplePos} is, the answer is 100m north.\n`
        + `The game is taking place at ${worldName}.\n`
        + `The time is [${date}].\n`
        + `${name} asked you: ${message}\n`
        + `Respond with less than 100 words.\n`;
    return prompt;
}
exports.default = buildPrompt;
;
