/**
 * Created by Eric on 2018/1/11.
 */
import MapWord from './mapSharp/mapWorld/mapWord';
import ArcGis from './mapSharp/arcGis/arcGis';
class MapSharp{

     static generateMap(container, mapType){
        // let mapType = mapType;
        switch(mapType){
            case 'mapWorld':
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

// window.mapSharp = new MapSharp();
window.mapSharp = {
    "Map":function (container,mapType) {
        return MapSharp.generateMap(container,mapType);
    }
};