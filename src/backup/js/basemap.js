/**
 * Created by yanggc on 2018/8/2.
 */
/*
扩展高德地图
*/
ol.source.AMap = function (options) {
  var options = options ? options : {};
  let url;
  if (options.mapType == "sat") {
    url = "http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}";
  } else {
    url = "http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}";
  }
  ol.source.XYZ.call(this, {
    crossOrigin: 'anonymous',
    cacheSize: options.cacheSize,
    projection: ol.proj.get('EPSG:3857'),
    url: url,
    wrapX: options.wrapX !== undefined ? options.wrapX : true

  });
};
ol.inherits(ol.source.AMap, ol.source.XYZ);
/*
扩展天地图
 */
ol.source.TianMap = function (options) {
  var options = options ? options : {};
  let url;
  if (options.mapType == "sat") {
    url = "http://t{0-4}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}";
  } else if (options.mapType == "satLabel") {
    url = "http://t{0-4}.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}";
  } else if (options.mapType == "label") {
    url = "http://t{0-4}.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}";
  } else {
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
}
ol.inherits(ol.source.TianMap, ol.source.XYZ);
/*
扩展百度地图
*/

ol.source.BaiduMap = function (options) {
  var options = options ? options : {};

  var attributions;
  if (options.attributions !== undefined) {
    attributions = option.attributions;
  } else {
    attributions = [ol.source.BaiduMap.ATTRIBUTION];
  }

  var extent = [72.004, 0.8293, 137.8347, 55.8271];

  //定义百度坐标
  //地址：https://github.com/openlayers/openlayers/issues/3522
  var baiduMercator = new ol.proj.Projection({
    code: 'baidu',
    extent: ol.extent.applyTransform(extent, projzh.ll2bmerc),
    units: 'm'
  });

  ol.proj.addProjection(baiduMercator);
  ol.proj.addCoordinateTransforms('EPSG:4326', baiduMercator, projzh.ll2bmerc, projzh.bmerc2ll);
  ol.proj.addCoordinateTransforms('EPSG:3857', baiduMercator, projzh.smerc2bmerc, projzh.bmerc2smerc);


  var resolutions = [];
  for (var i = 0; i < 19; i++) {
    resolutions[i] = Math.pow(2, 18 - i);
  }
  var tilegrid = new ol.tilegrid.TileGrid({
    origin: [0, 0],
    resolutions: resolutions,
    extent: ol.extent.applyTransform(extent, projzh.ll2bmerc),
    tileSize: [256, 256]
  });

  /*var url = options.url  !== undefined ?
   options.url:'http://online3.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&udt=20170301&scaler=1&p=1';*/
  var satUrls = [0, 1, 2, 3, 4].map(function (sub) {
    return 'http://shangetu' + sub +
      '.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46&udt=20150601';
  });
  var urls = [0, 1, 2, 3, 4].map(function (sub) {
    return 'http://online' + sub +
      '.map.bdimg.com/onlinelabel/qt=tile&x={x}&y={y}&z={z}&v=009&styles=pl&udt=20170301&scaler=1&p=1';
  });
  ol.source.TileImage.call(this, {
    crossOrigin: 'anonymous',   //跨域
    cacheSize: options.cacheSize,
    // projection: ol.proj.get('EPSG:3857'),
    projection: 'baidu',
    tileGrid: tilegrid,
    tileUrlFunction: function (tileCoord, pixelRatio, proj) {
      if (!tileCoord) return "";

      var z = tileCoord[0];
      var x = tileCoord[1];
      var y = tileCoord[2];
      var hash = (x << z) + y;
      var index = hash % urls.length;
      index = index < 0 ? index + urls.length : index;
      // if(x<0)  x = "M"+(-x);
      // if(y<0)  y = "M"+(-y);
      if (options.mapType == "sat") {
        // return "http://shangetu2.map.bdimg.com/it/u=x="+x+";y="+y+";z="+z+";v=009;type=sate&fm=46&app=webearth2&udt=20150601";
        return satUrls[index].replace('{x}', x).replace('{y}', y).replace('{z}', z);
      }

      // return "http://online3.map.bdimg.com/onlinelabel/?qt=tile&x="+x+"&y="+y+"&z="+z+"&styles=pl&udt=20170301&scaler=1&p=1";
      return urls[index].replace('{x}', x).replace('{y}', y).replace('{z}', z);

    },
    wrapX: options.wrapX !== undefined ? options.wrapX : true

  });

  // ol.net.jsonp(url, this.handleResponse.bind(this), undefined,'jsonp');
}

ol.inherits(ol.source.BaiduMap, ol.source.TileImage);




