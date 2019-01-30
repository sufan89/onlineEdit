import XYZ from 'ol/source/XYZ'
import {get} from 'ol/proj'
import {inherits} from 'ol'

let AMap = function AMap(options) {
  let opt = options === undefined ? options : {}
  let url
  if (opt.mapType === 'sat') {
    url = 'http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
  } else {
    url = 'http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
  }
  XYZ.call(this, {
    crossOrigin: 'anonymous',
    cacheSize: opt.cacheSize,
    projection: get('EPSG:3857'),
    url: url,
    wrapX: opt.wrapX !== undefined ? opt.wrapX : true,
    maxZoom: opt.maxZoom !== undefined ? opt.maxZoom : 18,
    minZoom: opt.minZoom !== undefined ? opt.minZoom : 0
  })
}
inherits(AMap, XYZ)
export default AMap
