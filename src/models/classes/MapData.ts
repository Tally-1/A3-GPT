import Location, { locationDataArr } from "./Location";
import storeMapData from "../methods/MapData/storeMapData";


//describes a map and its locations
export default
class MapData {
  name: string;
  size: string;
  locations: Location[];

  constructor(request: mapDataArr) {
    const locations = [] as Location[];
    for (const locationData of request[4]) {
      locations.push(new Location(locationData));
    }

    this.name = request[2];
    this.size = request[3] + " sqKm2";
    this.locations = locations; 
  };
  
  storeMapData = storeMapData;
  
}


export
type mapDataArr      = [string, string, string, number, locationDataArr[]];