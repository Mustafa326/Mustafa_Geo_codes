//Declaration of variables containing latitude and longitude and zoom
var myLat=31.1704;
var myLong=72.7097;
var zoom=5;

//Map through mapbox
/*
//creation of a map variable
  // Leaflet uses div .offsetWidth and .offsetHeight to size the map.
// map variable can be declared through L.mapbox.map or L.map in mapbox
L.mapbox.accessToken = 'pk.eyJ1IjoibXVzdGFmYTA1IiwiYSI6ImNrNm1ocHBzNTBldDIzanJ1ODJqc2dzYjMifQ.ppQmulUBSdoPSzVXjT23Dw';
var map = L.map('Map',{zoomControl: false,fullscreenControl:true,fullscreenControlOptions: {position:'topleft'}}).setView([myLat, myLong], zoom).addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));
*/
//stamenmap
var map = L.map('Map',{zoomControl: false,fullscreenControl:true,fullscreenControlOptions: {position:'topleft'}}).setView([myLat, myLong], zoom)
var CartoDB_VoyagerNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);
//Esri_Map
/*
var map = L.map('Map',{zoomControl: false,fullscreenControl:true,fullscreenControlOptions: {position:'topleft'}}).setView([myLat, myLong], zoom)
//map tile layer
var Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
    maxZoom: 16,
    minZoom:2
}).addTo(map);;
*/
//Openlayers map
/*
//Declare Map object//
var map=L.map('Map',{zoomControl: false,fullscreenControl:true,fullscreenControlOptions: {position:'topleft'}}).setView([myLat,myLong],zoom);
//title Layers//
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', { 
        attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors', 
        maxZoom: 18,
        minZoom:2
        //maxBounds: mybounds
}).addTo(map);
*/
//zoomHome button on the map
var zoomHome = L.Control.zoomHome({homeZoom:5.5}).addTo(map);
//Map better scale
L.control.betterscale({metric: true, imperial: false}).addTo(map);
// creating the markercluster group for full map
var lst_2010 = L.markerClusterGroup().addTo(map);
var lst_2011 = L.markerClusterGroup().addTo(map);
var lst_2012 = L.markerClusterGroup().addTo(map);
var lst_2013 = L.markerClusterGroup().addTo(map);
var lst_2014 = L.markerClusterGroup().addTo(map);
var lst_2015 = L.markerClusterGroup().addTo(map);
var lst_2016 = L.markerClusterGroup().addTo(map);
var lst_2017 = L.markerClusterGroup().addTo(map);
var lst_2018 = L.markerClusterGroup().addTo(map);
var lst_2019 = L.markerClusterGroup().addTo(map);
//Creating groups for the layer stack
var stack_2010 = L.layerGroup()
var stack_2015 = L.layerGroup()
var stack_2019 = L.layerGroup()
// Creating groups for circle markers
var circlemarker_2010 = L.layerGroup()
var circlemarker_2011 = L.layerGroup()
var circlemarker_2012 = L.layerGroup()
var circlemarker_2013 = L.layerGroup()
var circlemarker_2014 = L.layerGroup()
var circlemarker_2015 = L.layerGroup()
var circlemarker_2016 = L.layerGroup()
var circlemarker_2017 = L.layerGroup()
var circlemarker_2018 = L.layerGroup()
var circlemarker_2019 = L.layerGroup()
//creating layer groups for lst maps
var lstfinal_2010 = L.layerGroup()
var lstfinal_2011 = L.layerGroup()
var lstfinal_2012 = L.layerGroup()
var lstfinal_2013 = L.layerGroup()
var lstfinal_2014 = L.layerGroup()
var lstfinal_2015 = L.layerGroup()
var lstfinal_2016 = L.layerGroup()
var lstfinal_2017 = L.layerGroup()
var lstfinal_2018 = L.layerGroup()
var lstfinal_2019 = L.layerGroup()
//Naming of the graph axes

var Y_AXISlst = 'Celcius'; // y-axis label and label in tooltip
var Y_AXISndvi = 'NDVI value'; // y-axis label and label in tooltip
var X_AXISpopdensity = 'people/km^2';  // x-axis label and label in tooltip
var Y_AXISpopdensity = 'people/km^2'; // y-axis label and label in tooltip
var X_AXIS = ' Year';  // x-axis label and label in tooltip
var Y_AXISprecipitation = 'mm/year'; // y-axis label and label in tooltip
//SVG
var myIconUrl='user.svg'
//Defining the variables for ndvi Choropleth for graph
var finalmap_ndvichoro2010
var finalmap_ndvichoro2011
var finalmap_ndvichoro2012
var finalmap_ndvichoro2013
var finalmap_ndvichoro2014
var finalmap_ndvichoro2015
var finalmap_ndvichoro2016
var finalmap_ndvichoro2017
var finalmap_ndvichoro2018
var finalmap_ndvichoro2019
//defining variables for ndvi symbols for graph
var finalmap_ndvimarkers
//defining variables for Population density for graph
var finalmap_popdense2010
var finalmap_popdens2015
var finalmap_popdense2019
//defining variables for lst layer for graph
var finalmap_lstmarkers
//defining variables for precipitation layer for graph
var finalmap_precipitationlabelslayers
var finalmap2010
var finalmap2011
var finalmap2012
var finalmap2013
var finalmap2014
var finalmap2015
var finalmap2016
var finalmap2017
var finalmap2018
var finalmap2019
//Function that assigns a color to the leaf SVG depending upon the NDVI value
function getColor(d) {
    return d > 0.4878 ? '#006400' :
           d > 0.4428  ? '#228B22' :
           d > 0.3685  ? '#32CD32' :
           d > 0.2955  ? '#7CFC00' :
           d > 0.2314  ? '#ADFF2F' :
           d > 0.1890   ? '#9ACD32' :
                      '#FFEDA0';
}
//Function for ndvi2010 choropleth
function stylendvi2010(feature) {
    return {
        fillColor: getColor(feature.properties.N_2010),//contains the features property which is varying
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.9
    };
}
//Function for ndvi2011 choropleth
function stylendvi2011(feature) {
    return {
        fillColor: getColor(feature.properties.N_2011),//contains the features property which is varying
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.9
    };
}
//Function for ndvi2012 choropleth
function stylendvi2012(feature) {
    return {
        fillColor: getColor(feature.properties.N_2012),//contains the features property which is varying
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.9
    };
}
//Function for ndvi2013 choropleth
function stylendvi2013(feature) {
    return {
        fillColor: getColor(feature.properties.N_2013),//contains the features property which is varying
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.9
    };
}
//Function for ndvi2014 choropleth
function stylendvi2014(feature) {
    return {
        fillColor: getColor(feature.properties.N_2014),//contains the features property which is varying
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.9
    };
}
//Function for ndvi2015 choropleth
function stylendvi2015(feature) {
    return {
        fillColor: getColor(feature.properties.N_2015),//contains the features property which is varying
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.9
    };
}
//Function for ndvi2016 choropleth
function stylendvi2016(feature) {
    return {
        fillColor: getColor(feature.properties.N_2016),//contains the features property which is varying
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.9
    };
}
//Function for ndvi2017 choropleth
function stylendvi2017(feature) {
    return {
        fillColor: getColor(feature.properties.N_2017),//contains the features property which is varying
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.9
    };
}
//Function for ndvi2010 choropleth
function stylendvi2018(feature) {
    return {
        fillColor: getColor(feature.properties.N_2018),//contains the features property which is varying
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.9
    };
}
//Function for ndvi2019 choropleth
function stylendvi2019(feature) {
    return {
        fillColor: getColor(feature.properties.N_2019),//contains the features property which is varying
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.9
    };
}
//Function for styling geoJson layer for boundries
function style(feature) {
    return {
        fillColor:  "#ffffff00",
        weight: 2,
        opacity: 1,
        color: "black",
        dashArray: '3',
        fillOpacity: 1
    };
}
//Function for styling the layer to be transperent for search bar
function nolayer(feature) {
    return {
        fillColor:  "#ffffff00",
        weight: 2,
        opacity: 1,
        color: "#000000",
        dashArray: '3',
        fillOpacity: 0
    };
}
//higlighting function 
function highlightndvichoro(e) {
    // e for event
    // The target event property returns the element that triggered the event.
    // Get access to the layer and set a grey border on it
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: 'black',
        //dashArray: '',
        fillOpacity: 0.5
    });
    layer.bringToFront();
    // update the control when the user hovers over a state
    infondvichoro.update(layer.feature.properties);
}

// function to style the layer to their defult style
function resetHighlightndvichoro(e) {
    finalmap_ndvichoro2010.resetStyle(e.target);
    finalmap_ndvichoro2011.resetStyle(e.target);
    finalmap_ndvichoro2012.resetStyle(e.target);
    finalmap_ndvichoro2013.resetStyle(e.target);
    finalmap_ndvichoro2014.resetStyle(e.target);
    finalmap_ndvichoro2015.resetStyle(e.target);
    finalmap_ndvichoro2016.resetStyle(e.target);
    finalmap_ndvichoro2017.resetStyle(e.target);
    finalmap_ndvichoro2018.resetStyle(e.target);
    finalmap_ndvichoro2019.resetStyle(e.target);
    // Send information to the info class defined below:
    infondvichoro.update();
}
//function that higlights layer for ndvi symbol
function highlightndvisymbol(e) {
    // e for event
    // The target event property returns the element that triggered the event.
    // Get access to the layer and set a grey border on it
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: 'black',
        //dashArray: '',
        fillOpacity: 0.5
    });
    layer.bringToFront();
    // update the control when the user hovers over a state
    infondvisymbol.update(layer.feature.properties);
}
// function to style the layer to their defult style for ndvi symbol
function resetHighlightndvisymbol(e) {
    finalmap_ndvimarkers.resetStyle(e.target);
    // Send information to the info class defined below:
    infondvisymbol.update();
}
//function for highlighting population density

function highlightpopdensity(e) {
    // e for event
    // The target event property returns the element that triggered the event.
    // Get access to the layer and set a grey border on it
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: 'black',
        //dashArray: '',
        fillOpacity: 0.5
    });
    layer.bringToFront();
    // update the control when the user hovers over a state
    infopopdensity.update(layer.feature.properties);
}
// function to style the layer to their defult style for population symbol
function resetHighlightpopdensity(e) {
    finalmap_popdense2010.resetStyle(e.target);
    finalmap_popdens2015.resetStyle(e.target);
    finalmap_popdense2019.resetStyle(e.target);
    // Send information to the info class defined below:
    infopopdensity.update();
}
//function for highlighting lst layer

