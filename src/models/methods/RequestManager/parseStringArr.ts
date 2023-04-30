import {red, reset} from "../../../misc/logColors";
import RequestManager from "../../classes/RequestManager";

export default
function parseStringArr(string:string, count:number = 1){
    const lastLetter = string.length -count;
    let newString  = string.substring(count, lastLetter);
    
    let array = [] as any[];

    try {
        array = JSON.parse(newString);

        return array;
    }
    catch(e){
    try {
    
        array = JSON.parse(addMissingQuotes(newString));
        return array;    
    }catch(e){
    try {
    
        array = JSON.parse(addMissingQuotes(toANSI(newString)));
        return array;

    }catch(e){
    try {
    
        array = JSON.parse(addMissingQuotes(filterNonAnsi(toANSI(newString))));
        return array;

    }catch(e){

        const requestType = newString.substring(2, (newString.indexOf('",')));
        console.log(`${red}Parsing ${requestType} failed.${reset}`);
        RequestManager.logRequestFail(newString, requestType, e);
        console.log(e);
        
        return [];
    }}}};
};



function addMissingQuotes(str: string): string {
    let newStr: string = '';
    
    for (let x = 0; x < str.length; x++) {

        // If there is no quote before a comma where there should be...
        if (str[x] === "," && str[x - 1] !== "]" && str[x - 1] !== "\"") {
            // Add the missing quote.
            newStr += "\"";
            newStr += ",";
        } else {
            newStr += str[x];
        }
    }

    return newStr;
};

function filterNonAnsi(string:string){
    return string.replace(/[^\x00-\x7F]/g, "");
};

function toANSI(string:string) {

    const nonAnsiMap = {
      'á': 'a',
      'é': 'e',
      'í': 'i',
      'ó': 'o',
      'ú': 'u',
      'ñ': 'n',
      'ł': 'l'
    };
  
    return string.replace(/[^\x00-\x7F]/g, function(match) {//@ts-ignore
      return nonAnsiMap[match] || '';
    });
};