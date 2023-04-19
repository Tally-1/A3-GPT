import { numObj, stringObj } from "../../misc/interfaces";


// Defines the equipment of a infantry unit
// currently used for the player -> GPT-3 prompt

export default
class InfEquipment {
    [key: string]: string | string[] | numObj | {[key: string]: string};

    rifle:string;
    launcher:string;
    handgun:string;
    clothing:string;
    vest:string;
    headgear:string;
    facewear:string;
    items:string[];
    magazines:stringObj;
  
    constructor(equipmentData: string[], reduced:boolean = false) {

        const magazines = equipmentData[8];
    
        const magObj = {} as stringObj;
        for (const mag of magazines) {
            const [magName, magCount] = mag;
            magObj[magName] = magCount;
        };

        this.rifle = equipmentData[0];
        this.launcher = equipmentData[1];
        this.handgun = equipmentData[2];
        this.clothing = equipmentData[3];
        this.vest = equipmentData[4];
        this.headgear = equipmentData[5];
        this.facewear = equipmentData[6];
        this.items = equipmentData[7] as unknown as string[];
        this.magazines = magObj;

        for (const equipmentItem of (Object.keys(this))) {
            equipmentItem as string; 
            if(this[equipmentItem] === ''){
                this[equipmentItem] = "none";  
            }
            if(typeof this[equipmentItem] === "string" ){
                const item = this[equipmentItem] as string;
                this[equipmentItem] = item.replace(/<br \/>/g, '. ');
            }
        }
    }
}