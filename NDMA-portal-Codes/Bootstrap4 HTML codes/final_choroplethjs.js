//Declaration of variables containing latitude and longitude and zoom
var myLat=31.1704;
var myLong=72.7097;
var zoom=5;
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
//Functions that assigns a SVG image to a specific column in geojson
function abspop2010(feature){
  //var calculatedSize = 1.0083 * Math.pow(feature.properties.S_N_2010/minValue,.5716) * minRadius;
  var calculatedSize = Math.sqrt(feature.properties.AbsPop_10 /10000)
  //var calculatedSize = Math.sqrt(feature.properties.P_2010 / Math.PI)*2

            
  // create  icons
  return L.icon({
    iconUrl: 'population.svg',
    iconSize: [calculatedSize, calculatedSize],
    rotationAngle: -280
  });
}
//Functions that assigns a SVG image to a specific column in geojson
function abspop2015(feature){
  //var calculatedSize = 1.0083 * Math.pow(feature.properties.S_N_2010/minValue,.5716) * minRadius;
  var calculatedSize = Math.sqrt(feature.properties.AbsPop_15/10000)
  //var calculatedSize = Math.sqrt(feature.properties.P_2011 / Math.PI)*2

            
  // create  icons
  return L.icon({
    iconUrl: 'population.svg',
    iconSize: [calculatedSize, calculatedSize],
    rotationAngle: -280
  });
}
function abspop2020(feature){
  //var calculatedSize = 1.0083 * Math.pow(feature.properties.S_N_2010/minValue,.5716) * minRadius;
  var calculatedSize = Math.sqrt(feature.properties.AbsPop_20/10000)
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
            
        //adding the layer stack element with icons on to the map
      }
})//.addTo(map)
// Layer group that contains the markers,charts and the choropleth for 2010
var fullmap_2010 = L.layerGroup([finalmap2010],{time:"2010"});
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
      }
})//.addTo(map)
// Creating a layer group that contains the markers and the choropleth along with the bar chart for year 2012
var fullmap_2015 = L.layerGroup([finalmap2015],{time:"2015"});
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
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitaion for the year 2019:'+feature.properties.P_2019+'mm per year');
                }
            )
      }
})//.addTo(map)
// Creating a layer group that contains the markers and the choropleth along with the bar chart for year 2012
var fullmap_2019 = L.layerGroup([finalmap2019],{time:"2019"});
// A feature group that contains all the features
final_from_2010_till_2019=L.featureGroup([fullmap_2010,fullmap_2011,fullmap_2012,fullmap_2013,fullmap_2014,fullmap_2015,fullmap_2016,fullmap_2017,fullmap_2018,fullmap_2019]).addTo(map)
var overlay = {
    'Final':final_from_2010_till_2019
    //'markers': layerGroup
};
//Layer control
var lcontrol=L.control.layers(null, overlay).addTo(map);
//To add the slider controler
var sliderControl = L.control.sliderControl({position: "topleft",layer:final_from_2010_till_2019,follow: 1,range:true});
//For adding the control
map.addControl(sliderControl)
//initiating the slider controler
sliderControl.startSlider()
var legend = L.control({position : 'bottomright'});
            legend.onAdd = function(map){
                var div = L.DomUtil.create('div', 'legend'); // create a div with a class legend
                var label = [
                    "kept empty"
                ];
                // these are the div elements

                div.innerHTML = '<div>Legend</div>'; // name or heading of legend
                //These are the legend entries
                    div.innerHTML += '<i style="background: #6666ff"></i>Total Confirmed Covid-19 cases';
                    div.innerHTML += '<i style="background: #4d4dff"></i><br>';
                    div.innerHTML += '<i style="background: #3333ff"></i><span>500-700</span><br>';
                    div.innerHTML += '<i style="background: #1a1aff"></i><span>700-900</span><br>';
                    div.innerHTML += '<i style="background: #0000e6"></i><span>900-1100</span><br>';
                    div.innerHTML += '<i style="background: #000066"></i><span>1100+</span><br>';

                    
                
                return div;
            }
legend.addTo(map)

map.on('overlayadd', function (eventLayer) {
    //Show legend...
    if (eventLayer.name === 'Final') {
        // to add the information control on to the map
        //Adding and initializing Slider control
        this.addControl(sliderControl)
        this.addControl(legend)
        sliderControl.startSlider();

    }
});

//overlayremove is a LayersControlEvent which is fired when an overlay is deselected through the layer control.
map.on('overlayremove', function (eventLayer) {
    // hide legend
    if (eventLayer.name === 'Final') {
        this.removeControl(legend)
        this.removeControl(sliderControl);// removes the legend when you uncheck the option in layer control 
    }
});




