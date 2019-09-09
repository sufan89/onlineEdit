<template>
  <div id="map" class="map"></div>
</template>
<script>
  import Map from 'ol/Map.js'
  import View from 'ol/View.js'
  import TileLayer from 'ol/layer/Tile.js'
  import AMap from '../components/basemap/AMap'
  import {transform} from 'ol/proj'

  export default {
    name: 'home',
    data() {
      return {
        map: null,
        view: null,
        layers: []
      }
    },
    mounted() {
      this.view = new View({
        center: transform([114.018, 22.671], 'EPSG:4326', 'EPSG:3857'),
        maxZoom: 19,
        zoom: 12
      })
      this.layers.push(new TileLayer({
        visibale: true,
        source: new AMap({})
      }))
      this.map = new Map({
        layers: this.layers,
        loadTilesWhileInteracting: true,
        target: 'map',
        view: this.view
      })
    }
  }
</script>
<style>
  #map {
    width: 100%;
    height: 100%
  }
</style>

