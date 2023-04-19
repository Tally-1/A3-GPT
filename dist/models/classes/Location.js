"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Location {
    constructor(locationData) {
        let type = "minor location";
        if (locationData[2] == "NameCity") {
            type = "town";
        }
        if (locationData[2] == "NameCityCapital") {
            type = "city";
        }
        this.name = locationData[0];
        this.position = locationData[1];
        this.type = type;
    }
}
exports.default = Location;
