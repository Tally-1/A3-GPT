"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReducedEquipment {
    constructor(equipmentData) {
        this.rifle = String(equipmentData[0]);
        this.launcher = String(equipmentData[1]);
        this.handgun = String(equipmentData[2]);
        this.vest = String(equipmentData[3]);
        this.headgear = String(equipmentData[4]);
        this.items = equipmentData[5];
    }
}
exports.default = ReducedEquipment;
