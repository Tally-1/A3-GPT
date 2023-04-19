import { numObj } from "../../misc/interfaces";


// Defines the equipment of a infantry unit
// Used for squadmembers of the player.

export default
class ReducedEquipment{
    [key: string]: string | string[] | numObj | {[key: string]: string};

    rifle:string;
    launcher:string;
    handgun:string;
    vest:string;
    headgear:string;
    items:string[];

    constructor(equipmentData: string[] | number[]) {
        this.rifle    = String(equipmentData[0]);
        this.launcher = String(equipmentData[1]);
        this.handgun  = String(equipmentData[2]);
        this.vest     = String(equipmentData[3]);
        this.headgear = String(equipmentData[4]);
        this.items    = equipmentData[5] as unknown as string[];
    }
}