
// Despite instructions not to do so, open ai will sometimes return the speaker's name in the reply. 
// This function removes it.

export default
function formatReply(speaker:string, reply:string) {
    const firstName = speaker.split(" ")[0];
    // const lastName = speaker.split(" ")[1];

    reply = reply.replace(speaker   + " says:", "");
    reply = reply.replace(speaker   + ":", ""); 
    reply = reply.replace(speaker   + " responds, ", ""); 
    reply = reply.replace(speaker   + " replies:", "");
    reply = reply.replace(speaker   + " replies,", "");
    reply = reply.replace(speaker   + " responds:", "");
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