function highlightlst(e) {
    // e for event
    // The target event property returns the element that triggered the event.
    // Get access to the layer and set a grey border on it
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: 'black',
        //dashArray: '',
        fillOpacity: 0.5
    });
    layer.bringToFront();
    // update the control when the user hovers over a state
    infolst.update(layer.feature.properties);
}
// function to style the layer to their defult style for population symbol
function resetHighlightlst(e) {
    finalmap_lstmarkers.resetStyle(e.target);
    // Send information to the info class defined below:
    infolst.update();
}
//functioon for info of precipitation
function highlightprecipitation(e) {
    // e for event
    // The target event property returns the element that triggered the event.
    // Get access to the layer and set a grey border on it
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: 'black',
        //dashArray: '',
        fillOpacity: 0.5
    });
    layer.bringToFront();
    // update the control when the user hovers over a state
    infoprecipitation.update(layer.feature.properties);
}
// function to style the layer to their defult style for population symbol
function resetHighlightprecipitation(e) {
    finalmap2010.resetStyle(e.target);
    finalmap2011.resetStyle(e.target);
    finalmap2012.resetStyle(e.target);
    finalmap2013.resetStyle(e.target);
    finalmap2014.resetStyle(e.target);
    finalmap2015.resetStyle(e.target);
    finalmap2016.resetStyle(e.target);
    finalmap2017.resetStyle(e.target);
    finalmap2018.resetStyle(e.target);
    finalmap2019.resetStyle(e.target);
    // Send information to the info class defined below:
    infoprecipitation.update();
}
//Functions that assigns a SVG image to a specific column in geojson
function abspop2010(feature){
  //var calculatedSize = 1.0083 * Math.pow(feature.properties.S_N_2010/minValue,.5716) * minRadius;
  var calculatedSize = Math.sqrt(feature.properties.AbsPop_10 /10000)
  //var calculatedSize = Math.sqrt(feature.properties.P_2010 / Math.PI)*2

            
  // create  icons
  return L.icon({
    iconUrl: 'user.svg',
    iconSize: [calculatedSize, calculatedSize],
    iconColor:'red',
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
    iconUrl: 'user.svg',
    iconSize: [calculatedSize, calculatedSize],
    rotationAngle: -280
  });
}
function abspop2019(feature){
  //var calculatedSize = 1.0083 * Math.pow(feature.properties.S_N_2010/minValue,.5716) * minRadius;
  var calculatedSize = Math.sqrt(feature.properties.AbsPop_20/10000)
  //var calculatedSize = Math.sqrt(feature.properties.P_2011 / Math.PI)*2

            
  // create  icons
  return L.icon({
    iconUrl: 'user.svg',
    iconSize: [calculatedSize, calculatedSize],
    rotationAngle: -280
  });
}
//for search bar
var finalmap_search=  L.geoJson(final,{
    style:nolayer,
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //the on click function
      }

})//.addTo(map)
var finalmap_ndvimarkerslayers=  L.geoJson(final,{
    style: style,
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //the on click function
            layer.bindTooltip(
    feature.properties.Districts,
    {
        permanent:true,
        interactive: false,
        sticky: true,
        direction:'center',
        className: 'districtLabel'
    }
);
            layer.on({
                mouseover: highlightndvichoro,
                mouseout: resetHighlightndvichoro
            })
      }

})//.addTo(map)
// creating a geojson layer having labels for population density
var finalmap_populationdensitylabelslayers=  L.geoJson(final,{
    style: style,
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //the on click function
            layer.bindTooltip(
    feature.properties.Districts,
    {
        permanent:true,
        interactive: false,
        sticky: true,
        direction:'center',
        className: 'districtLabel'
    }
);
            layer.on({
                mouseover: highlightpopdensity,
                mouseout: resetHighlightpopdensity
            })
      }

})//.addTo(map)
//LST labels
var finalmap_lstmarkers=  L.geoJson(final,{
    style: style,
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //the on click function
            layer.bindTooltip(
    feature.properties.Districts,
    {
        permanent:true,
        interactive: true,
        sticky: true,
        direction:'bottom',
        className: 'districtLabel'
    }
);
            layer.on({
                mouseover: highlightlst,
                mouseout: resetHighlightlst
            })
      }

})//.addTo(map)
//Creating a geoJson layer For labeling marker ndvi
var finalmap_ndvimarkers=  L.geoJson(final,{
    style: style,
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //the on click function
            layer.bindTooltip(
    feature.properties.Districts,
    {
        permanent:true,
        interactive: true,
        sticky: true,
        direction:'bottom',
        className: 'districtLabel'
    }
);
            layer.on({
                mouseover: highlightndvisymbol,
                mouseout: resetHighlightndvisymbol
            })
      }

})//.addTo(map)
// Creating geojson layer for naming precipitation layer
// creating a geojson layer having labels for opulation density
var finalmap_precipitationlabelslayers=  L.geoJson(final,{
    style: style,
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //the on click function
            layer.bindTooltip(
    feature.properties.Districts,
    {
        permanent:true,
        interactive: false,
        sticky: true,
        direction:'center',
        className: 'districtLabel'
    }
);
            
      }

})//.addTo(map)
//for year 2010 for all variables 
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
        return { color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .5 };
    },
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            var options={
                data:{
                    'Summer-Day10':feature.properties.S_D_2010,
                    'Winter-Night10':feature.properties.W_N_2010,
                    'Winter-Day10':feature.properties.W_D_2010,
                    'Summer-Night10':feature.properties.S_N_2010,

                },
                //coloring options
                chartOptions:{
                    'Summer-Day10':{
                        fillColor: '#ffff00',
                        minValue: feature.properties.S_D_2010,
                        maxValue: feature.properties.S_D_2010,
                        maxHeight: feature.properties.S_D_2010,
                        //displaying text when you hover over the bar which does not work
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Winter-Night10':{
                        fillColor: '#FCAE91',
                        minValue: feature.properties.W_N_2010,
                        maxValue: feature.properties.W_N_2010,
                        maxHeight: feature.properties.W_N_2010,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Winter-Day10':{
                        fillColor: '#00ffff',
                        minValue: feature.properties.W_D_2010,
                        maxValue: feature.properties.W_D_2010,
                        maxHeight: feature.properties.W_D_2010,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Summer-Night10':{
                        fillColor: '#808080',
                        minValue: feature.properties.S_N_2010,
                        maxValue: feature.properties.S_N_2010,
                        maxHeight: feature.properties.S_N_2010,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    }
                },
                weight: 2,
                opacity:4,
                riseOnHover: true,
            }
            //Adding the leaf SVG icon through dicicon
            var iconSettings2010 = {
                mapIconUrl: '<svg id="Layer_1" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m136.33 375.757c-10.09-6.65-19.572-14.389-28.186-23.001-33.83-33.83-52.461-78.837-52.461-126.729 0-122.259 120.666-194.342 217.531-215.913 50.874-11.328 108.058-13.149 169.96-5.412 7.861.983 13.603 7.909 13.11 15.816-.492 7.907-7.048 14.068-14.971 14.068-68.152.001-137.385 41.438-184.598 90.745-61.528 64.258-96.024 148.813-97.133 238.089-.068 5.484-3.124 10.494-7.969 13.064-4.828 2.562-10.691 2.3-15.283-.727z" /><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m144.556 512c-8.284 0-15-6.716-15-15v-133.787c0-8.284 6.716-15 15-15s15 6.716 15 15v133.787c0 8.284-6.716 15-15 15z" /><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m455.722 15.41c-1.858-6.413-7.731-10.825-14.407-10.825-69.203.001-146.312 37.383-206.266 99.997-66.805 69.768-104.259 161.56-105.463 258.464 0 .032.002.064.002.096-.019.042-.032.07-.032.07v7.838c2.226 1.621 4.482 3.195 6.774 4.706 69.577 45.857 164.208 38.064 225.272-23.002 52.832-52.832 41.873-125.622 38.263-166.473-5.512-62.365-10.272-116.225 49.469-154.021 5.643-3.568 8.246-10.437 6.388-16.85z" /></g></svg>',
                mapIconColor: getColor(feature.properties.N_2010),
                mapIconColorInnerCircle: '#fff',
                pinInnerCircleRadius:48
            };
            // icon normal state
            var divIcon2010 = L.divIcon({
                className: "leaflet-data-marker",
                html: L.Util.template(iconSettings2010.mapIconUrl, iconSettings2010) //.replace('#','%23'),
            });
            // icon active state
            var divIconActive2010 =L.divIcon({
                className: "leaflet-data-marker",
                html: L.Util.template(iconSettings2010.mapIconUrl, iconSettings2010)
            });
    var marker2010 =L.marker([feature.properties.Latitude-0.05042,feature.properties.Longitude-0.0142],
    {
        icon:divIcon2010
    })
            //adding the  marker layer
            circlemarker_2010.addLayer(marker2010)
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
            var lstmarker2010 = new L.BarChartMarker(center, options)
            //marker=L.marker(center)
            // A pop up which shows the data
            lstmarker2010.bindPopup("This is the District:"+ feature.properties.Districts+'<hr>'+"From left to right"+'<hr>'+"The First Bar Shows The Summer Day Temperature of the year 2010, which is:"+feature.properties.S_D_2010+"Celcius"+'<hr>'+"The Second bar shows the Winter Night Temperature of the year 2010, which is:"+feature.properties.W_N_2010+"Celcius"+'<hr>'+"The Third Bar shows the Winter Day Temperature of the year 2010, which is:"+feature.properties.W_D_2010+"Celcius"+'<hr>'+"The Frourth bar shows the SummerNight Temperature of the year 2010,which is:"+feature.properties.S_N_2010+"Celcius")
        //adding the layer stack element with icons on to the map
        
        lst_2010.addLayer(lstmarker2010);
        lstfinal_2010.addLayer(lstmarker2010)
        //hover
        lst_2010.on({
            mouseover:function(e){
                var layer = e.target;
                this.bindTooltip('Click to view the LST bar-chart information');
            },
            mouseout:function(e){
                var layer = e.target;
                this.closePopup()
            }
        })
        // function for clicking on the polygon layer
             layer.on(
                'click', function(e){
                    var layer = e.target;
                    //it would not work with just numbers,  it requires the content to be a string or concatination
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitaion for the year 2010:'+feature.properties.P_2010+'mm per year'+'<hr>'+'The Absolute population for the year2010:'+feature.properties.AbsPop_10+'<hr>'+'The NDVI Value for the year 2010 is:'+feature.properties.N_2010);
                    this.closePopup()
                }
            )
             layer.on({
                mouseover: highlightprecipitation,
                mouseout: resetHighlightprecipitation
            })
             // To close the popup
      }
})//.addTo(map)
// Layer group that contains the markers,charts and the choropleth for 2010
var fullmap_2010 = L.layerGroup([lst_2010,stack_2010,finalmap2010,circlemarker_2010,finalmap_precipitationlabelslayers],{time:"2010"});
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
        return { color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .5 };
    },
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            // For the bar chart
            var options={
                data:{
                    'Summer-Day11':feature.properties.S_D_2011,
                    'Winter-Night11':feature.properties.W_N_2011,
                    'Winter-Day11':feature.properties.W_D_2011,
                    'Summer-Night11':feature.properties.S_N_2011,

                },
                //coloring options
                chartOptions:{
                    'Summer-Day11':{
                        fillColor: '#ffff00',
                        minValue: feature.properties.S_D_2011,
                        maxValue: feature.properties.S_D_2011,
                        maxHeight: feature.properties.S_D_2011,
                        //displaying text when you hover over the bar which does not work
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Winter-Night11':{
                        fillColor: '#FCAE91',
                        minValue: feature.properties.W_N_2011,
                        maxValue: feature.properties.W_N_2011,
                        maxHeight: feature.properties.W_N_2011,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Winter-Day11':{
                        fillColor: '#00ffff',
                        minValue: feature.properties.W_D_2011,
                        maxValue: feature.properties.W_D_2011,
                        maxHeight: feature.properties.W_D_2011,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Summer-Night11':{
                        fillColor: '#808080',
                        minValue: feature.properties.S_N_2011,
                        maxValue: feature.properties.S_N_2011,
                        maxHeight: feature.properties.S_N_2011,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    }
                },
                weight: 2,
                opacity:4,
                riseOnHover: true,
            }
            //Adding the leaf Svg
            var iconSettings2011 = {
                mapIconUrl: '<svg id="Layer_1" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m136.33 375.757c-10.09-6.65-19.572-14.389-28.186-23.001-33.83-33.83-52.461-78.837-52.461-126.729 0-122.259 120.666-194.342 217.531-215.913 50.874-11.328 108.058-13.149 169.96-5.412 7.861.983 13.603 7.909 13.11 15.816-.492 7.907-7.048 14.068-14.971 14.068-68.152.001-137.385 41.438-184.598 90.745-61.528 64.258-96.024 148.813-97.133 238.089-.068 5.484-3.124 10.494-7.969 13.064-4.828 2.562-10.691 2.3-15.283-.727z" /><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m144.556 512c-8.284 0-15-6.716-15-15v-133.787c0-8.284 6.716-15 15-15s15 6.716 15 15v133.787c0 8.284-6.716 15-15 15z" /><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m455.722 15.41c-1.858-6.413-7.731-10.825-14.407-10.825-69.203.001-146.312 37.383-206.266 99.997-66.805 69.768-104.259 161.56-105.463 258.464 0 .032.002.064.002.096-.019.042-.032.07-.032.07v7.838c2.226 1.621 4.482 3.195 6.774 4.706 69.577 45.857 164.208 38.064 225.272-23.002 52.832-52.832 41.873-125.622 38.263-166.473-5.512-62.365-10.272-116.225 49.469-154.021 5.643-3.568 8.246-10.437 6.388-16.85z" /></g></svg>',
                mapIconColor: getColor(feature.properties.N_2011),
                mapIconColorInnerCircle: '#fff',
                pinInnerCircleRadius:48
            };
            // icon normal state
            var divIcon2011 = L.divIcon({
                className: "leaflet-data-marker",
                html: L.Util.template(iconSettings2011.mapIconUrl, iconSettings2011) //.replace('#','%23'),
            });
            // icon active state
            var divIconActive2011 =L.divIcon({
                className: "leaflet-data-marker",
                html: L.Util.template(iconSettings2011.mapIconUrl, iconSettings2011)
            });
    var marker2011 =L.marker([feature.properties.Latitude-0.05042,feature.properties.Longitude-0.0142],
    {
        icon:divIcon2011
    })
            //adding the  marker layer
            circlemarker_2011.addLayer(marker2011)
            // Use center to put marker on map
            var lstmarker2011 = new L.BarChartMarker(center, options)
            //marker=L.marker(center)
            // A pop up which shows the data
            lstmarker2011.bindPopup("This is the District:"+ feature.properties.Districts+'<hr>'+"From left to right"+'<hr>'+"The First Bar Shows The Summer Day Temperature of the year 2011, which is:"+feature.properties.S_D_2011+"Celcius"+'<hr>'+"The Second bar shows the Winter Night Temperature of the year 2011, which is:"+feature.properties.W_N_2011+"Celcius"+'<hr>'+"The Third Bar shows the Winter Day Temperature of the year 2011, which is:"+feature.properties.W_D_2011+"Celcius"+'<hr>'+"The Frourth bar shows the SummerNight Temperature of the year 2011,which is:"+feature.properties.S_N_2011+"Celcius")
        //adding the layer stack element with icons on to the map
        lst_2011.addLayer(lstmarker2011);
        lstfinal_2011.addLayer(lstmarker2011)
        //hover functions
        lst_2011.on({
            mouseover:function(e){
                var layer = e.target;
                this.bindTooltip('Click to view the LST bar-chart information');
            },
            mouseout:function(e){
                var layer = e.target;
                this.closePopup()
            }
        })
        //the on click function
            layer.on(
                'click', function(e){
                    var layer = e.target;
                    //it would not work with just numbers,  it requires the content to be a string or concatination
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitaion for the year 2011:'+feature.properties.P_2011+'mm per year'+'<hr>'+'The NDVI Value for the year 2011 is:'+(feature.properties.N_2011).toFixed(2));
                }
            )
            layer.on({
                mouseover: highlightprecipitation,
                mouseout: resetHighlightprecipitation
            })
      }
})//.addTo(map)
// Creating a layer group that contains the markers and the choropleth along with the bar chart for 2011
var fullmap_2011 = L.layerGroup([lst_2011,finalmap2011,circlemarker_2011,finalmap_precipitationlabelslayers],{time:"2011"});
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
        return { color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .5 };
    },
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //the on click function
            //For the bar chart
            var options={
                data:{
                    'Summer-Day12':feature.properties.S_D_2012,
                    'Winter-Night12':feature.properties.W_N_2012,
                    'Winter-Day12':feature.properties.W_D_2012,
                    'Summer-Night12':feature.properties.S_N_2012,

                },
                //coloring options
                chartOptions:{
                    'Summer-Day12':{
                        fillColor: '#ffff00',
                        minValue: feature.properties.S_D_2012,
                        maxValue: feature.properties.S_D_2012,
                        maxHeight: feature.properties.S_D_2012,
                        //displaying text when you hover over the bar which does not work
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Winter-Night12':{
                        fillColor: '#FCAE91',
                        minValue: feature.properties.W_N_2012,
                        maxValue: feature.properties.W_N_2012,
                        maxHeight: feature.properties.W_N_2012,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Winter-Day12':{
                        fillColor: '#00ffff',
                        minValue: feature.properties.W_D_2012,
                        maxValue: feature.properties.W_D_2012,
                        maxHeight: feature.properties.W_D_2012,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Summer-Night12':{
                        fillColor: '#808080',
                        minValue: feature.properties.S_N_2012,
                        maxValue: feature.properties.S_N_2012,
                        maxHeight: feature.properties.S_N_2012,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    }
                },
                weight: 2,
                opacity:4,
                riseOnHover: true,
            }
            //Adding the leaf SVG icon through dicicon
            var iconSettings2012 = {
                mapIconUrl: '<svg id="Layer_1" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m136.33 375.757c-10.09-6.65-19.572-14.389-28.186-23.001-33.83-33.83-52.461-78.837-52.461-126.729 0-122.259 120.666-194.342 217.531-215.913 50.874-11.328 108.058-13.149 169.96-5.412 7.861.983 13.603 7.909 13.11 15.816-.492 7.907-7.048 14.068-14.971 14.068-68.152.001-137.385 41.438-184.598 90.745-61.528 64.258-96.024 148.813-97.133 238.089-.068 5.484-3.124 10.494-7.969 13.064-4.828 2.562-10.691 2.3-15.283-.727z" /><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m144.556 512c-8.284 0-15-6.716-15-15v-133.787c0-8.284 6.716-15 15-15s15 6.716 15 15v133.787c0 8.284-6.716 15-15 15z" /><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m455.722 15.41c-1.858-6.413-7.731-10.825-14.407-10.825-69.203.001-146.312 37.383-206.266 99.997-66.805 69.768-104.259 161.56-105.463 258.464 0 .032.002.064.002.096-.019.042-.032.07-.032.07v7.838c2.226 1.621 4.482 3.195 6.774 4.706 69.577 45.857 164.208 38.064 225.272-23.002 52.832-52.832 41.873-125.622 38.263-166.473-5.512-62.365-10.272-116.225 49.469-154.021 5.643-3.568 8.246-10.437 6.388-16.85z" /></g></svg>',
                mapIconColor: getColor(feature.properties.N_2012),
                mapIconColorInnerCircle: '#fff',
                pinInnerCircleRadius:48
            };
            // icon normal state
            var divIcon2012 = L.divIcon({
                className: "leaflet-data-marker",
                html: L.Util.template(iconSettings2012.mapIconUrl, iconSettings2012) //.replace('#','%23'),
            });
            // icon active state
            var divIconActive2012 =L.divIcon({
                className: "leaflet-data-marker",
                html: L.Util.template(iconSettings2012.mapIconUrl, iconSettings2012)
            });
    var marker2012 =L.marker([feature.properties.Latitude-0.05042,feature.properties.Longitude-0.0142],
    {
        icon:divIcon2012
    })
            //adding the circle marker layer
            circlemarker_2012.addLayer(marker2012)
            // Use center to put marker on map
            var lstmarker2012 = new L.BarChartMarker(center, options)
            //marker=L.marker(center)
            // A pop up which shows the data
            lstmarker2012.bindPopup("This is the District:"+ feature.properties.Districts+'<hr>'+"From left to right"+'<hr>'+"The First Bar Shows The Summer Day Temperature of the year 2012, which is:"+feature.properties.S_D_2012+"Celcius"+'<hr>'+"The Second bar shows the Winter Night Temperature of the year 2012, which is:"+feature.properties.W_N_2012+"Celcius"+'<hr>'+"The Third Bar shows the Winter Day Temperature of the year 2012, which is:"+feature.properties.W_D_2012+"Celcius"+'<hr>'+"The Frourth bar shows the SummerNight Temperature of the year 2012,which is:"+feature.properties.S_N_2012+"Celcius")
        //adding the layer stack element with icons on to the map
        lst_2012.addLayer(lstmarker2012);
        lstfinal_2012.addLayer(lstmarker2012)
        //hover functions
        lst_2012.on({
            mouseover:function(e){
                var layer = e.target;
                this.bindTooltip('Click to view the LST bar-chart information');
            },
            mouseout:function(e){
                var layer = e.target;
                this.closePopup()
            }
        })
        //the layer onclick function
        layer.on(
                'click', function(e){
                    var layer = e.target;
                    //it would not work with just numbers,  it requires the content to be a string or concatination
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitaion for the year 2012:'+feature.properties.P_2012+'mm per year'+'<hr>'+'The NDVI Value for the year 2011 is:'+(feature.properties.N_2011).toFixed(2));
                }
            )
        layer.on({
                mouseover: highlightprecipitation,
                mouseout: resetHighlightprecipitation
            })
      }
})//.addTo(map)
// Creating a layer group that contains the markers and the choropleth along with the bar chart for year 2012
var fullmap_2012 = L.layerGroup([lst_2012,finalmap2012,circlemarker_2012,finalmap_precipitationlabelslayers],{time:"2012"});
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
        return { color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .5 };
    },
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //for the bar chart
            var options={
                data:{
                    'Summer-Day13':feature.properties.S_D_2013,
                    'Winter-Night13':feature.properties.W_N_2013,
                    'Winter-Day13':feature.properties.W_D_2013,
                    'Summer-Night13':feature.properties.S_N_2013,

                },
                //coloring options
                chartOptions:{
                    'Summer-Day13':{
                        fillColor: '#ffff00',
                        minValue: feature.properties.S_D_2013,
                        maxValue: feature.properties.S_D_2013,
                        maxHeight: feature.properties.S_D_2013,
                        //displaying text when you hover over the bar which does not work
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Winter-Night13':{
                        fillColor: '#FCAE91',
                        minValue: feature.properties.W_N_2013,
                        maxValue: feature.properties.W_N_2013,
                        maxHeight: feature.properties.W_N_2013,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Winter-Day13':{
                        fillColor: '#00ffff',
                        minValue: feature.properties.W_D_2013,
                        maxValue: feature.properties.W_D_2013,
                        maxHeight: feature.properties.W_D_2013,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Summer-Night13':{
                        fillColor: '#808080',
                        minValue: feature.properties.S_N_2013,
                        maxValue: feature.properties.S_N_2013,
                        maxHeight: feature.properties.S_N_2013,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    }
                },
                weight: 2,
                opacity:4,
                riseOnHover: true,
            }
            //Adding the leaf SVG icon through dicicon
            var iconSettings2013 = {
                mapIconUrl: '<svg id="Layer_1" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m136.33 375.757c-10.09-6.65-19.572-14.389-28.186-23.001-33.83-33.83-52.461-78.837-52.461-126.729 0-122.259 120.666-194.342 217.531-215.913 50.874-11.328 108.058-13.149 169.96-5.412 7.861.983 13.603 7.909 13.11 15.816-.492 7.907-7.048 14.068-14.971 14.068-68.152.001-137.385 41.438-184.598 90.745-61.528 64.258-96.024 148.813-97.133 238.089-.068 5.484-3.124 10.494-7.969 13.064-4.828 2.562-10.691 2.3-15.283-.727z" /><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m144.556 512c-8.284 0-15-6.716-15-15v-133.787c0-8.284 6.716-15 15-15s15 6.716 15 15v133.787c0 8.284-6.716 15-15 15z" /><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m455.722 15.41c-1.858-6.413-7.731-10.825-14.407-10.825-69.203.001-146.312 37.383-206.266 99.997-66.805 69.768-104.259 161.56-105.463 258.464 0 .032.002.064.002.096-.019.042-.032.07-.032.07v7.838c2.226 1.621 4.482 3.195 6.774 4.706 69.577 45.857 164.208 38.064 225.272-23.002 52.832-52.832 41.873-125.622 38.263-166.473-5.512-62.365-10.272-116.225 49.469-154.021 5.643-3.568 8.246-10.437 6.388-16.85z" /></g></svg>',
                mapIconColor: getColor(feature.properties.N_2013),
                mapIconColorInnerCircle: '#fff',
                pinInnerCircleRadius:48
            };
            // icon normal state
            var divIcon2013 = L.divIcon({
                className: "leaflet-data-marker",
                html: L.Util.template(iconSettings2013.mapIconUrl, iconSettings2013) //.replace('#','%23'),
            });
            // icon active state
            var divIconActive =L.divIcon({
                className: "leaflet-data-marker",
                html: L.Util.template(iconSettings2013.mapIconUrl, iconSettings2013)
            });
    var marker2013 =L.marker([feature.properties.Latitude-0.05042,feature.properties.Longitude-0.0142],
    {
        icon:divIcon2013
    })
            //adding the circle marker layer
            circlemarker_2013.addLayer(marker2013)
            // Use center to put marker on map
            var lstmarker2013 = new L.BarChartMarker(center, options)
            //marker=L.marker(center)
            // A pop up which shows the data
            lstmarker2013.bindPopup("This is the District:"+ feature.properties.Districts+'<hr>'+"From left to right"+'<hr>'+"The First Bar Shows The Summer Day Temperature of the year 2013, which is:"+feature.properties.S_D_2013+"Celcius"+'<hr>'+"The Second bar shows the Winter Night Temperature of the year 2013, which is:"+feature.properties.W_N_2013+"Celcius"+'<hr>'+"The Third Bar shows the Winter Day Temperature of the year 2013, which is:"+feature.properties.W_D_2013+"Celcius"+'<hr>'+"The Frourth bar shows the SummerNight Temperature of the year 2013,which is:"+feature.properties.S_N_2013+"Celcius")
        //adding the layer stack element with icons on to the map
        lst_2013.addLayer(lstmarker2013);
        lstfinal_2013.addLayer(lstmarker2013)
        //hover functions
        lst_2013.on({
            mouseover:function(e){
                var layer = e.target;
                this.bindTooltip('Click to view the LST bar-chart information');
            },
            mouseout:function(e){
                var layer = e.target;
                this.closePopup()
            }
        })
        //the on click function
            layer.on(
                'click', function(e){
                    var layer = e.target;
                    //it would not work with just numbers,  it requires the content to be a string or concatination
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitaion for the year 2013:'+feature.properties.P_2013+'mm per year'+'<hr>'+'The NDVI Value for the year 2013 is:'+(feature.properties.N_2013).toFixed(2));
                }
            )
            layer.on({
                mouseover: highlightprecipitation,
                mouseout: resetHighlightprecipitation
            })
      }
})//.addTo(map)
// Creating a layer group that contains the markers and the choropleth along with the bar chart for year 2012
var fullmap_2013 = L.layerGroup([lst_2013,finalmap2013,circlemarker_2013,finalmap_precipitationlabelslayers],{time:"2013"});
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
        return { color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .5 };
    },
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //For the barchart
            var options={
                data:{
                    'Summer-Day14':feature.properties.S_D_2014,
                    'Winter-Night14':feature.properties.W_N_2014,
                    'Winter-Day14':feature.properties.W_D_2014,
                    'Summer-Night14':feature.properties.S_N_2014,

                },
                //coloring options
                chartOptions:{
                    'Summer-Day14':{
                        fillColor: '#ffff00',
                        minValue: feature.properties.S_D_2014,
                        maxValue: feature.properties.S_D_2014,
                        maxHeight: feature.properties.S_D_2014,
                        //displaying text when you hover over the bar which does not work
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Winter-Night14':{
                        fillColor: '#FCAE91',
                        minValue: feature.properties.W_N_2014,
                        maxValue: feature.properties.W_N_2014,
                        maxHeight: feature.properties.W_N_2014,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Winter-Day14':{
                        fillColor: '#00ffff',
                        minValue: feature.properties.W_D_2014,
                        maxValue: feature.properties.W_D_2014,
                        maxHeight: feature.properties.W_D_2014,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Summer-Night14':{
                        fillColor: '#808080',
                        minValue: feature.properties.S_N_2014,
                        maxValue: feature.properties.S_N_2014,
                        maxHeight: feature.properties.S_N_2014,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    }
                },
                weight: 2,
                opacity:4,
                riseOnHover: true,
            }
            //Adding circle marker with varied long lat
            circlemarker2014=L.circleMarker([feature.properties.Latitude-0.05042,feature.properties.Longitude-0.0142],
            {
                fillColor:getColor(feature.properties.N_2014),
                weight: 1,
                opacity: 4,
                fillOpacity: 1
            })
            //Adding the leaf SVG icon through dicicon
            var iconSettings2014 = {
                mapIconUrl: '<svg id="Layer_1" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m136.33 375.757c-10.09-6.65-19.572-14.389-28.186-23.001-33.83-33.83-52.461-78.837-52.461-126.729 0-122.259 120.666-194.342 217.531-215.913 50.874-11.328 108.058-13.149 169.96-5.412 7.861.983 13.603 7.909 13.11 15.816-.492 7.907-7.048 14.068-14.971 14.068-68.152.001-137.385 41.438-184.598 90.745-61.528 64.258-96.024 148.813-97.133 238.089-.068 5.484-3.124 10.494-7.969 13.064-4.828 2.562-10.691 2.3-15.283-.727z" /><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m144.556 512c-8.284 0-15-6.716-15-15v-133.787c0-8.284 6.716-15 15-15s15 6.716 15 15v133.787c0 8.284-6.716 15-15 15z" /><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m455.722 15.41c-1.858-6.413-7.731-10.825-14.407-10.825-69.203.001-146.312 37.383-206.266 99.997-66.805 69.768-104.259 161.56-105.463 258.464 0 .032.002.064.002.096-.019.042-.032.07-.032.07v7.838c2.226 1.621 4.482 3.195 6.774 4.706 69.577 45.857 164.208 38.064 225.272-23.002 52.832-52.832 41.873-125.622 38.263-166.473-5.512-62.365-10.272-116.225 49.469-154.021 5.643-3.568 8.246-10.437 6.388-16.85z" /></g></svg>',
                mapIconColor: getColor(feature.properties.N_2014),
                mapIconColorInnerCircle: '#fff',
                pinInnerCircleRadius:48
            };
            // icon normal state
            var divIcon2014 = L.divIcon({
                className: "leaflet-data-marker",
                html: L.Util.template(iconSettings2014.mapIconUrl, iconSettings2014) //.replace('#','%23'),
            });
            // icon active state
            var divIconActive2014 =L.divIcon({
                className: "leaflet-data-marker",
                html: L.Util.template(iconSettings2014.mapIconUrl, iconSettings2014)
            });
    var marker2014 =L.marker([feature.properties.Latitude-0.05042,feature.properties.Longitude-0.0142],
    {
        icon:divIcon2014
    })
            //adding the circle marker layer
            circlemarker_2014.addLayer(marker2014)
            // Use center to put marker on map
            var lstmarker2014 = new L.BarChartMarker(center, options)
            //marker=L.marker(center)
            // A pop up which shows the data
            lstmarker2014.bindPopup("This is the District:"+ feature.properties.Districts+'<hr>'+"From left to right"+'<hr>'+"The First Bar Shows The Summer Day Temperature of the year 2015, which is:"+feature.properties.S_D_2014+"Celcius"+'<hr>'+"The Second bar shows the Winter Night Temperature of the year 2015, which is:"+feature.properties.W_N_2014+"Celcius"+'<hr>'+"The Third Bar shows the Winter Day Temperature of the year 2015, which is:"+feature.properties.W_D_2014+"Celcius"+'<hr>'+"The Frourth bar shows the SummerNight Temperature of the year 2015,which is:"+feature.properties.S_N_2014+"Celcius")
        //adding the layer stack element with icons on to the map
        lst_2014.addLayer(lstmarker2014);
        lstfinal_2014.addLayer(lstmarker2014)
        //hover functions
        lst_2014.on({
            mouseover:function(e){
                var layer = e.target;
                this.bindTooltip('Click to view the LST bar-chart information');
            },
            mouseout:function(e){
                var layer = e.target;
                this.closePopup()
            }
        })
        //the on click function
            layer.on(
                'click', function(e){
                    var layer = e.target;
                    //it would not work with just numbers,  it requires the content to be a string or concatination
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitaion for the year 2014:'+feature.properties.P_2014+'mm per year'+'<hr>'+'The NDVI Value for the year 2014 is:'+(feature.properties.N_2014).toFixed(2));
                }
            )
            layer.on({
                mouseover: highlightprecipitation,
                mouseout: resetHighlightprecipitation
            })
      }
})//.addTo(map)
// Creating a layer group that contains the markers and the choropleth along with the bar chart for year 2012
var fullmap_2014 = L.layerGroup([lst_2014,finalmap2014,circlemarker_2014,finalmap_precipitationlabelslayers],{time:"2014"});
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
        return { color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .5 };
    },
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
           //For the bar chart
            var options={
                data:{
                    'Summer-Day15':feature.properties.S_D_2015,
                    'Winter-Night15':feature.properties.W_N_2015,
                    'Winter-Day15':feature.properties.W_D_2015,
                    'Summer-Night15':feature.properties.S_N_2015,

                },
                //coloring options
                chartOptions:{
                    'Summer-Day15':{
                        fillColor: '#ffff00',
                        minValue: feature.properties.S_D_2015,
                        maxValue: feature.properties.S_D_2015,
                        maxHeight: feature.properties.S_D_2015,
                        //displaying text when you hover over the bar which does not work
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Winter-Night15':{
                        fillColor: '#FCAE91',
                        minValue: feature.properties.W_N_2015,
                        maxValue: feature.properties.W_N_2015,
                        maxHeight: feature.properties.W_N_2015,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Winter-Day15':{
                        fillColor: '#00ffff',
                        minValue: feature.properties.W_D_2015,
                        maxValue: feature.properties.W_D_2015,
                        maxHeight: feature.properties.W_D_2015,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Summer-Night15':{
                        fillColor: '#808080',
                        minValue: feature.properties.S_N_2015,
                        maxValue: feature.properties.S_N_2015,
                        maxHeight: feature.properties.S_N_2015,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    }
                },
                weight: 2,
                opacity:4,
                riseOnHover: true,
            }
            //Adding the leaf SVG icon through dicicon
            var iconSettings2015 = {
                mapIconUrl: '<svg id="Layer_1" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m136.33 375.757c-10.09-6.65-19.572-14.389-28.186-23.001-33.83-33.83-52.461-78.837-52.461-126.729 0-122.259 120.666-194.342 217.531-215.913 50.874-11.328 108.058-13.149 169.96-5.412 7.861.983 13.603 7.909 13.11 15.816-.492 7.907-7.048 14.068-14.971 14.068-68.152.001-137.385 41.438-184.598 90.745-61.528 64.258-96.024 148.813-97.133 238.089-.068 5.484-3.124 10.494-7.969 13.064-4.828 2.562-10.691 2.3-15.283-.727z" /><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m144.556 512c-8.284 0-15-6.716-15-15v-133.787c0-8.284 6.716-15 15-15s15 6.716 15 15v133.787c0 8.284-6.716 15-15 15z" /><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m455.722 15.41c-1.858-6.413-7.731-10.825-14.407-10.825-69.203.001-146.312 37.383-206.266 99.997-66.805 69.768-104.259 161.56-105.463 258.464 0 .032.002.064.002.096-.019.042-.032.07-.032.07v7.838c2.226 1.621 4.482 3.195 6.774 4.706 69.577 45.857 164.208 38.064 225.272-23.002 52.832-52.832 41.873-125.622 38.263-166.473-5.512-62.365-10.272-116.225 49.469-154.021 5.643-3.568 8.246-10.437 6.388-16.85z" /></g></svg>',
                mapIconColor: getColor(feature.properties.N_2015),
                mapIconColorInnerCircle: '#fff',
                pinInnerCircleRadius:48
            };
            // icon normal state
            var divIcon2015 = L.divIcon({
                className: "leaflet-data-marker",
                html: L.Util.template(iconSettings2015.mapIconUrl, iconSettings2015) //.replace('#','%23'),
            });
            // icon active state
            var divIconActive2015 =L.divIcon({
                className: "leaflet-data-marker",
                html: L.Util.template(iconSettings2015.mapIconUrl, iconSettings2015)
            });
    var marker2015 =L.marker([feature.properties.Latitude-0.05042,feature.properties.Longitude-0.0142],
    {
        icon:divIcon2015
    })
            //adding the circle marker layer
            circlemarker_2015.addLayer(marker2015)
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
            // Use center to put marker on map
            var lstmarker2015 = new L.BarChartMarker(center, options)
            //marker=L.marker(center)
            // A pop up which shows the data
            lstmarker2015.bindPopup("This is the District:"+ feature.properties.Districts+'<hr>'+"From left to right"+'<hr>'+"The First Bar Shows The Summer Day Temperature of the year 2015, which is:"+feature.properties.S_D_2015+"Celcius"+'<hr>'+"The Second bar shows the Winter Night Temperature of the year 2015, which is:"+feature.properties.W_N_2015+"Celcius"+'<hr>'+"The Third Bar shows the Winter Day Temperature of the year 2015, which is:"+feature.properties.W_D_2015+"Celcius"+'<hr>'+"The Frourth bar shows the SummerNight Temperature of the year 2015,which is:"+feature.properties.S_N_2015+"Celcius")
        //adding the layer stack element with icons on to the map
        lst_2015.addLayer(lstmarker2015);
        lstfinal_2015.addLayer(lstmarker2015)
        //hover functions
        lst_2015.on({
            mouseover:function(e){
                var layer = e.target;
                this.bindTooltip('Click to view the LST bar-chart information');
            },
            mouseout:function(e){
                var layer = e.target;
                this.closePopup()
            }
        })
         //the on click function
            layer.on(
                'click', function(e){
                    var layer = e.target;
                    //it would not work with just numbers,  it requires the content to be a string or concatination
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitaion for the year 2015:'+feature.properties.P_2015+'mm per year'+'<hr>'+'The Absolute population for the year2015:'+feature.properties.AbsPop_15+'<hr>'+'The NDVI Value for the year 2015 is:'+(feature.properties.N_2015).toFixed(2));
                }
            )
            layer.on({
                mouseover: highlightprecipitation,
                mouseout: resetHighlightprecipitation
            })
      }
})//.addTo(map)
// Creating a layer group that contains the markers and the choropleth along with the bar chart for year 2012
var fullmap_2015 = L.layerGroup([lst_2015,stack_2015,finalmap2015,circlemarker_2015,finalmap_precipitationlabelslayers],{time:"2015"});
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
        return { color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .5 };
    },
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
           //for the bar chart
            var options={
                data:{
                    'Summer-Day16':feature.properties.S_D_2016,
                    'Winter-Night16':feature.properties.W_N_2016,
                    'Winter-Day16':feature.properties.W_D_2016,
                    'Summer-Night16':feature.properties.S_N_2016,

                },
                //coloring options
                chartOptions:{
                    'Summer-Day16':{
                        fillColor: '#ffff00',
                        minValue: feature.properties.S_D_2016,
                        maxValue: feature.properties.S_D_2016,
                        maxHeight: feature.properties.S_D_2016,
                        //displaying text when you hover over the bar which does not work
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Winter-Night16':{
                        fillColor: '#FCAE91',
                        minValue: feature.properties.W_N_2016,
                        maxValue: feature.properties.W_N_2016,
                        maxHeight: feature.properties.W_N_2016,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Winter-Day16':{
                        fillColor: '#00ffff',
                        minValue: feature.properties.W_D_2016,
                        maxValue: feature.properties.W_D_2016,
                        maxHeight: feature.properties.W_D_2016,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Summer-Night16':{
                        fillColor: '#808080',
                        minValue: feature.properties.S_N_2016,
                        maxValue: feature.properties.S_N_2016,
                        maxHeight: feature.properties.S_N_2016,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    }
                },
                weight: 2,
                opacity:4,
                riseOnHover: true,
            }
            //Adding the leaf SVG icon through dicicon
            var iconSettings2016 = {
                mapIconUrl: '<svg id="Layer_1" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m136.33 375.757c-10.09-6.65-19.572-14.389-28.186-23.001-33.83-33.83-52.461-78.837-52.461-126.729 0-122.259 120.666-194.342 217.531-215.913 50.874-11.328 108.058-13.149 169.96-5.412 7.861.983 13.603 7.909 13.11 15.816-.492 7.907-7.048 14.068-14.971 14.068-68.152.001-137.385 41.438-184.598 90.745-61.528 64.258-96.024 148.813-97.133 238.089-.068 5.484-3.124 10.494-7.969 13.064-4.828 2.562-10.691 2.3-15.283-.727z" /><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m144.556 512c-8.284 0-15-6.716-15-15v-133.787c0-8.284 6.716-15 15-15s15 6.716 15 15v133.787c0 8.284-6.716 15-15 15z" /><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m455.722 15.41c-1.858-6.413-7.731-10.825-14.407-10.825-69.203.001-146.312 37.383-206.266 99.997-66.805 69.768-104.259 161.56-105.463 258.464 0 .032.002.064.002.096-.019.042-.032.07-.032.07v7.838c2.226 1.621 4.482 3.195 6.774 4.706 69.577 45.857 164.208 38.064 225.272-23.002 52.832-52.832 41.873-125.622 38.263-166.473-5.512-62.365-10.272-116.225 49.469-154.021 5.643-3.568 8.246-10.437 6.388-16.85z" /></g></svg>',
                mapIconColor: getColor(feature.properties.N_2016),
                mapIconColorInnerCircle: '#fff',
                pinInnerCircleRadius:48
            };
            // icon normal state
            var divIcon2016 = L.divIcon({
                className: "leaflet-data-marker",
                html: L.Util.template(iconSettings2016.mapIconUrl, iconSettings2016) //.replace('#','%23'),
            });
            // icon active state
            var divIconActive =L.divIcon({
                className: "leaflet-data-marker",
                html: L.Util.template(iconSettings2016.mapIconUrl, iconSettings2016)
            });
    var marker2016 =L.marker([feature.properties.Latitude-0.05042,feature.properties.Longitude-0.0142],
    {
        icon:divIcon2016
    })
            //adding the circle marker layer
            circlemarker_2016.addLayer(marker2016)
            // Use center to put marker on map
            var lstmarker2016 = new L.BarChartMarker(center, options)
            //marker=L.marker(center)
            // A pop up which shows the data
            lstmarker2016.bindPopup("This is the District:"+ feature.properties.Districts+'<hr>'+"From left to right"+'<hr>'+"The First Bar Shows The Summer Day Temperature of the year 2016, which is:"+feature.properties.S_D_2016+"Celcius"+'<hr>'+"The Second bar shows the Winter Night Temperature of the year 2016, which is:"+feature.properties.W_N_2016+"Celcius"+'<hr>'+"The Third Bar shows the Winter Day Temperature of the year 2016, which is:"+feature.properties.W_D_2016+"Celcius"+'<hr>'+"The Frourth bar shows the SummerNight Temperature of the year 2016,which is:"+feature.properties.S_N_2016+"Celcius")
        //adding the layer stack element with icons on to the map
        lst_2016.addLayer(lstmarker2016);
        lstfinal_2016.addLayer(lstmarker2016)
        //hover functions
        lst_2016.on({
            mouseover:function(e){
                var layer = e.target;
                this.bindTooltip('Click to view the LST bar-chart information');
            },
            mouseout:function(e){
                var layer = e.target;
                this.closePopup()
            }
        })
         //the on click function
            layer.on(
                'click', function(e){
                    var layer = e.target;
                    //it would not work with just numbers,  it requires the content to be a string or concatination
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitaion for the year 2016:'+feature.properties.P_2016+'mm per year'+'<hr>'+'The NDVI Value for the year 2016 is:'+(feature.properties.N_2016).toFixed(2));
                }
            )
            layer.on({
                mouseover: highlightprecipitation,
                mouseout: resetHighlightprecipitation
            })
      }
})//.addTo(map)
// Creating a layer group that contains the markers and the choropleth along with the bar chart for year 2012
var fullmap_2016 = L.layerGroup([lst_2016,finalmap2016,circlemarker_2016,finalmap_precipitationlabelslayers],{time:"2016"});
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
        return { color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .5 };
    },
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //For the bar chart
            var options={
                data:{
                    'Summer-Day17':feature.properties.S_D_2017,
                    'Winter-Night17':feature.properties.W_N_2017,
                    'Winter-Day17':feature.properties.W_D_2017,
                    'Summer-Night17':feature.properties.S_N_2017,

                },
                //coloring options
                chartOptions:{
                    'Summer-Day17':{
                        fillColor: '#ffff00',
                        minValue: feature.properties.S_D_2017,
                        maxValue: feature.properties.S_D_2017,
                        maxHeight: feature.properties.S_D_2017,
                        //displaying text when you hover over the bar which does not work
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Winter-Night17':{
                        fillColor: '#FCAE91',
                        minValue: feature.properties.W_N_2017,
                        maxValue: feature.properties.W_N_2017,
                        maxHeight: feature.properties.W_N_2017,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Winter-Day17':{
                        fillColor: '#00ffff',
                        minValue: feature.properties.W_D_2017,
                        maxValue: feature.properties.W_D_2017,
                        maxHeight: feature.properties.W_D_2017,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Summer-Night17':{
                        fillColor: '#808080',
                        minValue: feature.properties.S_N_2017,
                        maxValue: feature.properties.S_N_2017,
                        maxHeight: feature.properties.S_N_2017,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    }
                },
                weight: 2,
                opacity:4,
                riseOnHover: true,
            }
            //Adding circle marker with varied long lat
            var iconSettings2017 = {
                mapIconUrl: '<svg id="Layer_1" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m136.33 375.757c-10.09-6.65-19.572-14.389-28.186-23.001-33.83-33.83-52.461-78.837-52.461-126.729 0-122.259 120.666-194.342 217.531-215.913 50.874-11.328 108.058-13.149 169.96-5.412 7.861.983 13.603 7.909 13.11 15.816-.492 7.907-7.048 14.068-14.971 14.068-68.152.001-137.385 41.438-184.598 90.745-61.528 64.258-96.024 148.813-97.133 238.089-.068 5.484-3.124 10.494-7.969 13.064-4.828 2.562-10.691 2.3-15.283-.727z" /><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m144.556 512c-8.284 0-15-6.716-15-15v-133.787c0-8.284 6.716-15 15-15s15 6.716 15 15v133.787c0 8.284-6.716 15-15 15z" /><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m455.722 15.41c-1.858-6.413-7.731-10.825-14.407-10.825-69.203.001-146.312 37.383-206.266 99.997-66.805 69.768-104.259 161.56-105.463 258.464 0 .032.002.064.002.096-.019.042-.032.07-.032.07v7.838c2.226 1.621 4.482 3.195 6.774 4.706 69.577 45.857 164.208 38.064 225.272-23.002 52.832-52.832 41.873-125.622 38.263-166.473-5.512-62.365-10.272-116.225 49.469-154.021 5.643-3.568 8.246-10.437 6.388-16.85z" /></g></svg>',
                mapIconColor: getColor(feature.properties.N_2017),
                mapIconColorInnerCircle: '#fff',
                pinInnerCircleRadius:48
            };
            // icon normal state
            var divIcon2017 = L.divIcon({
                className: "leaflet-data-marker",
                html: L.Util.template(iconSettings2017.mapIconUrl, iconSettings2017) //.replace('#','%23'),
            });
            // icon active state
            var divIconActive2017 =L.divIcon({
                className: "leaflet-data-marker",
                html: L.Util.template(iconSettings2017.mapIconUrl, iconSettings2017)
            });
    var marker2017 =L.marker([feature.properties.Latitude-0.05042,feature.properties.Longitude-0.0142],
    {
        icon:divIcon2017
    })
            //adding the circle marker layer
            circlemarker_2017.addLayer(marker2017)
            // Use center to put marker on map
            var lstmarker2017 = new L.BarChartMarker(center, options)
            //marker=L.marker(center)
            // A pop up which shows the data
            lstmarker2017.bindPopup("This is the District:"+ feature.properties.Districts+'<hr>'+"From left to right"+'<hr>'+"The First Bar Shows The Summer Day Temperature of the year 2017, which is:"+feature.properties.S_D_2017+"Celcius"+'<hr>'+"The Second bar shows the Winter Night Temperature of the year 2017, which is:"+feature.properties.W_N_2017+"Celcius"+'<hr>'+"The Third Bar shows the Winter Day Temperature of the year 2017, which is:"+feature.properties.W_D_2017+"Celcius"+'<hr>'+"The Frourth bar shows the SummerNight Temperature of the year 2017,which is:"+feature.properties.S_N_2017+"Celcius")
        //adding the layer stack element with icons on to the map
        lst_2017.addLayer(lstmarker2017);
        lstfinal_2017.addLayer(lstmarker2017)
        //hover functions
        lst_2017.on({
            mouseover:function(e){
                var layer = e.target;
                this.bindTooltip('Click to view the LST bar-chart information');
            },
            mouseout:function(e){
                var layer = e.target;
                this.closePopup()
            }
        })
        //the on click function
            layer.on(
                'click', function(e){
                    var layer = e.target;
                    //it would not work with just numbers,  it requires the content to be a string or concatination
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitaion for the year 2017:'+feature.properties.P_2017+'mm per year'+'<hr>'+'The NDVI Value for the year 2017 is:'+(feature.properties.N_2017).toFixed(2));
                }
            )
            layer.on({
                mouseover: highlightprecipitation,
                mouseout: resetHighlightprecipitation
            })
      }
})//.addTo(map)
// Creating a layer group that contains the markers and the choropleth along with the bar chart for year 2012
var fullmap_2017 = L.layerGroup([lst_2017,finalmap2017,circlemarker_2017,finalmap_precipitationlabelslayers],{time:"2017"});
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
        return { color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .5 };
    },
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //for the bar chart
            var options={
                data:{
                    'Summer-Day18':feature.properties.S_D_2018,
                    'Winter-Night18':feature.properties.W_N_2018,
                    'Winter-Day18':feature.properties.W_D_2018,
                    'Summer-Night18':feature.properties.S_N_2018,

                },
                //coloring options
                chartOptions:{
                    'Summer-Day18':{
                        fillColor: '#ffff00',
                        minValue: feature.properties.S_D_2018,
                        maxValue: feature.properties.S_D_2018,
                        maxHeight: feature.properties.S_D_2018,
                        //displaying text when you hover over the bar which does not work
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Winter-Night18':{
                        fillColor: '#FCAE91',
                        minValue: feature.properties.W_N_2018,
                        maxValue: feature.properties.W_N_2018,
                        maxHeight: feature.properties.W_N_2018,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Winter-Day18':{
                        fillColor: '#00ffff',
                        minValue: feature.properties.W_D_2018,
                        maxValue: feature.properties.W_D_2018,
                        maxHeight: feature.properties.W_D_2018,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Summer-Night18':{
                        fillColor: '#808080',
                        minValue: feature.properties.S_N_2018,
                        maxValue: feature.properties.S_N_2018,
                        maxHeight: feature.properties.S_N_2018,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    }
                },
                weight: 2,
                opacity:4,
                riseOnHover: true,
            }
            //Adding the leaf SVG icon through dicicon
            var iconSettings2018 = {
                mapIconUrl: '<svg id="Layer_1" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m136.33 375.757c-10.09-6.65-19.572-14.389-28.186-23.001-33.83-33.83-52.461-78.837-52.461-126.729 0-122.259 120.666-194.342 217.531-215.913 50.874-11.328 108.058-13.149 169.96-5.412 7.861.983 13.603 7.909 13.11 15.816-.492 7.907-7.048 14.068-14.971 14.068-68.152.001-137.385 41.438-184.598 90.745-61.528 64.258-96.024 148.813-97.133 238.089-.068 5.484-3.124 10.494-7.969 13.064-4.828 2.562-10.691 2.3-15.283-.727z" /><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m144.556 512c-8.284 0-15-6.716-15-15v-133.787c0-8.284 6.716-15 15-15s15 6.716 15 15v133.787c0 8.284-6.716 15-15 15z" /><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m455.722 15.41c-1.858-6.413-7.731-10.825-14.407-10.825-69.203.001-146.312 37.383-206.266 99.997-66.805 69.768-104.259 161.56-105.463 258.464 0 .032.002.064.002.096-.019.042-.032.07-.032.07v7.838c2.226 1.621 4.482 3.195 6.774 4.706 69.577 45.857 164.208 38.064 225.272-23.002 52.832-52.832 41.873-125.622 38.263-166.473-5.512-62.365-10.272-116.225 49.469-154.021 5.643-3.568 8.246-10.437 6.388-16.85z" /></g></svg>',
                mapIconColor: getColor(feature.properties.N_2011),
                mapIconColorInnerCircle: '#fff',
                pinInnerCircleRadius:48
            };
            // icon normal state
            var divIcon2018 = L.divIcon({
                className: "leaflet-data-marker",
                html: L.Util.template(iconSettings2018.mapIconUrl, iconSettings2018) //.replace('#','%23'),
            });
            // icon active state
            var divIconActive2018 =L.divIcon({
                className: "leaflet-data-marker",
                html: L.Util.template(iconSettings2018.mapIconUrl, iconSettings2018)
            });
    var marker2018 =L.marker([feature.properties.Latitude-0.05042,feature.properties.Longitude-0.0142],
    {
        icon:divIcon2018
    })
            
            //adding the circle marker layer
            circlemarker_2018.addLayer(marker2018)
            // Use center to put marker on map
            var lstmarker2018 = new L.BarChartMarker(center, options)
            //marker=L.marker(center)
            // A pop up which shows the data
            lstmarker2018.bindPopup("This is the District:"+ feature.properties.Districts+'<hr>'+"From left to right"+'<hr>'+"The First Bar Shows The Summer Day Temperature of the year 2018, which is:"+feature.properties.S_D_2018+"Celcius"+'<hr>'+"The Second bar shows the Winter Night Temperature of the year 2018, which is:"+feature.properties.W_N_2018+"Celcius"+'<hr>'+"The Third Bar shows the Winter Day Temperature of the year 2018, which is:"+feature.properties.W_D_2018+"Celcius"+'<hr>'+"The Frourth bar shows the SummerNight Temperature of the year 2018,which is:"+feature.properties.S_N_2018+"Celcius")
        //adding the layer stack element with icons on to the map
        lst_2018.addLayer(lstmarker2018);
        lstfinal_2018.addLayer(lstmarker2018)
        //hover functions
        lst_2018.on({
            mouseover:function(e){
                var layer = e.target;
                this.bindTooltip('Click to view the LST bar-chart information');
            },
            mouseout:function(e){
                var layer = e.target;
                this.closePopup()
            }
        })
        //the on click function
            layer.on(
                'click', function(e){
                    var layer = e.target;
                    //it would not work with just numbers,  it requires the content to be a string or concatination
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitaion for the year 2018:'+feature.properties.P_2018+'mm per year'+'<hr>'+'The NDVI Value for the year 2017 is:'+(feature.properties.N_2017).toFixed(2));
                }
            )
            layer.on({
                mouseover: highlightprecipitation,
                mouseout: resetHighlightprecipitation
            })
      }
})//.addTo(map)
// Creating a layer group that contains the markers and the choropleth along with the bar chart for year 2012
var fullmap_2018 = L.layerGroup([lst_2018,finalmap2018,circlemarker_2018,finalmap_precipitationlabelslayers],{time:"2018"});
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
        return { color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .5 };
    },
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //For the bar chart
            var options={
                data:{
                    'Summer-Day19':feature.properties.S_D_2019,
                    'Winter-Night19':feature.properties.W_N_2019,
                    'Winter-Day19':feature.properties.W_D_2019,
                    'Summer-Night19':feature.properties.S_N_2019,

                },
                //coloring options
                chartOptions:{
                    'Summer-Day19':{
                        fillColor: '#ffff00',
                        minValue: feature.properties.S_D_2019,
                        maxValue: feature.properties.S_D_2019,
                        maxHeight: feature.properties.S_D_2019,
                        //displaying text when you hover over the bar which does not work
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Winter-Night19':{
                        fillColor: '#FCAE91',
                        minValue: feature.properties.W_N_2019,
                        maxValue: feature.properties.W_N_2019,
                        maxHeight: feature.properties.W_N_2019,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Winter-Day19':{
                        fillColor: '#00ffff',
                        minValue: feature.properties.W_D_2019,
                        maxValue: feature.properties.W_D_2019,
                        maxHeight: feature.properties.W_D_2019,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Summer-Night19':{
                        fillColor: '#808080',
                        minValue: feature.properties.S_N_2019,
                        maxValue: feature.properties.S_N_2019,
                        maxHeight: feature.properties.S_N_2019,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    }
                },
                weight: 2,
                opacity:4,
                riseOnHover: true,
            }
            //Adding the leaf SVG icon through dicicon
            var iconSettings2019 = {
                mapIconUrl: '<svg id="Layer_1" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m136.33 375.757c-10.09-6.65-19.572-14.389-28.186-23.001-33.83-33.83-52.461-78.837-52.461-126.729 0-122.259 120.666-194.342 217.531-215.913 50.874-11.328 108.058-13.149 169.96-5.412 7.861.983 13.603 7.909 13.11 15.816-.492 7.907-7.048 14.068-14.971 14.068-68.152.001-137.385 41.438-184.598 90.745-61.528 64.258-96.024 148.813-97.133 238.089-.068 5.484-3.124 10.494-7.969 13.064-4.828 2.562-10.691 2.3-15.283-.727z" /><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m144.556 512c-8.284 0-15-6.716-15-15v-133.787c0-8.284 6.716-15 15-15s15 6.716 15 15v133.787c0 8.284-6.716 15-15 15z" /><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m455.722 15.41c-1.858-6.413-7.731-10.825-14.407-10.825-69.203.001-146.312 37.383-206.266 99.997-66.805 69.768-104.259 161.56-105.463 258.464 0 .032.002.064.002.096-.019.042-.032.07-.032.07v7.838c2.226 1.621 4.482 3.195 6.774 4.706 69.577 45.857 164.208 38.064 225.272-23.002 52.832-52.832 41.873-125.622 38.263-166.473-5.512-62.365-10.272-116.225 49.469-154.021 5.643-3.568 8.246-10.437 6.388-16.85z" /></g></svg>',
                mapIconColor: getColor(feature.properties.N_2011),
                mapIconColorInnerCircle: '#fff',
                pinInnerCircleRadius:48
            };
            // icon normal state
            var divIcon2019 = L.divIcon({
                className: "leaflet-data-marker",
                html: L.Util.template(iconSettings2019.mapIconUrl, iconSettings2019) //.replace('#','%23'),
            });
            // icon active state
            var divIconActive2019 =L.divIcon({
                className: "leaflet-data-marker",
                html: L.Util.template(iconSettings2019.mapIconUrl, iconSettings2019)
            });
    var marker2019 =L.marker([feature.properties.Latitude-0.05042,feature.properties.Longitude-0.0142],
    {
        icon:divIcon2019
    })
            //adding the circle marker layer
            circlemarker_2019.addLayer(marker2019)
            //Population data is for 2010,2015 and 2019
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
            // Use center to put marker on map
            var lstmarker2019 = new L.BarChartMarker(center, options)
            //marker=L.marker(center)
            // A pop up which shows the data
            lstmarker2019.bindPopup("This is the District:"+ feature.properties.Districts+'<hr>'+"From left to right"+'<hr>'+"The First Bar Shows The Summer Day Temperature of the year 2019, which is:"+feature.properties.S_D_2019+"Celcius"+'<hr>'+"The Second bar shows the Winter Night Temperature of the year 2019, which is:"+feature.properties.W_N_2019+"Celcius"+'<hr>'+"The Third Bar shows the Winter Day Temperature of the year 2019, which is:"+feature.properties.W_D_2019+"Celcius"+'<hr>'+"The Frourth bar shows the SummerNight Temperature of the year 2019,which is:"+feature.properties.S_N_2019+"Celcius")
        //adding the layer stack element with icons on to the map
        lst_2019.addLayer(lstmarker2019);
        lstfinal_2019.addLayer(lstmarker2019)
        //hover functions
        lst_2019.on({
            mouseover:function(e){
                var layer = e.target;
                this.bindTooltip('Click to view the LST bar-chart information');
            },
            mouseout:function(e){
                var layer = e.target;
                this.closePopup()
            }
        })
        //the on click function
            layer.on(
                'click', function(e){
                    var layer = e.target;
                    //it would not work with just numbers,  it requires the content to be a string or concatination
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitaion for the year 2019:'+feature.properties.P_2019+'mm per year'+'<hr>'+'The NDVI Value for the year 2019 is:'+(feature.properties.N_2019).toFixed(2));
                }
            )
            layer.on({
                mouseover: highlightprecipitation,
                mouseout: resetHighlightprecipitation
            })
      }
})//.addTo(map)
// Creating a layer group that contains the markers and the choropleth along with the bar chart for year 2012
var fullmap_2019 = L.layerGroup([lst_2019,finalmap2019,circlemarker_2019,finalmap_precipitationlabelslayers],{time:"2019"});
// A feature group that contains all the features
var final_from_2010_till_2019=L.featureGroup([fullmap_2010,fullmap_2011,fullmap_2012,fullmap_2013,fullmap_2014,fullmap_2015,fullmap_2016,fullmap_2017,fullmap_2018,fullmap_2019]).addTo(map)
//For choropleth of Pop density for the years 2010,2015,2020
//for year 2010
var finalmap_popdense2010=  L.geoJson(final,{
    // Creating a choropleth 
    style: function(feature){
        //for choropleth
        var fillColor,
        popdensity = feature.properties.Pop_2010;
        if ( popdensity > 1500 ) fillColor = '#800026';
        else if ( popdensity > 1000 ) fillColor = '#BD0026';
        else if ( popdensity > 900 ) fillColor = '#E31A1C';
        else if ( popdensity > 800 ) fillColor = '#FC4E2A';
        else if ( popdensity > 700 ) fillColor = '#FD8D3C';
        else if ( popdensity > 500 ) fillColor = '#FEB24C';
        else if ( popdensity > 400 ) fillColor = '#FED976';
        else fillColor = '#FFEDA0';  // no data
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
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Population Density for the year 2010:'+feature.properties.Pop_2010+'people/km^2');
                }
            )
            layer.on({
                mouseover: highlightpopdensity,
                mouseout: resetHighlightpopdensity
            })
            
        //adding the layer stack element with icons on to the map
      }
})//.addTo(map)
// Layer group that contains the choropleth for 2010
var fullmap_popdense_2010 = L.layerGroup([finalmap_populationdensitylabelslayers,finalmap_popdense2010],{time:"2010"});
// for the year 2015 for Population Density
var finalmap_popdens2015=  L.geoJson(final,{
    style: function(feature){
        //for choropleth
        var fillColor,
        popdensity = feature.properties.Pop_2015;
        if ( popdensity > 1500 ) fillColor = '#800026';
        else if ( popdensity > 1000 ) fillColor = '#BD0026';
        else if ( popdensity > 900 ) fillColor = '#E31A1C';
        else if ( popdensity > 800 ) fillColor = '#FC4E2A';
        else if ( popdensity > 700 ) fillColor = '#FD8D3C';
        else if ( popdensity > 500 ) fillColor = '#FEB24C';
        else if ( popdensity > 400 ) fillColor = '#FED976';
        else fillColor = '#FFEDA0';  // no data
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
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Population Density for the year 2015:'+feature.properties.Pop_2015+'people/km^2');
                }
            )
            layer.on({
                mouseover: highlightpopdensity,
                mouseout: resetHighlightpopdensity
            })
      }
})//.addTo(map)
// Creating a layer group that contains the choropleth 
var fullmap_popdense_2015 = L.layerGroup([finalmap_populationdensitylabelslayers,finalmap_popdens2015],{time:"2015"});
//For the year 2019
var finalmap_popdense2019=  L.geoJson(final,{
    style: function(feature){
        //for choropleth
        var fillColor,
        popdensity = feature.properties.Pop_2020;
        if ( popdensity > 1500 ) fillColor = '#800026';
        else if ( popdensity > 1000 ) fillColor = '#BD0026';
        else if ( popdensity > 900 ) fillColor = '#E31A1C';
        else if ( popdensity > 800 ) fillColor = '#FC4E2A';
        else if ( popdensity > 700 ) fillColor = '#FD8D3C';
        else if ( popdensity > 500 ) fillColor = '#FEB24C';
        else if ( popdensity > 400 ) fillColor = '#FED976';
        else fillColor = '#FFEDA0';  // no data
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
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Population Density for the year 2019:'+feature.properties.Pop_2020+'people/km^2');
                }
            )
            layer.on({
                mouseover: resetHighlightpopdensity,
                mouseout: resetHighlightpopdensity
            })
      }
})//.addTo(map)
// Creating a layer group that contains the markers and the choropleth along with the bar chart for year 2012
var fullmap_popdense_2019 = L.layerGroup([finalmap_populationdensitylabelslayers,finalmap_popdense2019],{time:"2019"});
// A feature group that contains all the features
var popdensfinalfullmap =L.featureGroup([fullmap_popdense_2010,fullmap_popdense_2015,fullmap_popdense_2019])
// For the Choropleth of NDVI
//2010
var finalmap_ndvichoro2010=  L.geoJson(final,{
    style: stylendvi2010,
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
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'NDVI Value for the year 2010:'+feature.properties.N_2010);

                }
            )
            layer.on({
                mouseover: highlightndvichoro,
                mouseout: resetHighlightndvichoro
            })
           
      }
})//.addTo(map)
// Creating a layer group that contains  choropleth  2010
var fullmap_ndvi_2010 = L.layerGroup([finalmap_ndvimarkerslayers,finalmap_ndvichoro2010],{time:"2010"});
//2011
var finalmap_ndvichoro2011=  L.geoJson(final,{
    style: stylendvi2011,
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
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'NDVI Value for the year 2011:'+(feature.properties.N_2011).toFixed(2));
                }
            )
            layer.on({
                mouseover: highlightndvichoro,
                mouseout: resetHighlightndvichoro
            })
            
        
        
      }
})//.addTo(map)
// Creating a layer group that contains  choropleth  2011
var fullmap_ndvi_2011 = L.layerGroup([finalmap_ndvimarkerslayers,finalmap_ndvichoro2011],{time:"2011"});
//2012
var finalmap_ndvichoro2012=  L.geoJson(final,{
    style: stylendvi2012,
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
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'NDVI Value for the year 2012:'+((feature.properties.N_2012).toFixed(2)).toFixed(2));
                }
            )
            layer.on({
                mouseover: highlightndvichoro,
                mouseout: resetHighlightndvichoro
            })
      }
})//.addTo(map)
// Creating a layer group that contains  choropleth  2012
var fullmap_ndvi_2012 = L.layerGroup([finalmap_ndvimarkerslayers,finalmap_ndvichoro2012],{time:"2012"});
//2013
var finalmap_ndvichoro2013=  L.geoJson(final,{
    style: stylendvi2013,
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
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'NDVI Value for the year 2013:'+(feature.properties.N_2013).toFixed(2));
                }
            )
            layer.on({
                mouseover: highlightndvichoro,
                mouseout: resetHighlightndvichoro
            })
      }
})//.addTo(map)
// Creating a layer group that contains  choropleth  2013
var fullmap_ndvi_2013 = L.layerGroup([finalmap_ndvimarkerslayers,finalmap_ndvichoro2013],{time:"2013"});
//2014
var finalmap_ndvichoro2014=  L.geoJson(final,{
    style: stylendvi2014,
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
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'NDVI Value for the year 2014:'+(feature.properties.N_2014).toFixed(2));
                }
            )
            layer.on({
                mouseover: highlightndvichoro,
                mouseout: resetHighlightndvichoro
            })
      }
})//.addTo(map)
// Creating a layer group that contains  choropleth  2014
var fullmap_ndvi_2014 = L.layerGroup([finalmap_ndvimarkerslayers,finalmap_ndvichoro2014],{time:"2014"});
//2015
var finalmap_ndvichoro2015=  L.geoJson(final,{
    style: stylendvi2015,
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
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'NDVI Value for the year 2015:'+(feature.properties.N_2015).toFixed(2));
                }
            )
            layer.on({
                mouseover: highlightndvichoro,
                mouseout: resetHighlightndvichoro
            })
      }
})//.addTo(map)
// Creating a layer group that contains  choropleth  2015
var fullmap_ndvi_2015 = L.layerGroup([finalmap_ndvimarkerslayers,finalmap_ndvichoro2015],{time:"2015"});
//2016
var finalmap_ndvichoro2016=  L.geoJson(final,{
    style: stylendvi2016,
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
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'NDVI Value for the year 2016:'+(feature.properties.N_2016).toFixed(2));
                }
            )
            layer.on({
                mouseover: highlightndvichoro,
                mouseout: resetHighlightndvichoro
            })
      }
})//.addTo(map)
// Creating a layer group that contains  choropleth  2016
var fullmap_ndvi_2016 = L.layerGroup([finalmap_ndvimarkerslayers,finalmap_ndvichoro2016],{time:"2016"});
//2017
var finalmap_ndvichoro2017=  L.geoJson(final,{
    style: stylendvi2017,
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
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'NDVI Value for the year 2017:'+(feature.properties.N_2017).toFixed(2));
                }
            )
            layer.on({
                mouseover: highlightndvichoro,
                mouseout: resetHighlightndvichoro
            })
      }
})//.addTo(map)
// Creating a layer group that contains  choropleth  2018
var fullmap_ndvi_2017 = L.layerGroup([finalmap_ndvimarkerslayers,finalmap_ndvichoro2017],{time:"2017"});
//2018
var finalmap_ndvichoro2018=  L.geoJson(final,{
    style: stylendvi2018,
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
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'NDVI Value for the year 2018:'+((feature.properties.N_2018).toFixed(2)).toFixed(2));
                }
            )
            layer.on({
                mouseover: highlightndvichoro,
                mouseout: resetHighlightndvichoro
            })
      }
})//.addTo(map)
// Creating a layer group that contains  choropleth  2018
var fullmap_ndvi_2018 = L.layerGroup([finalmap_ndvimarkerslayers,finalmap_ndvichoro2018],{time:"2018"});
//2019
var finalmap_ndvichoro2019=  L.geoJson(final,{
    style: stylendvi2019,
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
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'NDVI Value for the year 2019:'+(feature.properties.N_2019).toFixed(2));
                }
            )
            layer.on({
                mouseover: highlightndvichoro,
                mouseout: resetHighlightndvichoro
            })
      }
})//.addTo(map)

