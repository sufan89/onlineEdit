<template>
  <div>
    <el-select v-model="value" placeholder="请选择" v-on:change="mapChange">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import Map from 'ol/Map.js'
  import View from 'ol/View.js'
  import TileLayer from 'ol/layer/Tile.js'
  // import BingMaps from 'ol/Source/BingMaps.js'
  import AMap from '../basemap/AMap'
  import {transform} from 'ol/proj'
  export default {
    name: 'home',
    data() {
      return {
        options: [{
          value: 'Road',
          label: 'Road'
        },
          {
            value: 'RoadOnDemand',
            label: 'RoadOnDemand'
          }, {
            value: 'Aerial',
            label: 'Aerial'
          }, {
            value: 'AerialWithLabels',
            label: 'AerialWithLabels'
          }, {
            value: 'collinsBart',
            label: 'collinsBart'
          }, {
            value: 'ordnanceSurvey',
            label: 'ordnanceSurvey'
          }],
        map: null,
        view: null,
        layers: [],
        styles: ['Road',
          'RoadOnDemand',
          'Aerial',
          'AerialWithLabels',
          'collinsBart',
          'ordnanceSurvey'],
        value: ''
      }
    },
    methods: {
      mapChange(selectValue) {
        for (let i = 0, ii = this.layers.length; i < ii; ++i) {
          this.layers[i].setVisible(this.styles[i] === selectValue)
        }
      }
    },
    created() {
      this.view = new View({
        center: transform([114.018, 22.671], 'EPSG:4326', 'EPSG:3857'),
        maxZoom: 19,
        zoom: 12
      })
      // for (let i = 0, ii = this.styles.length; i < ii;
      //      ++i
      // ) {
      //   this.layers.push(new TileLayer({
      //     visible: false,
      //     preload: Infinity,
      //     source: new BingMaps({
      //       key: 'Am7Q7JJ5L_a0sLUxUw6hsLPHnBYKv8pC8mAeGSkXIVJ8jLoy62YIdFBnKj7z8Cnj',
      //       imagerySet: this.styles[i]
      //     })
      //   }))
      // }
      this.layers.push(new TileLayer({
        visible: true,
            source: new AMap({})
      }))
      this.map = new Map({
        layers: this.layers,
        loadTilesWhileInteracting: true,
        target: 'map',
        view: this.view
      })
      this.mapChange('Road')
      this.value = 'Road'
    }
  }
</script>

