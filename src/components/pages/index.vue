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
  import BingMaps from 'ol/Source/BingMaps.js'

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
        center: [-6655.5402445057125, 6709968.258934638],
        zoom: 13
      })
      for (let i = 0, ii = this.styles.length; i < ii;
           ++i
      ) {
        this.layers.push(new TileLayer({
          visible: false,
          preload: Infinity,
          source: new BingMaps({
            key: 'Am7Q7JJ5L_a0sLUxUw6hsLPHnBYKv8pC8mAeGSkXIVJ8jLoy62YIdFBnKj7z8Cnj',
            imagerySet: this.styles[i]
          })
        }))
      }
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