// Creating a layer group that contains  choropleth  2019
var fullmap_ndvi_2019 = L.layerGroup([finalmap_ndvimarkerslayers,finalmap_ndvichoro2019],{time:"2019"});
//Feature group that conains all
var ndvichoropleth_full=L.featureGroup([fullmap_ndvi_2010,fullmap_ndvi_2011,fullmap_ndvi_2012,fullmap_ndvi_2013,fullmap_ndvi_2014,fullmap_ndvi_2015,fullmap_ndvi_2016,fullmap_ndvi_2017,fullmap_ndvi_2018,fullmap_ndvi_2019])
//For population symbol
var Absolutepopulation_final=L.featureGroup([stack_2010,stack_2015,stack_2019])
//For Precipitation Cheropleth
var precipchoropleth_2010=L.layerGroup([finalmap_precipitationlabelslayers,finalmap2010],{time:"2010"})
var precipchoropleth_2011=L.layerGroup([finalmap_precipitationlabelslayers,finalmap2011],{time:"2011"})
var precipchoropleth_2012=L.layerGroup([finalmap_precipitationlabelslayers,finalmap2012],{time:"2012"})
var precipchoropleth_2013=L.layerGroup([finalmap_precipitationlabelslayers,finalmap2013],{time:"2013"})
var precipchoropleth_2014=L.layerGroup([finalmap_precipitationlabelslayers,finalmap2014],{time:"2014"})
var precipchoropleth_2015=L.layerGroup([finalmap_precipitationlabelslayers,finalmap2015],{time:"2015"})
var precipchoropleth_2016=L.layerGroup([finalmap_precipitationlabelslayers,finalmap2016],{time:"2016"})
var precipchoropleth_2017=L.layerGroup([finalmap_precipitationlabelslayers,finalmap2017],{time:"2017"})
var precipchoropleth_2018=L.layerGroup([finalmap_precipitationlabelslayers,finalmap2018],{time:"2018"})
var precipchoropleth_2019=L.layerGroup([finalmap_precipitationlabelslayers,finalmap2019],{time:"2019"})
var precipchoropleth_full=L.featureGroup([precipchoropleth_2010,precipchoropleth_2011,precipchoropleth_2012,precipchoropleth_2013,precipchoropleth_2014,precipchoropleth_2015,precipchoropleth_2016,precipchoropleth_2017,precipchoropleth_2018,precipchoropleth_2019])
//For Ndvi
var ndvi_2010=L.layerGroup([finalmap_ndvimarkers,circlemarker_2010],{time:"2010"})
var ndvi_2011=L.layerGroup([finalmap_ndvimarkers,circlemarker_2011],{time:"2011"})
var ndvi_2012=L.layerGroup([finalmap_ndvimarkers,circlemarker_2012],{time:"2012"})
var ndvi_2013=L.layerGroup([finalmap_ndvimarkers,circlemarker_2013],{time:"2013"})
var ndvi_2014=L.layerGroup([finalmap_ndvimarkers,circlemarker_2014],{time:"2014"})
var ndvi_2015=L.layerGroup([finalmap_ndvimarkers,circlemarker_2015],{time:"2015"})
var ndvi_2016=L.layerGroup([finalmap_ndvimarkers,circlemarker_2016],{time:"2016"})
var ndvi_2017=L.layerGroup([finalmap_ndvimarkers,circlemarker_2017],{time:"2017"})
var ndvi_2018=L.layerGroup([finalmap_ndvimarkers,circlemarker_2018],{time:"2018"})
var ndvi_2019=L.layerGroup([finalmap_ndvimarkers,circlemarker_2019],{time:"2019"})
var NDVI_final=L.featureGroup([ndvi_2010,ndvi_2011,ndvi_2012,ndvi_2013,ndvi_2014,ndvi_2015,ndvi_2016,ndvi_2017,ndvi_2018,ndvi_2019])
//For Absolute Population
var pop_2010=L.layerGroup([stack_2010],{time:"2010"})
var pop_2015=L.layerGroup([stack_2015],{time:"2015"})
var pop_2019=L.layerGroup([stack_2019],{time:"2019"})
var Absolutepopulation_final=L.featureGroup([pop_2010,pop_2015,pop_2019])
//For Barchart LST
var landtepm_2010=L.layerGroup([finalmap_lstmarkers,lstfinal_2010],{time:"2010"})
var landtepm_2011=L.layerGroup([finalmap_lstmarkers,lstfinal_2011],{time:"2011"})
var landtepm_2012=L.layerGroup([finalmap_lstmarkers,lstfinal_2012],{time:"2012"})
var landtepm_2013=L.layerGroup([finalmap_lstmarkers,lstfinal_2013],{time:"2013"})
var landtepm_2014=L.layerGroup([finalmap_lstmarkers,lstfinal_2014],{time:"2014"})
var landtepm_2015=L.layerGroup([finalmap_lstmarkers,lstfinal_2015],{time:"2015"})
var landtepm_2016=L.layerGroup([finalmap_lstmarkers,lstfinal_2016],{time:"2016"})
var landtepm_2017=L.layerGroup([finalmap_lstmarkers,finalmap_lstmarkers,lstfinal_2017],{time:"2017"})
var landtepm_2018=L.layerGroup([finalmap_lstmarkers,lstfinal_2018],{time:"2018"})
var landtepm_2019=L.layerGroup([finalmap_lstmarkers,lstfinal_2019],{time:"2019"})
var LST_final=L.featureGroup([landtepm_2010,landtepm_2011,landtepm_2012,landtepm_2013,landtepm_2014,landtepm_2015,landtepm_2016,landtepm_2017,landtepm_2018,landtepm_2019])
/*Layer control
var overlay = {
    'Punjab with all variables':final_from_2010_till_2019,
    'Punjab with Land Surface Temperature':LST_final,
    'Punjab with Normalized Differential Vegetation Index':NDVI_final,
    'Punjab with Absolute Population':Absolutepopulation_final,
    'Punjab with Precipitation Choropleth':precipchoropleth_full,
    'Punjab with Population Density Choropleth':popdensfinalfullmap,
    'Punjab with NDVI Choropleth':ndvichoropleth_full
    
    //'markers': layerGroup
};
// to add control layers
var lcontrol=L.control.layers(null, overlay,{position: 'topleft'})//.addTo(map);
*/
//To add the Search Control
var searchControl= new L.Control.Search({
    layer: finalmap_search,
    propertyName: 'Districts',
    marker: false,
    position:'topleft',
    zoom: 12
});
map.addControl( searchControl );  //inizialize search control
//To add the slider controler
var sliderControl = L.control.sliderControl({position: "topleft",layer:final_from_2010_till_2019,follow: 1,range:true});
//For adding the control
map.addControl(sliderControl)
//initiating the slider controler
sliderControl.startSlider()
//For the second slider control
var sliderControl2 = L.control.sliderControl({position: "topleft",layer:LST_final,follow: 1,range:true});
//map.addControl(sliderControl2)
//sliderControl2.startSlider()
//For the third slider control
var sliderControl3 = L.control.sliderControl({position: "topleft",layer:NDVI_final,follow: 1,range:true});
//for 4th slider control
var sliderControl4 = L.control.sliderControl({position: "topleft",layer:Absolutepopulation_final,follow: 1,range:true});
//for 5th slider controler
var sliderControl5 = L.control.sliderControl({position: "topleft",layer:precipchoropleth_full,follow: 1,range:true});
//for 6th slider controler
var sliderControl6 = L.control.sliderControl({position: "topleft",layer:popdensfinalfullmap,follow: 1,range:true});
//7th slider controler
var sliderControl7 = L.control.sliderControl({position: "topleft",layer:ndvichoropleth_full,follow: 1,range:true});
//info control for ndvi choropleth
var infondvichoro = L.control();

        infondvichoro.onAdd = function(map) {
            this._div = L.DomUtil.create('div', 'infondvichoro');
            this.update();
            return this._div;
        };

        infondvichoro.update = function(props) {
            if (props) {
                    var labels = ['NDVI2010', 'NDVI2011','NDVI2012','NDVI2013','NDVI2014','NDVI2015','NDVI2016','NDVI2017','NDVI2018','NDVI2019'];
                    var data = [(props.N_2010).toFixed(2),(props.N_2011).toFixed(2),(props.N_2012).toFixed(2),(props.N_2013).toFixed(2),(props.N_2014).toFixed(2),(props.N_2015).toFixed(2),(props.N_2016).toFixed(2),(props.N_2017).toFixed(2),(props.N_2018).toFixed(2),(props.N_2019).toFixed(2)];
                    console.log('labels', labels, 'data', data);
                    var dems1 = '<h4>NDVI Choropleth</h4>' +  '<br />' + (props ? props.Districts + ' District' + '<br />' + '<br />'  :'hover over a country');
                    dems1 += '<canvas id="myChart" width="200" height="200"></canvas>';
                    this._div.innerHTML = dems1;
                    newChart(labels, data);
            }

                console.log('props:', props);
        };
