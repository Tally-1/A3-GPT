"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function replyFilter(text) {
    let reply = text.replace("/\n/g", "<br/>");
    reply = reply.replace("\n", "<br/>");
    reply = reply.replace("\n", "<br/>");
    reply = reply.replace("\n", "<br/>");
    reply = reply.replace("\n", "<br/>");
    reply = reply.replace("\n", "<br/>");
    reply = reply.trim();
    if (reply.startsWith(".")) {
        reply = reply.slice(1);
    }
    ;
    return reply;
}
exports.default = replyFilter;
;
