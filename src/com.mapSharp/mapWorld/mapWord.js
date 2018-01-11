import ol from 'openlayers';
import 'openlayers/dist/ol.css'
const MAP_TYPE_VECTOR = 'vector';
const MAP_TYPE_IMAGE = 'image';
const LAYER_TYPE_VECTOR = 'vec';
const LAYER_TYPE_VECTOR_LABEL = 'cva';
const LAYER_TYPE_IMG= 'img';
const LAYER_TYPE_IMG_LABEL = 'cia';

class MapWord{

    constructor(container){
        this.projection = ol.proj.get('EPSG:4326');
        this.center = [116.46,39.92];
        this.origin = [-180,-90];
        this.extent = [-180,-90,180,90];
        this.tileSize = 256;
        this.urlTemplate = "http://t{randomNumber}.tianditu.cn/{layerType}_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER={layerType}&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles" + "&TILECOL=" + '{x}' + "&TILEROW=" + '{y}' + "&TILEMATRIX=" + '{z}';
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
        this.generateMap(MAP_TYPE_VECTOR);
    }
    generateMap(mapType){
        let baseMapLayer;
        let labelLayer;
        switch (mapType){
            case 'vector':
                baseMapLayer = this.generateLayer(LAYER_TYPE_VECTOR,'baseMapLayer');
                labelLayer = this.generateLayer(LAYER_TYPE_VECTOR_LABEL,'labelLayer');
                break;
            case 'image':
                baseMapLayer = this.generateLayer(LAYER_TYPE_VECTOR,'baseMapLayer');
                labelLayer = this.generateLayer(LAYER_TYPE_VECTOR_LABEL,'labelLayer');
                break;
        }

        this.ol_map.addLayer(baseMapLayer);
        this.ol_map.addLayer(labelLayer);
    }
    generateLayer(layerType,layerName){
        return new ol.layer.Tile({
            source:this.generateSource(layerType),
            name:layerName
        });
    }
    generateSource(layerType){
        let urlTemplate = this.urlTemplate;
        let projection = this.projection;
        let origin = this.origin;
        let tileSize = this.tileSize;
        let resolutions = this.generateResolutions();

        urlTemplate = urlTemplate.replace('{randomNumber}',Math.round(Math.random()*7).toString())
                                 .replace(/{layerType}/g,layerType);

        return new ol.source.TileImage({

            tileUrlFunction: function (tileCoord, pixelRatio, projection) {
                debugger;
                let z = tileCoord[0];
                let x = tileCoord[1];
                let y = parseInt(Math.pow(2, z - 1) - 1 - tileCoord[2]);
                return urlTemplate.replace('{z}', z.toString())
                    .replace('{y}', y.toString())
                    .replace('{x}', x.toString());
            },
            projection: projection,
            tileGrid: new ol.tilegrid.TileGrid({
                origin: origin,
                tileSize: tileSize,
                resolutions: resolutions
            })
        });
    }
    generateResolutions(){
        let extent = this.extent;
        let tileSize = this.tileSize;
        let width = ol.extent.getWidth(extent);
        let  height = ol.extent.getHeight(extent);
        let  maxResolution = (width <= height ? height : width) / (tileSize);//最大分辨率
        let  resolutions = new Array(18);
        let  z;
        for (let z = 0; z < 18; ++z) {
            resolutions[z] = maxResolution / Math.pow(2, z);
        }
        return resolutions; //返回分辩率数组resolutions
    }
}

export default MapWord;
