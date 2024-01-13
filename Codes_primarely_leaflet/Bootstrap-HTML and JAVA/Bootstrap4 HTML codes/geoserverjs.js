var myLat=31.1704;
var myLong=72.7097;
var map = L.map('map').setView([myLat, myLong], 5);
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);;
//Geoserver layers through the use of L.tilelayers
var geoserver=new L.TileLayer.WMS("http://localhost:8081/geoserver/ne_110m_admin_0_countries/wms",{layers:'Export_Output12',format: 'image/png',transparent: true})
var geoserver2= new L.tileLayer.wms("http://localhost:8081/geoserver/ne_110m_admin_0_countries/wms",{layers:'featurepunjab',style:"",tilematrixSet:"EPSG:900913",format: 'image/png',transparent: true})
//function to geerate chorolopeth
function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}
//styling function
function style(feature) {
    return {
        fillColor: getColor(feature.properties.pop_2020),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
//WFS
// var wfsLayer = L.Geoserver.wfs("http://localhost:8081/geoserver/wfs", {
//   layers: "ne_110m_admin_0_countries:FinalShapefile1",
//   style:style
// });
//adding empty layer group to add geojson data
var wfs_Layer3= L.layerGroup([])
//wfs_Layer.addTo(map)

var owsrootUrl = 'http://localhost:8081/geoserver/ne_110m_admin_0_countries/wms';
//These are basic parameters which you would have to change as i used my wms layer
    var defaultParameters = {
        service : 'WFS', //
        version : '1.0.0',
        request : 'GetFeature',
        transparent: true,
        typeName : 'ne_110m_admin_0_countries:FinalShapefile1',
        outputFormat : 'json',// This is important as this defines the output type
        format_options : 'callback:getJson',
        SrsName : 'EPSG:4326'
    };
    var parameters = L.Util.extend(defaultParameters);
    var URL = owsrootUrl + L.Util.getParamString(parameters);
    //this is the ajax call
    var ajax = $.ajax({
        url : URL,
        dataType : 'json',
        jsonpCallback : 'getJson',
        success : function (response) {
        //Converting to a geojson
        L.geoJson(response, {
        	style: style,
            //this is the style function which is used to change color you can use it as you wish, uncomment if you wanna use
            /*
                style: function(feature) {
                    return {stroke: false};// this false would make it transparent without the blue
                },
            */       
                onEachFeature: function (feature, url) {
                    // Get bounds of polygon
                    var bounds = url.getBounds();
                    console.log("These are the bounds:",bounds)
                    // Get center of bounds
                    var center = bounds.getCenter();
                    console.log("These are the centers:",center)
                    var x= center.lat
                    console.log("These are the latitude of the center:",x)
                    var y= center.lng
                    console.log("These are the longitude of the center:",y)
                    //function to add data into a layer group
                    	 wfs_Layer3.addLayer( url )
 
  // some other code can go here, like adding a popup with layer.bindPopup("Hello")
                    //the click event
                }
            })//.addTo(map);
        }
    });

//This is the url to the wms please change it to suit your self
// var owsrootUrl = 'http://localhost:8081/geoserver/ne_110m_admin_0_countries/wms';
// //These are basic parameters which you would have to change as i used my wms layer
//     var defaultParameters = {
//         service : 'WFS', //
//         version : '1.0.0',
//         request : 'GetFeature',
//         transparent: true,
//         typeName : 'ne_110m_admin_0_countries:FinalShapefile1',
//         outputFormat : 'json',// This is important as this defines the output type
//         format_options : 'callback:getJson',
//         SrsName : 'EPSG:4326'
//     };
//     var parameters = L.Util.extend(defaultParameters);
//     var URL = owsrootUrl + L.Util.getParamString(parameters);
//     //this is the ajax call
//     var ajax = $.ajax({
//         url : URL,
//         dataType : 'json',
//         jsonpCallback : 'getJson',
//         success : function (response) {
//         //Converting to a geojson
//         L.geoJson(response, {
//         	style: style,
//             //this is the style function which is used to change color you can use it as you wish, uncomment if you wanna use
            
//                 style: function(feature) {
//                     return {stroke: false};// this false would make it transparent without the blue
//                 },
                   
//                 onEachFeature: function (feature, url) {
//                     // Get bounds of polygon
//                     var bounds = url.getBounds();
//                     console.log("These are the bounds:",bounds)
//                     // Get center of bounds
//                     var center = bounds.getCenter();
//                     console.log("These are the centers:",center)
//                     var x= center.lat
//                     console.log("These are the latitude of the center:",x)
//                     var y= center.lng
//                     console.log("These are the longitude of the center:",y)
//                     //the click event
//                     //url.on("click", function (e) {
//                         //document.getElementById('coordy').value = x.toFixed(5);;//To fixed is used for rounding of to a certin degree of decimal points 
//                         //document.getElementById('coordyy').value = y.toFixed(5);;
//                     });
            
                    
                    
//                 }
//             }).addTo(map);
//         }
//     });
//var wfs_Layer12=L.geoJson(wfsLayer, {style: style});

var geoimage=L.layerGroup([geoserver])
//geoimage.addTo(map)
var geo3=L.layerGroup([geoserver2])
//geo3.addTo(map)
var baseMaps = {
    "OpenStreetMap": osm
};

var overlayMaps = {
    "WFS_Layer": wfs_Layer3,
    "Image_WMS1": geoimage,
    "Image_WMS2": geo3
};
var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);