import path from "path";
import fs from "fs";
import MapData from "../../classes/MapData";
import RequestManager from "../../classes/RequestManager";

// On the start of a new game, map data is sent from the server.
// This method stores the map data in a file.

export default
function storeMapData(this: MapData, reqMngr:RequestManager) {
    reqMngr.currentMap = this.name;
    const mapsFolder = path.join(reqMngr.dataFolder, "maps");
    const filePath = path.join(mapsFolder, this.name + ".json");
    const data = JSON.stringify(this, null, 2);

    fs.writeFileSync(filePath, data);
  }