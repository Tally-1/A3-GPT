import GptConvo from "../../classes/GptConvo";

// This method returns an array of all messages in the conversation
// Loaded from the conversation file

export default
function getAllMessages(this: GptConvo){
    const messages = [] as any;

    this.messages.sort((a, b) => {
        return b["send-time"] - a["send-time"];
      });

    for (const message of this.messages) {
        const timeSinceMsg = Date.now() - message["send-time"];

        // don't include messages older than 5 minutes.
        if(timeSinceMsg > 300000){continue;}; 

        const userName = message.name;
        const userMessage = {[userName]:message.message};
        const assistantMessage = {"Assistant":message.reply};
        
        messages.push(assistantMessage);
        messages.push(userMessage);
    };
    messages.reverse();
    if(messages.length > 0) console.log(messages);
    
    return messages;
};