
// import {MapWord} from "./MapWord";

class MapSharp{

	constructor(container,mapType){
		this.container  = container;
		this.mapType = mapType;
		return this.generateMap();
	}
	
	generateMap(){
	    let mapType = this.mapType;
	    let container = this.container;
		switch(mapType){
			case 'mapWord':
                return new MapWord(container);
				break;
			case 'arcGis':
				return new ArcGis(container);
				break;
			case 'baiduMap':
				break;
		}
	}
	
}
