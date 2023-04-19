"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InfEquipment_1 = __importDefault(require("./InfEquipment"));
const Squad_1 = __importDefault(require("./Squad"));
const StatusHealth_1 = __importDefault(require("./StatusHealth"));
class PlayerStatus {
    constructor(dataArr) {
        const health = new StatusHealth_1.default(dataArr[5]);
        const equipment = new InfEquipment_1.default(dataArr[6]);
        const squad = new Squad_1.default(dataArr[7]);
        this.characterName = dataArr[2];
        this.location = dataArr[3];
        this.position = dataArr[4];
        this.health = health;
        this.equipment = equipment;
        this.squadMembers = squad.squadMembers;
    }
}
exports.default = PlayerStatus;
