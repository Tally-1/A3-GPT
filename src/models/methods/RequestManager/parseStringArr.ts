
// Used when parsing an array in an ini file that has double "".
export default
function parseStringArr(string:string, count:number = 1){
    // console.log(string.length);
    // console.log(string[611]);
    const lastLetter = string.length -count;
    const newString  = string.substring(count, lastLetter);
    const array = JSON.parse(newString) as any[];
    return array;
};