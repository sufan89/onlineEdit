//县服务地址
var serviceUrl = 'http://222.134.70.138:6080/arcgis/rest/services/xian/MapServer/0';
//乡镇服务地址
//村服务地址

var layer = '0';

var esrijsonFormat = new ol.format.EsriJSON();

var styleCache = {
    '370305': new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(225, 225, 225, 255)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(0, 0, 0, 255)',
            width: 0.4
        })
    }),
    '370304': new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 0, 0, 255)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(110, 110, 110, 255)',
            width: 0.4
        })
    }),
    '370322': new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(56, 168, 0, 255)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(110, 110, 110, 255)',
            width: 0
        })
    }),
    '370321': new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(168, 112, 0, 255)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(110, 110, 110, 255)',
            width: 0.4
        })
    }),
    '370323': new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(168, 112, 0, 255)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(110, 110, 110, 255)',
            width: 0.4
        })
    }),
    '370306': new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(168, 112, 0, 255)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(110, 110, 110, 255)',
            width: 0.4
        })
    }),
    '370302': new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(168, 112, 0, 255)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(110, 110, 110, 255)',
            width: 0.4
        })
    }),
    '370303': new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(168, 112, 0, 255)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(110, 110, 110, 255)',
            width: 0.4
        })
    }),
    '370306': new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(168, 112, 0, 255)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(110, 110, 110, 255)',
            width: 0.4
        })
    }),
    '370302': new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(168, 112, 0, 255)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(110, 110, 110, 255)',
            width: 0.4
        })
    })
};

var vectorSource = new ol.source.Vector({
    loader: function (extent, resolution, projection) {
        var url = serviceUrl + '/query/?f=json&' +
            'returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
            encodeURIComponent('{"xmin":' + extent[0] + ',"ymin":' +
                extent[1] + ',"xmax":' + extent[2] + ',"ymax":' + extent[3] +
                ',"spatialReference":{"wkid":102100}}') +
            '&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*' +
            '&outSR=102100';
        $.ajax({
            url: url, dataType: 'jsonp', success: function (response) {
                if (response.error) {
                    alert(response.error.message + '\n' +
                        response.error.details.join('\n'));
                } else {
                    // dataProjection will be read from document
                    var features = esrijsonFormat.readFeatures(response, {
                        featureProjection: projection
                    });
                    if (features.length > 0) {
                        vectorSource.addFeatures(features);
                    }
                }
            }
        });
    },
    strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
        tileSize: 512
    }))
});
//县图层渲染函数
var vector = new ol.layer.Vector({
    source: vectorSource,
    style: function (feature) {
        var classify = feature.get('行政区');
        return styleCache[classify];
    }
});

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');

/**
 * 创建弹出框
 */
var overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
});
var map = new ol.Map({
    layers: [vector],
    target: document.getElementById('map'),
    view: new ol.View({
        center: ol.proj.transform([117.54433782100011, 35.92449171900006], 'EPSG:4326', 'EPSG:3857'),
        zoom: 8
    }),
    overlays: [overlay],
});
//高亮显示图层
var featureOverlay = new ol.layer.Vector({
    source: new ol.source.Vector(),
    map: map,
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(127, 255, 0,255)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(0, 0, 0, 255)',
            width: 0.4
        })
    })
});
var highlight;
//鼠标移动事件
map.on('pointermove', function (evt) {
    if (evt.dragging) {
        return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    var feature = map.forEachFeatureAtPixel(pixel, function (feature) {
        return feature;
    });
    if (feature !== highlight) {
        if (highlight) {
            featureOverlay.getSource().removeFeature(highlight);
        }
        if (feature) {
            featureOverlay.getSource().addFeature(feature);
        }
        highlight = feature;
    }
    if (feature != null) {
        var coordinate = evt.coordinate;
        var xzhcode = feature.get("行政区");
        content.innerHTML = '<p>当前选择的行政区代码:</p><code>' + xzhcode +
            '</code>';
        overlay.setPosition(coordinate);
    }
    else {
        overlay.setPosition(undefined);
    }
});
var clickLeve = 0;//当前地图显示的层级。0：县；1：镇；2：村
//图层配置
var layerconfig={
    370303:{zhenlayer:0,cunlayer:6},
    370305:{zhenlayer:3,cunlayer:}


};
//鼠标点击事件
map.on('click', function (evt) {
    var selectfeature = map.forEachFeatureAtPixel(pixel, function (feature) {
        return feature;
    });
    if (selectfeature != null) {//下钻
        //selectfeature
        var xzqcode = selectfeature.get("行政区");
        if (xzqcode == null) xzqcode = selectfeature.get("XZQDM");
        if (xzqcode == null) xzqcode = selectfeature.get("xzqdm");
        if (xzqcode.length == 6) //点击的是县
        {
            clickLeve = 0;
        }
        else if (xzqcode.length = 12 && xzqcode.substring(xzqcode.length - 3) == '000')//点击的是镇
        {
            clickLeve = 1;
        }
        else //点击的是村
        {
            clickLeve = 2;
        }
    }
    else {//返回上一级
        if (clickLeve == 0) //当前处于最上一级，不操作
        {
            clickLeve = 0;
        }
        else if (clickLeve == 1) {
            clickLeve = 0;
        }
        else if (clickLeve == 2) {
            clickLeve = 1;
        }
    }
});