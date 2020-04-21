var mymap = L.map('mapid').setView([32.18, -99.14], 4)
var statesLayer = L.layerGroup().addTo(mymap)
var grayBasemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}').addTo(mymap)
var streetsBasemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}').addTo(mymap)
var demographics = 'https://geog4046.github.io/assignment-resources/data/us_state_demographics_ESRI_2010A.geojson'

jQuery.getJSON(demographics, function (data) {
  L.geoJSON(data, {
    style: compareArea,
    onEachFeature: areaResults
  }).addTo(mymap)
})
var compareArea = function (feature) {
  var stateArea = feature.properties.SQMI
  var stateColor = '#FFDAB9'
  if (stateArea > 43434.42) { stateColor = '#DA0DDD' }
  return {
    color: stateColor,
    weight: 1,
    fillOpacity: 0.5
  }
}
var areaResults = function (feature, layer) {
  var stateName = feature.properties.STATE_NAME
  var stateArea = feature.properties.SQMI
  layer.bindPopup('The area of ' + stateName + ' is ' + stateArea + '<br>The national mean area is: 43434.42')
  statesLayer.addLayer(layer)
}
var basemaps = {
  'Streets': streetsBasemap,
  'Grey Canvas': grayBasemap
}
var layers ={
  'Area of each state': statesLayer
}
L.control.layers(basemaps, layers).addto(mymap)
