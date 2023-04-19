import RpConvo from "../../classes/RpConvo";
import getRpProfileFromId from "../RpProfile/getRpProfileFromId";

// This method returns a string of all messages in the conversation
// that are less than an hour old
// This may be changed in the future to allow for ambient ai chatter (reuse old messages)

export default
function stringMessages(this:RpConvo, timeLimit:number, dataFolder:string) {
    let messageString = "";
    this.messages.forEach((message) => {
    const speakerName = getRpProfileFromId(message.speaker, dataFolder).name;
    const currentTime = new Date().getTime();
    const timePassed = currentTime - message.nodeTime;
    if(timePassed < timeLimit){
    messageString += speakerName + ": " + message.content + " \n";
}});

return messageString;
};