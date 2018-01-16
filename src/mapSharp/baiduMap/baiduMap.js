import ol from 'openlayers';
import 'openlayers/dist/ol.css'

const MAP_TYPE_VECTOR = 'vector';
const MAP_TYPE_IMAGE = 'image';
const LAYER_TYPE_VECTOR = 'vec';
const LAYER_TYPE_VECTOR_LABEL = 'cva';
const LAYER_TYPE_IMG= 'img';
const LAYER_TYPE_IMG_LABEL = 'cia';

class BaiduMap{

    constructor(container){
        this.projection = ol.proj.get('EPSG:3857');
        this.center = [116.46,39.92];
        this.origin = [0,0];
        this.extent = [-180,-90,180,90];
        this.tileSize = 256;
        this.urlTemplate = "http://online0.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&udt=20180112&scaler=1&p=1";
        this.ol_map = new ol.Map({
            target:container,
            view:new ol.View({
                projection: this.projection,
                center: ol.proj.fromLonLat(this.center, this.projection),
                minZoom: 2,
                maxZoom:17,
                zoom: 5
            }),
            layers:null
        });
        this.generateMap();
    }
    generateMap(){
        this.ol_map.addLayer(this.generateLayer('baseMapLayer'));
    }
    generateLayer(layerName){
        return new ol.layer.Tile({
            source:this.generateSource(),
            name:layerName
        });
    }
    generateSource(){
        let urlTemplate = this.urlTemplate;
        let projection = this.projection;
        let origin = this.origin;
        let resolutions = this.generateResolutions();

        // urlTemplate = urlTemplate.replace('{randomNumber}',Math.round(Math.random()*7).toString())
        //                          .replace(/{layerType}/g,layerType);

        return new ol.source.TileImage({

            tileUrlFunction: function (tileCoord, pixelRatio, projection) {
                let z = tileCoord[0];
                let x = tileCoord[1];
                let y = tileCoord[2];

                if(x<0){
                    x = "M"+(-x);
                }
                if(y<0){
                    y = "M"+(-y);
                }

                return urlTemplate.replace('{z}', z.toString())
                    .replace('{y}', y.toString())
                    .replace('{x}', x.toString());
            },
            projection: projection,
            tileGrid: new ol.tilegrid.TileGrid({
                origin: origin,
                resolutions: resolutions
            })
        });
    }
    generateResolutions(){
        let  resolutions = [];
        for(let i=0; i<19; i++){
            resolutions[i] = Math.pow(2, 18-i);
        }
        return resolutions; //返回分辩率数组resolutions
    }
}

export default BaiduMap;
