"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InfEquipment {
    constructor(equipmentData, reduced = false) {
        const magazines = equipmentData[8];
        const magObj = {};
        for (const mag of magazines) {
            const [magName, magCount] = mag;
            magObj[magName] = magCount;
        }
        ;
        this.rifle = equipmentData[0];
        this.launcher = equipmentData[1];
        this.handgun = equipmentData[2];
        this.clothing = equipmentData[3];
        this.vest = equipmentData[4];
        this.headgear = equipmentData[5];
        this.facewear = equipmentData[6];
        this.items = equipmentData[7];
        this.magazines = magObj;
        for (const equipmentItem of (Object.keys(this))) {
            equipmentItem;
            if (this[equipmentItem] === '') {
                this[equipmentItem] = "none";
            }
            if (typeof this[equipmentItem] === "string") {
                const item = this[equipmentItem];
                this[equipmentItem] = item.replace(/<br \/>/g, '. ');
            }
        }
    }
}
exports.default = InfEquipment;
