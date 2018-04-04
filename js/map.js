//县服务地址
var serviceUrl = 'http://222.134.70.138:6080/arcgis/rest/services/zbxzq/MapServer/';
//乡镇服务地址
//村服务地址

var layerindex = '0';

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
    }),
    '370322103000': new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(168, 112, 0, 255)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(110, 110, 110, 255)',
            width: 0.4
        })
    }),
    '370322109000': new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(168, 112, 0, 255)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(110, 110, 110, 255)',
            width: 0.4
        })
    }),
    '370322108000': new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(168, 112, 0, 255)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(110, 110, 110, 255)',
            width: 0.4
        })
    }),
    '370322101000': new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(168, 112, 0, 255)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(110, 110, 110, 255)',
            width: 0.4
        })
    }),
    '370322102000': new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(168, 112, 0, 255)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(110, 110, 110, 255)',
            width: 0.4
        })
    }),
    '370322104000': new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(168, 112, 0, 255)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(110, 110, 110, 255)',
            width: 0.4
        })
    }),
    '370322106000': new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(168, 112, 0, 255)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(110, 110, 110, 255)',
            width: 0.4
        })
    }),
    '370322107000': new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(168, 112, 0, 255)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(110, 110, 110, 255)',
            width: 0.4
        })
    }),
    '370322110000': new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(168, 112, 0, 255)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(110, 110, 110, 255)',
            width: 0.4
        })
    }),
};

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
    },
    stopEvent: false
});
var map = new ol.Map({
    target: document.getElementById('map'),
    view: new ol.View({
        center: ol.proj.transform([118.15711821634096, 36.54238148693915], 'EPSG:4326', 'EPSG:3857'),
        zoom: 9
    }),
    overlays: [overlay]
});
var vectorSource = new ol.source.Vector({});
//县图层渲染函数
var vector = new ol.layer.Vector({
    source: vectorSource,
    style: function (feature) {
        var classify = feature.get('XZQDM');
        return styleCache[classify];
    }
});
map.addLayer(vector);
//Dom渲染后加载图层数据
window.onload = function () {
    getNewFeature('0', '');
};
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
        var xzhcode = feature.get("XZQDM");
        content.innerHTML = '<p>当前选择的行政区代码:</p><code>' + xzhcode +
            '</code>';
        overlay.setPosition(coordinate);
    }
    else {
        overlay.setPosition(undefined);
    }
});
var selectXzqCode = "";
//鼠标点击事件
map.on('click', function (evt) {
    var selectfeature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
    });
    if (selectfeature != null) {//下钻
        //selectfeature
        var xzqcode = selectfeature.get("XZQDM");
        if (xzqcode.length == 6) //点击的是县
        {
            layerindex = '1';
            getNewFeature(layerindex, xzqcode);
        }
        else if (xzqcode.length = 12 && xzqcode.substring(xzqcode.length - 3) == '000')//点击的是镇
        {
            layerindex = '2';
            getNewFeature(layerindex, xzqcode);
        }
        else //点击的是村
        {
            layerindex = '3';
        }
        selectXzqCode = xzqcode;
    }
    else {//返回上一级
        if (layerindex == '0') //当前处于最上一级，不操作
        {
            layerindex = '0';
        }
        else if (layerindex == 1) {
            layerindex = '0';
            getNewFeature(layerindex, selectXzqCode);
        }
        else if (layerindex == 2) {
            layerindex = '1';
            getNewFeature(layerindex, selectXzqCode);
        }
    }
});
//获取数据
function getNewFeature(layerIndex, strXzqCode) {
    //清除气泡
    clearElement();
    //清除图形
    vectorSource.clear();
    var url = serviceUrl + layerIndex;
    switch (layerIndex) {
        case '0'://县
            url = url + '/query?f=json&where=1=1&outFields=*';
            break;
        case '1'://乡镇
            url = url + '/query?f=json&where=XZQDM+like+\'' + strXzqCode + '%25\'&outFields=*';
            break;
        case '2'://村
            url = url + '/query?f=json&where=XZQDM+like+\'' + strXzqCode.substr(strXzqCode.length - 3) + '%25\'&outFields=*';
            break;
    }
    $.ajax({
        url: url, dataType: 'jsonp', success: function (response) {
            if (response.error) {
                alert(response.error.message + '\n' +
                    response.error.details.join('\n'));
            } else {
                var features = esrijsonFormat.readFeatures(response, {
                    featureProjection: new ol.proj.Projection({code: 'EPSG:3857'})
                });
                if (features.length > 0) {
                    vectorSource.addFeatures(features);
                    for (var i = 0; i < features.length; i++) {
                        addMark(features[i]);
                    }
                }
                map.getView().fit(vectorSource.getExtent());
            }
        }
    });
}
//添加气泡标记
function addMark(Markfeature) {
    if (Markfeature == null) return;
    var pos = getCenter(Markfeature.getGeometry().getExtent());
    var xzqCode = Markfeature.get("XZQDM");
    var div = document.createElement('div');
    div.setAttribute('id', 'marker');
    div.setAttribute('name', xzqCode);
    div.innerHTML = xzqCode;
    var marks = document.getElementById("markers");
    marks.appendChild(div);
    var marker = new ol.Overlay({
        id:xzqCode,
        position: pos,
        positioning: 'center-center',
        element: document.getElementsByName(xzqCode)[0],
        stopEvent: false
    });
    map.addOverlay(marker);
}
//获取中心点
function getCenter(extent) {
    var x = extent[0] + (extent[2] - extent[0]) / 2;
    var y = extent[1] + (extent[3] - extent[1]) / 2;
    return [x, y];
}
function clearElement() {

    var allFeautres=vectorSource.getFeatures();
    var div=document.getElementById('markers');
    for(var i=0;i<allFeautres.length;i++)
    {
        var OverLay=map.getOverlayById(allFeautres[i].get("XZQDM"));
        if(OverLay!=null)
        {
            map.removeOverlay(OverLay);
        }
    }
}