//chart for choropleth of ndvi
var newChart = function(labels, data) {
        var dataLength = labels ? labels.length : 0;
        console.log
        console.log('NDVI Choropleth', labels, data);
        var ctx1 = document.getElementById("myChart");
        var myChart = new Chart(ctx1, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'NDVI',
                        data: data,
                        backgroundColor: 'green',
                        fill: false,
                        borderColor: 'black',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            scaleLabel:{
                                display: Y_AXISndvi !== '',
                            labelString: Y_AXISndvi
                            },
                            ticks: {
                                beginAtZero:false
                            }
                        }],
                        xAxes: [{
                            scaleLabel:{
                                display: X_AXIS !== '',
                            labelString: X_AXIS
                            },
                            ticks: {
                                beginAtZero:false
                            }
                        }]
                    }
                }
            });
    };
////info control for ndvi symbols
var infondvisymbol = L.control();

        infondvisymbol.onAdd = function(map) {
            this._div = L.DomUtil.create('div', 'infondvisymbol');
            this.update();
            return this._div;
        };

        infondvisymbol.update = function(props) {
            if (props) {
                    var labelsndvic = ['NDVI2010', 'NDVI2011','NDVI2012','NDVI2013','NDVI2014','NDVI2015','NDVI2016','NDVI2017','NDVI2018','NDVI2019'];
                    var datandvic = [(props.N_2010).toFixed(2),(props.N_2011).toFixed(2),(props.N_2012).toFixed(2),(props.N_2013).toFixed(2),(props.N_2014).toFixed(2),(props.N_2015).toFixed(2),(props.N_2016).toFixed(2),(props.N_2017).toFixed(2),(props.N_2018).toFixed(2),(props.N_2019).toFixed(2)];
                    console.log('labels', labelsndvic, 'data', datandvic);
                    var dems2 = '<h4>NDVI Symbol</h4>' +  '<br />' + (props ? props.Districts + ' District' + '<br />' + '<br />'  :'hover over a country');
                    dems2 += '<canvas id="myChartndvisymbol" width="200" height="200"></canvas>';
                    this._div.innerHTML = dems2;
                    newChartndvisymbol(labelsndvic, datandvic);
            }

                console.log('props:', props);
        };
