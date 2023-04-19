import ReducedEquipment from "./ReducedEquipment";
import StatusHealth from "./StatusHealth";

// Defines the status of a soldier, by parsing data sent from Arma 3.
// Currently used for squadmembers of the player, I may use this as the 
// base class for the player status in the future. (less data to send)

export default
class Soldier {
    "name": string;
    "position": string;
    "health": StatusHealth;
    "equipment": ReducedEquipment;

    constructor(soldierData: any[]) {
        this.name     = soldierData[0];
        this.position = soldierData[1];

        this.health = new StatusHealth(soldierData[2]);
        this.equipment = new ReducedEquipment(soldierData[3]);
    }

}