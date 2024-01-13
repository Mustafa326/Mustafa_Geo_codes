//Declaration of variables containing latitude and longitude and zoom
var myLat=31.1704;
var myLong=72.7097;
var zoom=5;
// scalefactor
var ScaleFactor=10;
//var sliderControl = null;
//Map through mapbox
//creation of a map variable
  // Leaflet uses div .offsetWidth and .offsetHeight to size the map.
// map variable can be declared through L.mapbox.map or L.map in mapbox
/*
L.mapbox.accessToken = 'pk.eyJ1IjoibXVzdGFmYTA1IiwiYSI6ImNrNm1ocHBzNTBldDIzanJ1ODJqc2dzYjMifQ.ppQmulUBSdoPSzVXjT23Dw';
var map = L.map('Map',{zoomControl: false,fullscreenControl:true,fullscreenControlOptions: {position:'topleft'}}).setView([myLat, myLong], zoom).addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));
*/
//Openlayers map
//Declare Map object//
var map=L.map('Map',{zoomControl: false,fullscreenControl:true,fullscreenControlOptions: {position:'topleft'}}).setView([myLat,myLong],zoom);
//title Layers//
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', { 
        attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors', 
        maxZoom: 18,
        minZoom:2
        //maxBounds: mybounds
}).addTo(map);
//Home button on the map
var zoomHome = L.Control.zoomHome({homeZoom:6.5}).addTo(map);
//Declaring the layergroups to be added to the map so that we can show markers
//var lst_2010= L.layerGroup().addTo(map);
//var lst_2010 = L.canvasLayer({}).addTo(map);
//var lst_2010 = L.featureGroup().addTo(map)