//chart for symbols of ndvi
var newChartndvisymbol = function(labelsndvic, datandvic) {
        var dataLengthndvic = labelsndvic ? labelsndvic.length : 0;
        console.log
        console.log('NDVI symbol', labelsndvic, datandvic);
        var ctx2 = document.getElementById("myChartndvisymbol");
        var myChartndvisymbol = new Chart(ctx2, {
                type: 'line',
                data: {
                    labels: labelsndvic,
                    datasets: [{
                        label: 'NDVI',
                        data: datandvic,
                        backgroundColor: 'green',
                        fill: false,
                        borderColor: 'black',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            scaleLabel:{
                                display: Y_AXISndvi !== '',
                            labelString: Y_AXISndvi
                            },
                            ticks: {
                                beginAtZero:false
                            }
                        }],
                        xAxes: [{
                            scaleLabel:{
                                display: X_AXIS !== '',
                            labelString: X_AXIS
                            },
                            ticks: {
                                beginAtZero:false
                            }
                        }]
                    }
                }
            });
    };
//population density Chart graph info
var infopopdensity = L.control();

        infopopdensity.onAdd = function(map) {
            this._div = L.DomUtil.create('div', 'infopopdensity');
            this.update();
            return this._div;
        };

        infopopdensity.update = function(props) {
            if (props) {
                    var labelspopdensity = ['2010', '2015','2019'];
                    var datapopdensity = [props.Pop_2010,props.Pop_2015,props.Pop_2020];
                    console.log('labels', labelspopdensity, 'data', datapopdensity);
                    var dems2 = '<h4>Population Density in people/km^2</h4>' +  '<br />' + (props ? props.Districts + ' District' + '<br />' + '<br />'  :'hover over a country');
                    dems2 += '<canvas id="myChartpopdensity" width="200" height="200"></canvas>';
                    this._div.innerHTML = dems2;
                    newChartpopdensity(labelspopdensity, datapopdensity);
            }

                console.log('props:', props);
        };
