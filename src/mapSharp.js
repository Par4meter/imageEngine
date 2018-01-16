/**
 * Created by Eric on 2018/1/11.
 */
import MapWord from './mapSharp/mapWorld/mapWord';
import ArcGis from './mapSharp/arcGis/arcGis';
import BaiduMap from './mapSharp/baiduMap/baiduMap';

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
                return new BaiduMap(container);
                break;
        }
    }

}

window.mapSharp = {
    "Map":function (container,mapType) {
        return MapSharp.generateMap(container,mapType);
    }
};