


import ol from 'openlayers';


class ArcGis{

    constructor(container){
        this.projection = ol.proj.get('EPSG:4326');
        this.center = [116.46,39.92];
        this.extent = [-180,-90,180,90];
        this.url = 'https://localhost:6443/arcgis/rest/services/mytile/MapServer/tile/{z}/{y}/{x}';
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
        // let extent = this.extent;
        return new ol.layer.Tile({
            source:this.generateSource(),
            // extent:extent,
            name:layerName
        });
    }
    generateSource(){
        let url = this.url;
        return new ol.source.XYZ({
            url:url
        });
    }
}
export default ArcGis;
