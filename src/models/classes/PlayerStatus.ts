import InfEquipment from "./InfEquipment";
import Soldier from "./Soldier";
import Squad from "./Squad";
import StatusHealth from "./StatusHealth";

// Defines the status of a player, by parsing data sent from Arma 3.

export default
class PlayerStatus {
    characterName: string;
    location: string;
    position: number[];
    health: StatusHealth;
    equipment: InfEquipment;
    squadMembers: Soldier[];
  
    constructor(dataArr: any) {
      const health    = new StatusHealth(dataArr[5]);
      const equipment = new InfEquipment(dataArr[6]);
      const squad     = new Squad(dataArr[7]);
  
      this.characterName = dataArr[2];
      this.location = dataArr[3];
      this.position = dataArr[4];
      this.health = health;
      this.equipment = equipment;
      this.squadMembers = squad.squadMembers;
    }


  }