/**
 * Created by yanggc on 2018/8/2.
 */
/*
扩展高德地图
*/
ol.source.AMap = function(options){
    var options = options ? options : {};
    let url;
    if(options.mapType == "sat"){
        url ="http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}";
    }else{
        url = "http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}";
    }
    ol.source.XYZ.call(this, {
        crossOrigin: 'anonymous',
        cacheSize: options.cacheSize,
        projection: ol.proj.get('EPSG:3857'),
        url:url,
        wrapX: options.wrapX !== undefined ? options.wrapX : true

    });
};
ol.inherits(ol.source.AMap,ol.source.XYZ);
/*
扩展天地图
 */
ol.source.TianMap = function(options){
    var options = options ? options : {};
    let url;
    if(options.mapType == "sat"){
        url = "http://t{0-4}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}";
    }else if(options.mapType == "satLabel"){
        url = "http://t{0-4}.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}";
    }else if(options.mapType == "label"){
        url = "http://t{0-4}.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}";
    }else{
        url = "http://t{0-4}.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}";
    }
    ol.source.XYZ.call(this, {
        projection: ol.proj.get('EPSG:3857'),
        cacheSize: options.cacheSize,
        crossOrigin: 'anonymous',
        opaque: options.opaque !== undefined ? options.opaque : true,
        maxZoom: options.maxZoom !== undefined ? options.maxZoom : 19,
        reprojectionErrorThreshold: options.reprojectionErrorThreshold,
        tileLoadFunction: options.tileLoadFunction,
        url: url,
        wrapX: options.wrapX
    });
};
ol.inherits(ol.source.TianMap, ol.source.XYZ);

