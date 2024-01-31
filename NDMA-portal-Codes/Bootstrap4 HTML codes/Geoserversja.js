//Declaration of variables containing latitude and longitude and zoom
var myLat=31.1704;
var myLong=72.7097;
var zoom=5;
var map = L.map('Map',{zoomControl: true,fullscreenControl:true,fullscreenControlOptions: {position:'topleft'}}).setView([myLat, myLong], zoom)
//map tile layer
var Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
    maxZoom: 16,
    minZoom:2
}).addTo(map);
//To get the feature request
// Retrieve document's body & create new spinner.
    var body = document.getElementsByTagName('body')[0];
    var spinner = new Spinner({
      lines: 15, // The number of lines to draw.
      length: 20, // The length of each line.
      width: 15, // The line thickness.
      radius: 50, // The radius of the inner circle.
      corners: 1, // Corner roundness (0..1).
      rotate: 0, // The rotation offset.
      direction: 1, // 1: clockwise, -1: counterclockwise.
      color: '#000', // #rgb or #rrggbb or array of colors.
      speed: 1, // Rounds per second.
      trail: 50, // Afterglow percentage.
      shadow: false, // Whether to render a shadow.
      hwaccel: false, // Whether to use hardware acceleration.
      className: 'spinner', // The CSS class to assign to the spinner.
      zIndex: 2e9, // The z-index (defaults to 2000000000).
      top: '50%', // Top position relative to parent.
      left: '50%' // Left position relative to parent.
    });
//Geoserver layers through the use of L.tilelayers
var geoserver=new L.TileLayer.WMS("http://localhost:8080/geoserver/Eumetsat/wms",{layers:'rgb_fog',format: 'image/png',transparent: true})
var geoserver2= new L.tileLayer.wms("http://localhost:8081/geoserver/ne_110m_admin_0_countries/wms",{layers:'featurepunjab',style:"",tilematrixSet:"EPSG:900913",format: 'image/tif',transparent: true})
/*adding Raster through plugin
const windSpeedUrl = "http://localhost:8081/geoserver/ne_110m_admin_0_countries/wms?service=WMS&version=1.1.0&request=GetMap&layers=ne_110m_admin_0_countries%3Afeaturepunjab&bbox=69.31879900000007%2C27.705110332000057%2C75.38186689200006%2C34.01070093968005&width=738&height=768&srs=EPSG%3A900913&format=image/geotiff";
const options = {
  // See renderer sections below.
  // One of: L.LeafletGeotiff.rgb, L.LeafletGeotiff.plotty, L.LeafletGeotiff.vectorArrows
  renderer: null,

  // Use a worker thread for some initial compute (recommended for larger datasets)
  useWorker: false,

  // Optional array specifying the corners of the data, e.g. [[40.712216, -74.22655], [40.773941, -74.12544]].
  // If omitted the image bounds will be read from the geoTIFF file (ModelTiepoint).
  bounds: [],

  // Optional geoTIFF band to read
  band: 0,

  // Optional geoTIFF image to read
  image: 0,

  // Optional clipping polygon, provided as an array of [lat,lon] coordinates.
  // Note that this is the Leaflet [lat,lon] convention, not geoJSON [lon,lat].
  clip: undefined,

  // Optional leaflet pane to add the layer.
  pane: "overlayPane",

  // Optional callback to handle failed URL request or parsing of tif
  onError: null,

  // Optional, override default GeoTIFF function used to load source data
  // Oneof: fromUrl, fromBlob, fromArrayBuffer
  sourceFunction: GeoTIFF.fromUrl,

  // Only required if sourceFunction is GeoTIFF.fromArrayBuffer
  arrayBuffer: null,

  // Optional nodata value (integer)
  // (to be ignored by getValueAtLatLng)
  noDataValue: undefined,

  // Optional key to extract nodata value from GeoTIFFImage
  // nested keys can be provided in dot notation, e.g. foo.bar.baz
  // (to be ignored by getValueAtLatLng)
  // this overrides noDataValue, the nodata value should be an integer
  noDataKey: undefined,

  // The block size to use for buffer
  blockSize: 65536,

  // Optional, override default opacity of 1 on the image added to the map
  opacity: 1,

  // Optional, hide imagery while map is moving (may prevent 'flickering' in some browsers)
  clearBeforeMove: false,
};

  // const windSpeedUrl =
  //   "https://danwild.github.io/leaflet-geotiff-2/wind_speed.tif";

  const windSpeedLayer = L.leafletGeotiff(windSpeedUrl,options).addTo(map);
  */
