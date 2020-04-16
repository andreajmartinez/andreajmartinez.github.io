var mymap = L.map('mapid').setView([31.69, -100], 5)
L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png').addTo(mymap)
var houston = L.marker([29.801951, -95.355999]).addTo(mymap)
var southtexas = L.polygon([
  [36.491, -103.046],
  [33.504, -94.125],
  [29.916, -93.510]
]).addTo(mymap)
houston.bindPopup('City of Houston.')
southtexas.bindPopup('Area of Southern Texas.')
var latlngs = [
  [36.491, -103.046],
  [33.504, -94.125],
  [25.996, -97.377]
]
var polyline = L.polyline([latlngs, { color: 'blue' }]).addTo(mymap)
mymap.fitBounds(polyline.getBounds())
polyline.bindPopup('Line Across Texas')
