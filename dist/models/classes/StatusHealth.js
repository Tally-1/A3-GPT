"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StatusHealth {
    constructor(healthData) {
        const parts = ["face", "neck", "head", "pelvis", "abdomen", "diaphragm", "chest", "body", "arms", "hands", "legs", "incapacitated", "generic"];
        const health = (1 - healthData[12]) * 100 + "%";
        const incapacitation = healthData[11];
        this["health"] = health;
        this["injuries"] = {};
        if (incapacitation > 0) {
            this["incapacitation"] = Math.round((incapacitation) * 100) + "%";
        }
        ;
        let i = 0;
        for (const bodypart of parts) {
            const damage = healthData[i];
            if (damage > 0) {
                const value = Math.round((damage) * 100) + "%";
                const status = {};
                status["damage"] = value;
                this["injuries"][bodypart] = status;
                if (i == 10) {
                    break;
                }
            }
            i++;
        }
        ;
    }
    ;
}
exports.default = StatusHealth;
;
