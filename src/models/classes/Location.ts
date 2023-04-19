

//describes type, name and position of a location

export default
class Location {
    name: string;
    position: number[];
    type: string;
  
    constructor(locationData: locationDataArr) {
      let type = "minor location";
  
      if (locationData[2] == "NameCity") {
        type = "town";
      }
      if (locationData[2] == "NameCityCapital") {
        type = "city";
      }
  
      this.name = locationData[0] as string;
      this.position = locationData[1];
      this.type = type;
    }
  }

export
type locationDataArr = [string, number[], string];