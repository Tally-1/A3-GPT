import Soldier from "./Soldier";


// Defines a infantry squad, currently used in the player -> GPT-3 prompt
export default
class Squad {
    squadMembers: Soldier[];
  
    constructor(squadArr: any[]) {    
        const squad = [] as Soldier[];

        for (const squadMember of squadArr) {
            squad.push(new Soldier(squadMember));
        }

        this.squadMembers = squad;
      
    }
  }
