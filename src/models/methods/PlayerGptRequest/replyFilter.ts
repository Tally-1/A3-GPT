

// Removes all new lines and replaces them with <br/> tags
// <br/> tags are used to create new lines in a structured text format in Arma 3
// See: https://community.bistudio.com/wiki/Structured_Text

export default
function replyFilter(text:string){ 
    let reply = text.replace("/\n/g", "<br/>")
    reply = reply.replace("\n", "<br/>")
    reply = reply.replace("\n", "<br/>")
    reply = reply.replace("\n", "<br/>")
    reply = reply.replace("\n", "<br/>")
    reply = reply.replace("\n", "<br/>");
    reply = reply.trim();
    
    if(reply.startsWith(".")){reply = reply.slice(1)};
    
    return reply;
};