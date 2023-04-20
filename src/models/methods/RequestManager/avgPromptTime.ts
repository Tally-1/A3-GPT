import RequestManager from "../../classes/RequestManager";


export default
function avgPromptTime(this:RequestManager){
    if(this.GPT3PromptTimes.length < 1){return 0};
    const sum = this.GPT3PromptTimes.reduce((a, b) => a + b, 0);
    const avg = (sum / this.GPT3PromptTimes.length) || 0;
    return avg;
};