//chart for choropleth of popdensity
var newChartpopdensity = function(labelspopdensity, datapopdensity) {
        var dataLengthpopdensity = labelspopdensity ? labelspopdensity.length : 0;
        console.log
        console.log('Population density', labelspopdensity, datapopdensity);
        var ctx3 = document.getElementById("myChartpopdensity");
        var myChartpopdensity = new Chart(ctx3, {
                type: 'line',
                data: {
                    labels: labelspopdensity,
                    datasets: [{
                        label: 'Population Density',
                        data: datapopdensity,
                        backgroundColor: 'red',
                        fill: false,
                        borderColor: 'black',
                        borderWidth: 1
                    }],
                },
                
                    
                
                options: {
                    scales: {
                        yAxes: [{
                            scaleLabel:{
                                display: Y_AXISpopdensity !== '',
                            labelString: Y_AXISpopdensity
                            },
                            ticks: {
                                beginAtZero:false
                            }
                        }],
                        xAxes: [{
                            scaleLabel:{
                                display: X_AXIS !== '',
                            labelString: X_AXIS
                            },
                            ticks: {
                                beginAtZero:false
                            }
                        }]
                    }
                }
            });
    };
//Info control for graph of lst
var infolst = L.control();

        infolst.onAdd = function(map) {
            this._div = L.DomUtil.create('div', 'infolst');
            this.update();
            return this._div;
        };

        infolst.update = function(props) {
            if (props) {
                    var labelslst1 = ['SD2010','SD2011','SD2012','SD2013','SD2014','SD2015','SD2016','SD2017','SD2018','SD2019'];
                    var datalst1 = [props.S_D_2010,props.S_D_2011,props.S_D_2012,props.S_D_2013,props.S_D_2014,props.S_D_2015,props.S_D_2016,props.S_D_2017,props.S_D_2018,props.S_D_2019];
                    var labelslst2 = ['WN2010','WN2011','WN2012','WN2013','WN2014','WN2015','WN2016','WN2017','WN2018','WN2019'];
                    var datalst2 = [props.W_N_2010,props.W_N_2011,props.W_N_2012,props.W_N_2013,props.W_N_2014,props.W_N_2015,props.W_N_2016,props.W_N_2017,props.W_N_2018,props.W_N_2019];
                    var labelslst3 = ['WD2010','WD2011','WD2012','WD2013','WD2014','WD2015','WD2016','WD2017','WD2018','WD2019'];
                    var datalst3 = [props.W_D_2010,props.W_D_2011,props.W_D_2012,props.W_D_2013,props.W_D_2014,props.W_D_2015,props.W_D_2016,props.W_D_2017,props.W_D_2018,props.W_D_2019];
                    var labelslst4 = ['SN2010','SN2011','SN2012','SN2013','SN2014','SN2015','SN2016','SN2017','SN2018','SN2019'];
                    var datalst4 = [props.S_N_2010,props.S_N_2011,props.S_N_2012,props.S_N_2013,props.S_N_2014,props.S_N_2015,props.S_N_2016,props.S_N_2017,props.S_N_2018,props.S_N_2019];
                    console.log('labels', labelslst1, 'data', datalst1);
                    console.log('labels', labelslst2, 'data', datalst2);
                    console.log('labels', labelslst3, 'data', datalst3);
                    console.log('labels', labelslst4, 'data', datalst4);
                    var dems3 = '<h4>LST in Celcius</h4>' +  '<br />' + (props ? props.Districts + ' District' + '<br />' + '<br />'  :'hover over a country');
                    dems3 += '<canvas id="myChartlst" width="250" height="250"></canvas>';
                    this._div.innerHTML = dems3;
                    newChartlst(labelslst1, datalst1,labelslst2,datalst2,labelslst3,datalst3,labelslst4,datalst4);
            }

                console.log('props:', props);
        };
