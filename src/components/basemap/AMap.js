import XYZ from 'ol/source/XYZ'
import {get} from 'ol/proj'

let AMap = function (options) {
  let opt = options ? options : {}
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
    wrapX: opt.wrapX !== undefined ? opt.wrapX : true
  })
}
export default AMap