//WFS
var wfsLayer = L.Geoserver.wfs("http://localhost:8081/geoserver/wfs", {
  layers: "ne_110m_admin_0_countries:FinalShapefile1",
});
//Fitting boundry//
wfsLayer.bindTooltip(function (layer) {
    return (layer.feature.properties.adm2_en);
});
//map.fitBounds(wfsLayer.getBounds());
//wfsLayer.addTo(map);
var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.')
var islamabad= L.marker([33.738045,73.084488]).bindPopup('This is Islamabad')
//var geo = L.layerGroup([geoserver]);
var wfsgeo= L.layerGroup([wfsLayer])
var geo2=L.layerGroup([geoserver])
//geo2.addTo(map)
var geo3=L.layerGroup([geoserver2])
var cities = L.layerGroup([littleton,islamabad]);
//map.addLayer(geoserver);
/*
map.addEventListener('click', onMapClick);
popup = new L.Popup({maxWidth: 1000});
function onMapClick(e) {
var latlngStr = '(' + e.latlng.lat.toFixed(3) + ', ' +         e.latlng.lng.toFixed(3) + ')';
var BBOX =map.getBounds()._southWest.lng+","+map.getBounds()._southWest.lat+","+map.getBounds()._northEast.lng+","
+map.getBounds()._northEast.lat;
var WIDTH= map.getSize().x;
var HEIGHT = map.getSize().y;
var X = map.layerPointToContainerPoint(e.layerPoint).x;
var Y = map.layerPointToContainerPoint(e.layerPoint).y;
 var URL = 'http://http://localhost:8081/geoserver/ne_110m_admin_0_countries/wms?service=WMS&version=1.1.0&request=GetMap&layers=ne_110m_admin_0_countries%3Ane_110m_admin_0_countries&bbox=-180.0%2C-90.0%2C180.00000000000006%2C83.64513000000001&width=768&height=370&srs=EPSG%3A4326&format=application/openlayers';
popup.setLatLng(e.latlng);
popup.setContent("<iframe src='"+URL+"' width='400' height='100' frameborder='0'></iframe>");
map.openPopup(popup);
}
*/
//Another way with spin
// Handle click on map.
    var wmsLayers = [geoserver];
    map.on('click', function (e) {
      var wmsLayersCount = wmsLayers.length;
      if (wmsLayersCount > 0) {
        // Start spinner.
        spinner.spin(body);
      }

      var fullfilledRequestsCount = 0;
      var popupContent = '<u><b>Features info</b></u><br>';
      var allFeatureCount = 0;

      // Send 'GetFeatureInfo' requests.
      for (var i = 0; i < wmsLayersCount; i++) {
        var wmsLayer = wmsLayers[i];
        wmsLayer.getBoundingBox({
          done: function (boundingBoxes, xhr) {
            console.log(boundingBoxes);
          },
          fail: function (errorThrown, xhr) {
            console.log(errorThrown);
          },
          always: function () {

          }
        });
        wmsLayer.getFeatureInfo({
          latlng: e.latlng,
          done: function (featuresCollection, xhr) {
            var result = createMarkingWhenDone(this, featuresCollection);
            popupContent += result.popupContent;
            allFeatureCount += result.allFeatureCount;
          },
          fail: function (errorThrown, xhr) {
            popupContent += createMarkingWhenError(this, errorThrown);
          },
          always: function () {
            fullfilledRequestsCount++;
            // Stop spinner.
            if (fullfilledRequestsCount === wmsLayersCount) {
              var finalPopupContent = createFinalMarking(wmsLayersCount, allFeatureCount, popupContent);

              spinner.stop();
              new L.Popup({
                  minWidth: 300,
                  maxWidth: 700,
                  maxHeight: 400
                })
                .setLatLng(e.latlng)
                .setContent(finalPopupContent)
                .openOn(map)
            }
          }
        });
      }
    });
