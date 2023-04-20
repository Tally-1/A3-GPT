"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sleep_1 = __importDefault(require("../../../misc/sleep"));
async function A3GPTstream() {
    this.a3DebugMsg("A3GPTstream started");
    while (true) {
        await this.handleRequests();
        await (0, sleep_1.default)(100);
        if (this.profileRequests.length > 0
            && !this.profileProcessing) {
            this.processBackLog();
        }
        ;
    }
    ;
}
exports.default = A3GPTstream;
;
