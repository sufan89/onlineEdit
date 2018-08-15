
//符号组
var image = new ol.style.Circle({
    radius: 5,
    fill: null,
    stroke: new ol.style.Stroke({color: 'red', width: 3})
});

var styles = {
    'Point': new ol.style.Style({
        image: image
    }),
    'LineString': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'green',
            width: 3
        })
    }),
    'MultiLineString': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'green',
            width: 3
        })
    }),
    'MultiPoint': new ol.style.Style({
        image: image
    }),
    'MultiPolygon': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'blue',
            width: 3
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 0, 0.1)'
        })
    }),
    'Polygon': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'blue',
            lineDash: [4],
            width: 3
        }),
        fill: new ol.style.Fill({
            color: 'rgba(0, 0, 255, 0.1)'
        })
    }),
    'GeometryCollection': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'magenta',
            width: 2
        }),
        fill: new ol.style.Fill({
            color: 'magenta'
        }),
        image: new ol.style.Circle({
            radius: 10,
            fill: null,
            stroke: new ol.style.Stroke({
                color: 'magenta'
            })
        })
    }),
    'Circle': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'red',
            width: 2
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,0,0,0.2)'
        })
    })
};

//路网符号
var styleFunction = function(feature) {
    return styles[feature.getGeometry().getType()];
};

var wfssource=new ol.source.Vector();

var features=new ol.Collection();

var featureRequest = new ol.format.WFS().writeGetFeature({
    srsName: 'EPSG:4326',
    featureNS: 'http://192.168.0.50:9898/pg',
    featurePrefix: 'pgtest',
    featureTypes: ['mx_dyhf_ploygon','mx_zxcd_line','mx_ldgj_point'],
    outputFormat: 'application/json'
});
// post请求，并根据请求的数据进行加载
fetch("http://192.168.0.6:9898/geoserver/pgtest/wfs", {
    method: 'POST',
    body: new XMLSerializer().serializeToString(featureRequest)
}).then(function(response) {
    return response.json();
}).then(function(json) {
    features = new ol.format.GeoJSON().readFeatures(json,{featureProjection: 'EPSG:3857'});
    wfssource.addFeatures(features);
});

var wfslayer = new ol.layer.Vector({
    source: wfssource,
    style:styleFunction
});

var select = new ol.interaction.Select({
    wrapX: false
});
var addFeatures;
var draw;


var modify = new ol.interaction.Modify({
    features: select.getFeatures(),
    deleteCondition: function(event) {
        return ol.events.condition.shiftKeyOnly(event) &&
            ol.events.condition.singleClick(event);
    },
    pixelTolerance:10
});

var map = new ol.Map({
    interactions: ol.interaction.defaults().extend([select, modify]),
    layers: [
        new ol.layer.Tile({
            opacity: 1,
            source: new ol.source.AMap({
            }),
            extent:ol.proj.transformExtent([112.6920,21.2389,115.6737,24.0274],'EPSG:4326', 'EPSG:3857')
        })
    ],
    target: document.getElementById('map'),
    view: new ol.View({
        center:  ol.proj.transform([114.018, 22.671], 'EPSG:4326', 'EPSG:3857'),
        maxZoom: 19,
        zoom: 12
    })
});
//选择
function btnSelect(){
    //先清除操作事件
    if(draw)
    {
        map.removeInteraction(draw);
    }
    map.removeInteraction(modify);
    map.addInteraction(select);
};
//修改
function btnModify(){
    if(draw){map.removeInteraction(draw);}
    map.addInteraction(modify);
    map.addInteraction(select);
};
//删除
function  btnDelete(){

};
//新增点
function  btnAddPoint(){
    if(draw)
    {
        map. removeInteraction(draw);
    }
    map.removeInteraction(select);
    map.removeInteraction(modify);
    draw = new ol.interaction.Draw({
        source:wfssource,
        type: ("Point")
    });
    map.addInteraction(draw);
    draw.on("drawend", function (evt) {
        console.log(evt);
    }, this);
};

//新增线
function  btnAddLine(){
    if(draw)
    {
        map. removeInteraction(draw);
    }
    map.removeInteraction(select);
    map.removeInteraction(modify);
    draw = new ol.interaction.Draw({
        source:wfssource,
        type: ("LineString")
    });
    map.addInteraction(draw);
    draw.on("drawend", function (evt) {
        console.log(evt);
    }, this);
};
//新增面
function  btnAddPolygon(){
    if(draw)
    {
        map. removeInteraction(draw);
    }
    map.removeInteraction(select);
    map.removeInteraction(modify);
    draw = new ol.interaction.Draw({
        source:wfssource,
        type: ("MultiPolygon")
    });
    map.addInteraction(draw);
    draw.on("drawend", function (evt) {
        addFeatures=evt.feature;
    }, this);
}
//保存
var format = new ol.format.WFS({featureNS:"http://192.168.0.50:9898/pg",featureType:'mx_dyhf_ploygon',schemaLocation:"http://www.opengis.net/wfs \
                    http://schemas.opengis.net/wfs/1.1.0/WFS-transaction.xsd \
                    http://192.168.0.6:9898/geoserver/pgtest/wfs/DescribeFeatureType?typename=pgtest:mx_dyhf_ploygon"});
function btnSave(){
    if(addFeatures) {
        addFeatures.set('geometry', addFeatures.getGeometry());
        addFeatures.set('quname', '测试区名');
        addFeatures.set('qucode', '1001');
        addFeatures.setGeometryName('geom');
        console.log(addFeatures.getGeometry().getType());
        var node = format.writeTransaction([addFeatures], null, null, {
            gmlOptions: {srsName: "EPSG:3857"},
            featureNS: 'http://192.168.0.50:9898/pg',
            featureType: "mx_dyhf_ploygon",
            featurePrefix:"pgtest",
            srsName:"EPSG:4326"
        });
        console.log(node);
        $.ajax({
            type: "POST",
            url: "http://192.168.0.6:9898/geoserver/pgtest/wfs",
            data: new XMLSerializer().serializeToString(node),
            contentType: 'text/xml',
            success: function (data) {
                var result = format.readTransactionResponse(data);
                console.log(result);
            },
            error: function (e) {
                var errorMsg = e ? (e.status + ' ' + e.statusText) : "";
                alert('Error saving this feature to GeoServer.<br><br>'
                    + errorMsg);
            },
            context: this
        });
    }
}
//添加编辑事件
/* var modify = new ol.interaction.Modify({
     features: features,
     // the SHIFT key must be pressed to delete vertices, so
     // that new vertices can be drawn at the same position
     // of existing vertices
     deleteCondition: function(event) {
         return ol.events.condition.shiftKeyOnly(event) &&
                 ol.events.condition.singleClick(event);
     }
 });
 map.addInteraction(modify);



 var draw; // global so we can remove it later
 var typeSelect = document.getElementById('type');

 function addInteraction() {
     draw = new ol.interaction.Draw({
         features: features,
         type: /!** @type {ol.geom.GeometryType} *!/ (typeSelect.value)
     });
     map.addInteraction(draw);
 }
 /!**
  * Handle change event.
  *!/
 typeSelect.onchange = function() {
     map.removeInteraction(draw);
     addInteraction();
 };
 addInteraction();*/