// Helper methods.
    function createMarkingWhenDone(_this, _featuresCollection) {
      var features = _featuresCollection.features;
      var featuresCount = features.length;
      var _popupContent = '';

      // Layer info.
      _popupContent += '<b>' + _this.options.name;
      _popupContent += '</b> <span>(Layer\'s feature count: ' + featuresCount + ')</span><br>';

      if (featuresCount > 0) {
        for (var j = 0; j < featuresCount; j++) {
          var feature = features[j];
          var featureNumber = j + 1;
          var properties = feature.properties;
          var propertiesNames = Object.keys(properties) || [];

          // Object info.
          _popupContent += '<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
          _popupContent += 'The number of Feature' + featureNumber;
          _popupContent += '</b> <span>(Layer\'s property count: ' + propertiesNames.length + ')</span><br>';

          for (var q = 0; q < propertiesNames.length; q++) {
            var propertiesName = propertiesNames[q];
            var number = q + 1;

            // Object properties.
            _popupContent += '<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(';
            _popupContent += number + ') ' + propertiesName;
            _popupContent += ': ' + properties[propertiesName] + '</span><br>';
          }
        }
      }
      var result = {};
      result.allFeatureCount = featuresCount;
      result.popupContent = _popupContent;
      return result;
    }

    function createMarkingWhenError(_this, _errorThrown) {
      var _popupContent = '';

      // Error message.
      _popupContent += '<u><b>' + _this.options.name + ':</u></b><br>';
      _popupContent += 'Error message: \'' + _errorThrown.message + '\'<br>';
      _popupContent += '<br>'

      return _popupContent;
    }

    function createFinalMarking(_wmsLayersCount, _allFeatureCount, _popupContent) {
      var finalPopupContent = '<u><b>GetFeatureINfo WMS POP up</b></u><br>';
      finalPopupContent += '<span>Layer count: ' + _wmsLayersCount + ' </span><br>';
      finalPopupContent += '<span>Feature count: ' + _allFeatureCount + ' </span><br><br>';
      finalPopupContent += _popupContent;

      return finalPopupContent;
    }
/*
// Perform 'GetFeatureInfo' request. another way
map.on('click', function(e) {
  geoserver.getFeatureInfo({
    latlng: e.latlng,
    done: function(featureCollection) {
    console.log('getFeatureInfosucceed: ', featureCollection);
  },
  fail: function(errorThrown) {
    console.log('getFeatureInfo failed: ', errorThrown);
  },
  always: function() {
      console.log('getFeatureInfo finished');
  }
  });
});
*/
//leaflet draw
drawnItems = L.featureGroup().addTo(map);
var someLayerGroup = L.featureGroup();
wfsgeo.addTo(someLayerGroup);
var drawControl = new L.Control.Draw({
            edit: {
                featureGroup: drawnItems,
                edit: false
            },
            draw: {
              marker: false,
              circlemarker: false,
              polyline: false,
              circle:  false,
              polygon: {
                allowIntersection: true,
                showArea: true
              }
            }
        })//.addTo(map);
