/**
 * Created by yanggc on 2017/7/10.
 */
var projection = ol.proj.get('EPSG:3857');
var projectionExtent = projection.getExtent();
var size = ol.extent.getWidth(projectionExtent) / 256;
var resolutions = new Array(24);
var matrixIds = new Array(24);
for (var z = 0; z < 24; ++z) {
    // generate resolutions and matrixIds arrays for this WMTS
    resolutions[z] = size / Math.pow(2, z);
    matrixIds[z] = z;
}
var map = new ol.Map({
    layers: [
/*        new ol.layer.Tile({
            opacity: 1,
            source: new ol.source.WMTS({
                url: '	http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/WMTS',
                layer: '0',
                matrixSet: 'EPSG:3857',
                format: 'image/png',
                projection: projection,
                tileGrid: new ol.tilegrid.WMTS({
                    origin: ol.extent.getTopLeft(projectionExtent),
                    resolutions: resolutions,
                    matrixIds: matrixIds
                }),
                style: 'default',
                wrapX: true
            })
        })*/
        new ol.layer.Tile({
            opacity:0.5,
            source:new ol.source.OSM()
        })
    ],
    target: 'map',
    controls: ol.control.defaults({
        attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
            collapsible: false
        })
    }),
    view: new ol.View({
        center: ol.proj.transform([117.19, 32.945], 'EPSG:4326', 'EPSG:3857'),
        zoom: 13
})
});
//加载wms
var wmsSource = new ol.source.ImageWMS({
    url: 'http://192.168.1.158:8080/geoserver/town/wms?',
    params: {'LAYERS': 'town:town_group'},
    serverType: 'geoserver',
    crossOrigin: 'anonymous'
});
var wmsLayer = new ol.layer.Image({
    source: wmsSource
});
map.addLayer(wmsLayer);
function loadXMLDoc () {
    // var xmlhttp;
    // if (window.XMLHttpRequest)
    // {// code for IE7+, Firefox, Chrome, Opera, Safari
    //     xmlhttp=new XMLHttpRequest();
    // }
    // else
    // {// code for IE6, IE5
    //     xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    // }
    // xmlhttp.onreadystatechange=function()
    // {
    //     if (xmlhttp.readyState==4 && xmlhttp.status==200)
    //     {
    //         var blob=new Blob();
    //         blob=xmlhttp.response;
    //         var img = document.getElementById("myDiv");
    //         img.src = window.URL.createObjectURL(blob);
    //        // document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
    //     }
    // }
    // xmlhttp.open("POST","http://192.168.1.158:8080/geoserver/vearth/ows",true);
    // xmlhttp.setRequestHeader("Content-type","text/xml");
    // oReq.responseType="";
    // var s="<?xml version='1.0' encoding='UTF-8'?><GetCoverage version='1.0.0' service='WCS' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns='http://www.opengis.net/wcs' xmlns:ows='http://www.opengis.net/ows/1.1' xmlns:gml='http://www.opengis.net/gml' xmlns:ogc='http://www.opengis.net/ogc' xsi:schemaLocation='http://www.opengis.net/wcs http://schemas.opengis.net/wcs/1.0.0/getCoverage.xsd'>"+
    //     "<sourceCoverage>vearth:sz_raster</sourceCoverage>"+
    // "<domainSubset>"+
    // "<spatialSubset>"+
    // "<gml:Envelope srsName='EPSG:3857'>"+
    //     "<gml:pos>1.26961030841E7 2576038.9032</gml:pos>"+
    // "<gml:pos>1.26964030841E7 2576338.9032</gml:pos>"+
    // "</gml:Envelope>"+
    // "<gml:Grid dimension='2'>"+
    //     "<gml:limits>"+
    // "<gml:GridEnvelope>"+
    // "<gml:low>0 0</gml:low>"+
    // "<gml:high>10 10</gml:high>"+
    // "</gml:GridEnvelope>"+
    // "</gml:limits>"+
    //     "<gml:axisName>x</gml:axisName>"+
    // "<gml:axisName>y</gml:axisName>"+
    // "</gml:Grid>"+
    // "</spatialSubset>"+
    // "</domainSubset>"+
    // "<output>"+
    // "<crs>EPSG:4326</crs>"+
    // "<format>GeoTIFF</format>"+
    // "</output>"+
    // "</GetCoverage>";
    // xmlhttp.send(s);
    var data ='<?xml version="1.0" encoding="UTF-8"?><GetCoverage version="1.0.0" service="WCS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wcs" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xsi:schemaLocation="http://www.opengis.net/wcs http://schemas.opengis.net/wcs/1.0.0/getCoverage.xsd">'+
        '<sourceCoverage>vearth:sz_raster</sourceCoverage>'+
    '<domainSubset>'+
    '<spatialSubset>'+
    '<gml:Envelope srsName="EPSG:3857">'+
        '<gml:pos>2682303.084100 2581738.903200</gml:pos>'+
    '<gml:pos>12682903.084100 2582338.903200</gml:pos>'+
    '</gml:Envelope>'+
    '<gml:Grid dimension="2">'+
        '<gml:limits>'+
    '<gml:GridEnvelope>'+
    '<gml:low>0 0</gml:low>'+
    '<gml:high>20 20</gml:high>'+
    '</gml:GridEnvelope>'+
    '</gml:limits>'+
    '<gml:axisName>X</gml:axisName>'+
    '<gml:axisName>Y</gml:axisName>'+
    '</gml:Grid>'+
    '</spatialSubset>'+
    '</domainSubset>'+
    '<output>'+
    '<crs>EPSG:3395</crs>'+
    '<format>GeoTIFF</format>'+
    '</output>'+
    '</GetCoverage>';
    $.ajax({
        type: 'POST',
        url: 'http://geoserver.szazkj.com/geoserver/vearth/ows',
        data: data,
        // success: function(response, status, request){
        //
        // },
        // dataType: dataType
    });
}