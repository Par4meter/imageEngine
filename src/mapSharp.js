/**
 * Created by Eric on 2018/1/11.
 */
import $ from 'jquery';
import MapWord from './mapWorld/mapWord';

class MapSharp{

    // constructor(){
    //     // this.container  = null;
    //     // this.mapType = null;
    //     // return this.generateMap();
    // }

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