"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Soldier_1 = __importDefault(require("./Soldier"));
class Squad {
    constructor(squadArr) {
        const squad = [];
        for (const squadMember of squadArr) {
            squad.push(new Soldier_1.default(squadMember));
        }
        this.squadMembers = squad;
    }
}
exports.default = Squad;
