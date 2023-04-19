import GptConvo from "../../classes/GptConvo";

// This method returns an array of all messages in the conversation
// Loaded from the conversation file

export default
function getAllMessages(this: GptConvo){
    const messages = [];
    for (const message of this.messages) {
        const userMessage = "user: "+message.message;
        const reply = "Assistant: "+message.reply;
        messages.push(userMessage);
        messages.push(reply);
    }
    console.log(messages);
    return messages;
};