var mymap = L.map('mapid').setView([32.18, -99.14], 4)
var statesLayerObject = L.layerGroup().addTo(mymap)
var grayBasemapObject = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}').addTo(mymap)
var demographics = 'https://geog4046.github.io/assignment-resources/data/us_state_demographics_ESRI_2010A.geojson'
var streetsBasemapObject = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}').addTo(mymap)
var basemapsObject = {
  'Streets': streetsBasemapObject,
  'Gray canvas': grayBasemapObject
}
jQuery.getJSON(demographics, function (data) {
  var colors = function (feature) {
    var femalepop = feature.properties.SQMI
    var color1 = 'olive'
    if (area < 70000) { color1 = 'green' }
    return {
      color: color1
      weight: 1,
      fillOpacity: 0.5
    }
  }
  var renameThisGeojsonOptionsObject = {
    style: renameThisStyleFunction,
    onEachFeature: renameThisOnEachFeatureFunction
  }
  L.geoJSON(data, renameThisGeojsonOptionsObject).addTo(mymap)
})
var renameThisOnEachFeatureFunction = function (feature, layer) {
  var name = feature.properties.STATE_NAME
  var area = feature.properties.SQMI
  layer.bindPopup('Area ' + name + ': ' + area + '<br>National average: 71907')
  statesLayerObject.addLayer(layer)
}
var layersObject = {
  'Area': statesLayerObject
}
L.control.layers(basemapsObject, layersObject).addTo(mymap)
