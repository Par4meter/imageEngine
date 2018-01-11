/**
 * Created by Eric on 2018/1/11.
 */
import MapWord from './com.mapSharp/mapWorld/mapWord';

class MapSharp{

     generateMap(container, mapType){
        // let mapType = mapType;
        switch(mapType){
            case 'mapWorld':
                return new MapWord(container);
                break;
            case 'arcGis':
                break;
            case 'baiduMap':
                break;
        }
    }

}

window.mapSharp = new MapSharp();