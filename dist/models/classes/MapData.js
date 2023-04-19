"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Location_1 = __importDefault(require("./Location"));
const storeMapData_1 = __importDefault(require("../methods/MapData/storeMapData"));
class MapData {
    constructor(request) {
        this.storeMapData = storeMapData_1.default;
        const locations = [];
        for (const locationData of request[4]) {
            locations.push(new Location_1.default(locationData));
        }
        this.name = request[2];
        this.size = request[3] + " sqKm2";
        this.locations = locations;
    }
    ;
}
exports.default = MapData;
