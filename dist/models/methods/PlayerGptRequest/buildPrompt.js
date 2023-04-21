"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function buildPrompt(previousMessages, dataFolder) {
    const { worldName, status, date, message, player } = this;
    const { name, uid, profileId } = player;
    const { position, location } = status;
    const conversation = messageString(previousMessages);
    const mapsFolder = path_1.default.join(dataFolder, "maps");
    const mapData = fs_1.default.readFileSync(path_1.default.join(mapsFolder, worldName + ".json"));
    const includeHealthData = healthDataNeeded(conversation, message, status.health);
    const includeSquadData = squadDataNeeded(conversation, message, status.squadMembers);
    const includeEquipmentData = equipmentDataNeeded(conversation, message);
    const includeMapData = mapDataNeeded(conversation, message, mapData);
    let pr0file = {};
    let prompt = `You are a AI assistant for ${name} a player in the game Arma 3.\n`
        + `The game is taking place at ${worldName}.\n`
        + `The date is [${date}].\n`;
    if (includeMapData) {
        prompt += `The unit for measuring distance between 2 coordinates is meters.\n`
            + `If the distance is over 1000 meters, the unit is kilometers.\n`
            + `If asked where something is, you should respond with the distance and direction relative to ${name}.\n`
            + `Use this data to find locations: ${mapData}\n`
            + `${name} location is ${location}.\n`
            + `${name} position is ${position}.\n`;
    }
    else {
        prompt += `${name} location is ${location}.\n`;
    }
    ;
    if (includeHealthData)
        prompt += `${name}'s health is: ${JSON.stringify(status.health)}.\n`;
    if (includeSquadData)
        prompt += `${name}'s squad members are: ${JSON.stringify(status.squadMembers)}.\n`;
    if (includeEquipmentData)
        prompt += `${name}'s equipment is: ${JSON.stringify(status.equipment)}.\n`;
    if (previousMessages.length > 0) {
        prompt += `\n\nThis is the conversation so far:\n`
            + `${conversation}\n`;
    }
    ;
    prompt += `${name} said: ${message}\n`
        + `Respond as the Ai assistant.\n`
        + `Respond with less than 100 words.\n`;
    return prompt;
}
exports.default = buildPrompt;
;
function mapDataNeeded(conversation, userMessage, mapData) {
    const mapObj = JSON.parse(mapData);
    const keyWords = [
        "map",
        "maps",
        "location",
        "how far",
        "how close",
        "how long",
        "get to",
        "distance",
        "direction",
        "directions",
        "how big",
        "navigate",
        "route",
        "destination",
        "travel",
        "terrain",
        "coordinates",
        "landmarks",
        "local area",
        "city",
        "town",
        "village",
        "world",
        "street",
        "north",
        "south",
        "east",
        "west"
    ];
    for (const location of mapObj.locations) {
        keyWords.push(location.name);
    }
    ;
    const mapDataNeeded = keyWords.some((keyWord) => {
        return conversation.toLowerCase().includes(keyWord.toLowerCase()) ||
            userMessage.toLowerCase().includes(keyWord.toLowerCase());
    });
    return mapDataNeeded;
}
;
function equipmentDataNeeded(conversation, userMessage) {
    const keyWords = [
        "my equipment",
        "my gear",
        "my loadout",
        "my inventory",
        "my stuff",
        "my weapons",
        "my weapon",
        "items",
        "ammo",
        "magazine",
        "magazines",
        "grenade",
        "backpack",
        "vest",
        "uniform",
        "helmet",
        "headgear",
        "facewear",
        "first aid kit",
        "rifle",
        "pistol",
        "launcher",
        "clothing",
        "handgun",
        "my status"
    ];
    const equipmentDataNeeded = keyWords.some((keyWord) => {
        return conversation.toLowerCase().includes(keyWord.toLowerCase()) ||
            userMessage.toLowerCase().includes(keyWord.toLowerCase());
    });
    return equipmentDataNeeded;
}
;
function healthDataNeeded(conversation, userMessage, status) {
    const keyWords = [
        "my health",
        "my hp",
        "my status",
        "injuries",
        "wounds",
        "my condition",
        "health condition",
        "medical status",
        "physical condition",
        "vital signs"
    ];
    const healthDataNeeded = keyWords.some((keyWord) => {
        return conversation.toLowerCase().includes(keyWord.toLowerCase()) ||
            userMessage.toLowerCase().includes(keyWord.toLowerCase());
    });
    if (healthDataNeeded)
        return true;
    if (status.health !== '100%')
        return true;
    if (Object.keys(status.injuries).length > 0)
        return true;
    return false;
}
function squadDataNeeded(conversation, userMessage, squadMembers) {
    const keyWords = [
        "my squad",
        "my group",
        "my team",
        "my status",
        "squadMembers",
        "groupMembers",
        "teamMembers",
        "squad members",
        "group members",
        "team members"
    ];
    for (const soldier of squadMembers) {
        keyWords.push(soldier.name);
    }
    ;
    const squadDataNeeded = keyWords.some((keyWord) => {
        return conversation.toLowerCase().includes(keyWord.toLowerCase()) ||
            userMessage.toLowerCase().includes(keyWord.toLowerCase());
    });
    return squadDataNeeded;
}
;
function messageString(messages) {
    const messageString = messages.map((message) => {
        const name = Object.keys(message)[0];
        const text = message[name];
        return `${name}: ${text}\n`;
    });
    return messageString.join("");
}
