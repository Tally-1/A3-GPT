"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReducedEquipment_1 = __importDefault(require("./ReducedEquipment"));
const StatusHealth_1 = __importDefault(require("./StatusHealth"));
class Soldier {
    constructor(soldierData) {
        this.name = soldierData[0];
        this.position = soldierData[1];
        this.health = new StatusHealth_1.default(soldierData[2]);
        this.equipment = new ReducedEquipment_1.default(soldierData[3]);
    }
}
exports.default = Soldier;