//chart for lst
var newChartlst = function(labelslst1, datalst1,labelslst2,datalst2,labelslst3,datalst3,labelslst4,datalst4) {
        var dataLengthlst = labelslst1 ? labelslst1.length : 0;
        var dataLengthlst2 = labelslst2 ? labelslst2.length : 0;
        var dataLengthlst3 = labelslst3 ? labelslst3.length : 0;
        var dataLengthlst4 = labelslst4 ? labelslst4.length : 0;

        console.log
        console.log('Land Surface Temperature', labelslst1, datalst1,labelslst2,datalst2,labelslst3,datalst3,labelslst4,datalst4);
        var ctx4 = document.getElementById("myChartlst");
                var lineChartData = {
            labels: ['2010','2011','2012','2013','2014','2015','2016','2017','2018','2019'],
            datasets: [{
                label: 'Summer-Day',
                backgroundColor: '#ffff00',
                fill: false,
                fillColor: "#ffff00",
                strokeColor: "#ffff00",
                pointColor: "#ffff00",
                data:datalst1,
            }, {
                label: 'Winter-Night',
                backgroundColor:'#FCAE91',
                fill: false,
                data:datalst2
            },{
                label: 'Winter-Day',
                backgroundColor:'#00ffff',
                fill: false,
                data:datalst3

            },{
                label: 'Summer-Night',
                backgroundColor:'#808080',
                fill: false,
                data:datalst4

            }]
        };

        var myChartlst = new Chart(ctx4, {
                type: 'line',
                data:lineChartData,
                options: {
                    scales: {
                        yAxes: [{
                            scaleLabel:{
                                display: Y_AXISlst !== '',
                            labelString: Y_AXISlst
                            },
                            
                            ticks: {
                                beginAtZero:false
                            }
                        }],
                        xAxes: [{
                            scaleLabel:{
                                display: X_AXIS !== '',
                            labelString: X_AXIS
                            },
                            ticks: {
                                beginAtZero:false
                            }
                        }]
                    }
                }
            });
    };
//Precipitation info
var infoprecipitation = L.control();

        infoprecipitation.onAdd = function(map) {
            this._div = L.DomUtil.create('div', 'infoprecipitation');
            this.update();
            return this._div;
        };

        infoprecipitation.update = function(props) {
            if (props) {
                    var labelsprecipitation = ['P2010', 'P2011','P2012','P2013','P2014','P2015','P2016','P2017','P2018','P2019'];
                    var dataprecipitation = [props.P_2011,props.P_2011,props.P_2012,props.P_2013,props.P_2014,props.P_2015,props.P_2016,props.P_2017,props.P_2018,props.P_2019];
                    console.log('labels', labelsprecipitation, 'data', dataprecipitation);
                    var dems5 = '<h4>Precipitation Choropleth</h4>' +  '<br />' + (props ? props.Districts + ' District' + '<br />' + '<br />'  :'hover over a country');
                    dems5 += '<canvas id="myChartprecipitation" width="220" height="220"></canvas>';
                    this._div.innerHTML = dems5;
                    newChartprecipitation(labelsprecipitation, dataprecipitation);
            }

                console.log('props:', props);
        };
//chart for choropleth of ndvi
var newChartprecipitation = function(labelsprecipitation, dataprecipitation) {
        var dataLengthinfoprecipitation = labelsprecipitation ? labelsprecipitation.length : 0;
        console.log
        console.log('Precipitation Choropleth', labelsprecipitation, dataprecipitation);
        var ctx1 = document.getElementById("myChartprecipitation");
        var myChart = new Chart(ctx1, {
                type: 'line',
                data: {
                    labels: labelsprecipitation,
                    datasets: [{
                        label: 'Precipitation mm/year',
                        data: dataprecipitation,
                        backgroundColor: 'blue',
                        borderColor: 'black',
                        fill: false,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            scaleLabel:{
                                display: Y_AXISprecipitation !== '',
                            labelString: Y_AXISprecipitation
                            },
                            ticks: {
                                beginAtZero:false
                            }
                        }],
                        xAxes: [{
                            scaleLabel:{
                                display: X_AXIS !== '',
                            labelString: X_AXIS
                            },
                            ticks: {
                                beginAtZero:false
                            }
                        }]
                    }
                }
            });
    };