map.on(L.Draw.Event.CREATED, function (event) {
  var layer2 = event.layer;
  var lat_lngs = [layer2._latlngs[0],layer2._latlngs[2]]
  var bound=event.layer.getBounds();
  console.log("This is the bounds",bound)
  var type = event.layerType;
  if(type==='rectangle'){
    //do rectangle specific actions
    var group1=L.layerGroup([])
        //console.log(data)
    console.log("this is layer group",group1)
    document.getElementById('export').onclick = function(e) {
               
            //console.log(convertedData)
            // Extract GeoJson from featureGroup
            var data = group1.toGeoJSON();
            console.log("This is that",data)
            // Stringify the GeoJson
            var convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
            // Create export
            document.getElementById('export').setAttribute('href', 'data:' + convertedData);
            document.getElementById('export').setAttribute('download','data.geojson');
            //for downloading as shapefile
            /*
            var options = {
    //folder: '',
    types: {
      point: 'points',
      polygon: 'polygons',
      multipolygon:'multipolygons'
    }
  }
  //var fggeojson = featureGroup.toGeoJSON();

  shpwrite.zip(data, options).then(function(content) {
  saveAs(content, 'export.zip');
});
*/
        }

    wfsLayer.eachLayer(function(layer){
      centre=layer.getBounds().getCenter();
      
      //console.log("This is the centre",centre)
      if(bound.contains(centre)){
        document.getElementById('delete').onclick = function(e) {
            drawnItems.clearLayers();
            map.removeLayer(layer)
            map.addLayer(wfsLayer)
            map.fitBounds(wfsLayer.getBounds())
            layer.setStyle({fillColor: 'blue'});
            
        }
        
        console.log("This is the centre",centre)
        //set style of the point
        map.removeLayer(wfsLayer)
        map.addLayer(layer)
        map.fitBounds(layer.getBounds())
        //adding the selected features into the layer group
        group1.addLayer(layer)
        layer.setStyle({fillColor: '#CCCC00'});
        


      }
    });

  }
  
  drawnItems.addLayer(event.layer);
});


var overlayMaps = {
	"WFS":wfsgeo,
	"WMS":geo2,
	"Raster":geo3,
    "Cities": cities,
    //"Raster":geo2
};
//Adding Layer Control
//L.control.layers(null, overlayMaps).addTo(map);
//var CountryLayer=L.geoJSON(countries,
	//{style:countryStyle}).addTo(map);
//map.fitBounds(CountryLayer.getBounds())
                                
//Make sure to add the slider to the map ;-)

// for marker
//var point=[30.3753,69.3451]
//var marker=L.marker(point)
//marker.addTo(map)

//Simple popups
//marker.bindPopup('<b>Pakistan</b>')

//:8081/geoserver/Raster/wms?service=WMS&request=GetMap&layers=NE2_LR_LC&styles=&format=image%2Ftif&transparent=false&version=1.1.1&width=256&height=256&srs=EPSG%3A3857&bbox=-5009377.085697311,10018754.171394628,0,15028131.257091928:1 GET http://localhost:8081/geoserver/Raster/wms?service=WMS&request=GetMap&layers=NE2_LR_LC&styles=&format=image%2Ftif&transparent=false&version=1.1.1&width=256&height=256&srs=EPSG%3A3857&bbox=-5009377.085697311,10018754.171394628,0,15028131.257091928 net::ERR_EMPTY_RESPONSE
// For adding plus and minus sines to the accordian
$(document).ready(function(){
    // Add minus icon for collapse element which is open by default
    $(".collapse.show").each(function(){
        $(this).prev(".card-header").find(".fa").addClass("fa-minus").removeClass("fa-plus");
    });
    
    // Toggle plus minus icon on show hide of collapse element
    $(".collapse").on('show.bs.collapse', function(){
        $(this).prev(".card-header").find(".fa").removeClass("fa-plus").addClass("fa-minus");
    }).on('hide.bs.collapse', function(){
        $(this).prev(".card-header").find(".fa").removeClass("fa-minus").addClass("fa-plus");
    });
});
// for adding a scroll in the accordian.

// code for making an outside Checkbox1 interact with the map

$("#checkbox1").click(function(event) {
    if(map.hasLayer(geo2)==false) {
      map.addLayer(geo2);
    } else if (map.hasLayer(geo2)==true) {
      map.removeLayer(geo2);
    }
});             
// code for making an outside Checkbox2 interact with the map
$("#checkbox2").click(function(event) {
    if(map.hasLayer(wfsgeo)==false) {
        map.addLayer(wfsgeo);
        map.addControl(drawControl)
    } else if (map.hasLayer(wfsgeo)==true) {
        map.removeLayer(wfsgeo);
        map.removeControl(drawControl)
    }
});
// code for making an outside Checkbox3 interact with the map

$("#checkbox3").click(function(event) {
    if(map.hasLayer(geo3)==false) {
        map.addLayer(geo3);
    } else if (map.hasLayer(geo3)==true) {
        map.removeLayer(geo3);
    }
});