// creating the markercluster group aong with the stack group
var lst_2010 = L.markerClusterGroup().addTo(map);
var lst_2011 = L.markerClusterGroup().addTo(map);
var stack_2010 = L.layerGroup()
var stack_2011 = L.layerGroup()
var lst_2012 = L.markerClusterGroup().addTo(map);
var lst_2013 = L.markerClusterGroup().addTo(map);
var stack_2012 = L.layerGroup()
var stack_2013 = L.layerGroup()
var lst_2014 = L.markerClusterGroup().addTo(map);
var lst_2015 = L.markerClusterGroup().addTo(map);
var stack_2014 = L.layerGroup()
var stack_2015 = L.layerGroup()
var lst_2016 = L.markerClusterGroup().addTo(map);
var lst_2017 = L.markerClusterGroup().addTo(map);
var stack_2016 = L.layerGroup()
var stack_2017 = L.layerGroup()
var lst_2018 = L.markerClusterGroup().addTo(map);
var lst_2019 = L.markerClusterGroup().addTo(map);
var stack_2018 = L.layerGroup()
var stack_2019 = L.layerGroup()
var lst_2020 = L.markerClusterGroup().addTo(map);
var stack_2020 = L.layerGroup()
//var winter_N_10= L.layerGroup().addTo(map);
//var clustermarkers1 = L.markerClusterGroup().addTo(map)
//var clustermarkers2 = L.markerClusterGroup().addTo(map)
//var summer_N_100= L.layerGroup(clustermarkers1,clustermarkers2);
//var oms = new OverlappingMarkerSpiderfier(map)
// dot density generation options
//LST data
//var minValue = 23.2787;
//var minRadius = 30;
//Functions that assigns a SVG image to a specific column in geojson
/*
function iconByNight(feature){
  //var calculatedSize = 1.0083 * Math.pow(feature.properties.S_N_2010/minValue,.5716) * minRadius;
  var calculatedSize = Math.sqrt(feature.properties.S_N_2010 / Math.PI) *10
            
  // create  icons
  return L.icon({
    iconUrl: 'moon.svg',
    iconSize: [calculatedSize, calculatedSize]
  });
}
*/
//Functions that assigns a SVG image to a specific column in geojson
function abspop2010(feature){
  //var calculatedSize = 1.0083 * Math.pow(feature.properties.S_N_2010/minValue,.5716) * minRadius;
  var calculatedSize = Math.sqrt(feature.properties.AbsPop_10)/100
  //var calculatedSize = Math.sqrt(feature.properties.P_2010 / Math.PI)*2

            
  // create  icons
  return L.icon({
    iconUrl: 'population.svg',
    iconSize: [calculatedSize, calculatedSize],
    rotationAngle: -280
  });
}
//Functions that assigns a SVG image to a specific column in geojson
/*
function ndvi2010(feature){
  //var calculatedSize = 1.0083 * Math.pow(feature.properties.S_N_2010/minValue,.5716) * minRadius;
  var calculatedSize = Math.sqrt(feature.properties.N_2010 / Math.PI) *50  
  // create  icons
  return L.icon({
    iconUrl: 'grass.svg',
    iconSize: [calculatedSize, calculatedSize],
  });
  
}
*/
//Functions that assigns a SVG image to a specific column in geojson
function abspop2015(feature){
  //var calculatedSize = 1.0083 * Math.pow(feature.properties.S_N_2010/minValue,.5716) * minRadius;
  var calculatedSize = Math.sqrt(feature.properties.AbsPop_15)/100
  //var calculatedSize = Math.sqrt(feature.properties.P_2011 / Math.PI)*2

            
  // create  icons
  return L.icon({
    iconUrl: 'population.svg',
    iconSize: [calculatedSize, calculatedSize],
    rotationAngle: -280
  });
}
function abspop2019(feature){
  //var calculatedSize = 1.0083 * Math.pow(feature.properties.S_N_2010/minValue,.5716) * minRadius;
  var calculatedSize = Math.sqrt(feature.properties.AbsPop_20)/100
  //var calculatedSize = Math.sqrt(feature.properties.P_2011 / Math.PI)*2

            
  // create  icons
  return L.icon({
    iconUrl: 'population.svg',
    iconSize: [calculatedSize, calculatedSize],
    rotationAngle: -280
  });
}
/*
function ndvi2011(feature){
  //var calculatedSize = 1.0083 * Math.pow(feature.properties.S_N_2010/minValue,.5716) * minRadius;
  var calculatedSize = Math.sqrt(feature.properties.N_2011 / Math.PI) *50  
  // create  icons
  return L.icon({
    iconUrl: 'grass.svg',
    iconSize: [calculatedSize, calculatedSize],
  });
  
}
*/
//for year 2010
var finalmap2010=  L.geoJson(final,{
    // Creating a choropleth 
    style: function(feature){
        //for choropleth
        var fillColor,
        precipitation = feature.properties.P_2010;
        if ( precipitation > 1100 ) fillColor = "#000066";
        else if ( precipitation > 900 ) fillColor = "#0000e6";
        else if ( precipitation > 700 ) fillColor = "#1a1aff";
        else if ( precipitation > 500 ) fillColor = "#3333ff";
        else if ( precipitation > 300 ) fillColor = "#4d4dff";
        else if ( precipitation > 100 ) fillColor = "#6666ff";
        else if ( precipitation > 60 ) fillColor = "#0099FF";
        else fillColor = "#FFEDA0";  // no data
        return { color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .6 };
    },
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //the on click function
            layer.on(
                'click', function(e){
                    var layer = e.target;
                    //it would not work with just numbers,  it requires the content to be a string or concatination
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitaion for the year 2010:'+feature.properties.P_2010+'mm per year'+'<hr>'+'The Absolute population for the year2010:'+feature.properties.AbsPop_10);
                }
            )
            var stack2010 = L.marker.stack([feature.properties.Latitude,feature.properties.Longitude],{
                icons:[
                //iconByNight(feature),
                abspop2010(feature),
                //ndvi2010(feature)
                ],
                // For placing or oreintating the marker
                stackOffset: [0, -5]

            })
            stack_2010.addLayer(stack2010);
            //map.addLayer(stack2010)
            // Use center to put marker on map
      }
})//.addTo(map)
// Layer group that contains the markers,charts and the choropleth for 2010
var fullmap_2010 = L.layerGroup([stack_2010,finalmap2010],{time:"2010"});
// for year 2011
var finalmap2011=  L.geoJson(final,{
    style: function(feature){
        //for choropleth
        var fillColor,
        precipitation = feature.properties.P_2011;
        if ( precipitation > 1100 ) fillColor = "#000066";
        else if ( precipitation > 900 ) fillColor = "#0000e6";
        else if ( precipitation > 700 ) fillColor = "#1a1aff";
        else if ( precipitation > 500 ) fillColor = "#3333ff";
        else if ( precipitation > 300 ) fillColor = "#4d4dff";
        else if ( precipitation > 100 ) fillColor = "#6666ff";
        else if ( precipitation > 60 ) fillColor = "#0099FF";
        else fillColor = "#FFEDA0";  // no data
        return { color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .6 };
    },
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //the on click function
            layer.on(
                'click', function(e){
                    var layer = e.target;
                    //it would not work with just numbers,  it requires the content to be a string or concatination
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitaion for the year 2011:'+feature.properties.P_2011+'mm per year');
                }
            )
      }
})//.addTo(map)
// Creating a layer group that contains the markers and the choropleth along with the bar chart for 2011
var fullmap_2011 = L.layerGroup([finalmap2011],{time:"2011"});
//For the year 2012
var finalmap2012=  L.geoJson(final,{
    style: function(feature){
        //for choropleth
        var fillColor,
        precipitation = feature.properties.P_2012;
        if ( precipitation > 1100 ) fillColor = "#000066";
        else if ( precipitation > 900 ) fillColor = "#0000e6";
        else if ( precipitation > 700 ) fillColor = "#1a1aff";
        else if ( precipitation > 500 ) fillColor = "#3333ff";
        else if ( precipitation > 300 ) fillColor = "#4d4dff";
        else if ( precipitation > 100 ) fillColor = "#6666ff";
        else if ( precipitation > 60 ) fillColor = "#0099FF";
        else fillColor = "#FFEDA0";  // no data
        return { color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .6 };
    },
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //the on click function
            layer.on(
                'click', function(e){
                    var layer = e.target;
                    //it would not work with just numbers,  it requires the content to be a string or concatination
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitaion for the year 2012:'+feature.properties.P_2012+'mm per year');
                }
            )
      }
})//.addTo(map)
// Creating a layer group that contains the markers and the choropleth along with the bar chart for year 2012
var fullmap_2012 = L.layerGroup([finalmap2012],{time:"2012"});
//For the year 2013
var finalmap2013=  L.geoJson(final,{
    style: function(feature){
        //for choropleth
        var fillColor,
        precipitation = feature.properties.P_2013;
        if ( precipitation > 1100 ) fillColor = "#000066";
        else if ( precipitation > 900 ) fillColor = "#0000e6";
        else if ( precipitation > 700 ) fillColor = "#1a1aff";
        else if ( precipitation > 500 ) fillColor = "#3333ff";
        else if ( precipitation > 300 ) fillColor = "#4d4dff";
        else if ( precipitation > 100 ) fillColor = "#6666ff";
        else if ( precipitation > 60 ) fillColor = "#0099FF";
        else fillColor = "#FFEDA0";  // no data
        return { color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .6 };
    },
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //the on click function
            layer.on(
                'click', function(e){
                    var layer = e.target;
                    //it would not work with just numbers,  it requires the content to be a string or concatination
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitaion for the year 2013:'+feature.properties.P_2013+'mm per year');
                }
            )
      }
})//.addTo(map)
// Creating a layer group that contains the markers and the choropleth along with the bar chart for year 2012
var fullmap_2013 = L.layerGroup([finalmap2013],{time:"2013"});
//For the year 2014
var finalmap2014=  L.geoJson(final,{
    style: function(feature){
        //for choropleth
        var fillColor,
        precipitation = feature.properties.P_2014;
        if ( precipitation > 1100 ) fillColor = "#000066";
        else if ( precipitation > 900 ) fillColor = "#0000e6";
        else if ( precipitation > 700 ) fillColor = "#1a1aff";
        else if ( precipitation > 500 ) fillColor = "#3333ff";
        else if ( precipitation > 300 ) fillColor = "#4d4dff";
        else if ( precipitation > 100 ) fillColor = "#6666ff";
        else if ( precipitation > 60 ) fillColor = "#0099FF";
        else fillColor = "#FFEDA0";  // no data
        return { color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .6 };
    },
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //the on click function
            layer.on(
                'click', function(e){
                    var layer = e.target;
                    //it would not work with just numbers,  it requires the content to be a string or concatination
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitaion for the year 2014:'+feature.properties.P_2014+'mm per year');
                }
            )
        //hover functions
      }
})//.addTo(map)
// Creating a layer group that contains the markers and the choropleth along with the bar chart for year 2012
var fullmap_2014 = L.layerGroup([finalmap2014],{time:"2014"});
//The year 2015
var finalmap2015=  L.geoJson(final,{
    style: function(feature){
        //for choropleth
        var fillColor,
        precipitation = feature.properties.P_2015;
        if ( precipitation > 1100 ) fillColor = "#000066";
        else if ( precipitation > 900 ) fillColor = "#0000e6";
        else if ( precipitation > 700 ) fillColor = "#1a1aff";
        else if ( precipitation > 500 ) fillColor = "#3333ff";
        else if ( precipitation > 300 ) fillColor = "#4d4dff";
        else if ( precipitation > 100 ) fillColor = "#6666ff";
        else if ( precipitation > 60 ) fillColor = "#0099FF";
        else fillColor = "#FFEDA0";  // no data
        return { color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .6 };
    },
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //the on click function
            layer.on(
                'click', function(e){
                    var layer = e.target;
                    //it would not work with just numbers,  it requires the content to be a string or concatination
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitaion for the year 2015:'+feature.properties.P_2015+'mm per year'+'<hr>'+'The Absolute population for the year2015:'+feature.properties.AbsPop_15);
                }
            )
            //Population data is for 2010,2015 and 2020
            var stack2015 = L.marker.stack([feature.properties.Latitude,feature.properties.Longitude],{
                icons:[
                //iconByNight(feature),
                abspop2015(feature),
                //ndvi2011(feature)
                ],
                // For placing or oreintating the marker
                stackOffset: [0, -5]

            })
            //To add the stack icons onto a layer
            stack_2015.addLayer(stack2015);
            //map.addLayer(stack2011)
      }
})//.addTo(map)
// Creating a layer group that contains the markers and the choropleth along with the bar chart for year 2012
var fullmap_2015 = L.layerGroup([stack_2015,finalmap2015],{time:"2015"});
//For the year 2016
var finalmap2016=  L.geoJson(final,{
    style: function(feature){
        //for choropleth
        var fillColor,
        precipitation = feature.properties.P_2016;
        if ( precipitation > 1100 ) fillColor = "#000066";
        else if ( precipitation > 900 ) fillColor = "#0000e6";
        else if ( precipitation > 700 ) fillColor = "#1a1aff";
        else if ( precipitation > 500 ) fillColor = "#3333ff";
        else if ( precipitation > 300 ) fillColor = "#4d4dff";
        else if ( precipitation > 100 ) fillColor = "#6666ff";
        else if ( precipitation > 60 ) fillColor = "#0099FF";
        else fillColor = "#FFEDA0";  // no data
        return { color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .6 };
    },
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //the on click function
            layer.on(
                'click', function(e){
                    var layer = e.target;
                    //it would not work with just numbers,  it requires the content to be a string or concatination
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitaion for the year 2016:'+feature.properties.P_2016+'mm per year'+'<hr>');
                }
            )
        //hover functions
      }
})//.addTo(map)
// Creating a layer group that contains the markers and the choropleth along with the bar chart for year 2012
var fullmap_2016 = L.layerGroup([finalmap2016],{time:"2016"});
//For the year 2017
var finalmap2017=  L.geoJson(final,{
    style: function(feature){
        //for choropleth
        var fillColor,
        precipitation = feature.properties.P_2017;
        if ( precipitation > 1100 ) fillColor = "#000066";
        else if ( precipitation > 900 ) fillColor = "#0000e6";
        else if ( precipitation > 700 ) fillColor = "#1a1aff";
        else if ( precipitation > 500 ) fillColor = "#3333ff";
        else if ( precipitation > 300 ) fillColor = "#4d4dff";
        else if ( precipitation > 100 ) fillColor = "#6666ff";
        else if ( precipitation > 60 ) fillColor = "#0099FF";
        else fillColor = "#FFEDA0";  // no data
        return { color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .6 };
    },
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //the on click function
            layer.on(
                'click', function(e){
                    var layer = e.target;
                    //it would not work with just numbers,  it requires the content to be a string or concatination
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitaion for the year 2017:'+feature.properties.P_2017+'mm per year'+'<hr>');
                }
            )
      }
})//.addTo(map)
// Creating a layer group that contains the markers and the choropleth along with the bar chart for year 2012
var fullmap_2017 = L.layerGroup([finalmap2017],{time:"2017"});
//For the year 2018
var finalmap2018=  L.geoJson(final,{
    style: function(feature){
        //for choropleth
        var fillColor,
        precipitation = feature.properties.P_2018;
        if ( precipitation > 1100 ) fillColor = "#000066";
        else if ( precipitation > 900 ) fillColor = "#0000e6";
        else if ( precipitation > 700 ) fillColor = "#1a1aff";
        else if ( precipitation > 500 ) fillColor = "#3333ff";
        else if ( precipitation > 300 ) fillColor = "#4d4dff";
        else if ( precipitation > 100 ) fillColor = "#6666ff";
        else if ( precipitation > 60 ) fillColor = "#0099FF";

        else fillColor = "#FFEDA0";  // no data
        return { color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .6 };
    },
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //the on click function
            layer.on(
                'click', function(e){
                    var layer = e.target;
                    //it would not work with just numbers,  it requires the content to be a string or concatination
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitaion for the year 2018:'+feature.properties.P_2018+'mm per year'+'<hr>');
                }
            )
      }
})//.addTo(map)
// Creating a layer group that contains the markers and the choropleth along with the bar chart for year 2012
var fullmap_2018 = L.layerGroup([finalmap2018],{time:"2018"});
//For the year 2019
var finalmap2019=  L.geoJson(final,{
    style: function(feature){
        //for choropleth
        var fillColor,
        precipitation = feature.properties.P_2019;
        if ( precipitation > 1100 ) fillColor = "#000066";
        else if ( precipitation > 900 ) fillColor = "#0000e6";
        else if ( precipitation > 700 ) fillColor = "#1a1aff";
        else if ( precipitation > 500 ) fillColor = "#3333ff";
        else if ( precipitation > 300 ) fillColor = "#4d4dff";
        else if ( precipitation > 100 ) fillColor = "#6666ff";
        else if ( precipitation > 60 ) fillColor = "#0099FF";
        else fillColor = "#FFEDA0";  // no data
        return { color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .6 };
    },
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //the on click function
            layer.on(
                'click', function(e){
                    var layer = e.target;
                    //it would not work with just numbers,  it requires the content to be a string or concatination
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitaion for the year 2019:'+feature.properties.P_2019+'mm per year'+'<hr>'+'The Absolute population for the year2019:'+feature.properties.AbsPop_20);
                }
            )
            //Population data is for 2010,2015 and 2020
            //Population data is of the years 2010,2015 and 2020
             //Population data is for 2010,2015 and 2020
            var stack2019 = L.marker.stack([feature.properties.Latitude,feature.properties.Longitude],{
                icons:[
                //iconByNight(feature),
                abspop2019(feature),
                //ndvi2011(feature)
                ],
                // For placing or oreintating the marker
                stackOffset: [0, -5]

            })
            //To add the stack icons onto a layer
            stack_2019.addLayer(stack2019);
            //map.addLayer(stack2019)
      }
})//.addTo(map)
// Creating a layer group that contains the markers and the choropleth along with the bar chart for year 2012
var fullmap_2019 = L.layerGroup([lst_2019,stack_2019,finalmap2019],{time:"2019"});
//For the year 2020
// A feature group that contains all the features
final_from_2010_till_2019=L.featureGroup([fullmap_2010,fullmap_2011,fullmap_2012,fullmap_2013,fullmap_2014,fullmap_2015,fullmap_2016,fullmap_2017,fullmap_2018,fullmap_2019])
var overlay = {
    'Final':final_from_2010_till_2019
    //'markers': layerGroup
};
//To add the slider controler
var sliderControl = L.control.sliderControl({position: "topleft",layer:final_from_2010_till_2019,follow: 1,range:true});
//For adding the control
//map.addControl(sliderControl)
//initiating the slider controler
//sliderControl.startSlider()
//Layer control
var lcontrol=L.control.layers(null, overlay).addTo(map);
//Adding the search bar control
var searchControl = new L.Control.Search({
        layer: finalmap2010,
        propertyName: 'Districts',
        position:'topright',
        marker: false,
        moveToLocation: function(latlng, title, map) {
            //map.fitBounds( latlng.layer.getBounds() );
            var zoom = map.getBoundsZoom(latlng.layer.getBounds());
            map.setView(latlng, zoom); // access the zoom
        }
    });    
    //map.addControl( searchControl );  //inizialize search control
    map.on('overlayadd', function (eventLayer) {
    //Show legend...
    if (eventLayer.name === 'Final') {
        // to add the information control on to the map
        //Adding and initializing Slider control
        this.addControl(sliderControl)
        this.addControl(searchControl)
        sliderControl.startSlider();

    }
});

//overlayremove is a LayersControlEvent which is fired when an overlay is deselected through the layer control.
map.on('overlayremove', function (eventLayer) {
    // hide legend
    if (eventLayer.name === 'Final') {
        this.removeControl(searchControl)
        this.removeControl(sliderControl);// removes the legend when you uncheck the option in layer control 
    }
});