////info control for ndvi symbols
var infoinfoprecipitation = L.control();
//legend for all variables
var legend = L.control({position : 'bottomright'});
            legend.onAdd = function(map){
                var div = L.DomUtil.create('div', 'legend'); // create a div with a class legend
                classes = [1250258, 2924763, 8663096]
                var labels = [
                    myIconUrl, myIconUrl,myIconUrl
                ];
                size = [10, 20, 30]
                // these are the div elements

                div.innerHTML = '<div>Precipitaion mm/year</div>'; // name or heading of legend
                //These are the legend entries
                    div.innerHTML += '<i style="background: #0099FF"></i><span>60-100</span><br>';
                    div.innerHTML += '<i style="background: #6666ff"></i><span>100-300</span><br>';
                    div.innerHTML += '<i style="background: #4d4dff"></i><span>300-500</span><br>';
                    div.innerHTML += '<i style="background: #3333ff"></i><span>500-700</span><br>';
                    div.innerHTML += '<i style="background: #1a1aff"></i><span>700-900</span><br>';
                    div.innerHTML += '<i style="background: #0000e6"></i><span>900-1100</span><br>';
                    div.innerHTML += '<i style="background: #000066"></i><span>1100+</span><br>';
                    div.innerHTML +='<hr>';
                    div.innerHTML += 'Land Surface Temperature';
                    div.innerHTML +='<br>';
                    div.innerHTML += '<i style="background: #ffff00"></i><span>Summer-Day</span><br>';
                    div.innerHTML += '<i style="background: #FCAE91"></i><span>Winter-Night</span><br>';
                    div.innerHTML += '<i style="background: #00ffff"></i><span>Winter-Day</span><br>';
                    div.innerHTML += '<i style="background: #808080"></i><span>Summer-Night</span><br>';
                    div.innerHTML +='<hr>';
                    div.innerHTML += 'Normalized Differential Vegetation Index';
                    div.innerHTML +='<br>';
                    div.innerHTML += '<i style="background: #9ACD32"></i><span>0.18-0.23</span><br>';
                    div.innerHTML += '<i style="background: #ADFF2F"></i><span>0.23-0.29</span><br>';
                    div.innerHTML += '<i style="background: #7CFC00"></i><span>0.29-0.36</span><br>';
                    div.innerHTML += '<i style="background: #32CD32"></i><span>0.36-0.44</span><br>';
                    div.innerHTML += '<i style="background: #228B22"></i><span>0.44-0.48</span><br>';
                    div.innerHTML += '<i style="background: #006400"></i><span>0.48+</span><br>'; 
                    div.innerHTML +='<hr>';
                    div.innerHTML += 'Absolut Population';
                    div.innerHTML +='<br>';
                    for (var i = 0; i < classes.length; i++) {
        div.innerHTML +=
            classes[i] + (" <img src="+ labels[i] +" height="+size[i]+ "width="+size[i]+">") +'<br>';
    }       
                return div;
            }
legend.addTo(map)
//2nd legend
//legend for Land Surface Temperature
var legend_2 = L.control({position : 'bottomright'});
            legend_2.onAdd = function(map){
                var div = L.DomUtil.create('div', 'legend_2'); // create a div with a class legend
                var label = [
                    "kept empty"
                ];
                // these are the div elements

                div.innerHTML = '<div>Land Surface Temperature Celcius</div>'; // name or heading of legend
                    div.innerHTML +='<br>';
                    div.innerHTML += '<i style="background: #ffff00"></i><span>Summer-Day</span><br>';
                    div.innerHTML += '<i style="background: #FCAE91"></i><span>Winter-Night</span><br>';
                    div.innerHTML += '<i style="background: #00ffff"></i><span>Winter-Day</span><br>';
                    div.innerHTML += '<i style="background: #808080"></i><span>Summer-Night</span><br>';       
                return div;
            }
//3rd legend
// legend NDVI
var legend_3 = L.control({position : 'bottomright'});
            legend_3.onAdd = function(map){
                var div = L.DomUtil.create('div', 'legend_3'); // create a div with a class legend
                var label = [
                    "kept empty"
                ];
                // these are the div elements

                div.innerHTML = '<div>Normalized Differential Vegetation Index</div>'; // name or heading of legend
                //These are the legend entries
                    div.innerHTML += '<i style="background: #9ACD32"></i><span>0.18-0.23</span><br>';
                    div.innerHTML += '<i style="background: #ADFF2F"></i><span>0.23-0.29</span><br>';
                    div.innerHTML += '<i style="background: #7CFC00"></i><span>0.29-0.36</span><br>';
                    div.innerHTML += '<i style="background: #32CD32"></i><span>0.36-0.44</span><br>';
                    div.innerHTML += '<i style="background: #228B22"></i><span>0.44-0.48</span><br>';
                    div.innerHTML += '<i style="background: #006400"></i><span>0.48+</span><br>';        
                return div;
            }
//4th legend for precipitation
var legend_4 = L.control({position : 'bottomright'});
            legend_4.onAdd = function(map){
                var div = L.DomUtil.create('div', 'legend_4'); // create a div with a class legend
                var label = [
                    "kept empty"
                ];
                // these are the div elements

               div.innerHTML = '<div>Precipitaion mm/year</div>'; // name or heading of legend
                //These are the legend entries
                    div.innerHTML += '<i style="background: #0099FF"></i><span>60-100</span><br>';
                    div.innerHTML += '<i style="background: #6666ff"></i><span>100-300</span><br>';
                    div.innerHTML += '<i style="background: #4d4dff"></i><span>300-500</span><br>';
                    div.innerHTML += '<i style="background: #3333ff"></i><span>500-700</span><br>';
                    div.innerHTML += '<i style="background: #1a1aff"></i><span>700-900</span><br>';
                    div.innerHTML += '<i style="background: #0000e6"></i><span>900-1100</span><br>';
                    div.innerHTML += '<i style="background: #000066"></i><span>1100+</span><br>';
                return div;
            }
//Map options
//Legend 5 for population density
var legend_5 = L.control({position : 'bottomright'});
            legend_5.onAdd = function(map){
                var div = L.DomUtil.create('div', 'legend_5'); // create a div with a class legend
                var label = [
                    "kept empty"
                ];
                // these are the div elements

               div.innerHTML = '<div>Population density people/km^2</div>'; // name or heading of legend
                //These are the legend entries
                    div.innerHTML += '<i style="background: #FED976"></i><span>400-500</span><br>';
                    div.innerHTML += '<i style="background: #FEB24C"></i><span>500-700</span><br>';
                    div.innerHTML += '<i style="background: #FD8D3C"></i><span>700-800</span><br>';
                    div.innerHTML += '<i style="background: #FC4E2A"></i><span>800-900</span><br>';
                    div.innerHTML += '<i style="background: #E31A1C"></i><span>900-1000</span><br>';
                    div.innerHTML += '<i style="background: #BD0026"></i><span>1000-1500</span><br>';
                    div.innerHTML += '<i style="background: #800026"></i><span>1500+</span><br>';
                return div;
            }
//6th legend for abs population
var legend_6 = L.control({position : 'bottomright'});
            legend_6.onAdd = function(map){
                var div = L.DomUtil.create('div', 'legend_6'); // create a div with a class legend
                classes = [1250258, 2924763, 8663096]
                var labels = [
                    myIconUrl, myIconUrl,myIconUrl
                ];
                size = [10, 20, 30]
                // these are the div elements

                div.innerHTML = '<div>Absolut Population</div>'; // name or heading of legend
                //These are the legend entries
                    div.innerHTML +='<br>';
                    for (var i = 0; i < classes.length; i++) {
        div.innerHTML +=
            classes[i] + (" <img src="+ labels[i] +" height="+size[i]+ "width="+size[i]+">") +'<br>';
    }       
                return div;
            }

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
    if(map.hasLayer(final_from_2010_till_2019)==false) {
    	map.addLayer(final_from_2010_till_2019)
        map.addControl(legend)
        map.removeControl(infoprecipitation)
        map.addControl(sliderControl)
        sliderControl.startSlider();
    } else if (map.hasLayer(final_from_2010_till_2019)==true) {
    	map.removeLayer(final_from_2010_till_2019);
        map.removeControl(legend)
        map.removeControl(sliderControl)
    }
});             
// code for making an outside Checkbox2 interact with the map

$("#checkbox2").click(function(event) {
    if(map.hasLayer(LST_final)==false) {
        map.addLayer(LST_final)
        map.addControl(legend_2)
        map.addControl(infolst)
        map.addControl(sliderControl2)
        sliderControl2.startSlider();
    } else if (map.hasLayer(LST_final)==true) {
        map.removeLayer(LST_final);
        map.removeControl(legend_2)
        map.removeControl(infolst)
        map.removeControl(sliderControl2)
    }
});
// code for making an outside Checkbox3 interact with the map

$("#checkbox3").click(function(event) {
    if(map.hasLayer(popdensfinalfullmap)==false) {
        map.addLayer(popdensfinalfullmap)
        map.addControl(legend_5)
        map.addControl(infopopdensity)
        map.addControl(sliderControl6)
        sliderControl6.startSlider();
    } else if (map.hasLayer(popdensfinalfullmap)==true) {
        map.removeLayer(popdensfinalfullmap);
        map.removeControl(legend_5)
        map.removeControl(infopopdensity)
        map.removeControl(sliderControl6)
    }
});
// code for making an outside Checkbox4 interact with the map
$("#checkbox4").click(function(event) {
    if(map.hasLayer(Absolutepopulation_final)==false) {
        map.addLayer(Absolutepopulation_final)
        map.addControl(legend_6)
        map.addControl(sliderControl4)
        sliderControl4.startSlider();
    } else if (map.hasLayer(Absolutepopulation_final)==true) {
        map.removeLayer(Absolutepopulation_final);
        map.removeControl(legend_6)
        map.removeControl(sliderControl4)
    }
});             
// code for making an outside Checkbox5 interact with the map
$("#checkbox5").click(function(event) {
    if(map.hasLayer(precipchoropleth_full)==false) {
        map.addLayer(precipchoropleth_full)
        map.addControl(legend_4)
        map.addControl(infoprecipitation)
        map.addControl(sliderControl5)
        sliderControl5.startSlider();
    } else if (map.hasLayer(precipchoropleth_full)==true) {
        map.removeLayer(precipchoropleth_full);
        map.removeControl(legend_4)
        map.removeControl(infoprecipitation)
        map.removeControl(sliderControl5)
    }
});         
// code for making an outside Checkbox6 interact with the map
$("#checkbox6").click(function(event) {
    if(map.hasLayer(ndvichoropleth_full)==false) {
        map.addLayer(ndvichoropleth_full)
        map.addControl(legend_3)
        map.addControl(infondvichoro)
        map.addControl(sliderControl7)
        sliderControl7.startSlider();
    } else if (map.hasLayer(ndvichoropleth_full)==true) {
        map.removeLayer(ndvichoropleth_full);
        map.removeControl(legend_3)
        map.removeControl(infondvichoro)
        map.removeControl(sliderControl7)
    }
});
// code for making an outside Checkbox7 interact with the map
$("#checkbox7").click(function(event) {
    if(map.hasLayer(NDVI_final)==false) {
        map.addLayer(NDVI_final)
        map.addControl(legend_3)
        map.addControl(infondvisymbol)
        map.addControl(sliderControl3)
        sliderControl3.startSlider();
    } else if (map.hasLayer(NDVI_final)==true) {
        map.removeLayer(NDVI_final);
        map.removeControl(legend_3)
        map.removeControl(infondvisymbol)
        map.removeControl(sliderControl3)
    }
});
// The code below will change the font of the label as we zoom in and out. I used 20 and 5 font sizes for testing purposes.
// Please use reasonable size (visible to the eye since 5 is too small). Also, advisable to add more else if statements than shown below.

map.on('zoomend', function () {
    var zoomLevel = map.getZoom();
    var tooltip = $('.leaflet-tooltip.districtLabel');
    console.log(zoomLevel)
    if (zoomLevel === 6){
        tooltip.css('font-size',7 );
    }
    else if(zoomLevel === 5){
        tooltip.css('font-size', 5);
    }
    else if(zoomLevel === 7){
        tooltip.css('font-size', 10);
    }
    else if(zoomLevel === 8){
        tooltip.css('font-size', 12);
    }
    else if (zoomLevel < 5){
        tooltip.css('font-size', 4);
    }
    else if(zoomLevel > 8){
        tooltip.css('font-size', 14);
    }
    
})
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
//legend_6
//Map overlay add and overlay remove for layer control
/*
 map.on('overlayadd', function (eventLayer) {
    //Show legend...
    if (eventLayer.name === 'Punjab with all variables') {
        // to add the information control on to the map
        //Adding and initializing Slider control
        this.addControl(legend)
        this.addControl(sliderControl)
        this.addControl(searchControl)
        sliderControl.startSlider();

    }else if (eventLayer.name==='Punjab with Land Surface Temperature') {
        this.addControl(sliderControl2)
        this.addControl(legend_2)
        this.addControl(searchControl)
        sliderControl2.startSlider();
        
    }else if (eventLayer.name==='Punjab with Normalized Differential Vegetation Index') {
        this.addControl(legend_3)
        this.addControl(sliderControl3)
        this.addControl(searchControl)
        sliderControl3.startSlider();
    }else if (eventLayer.name==='Punjab with Population') {
        this.addControl(sliderControl4)
        this.addControl(searchControl)
        sliderControl4.startSlider();
        
    }else if (eventLayer.name==='Punjab with Precipitation Choropleth') {
        this.addControl(legend_4)
        this.addControl(sliderControl5)
        this.addControl(searchControl)
        sliderControl5.startSlider();
        
    }else if (eventLayer.name==='Punjab with Population Density Choropleth') {
        this.addControl(legend_5)
        this.addControl(sliderControl6)
        this.addControl(searchControl)
        sliderControl6.startSlider();
        
    }else if (eventLayer.name==='Punjab with NDVI Choropleth') {
        this.addControl(legend_3)
        this.addControl(sliderControl7)
        this.addControl(searchControl)
        sliderControl7.startSlider();
        
    }

});

//overlayremove is a LayersControlEvent which is fired when an overlay is deselected through the layer control.
map.on('overlayremove', function (eventLayer) {
    // hide legend
    if (eventLayer.name === 'Punjab with all variables') {
        this.removeControl(legend)
        this.removeControl(searchControl)
        this.removeControl(sliderControl);// removes the legend when you uncheck the option in layer control 
    }else if (eventLayer.name === 'Punjab with Land Surface Temperature') {
        this.removeControl(searchControl)
        this.removeControl(legend_2)
        this.removeControl(sliderControl2)
    }else if (eventLayer.name === 'Punjab with Normalized Differential Vegetation Index') {
        this.removeControl(legend_3)
        this.removeControl(searchControl)
        this.removeControl(sliderControl3)
    }else if (eventLayer.name === 'Punjab with Population') {
        this.removeControl(searchControl)
        this.removeControl(sliderControl4)
    }else if (eventLayer.name === 'Punjab with Precipitation Choropleth') {
        this.removeControl(legend_4)
        this.removeControl(searchControl)
        this.removeControl(sliderControl5)
    }else if (eventLayer.name === 'Punjab with Population Density Choropleth') {
        this.removeControl(legend_5)
        this.removeControl(searchControl)
        this.removeControl(sliderControl6)
    }else if (eventLayer.name === 'Punjab with NDVI Choropleth') {
        this.removeControl(legend_3)
        this.removeControl(searchControl)
        this.removeControl(sliderControl7)
    }
});
*/