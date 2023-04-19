"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatReply(speaker, reply) {
    const firstName = speaker.split(" ")[0];
    reply = reply.replace(speaker + " says:", "");
    reply = reply.replace(speaker + ":", "");
    reply = reply.replace(speaker + " responds, ", "");
    reply = reply.replace(speaker + " replies:", "");
    reply = reply.replace(speaker + " replies,", "");
    reply = reply.replace(speaker + " responds:", "");
    reply = reply.replace(firstName + " responds:", "");
    reply = reply.replace(firstName + " responds,", "");
    reply = reply.replace('""', '"');
    reply = reply.replace('""', '"');
    reply = reply.replace('""', '"');
    reply = reply.replace('"', '');
    reply = reply.replace('\"', '');
    reply = reply.trim();
    return reply;
}
exports.default = formatReply;
