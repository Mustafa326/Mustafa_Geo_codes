//Declaration of variables containing latitude and longitude and zoom
var myLat=31.1704;
var myLong=72.7097;
var zoom=5;
//Map through mapbox
//creation of a map variable
  // Leaflet uses div .offsetWidth and .offsetHeight to size the map.
// map variable can be declared through L.mapbox.map or L.map in mapbox
/*
L.mapbox.accessToken = 'pk.eyJ1IjoibXVzdGFmYTA1IiwiYSI6ImNrNm1ocHBzNTBldDIzanJ1ODJqc2dzYjMifQ.ppQmulUBSdoPSzVXjT23Dw';
var map = L.map('Map',{zoomControl: false,fullscreenControl:true,fullscreenControlOptions: {position:'topleft'}}).setView([myLat, myLong], zoom).addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));
*/
//Esri map
var map = L.map('Map',{zoomControl: false,fullscreenControl:true,fullscreenControlOptions: {position:'topleft'}}).setView([myLat, myLong], zoom)
//map tile layer
var Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
    maxZoom: 16,
    minZoom:2
}).addTo(map);
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
var zoomHome = L.Control.zoomHome({homeZoom:6.5}).addTo(map);
// creating the markercluster group
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
//Function that assigns a color to the cirlce depending upon the NDVI value
function getColor(d) {
    return d > 0.4878 ? '#006400' :
           d > 0.4428  ? '#228B22' :
           d > 0.3685  ? '#32CD32' :
           d > 0.2955  ? '#7CFC00' :
           d > 0.2314  ? '#ADFF2F' :
           d > 0.1950   ? '#9ACD32' :
                      '#FFEDA0';
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
                    'dataPoint1':feature.properties.S_D_2010,
                    'dataPoint2':feature.properties.W_N_2010,
                    'dataPoint3':feature.properties.W_D_2010,
                    'dataPoint4':feature.properties.S_N_2010,

                },
                //coloring options
                chartOptions:{
                    'dataPoint1':{
                        fillColor: '#ffff00',
                        minValue: feature.properties.S_D_2010,
                        maxValue: feature.properties.S_D_2010,
                        maxHeight: feature.properties.S_D_2010,
                        //displaying text when you hover over the bar which does not work
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint2':{
                        fillColor: '#FCAE91',
                        minValue: feature.properties.W_N_2010,
                        maxValue: feature.properties.W_N_2010,
                        maxHeight: feature.properties.W_N_2010,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint3':{
                        fillColor: '#00ffff',
                        minValue: feature.properties.W_D_2010,
                        maxValue: feature.properties.W_D_2010,
                        maxHeight: feature.properties.W_D_2010,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint4':{
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
            lstmarker2010.bindPopup("This is the District:"+ feature.properties.Districts+'<hr>'+"From left to right"+'<hr>'+"The First Bar Shows The Summer Day Temperature, which is:"+feature.properties.S_D_2010+"Celcius"+'<hr>'+"The Second bar shows the Winter Night Temperature, which is:"+feature.properties.W_N_2010+"Celcius"+'<hr>'+"The Third Bar shows the Winter Day Temperature, which is:"+feature.properties.W_D_2010+"Celcius"+'<hr>'+"The Frourth bar shows the SummerNight temperature,which is:"+feature.properties.S_N_2010+"Celcius")
        //adding the layer stack element with icons on to the map
        
        lst_2010.addLayer(lstmarker2010);
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
             // To close the popup
      }
})//.addTo(map)
// Layer group that contains the markers,charts and the choropleth for 2010
var fullmap_2010 = L.layerGroup([lst_2010,stack_2010,finalmap2010,circlemarker_2010],{time:"2010"});
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
                    'dataPoint1':feature.properties.S_D_2011,
                    'dataPoint2':feature.properties.W_N_2011,
                    'dataPoint3':feature.properties.W_D_2011,
                    'dataPoint4':feature.properties.S_N_2011,

                },
                //coloring options
                chartOptions:{
                    'dataPoint1':{
                        fillColor: '#ffff00',
                        minValue: feature.properties.S_D_2011,
                        maxValue: feature.properties.S_D_2011,
                        maxHeight: feature.properties.S_D_2011,
                        //displaying text when you hover over the bar which does not work
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint2':{
                        fillColor: '#FCAE91',
                        minValue: feature.properties.W_N_2011,
                        maxValue: feature.properties.W_N_2011,
                        maxHeight: feature.properties.W_N_2011,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint3':{
                        fillColor: '#00ffff',
                        minValue: feature.properties.W_D_2011,
                        maxValue: feature.properties.W_D_2011,
                        maxHeight: feature.properties.W_D_2011,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint4':{
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
            lstmarker2011.bindPopup("This is the District:"+ feature.properties.Districts+'<hr>'+"From left to right"+'<hr>'+"The First Bar Shows The Summer Day Temperature, which is:"+feature.properties.S_D_2011+"Celcius"+'<hr>'+"The Second bar shows the Winter Night Temperature, which is:"+feature.properties.W_N_2011+"Celcius"+'<hr>'+"The Third Bar shows the Winter Day Temperature, which is:"+feature.properties.W_D_2011+"Celcius"+'<hr>'+"The Frourth bar shows the SummerNight temperature,which is:"+feature.properties.S_N_2011+"Celcius")
        //adding the layer stack element with icons on to the map
        lst_2011.addLayer(lstmarker2011);
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
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitaion for the year 2011:'+feature.properties.P_2011+'mm per year'+'<hr>'+'The NDVI Value for the year 2011 is:'+feature.properties.N_2011);
                }
            )
      }
})//.addTo(map)
// Creating a layer group that contains the markers and the choropleth along with the bar chart for 2011
var fullmap_2011 = L.layerGroup([lst_2011,finalmap2011,circlemarker_2011],{time:"2011"});
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
                    'dataPoint1':feature.properties.S_D_2012,
                    'dataPoint2':feature.properties.W_N_2012,
                    'dataPoint3':feature.properties.W_D_2012,
                    'dataPoint4':feature.properties.S_N_2012,

                },
                //coloring options
                chartOptions:{
                    'dataPoint1':{
                        fillColor: '#ffff00',
                        minValue: feature.properties.S_D_2012,
                        maxValue: feature.properties.S_D_2012,
                        maxHeight: feature.properties.S_D_2012,
                        //displaying text when you hover over the bar which does not work
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint2':{
                        fillColor: '#FCAE91',
                        minValue: feature.properties.W_N_2012,
                        maxValue: feature.properties.W_N_2012,
                        maxHeight: feature.properties.W_N_2012,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint3':{
                        fillColor: '#00ffff',
                        minValue: feature.properties.W_D_2012,
                        maxValue: feature.properties.W_D_2012,
                        maxHeight: feature.properties.W_D_2012,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint4':{
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
            lstmarker2012.bindPopup("This is the District:"+ feature.properties.Districts+'<hr>'+"From left to right"+'<hr>'+"The First Bar Shows The Summer Day Temperature, which is:"+feature.properties.S_D_2012+"Celcius"+'<hr>'+"The Second bar shows the Winter Night Temperature, which is:"+feature.properties.W_N_2012+"Celcius"+'<hr>'+"The Third Bar shows the Winter Day Temperature, which is:"+feature.properties.W_D_2012+"Celcius"+'<hr>'+"The Frourth bar shows the SummerNight temperature,which is:"+feature.properties.S_N_2012+"Celcius")
        //adding the layer stack element with icons on to the map
        lst_2012.addLayer(lstmarker2012);
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
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitaion for the year 2012:'+feature.properties.P_2012+'mm per year'+'<hr>'+'The NDVI Value for the year 2011 is:'+feature.properties.N_2011);
                }
            )
      }
})//.addTo(map)
// Creating a layer group that contains the markers and the choropleth along with the bar chart for year 2012
var fullmap_2012 = L.layerGroup([lst_2012,finalmap2012,circlemarker_2012],{time:"2012"});
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
                    'dataPoint1':feature.properties.S_D_2013,
                    'dataPoint2':feature.properties.W_N_2013,
                    'dataPoint3':feature.properties.W_D_2013,
                    'dataPoint4':feature.properties.S_N_2013,

                },
                //coloring options
                chartOptions:{
                    'dataPoint1':{
                        fillColor: '#ffff00',
                        minValue: feature.properties.S_D_2013,
                        maxValue: feature.properties.S_D_2013,
                        maxHeight: feature.properties.S_D_2013,
                        //displaying text when you hover over the bar which does not work
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint2':{
                        fillColor: '#FCAE91',
                        minValue: feature.properties.W_N_2013,
                        maxValue: feature.properties.W_N_2013,
                        maxHeight: feature.properties.W_N_2013,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint3':{
                        fillColor: '#00ffff',
                        minValue: feature.properties.W_D_2013,
                        maxValue: feature.properties.W_D_2013,
                        maxHeight: feature.properties.W_D_2013,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint4':{
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
            lstmarker2013.bindPopup("This is the District:"+ feature.properties.Districts+'<hr>'+"From left to right"+'<hr>'+"The First Bar Shows The Summer Day Temperature, which is:"+feature.properties.S_D_2013+"Celcius"+'<hr>'+"The Second bar shows the Winter Night Temperature, which is:"+feature.properties.W_N_2013+"Celcius"+'<hr>'+"The Third Bar shows the Winter Day Temperature, which is:"+feature.properties.W_D_2013+"Celcius"+'<hr>'+"The Frourth bar shows the SummerNight temperature,which is:"+feature.properties.S_N_2013+"Celcius")
        //adding the layer stack element with icons on to the map
        lst_2013.addLayer(lstmarker2013);
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
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitaion for the year 2013:'+feature.properties.P_2013+'mm per year'+'<hr>'+'The NDVI Value for the year 2013 is:'+feature.properties.N_2013);
                }
            )
      }
})//.addTo(map)
// Creating a layer group that contains the markers and the choropleth along with the bar chart for year 2012
var fullmap_2013 = L.layerGroup([lst_2013,finalmap2013,circlemarker_2013],{time:"2013"});
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
                    'dataPoint1':feature.properties.S_D_2014,
                    'dataPoint2':feature.properties.W_N_2014,
                    'dataPoint3':feature.properties.W_D_2014,
                    'dataPoint4':feature.properties.S_N_2014,

                },
                //coloring options
                chartOptions:{
                    'dataPoint1':{
                        fillColor: '#ffff00',
                        minValue: feature.properties.S_D_2014,
                        maxValue: feature.properties.S_D_2014,
                        maxHeight: feature.properties.S_D_2014,
                        //displaying text when you hover over the bar which does not work
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint2':{
                        fillColor: '#FCAE91',
                        minValue: feature.properties.W_N_2014,
                        maxValue: feature.properties.W_N_2014,
                        maxHeight: feature.properties.W_N_2014,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint3':{
                        fillColor: '#00ffff',
                        minValue: feature.properties.W_D_2014,
                        maxValue: feature.properties.W_D_2014,
                        maxHeight: feature.properties.W_D_2014,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint4':{
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
            lstmarker2014.bindPopup("This is the District:"+ feature.properties.Districts+'<hr>'+"From left to right"+'<hr>'+"The First Bar Shows The Summer Day Temperature, which is:"+feature.properties.S_D_2014+"Celcius"+'<hr>'+"The Second bar shows the Winter Night Temperature, which is:"+feature.properties.W_N_2014+"Celcius"+'<hr>'+"The Third Bar shows the Winter Day Temperature, which is:"+feature.properties.W_D_2014+"Celcius"+'<hr>'+"The Frourth bar shows the SummerNight temperature,which is:"+feature.properties.S_N_2014+"Celcius")
        //adding the layer stack element with icons on to the map
        lst_2014.addLayer(lstmarker2014);
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
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitaion for the year 2014:'+feature.properties.P_2014+'mm per year'+'<hr>'+'The NDVI Value for the year 2014 is:'+feature.properties.N_2014);
                }
            )
      }
})//.addTo(map)
// Creating a layer group that contains the markers and the choropleth along with the bar chart for year 2012
var fullmap_2014 = L.layerGroup([lst_2014,finalmap2014,circlemarker_2014],{time:"2014"});
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
                    'dataPoint1':feature.properties.S_D_2015,
                    'dataPoint2':feature.properties.W_N_2015,
                    'dataPoint3':feature.properties.W_D_2015,
                    'dataPoint4':feature.properties.S_N_2015,

                },
                //coloring options
                chartOptions:{
                    'dataPoint1':{
                        fillColor: '#ffff00',
                        minValue: feature.properties.S_D_2015,
                        maxValue: feature.properties.S_D_2015,
                        maxHeight: feature.properties.S_D_2015,
                        //displaying text when you hover over the bar which does not work
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint2':{
                        fillColor: '#FCAE91',
                        minValue: feature.properties.W_N_2015,
                        maxValue: feature.properties.W_N_2015,
                        maxHeight: feature.properties.W_N_2015,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint3':{
                        fillColor: '#00ffff',
                        minValue: feature.properties.W_D_2015,
                        maxValue: feature.properties.W_D_2015,
                        maxHeight: feature.properties.W_D_2015,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint4':{
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
            lstmarker2015.bindPopup("This is the District:"+ feature.properties.Districts+'<hr>'+"From left to right"+'<hr>'+"The First Bar Shows The Summer Day Temperature, which is:"+feature.properties.S_D_2015+"Celcius"+'<hr>'+"The Second bar shows the Winter Night Temperature, which is:"+feature.properties.W_N_2015+"Celcius"+'<hr>'+"The Third Bar shows the Winter Day Temperature, which is:"+feature.properties.W_D_2015+"Celcius"+'<hr>'+"The Frourth bar shows the SummerNight temperature,which is:"+feature.properties.S_N_2015+"Celcius")
        //adding the layer stack element with icons on to the map
        lst_2015.addLayer(lstmarker2015);
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
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitaion for the year 2015:'+feature.properties.P_2015+'mm per year'+'<hr>'+'The Absolute population for the year2015:'+feature.properties.AbsPop_15+'<hr>'+'The NDVI Value for the year 2015 is:'+feature.properties.N_2015);
                }
            )
      }
})//.addTo(map)
// Creating a layer group that contains the markers and the choropleth along with the bar chart for year 2012
var fullmap_2015 = L.layerGroup([lst_2015,stack_2015,finalmap2015,circlemarker_2015],{time:"2015"});
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
                    'dataPoint1':feature.properties.S_D_2016,
                    'dataPoint2':feature.properties.W_N_2016,
                    'dataPoint3':feature.properties.W_D_2016,
                    'dataPoint4':feature.properties.S_N_2016,

                },
                //coloring options
                chartOptions:{
                    'dataPoint1':{
                        fillColor: '#ffff00',
                        minValue: feature.properties.S_D_2016,
                        maxValue: feature.properties.S_D_2016,
                        maxHeight: feature.properties.S_D_2016,
                        //displaying text when you hover over the bar which does not work
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint2':{
                        fillColor: '#FCAE91',
                        minValue: feature.properties.W_N_2016,
                        maxValue: feature.properties.W_N_2016,
                        maxHeight: feature.properties.W_N_2016,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint3':{
                        fillColor: '#00ffff',
                        minValue: feature.properties.W_D_2016,
                        maxValue: feature.properties.W_D_2016,
                        maxHeight: feature.properties.W_D_2016,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint4':{
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
            lstmarker2016.bindPopup("This is the District:"+ feature.properties.Districts+'<hr>'+"From left to right"+'<hr>'+"The First Bar Shows The Summer Day Temperature, which is:"+feature.properties.S_D_2016+"Celcius"+'<hr>'+"The Second bar shows the Winter Night Temperature, which is:"+feature.properties.W_N_2016+"Celcius"+'<hr>'+"The Third Bar shows the Winter Day Temperature, which is:"+feature.properties.W_D_2016+"Celcius"+'<hr>'+"The Frourth bar shows the SummerNight temperature,which is:"+feature.properties.S_N_2016+"Celcius")
        //adding the layer stack element with icons on to the map
        lst_2016.addLayer(lstmarker2016);
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
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitaion for the year 2016:'+feature.properties.P_2016+'mm per year'+'<hr>'+'The NDVI Value for the year 2016 is:'+feature.properties.N_2016);
                }
            )
      }
})//.addTo(map)
// Creating a layer group that contains the markers and the choropleth along with the bar chart for year 2012
var fullmap_2016 = L.layerGroup([lst_2016,finalmap2016,circlemarker_2016],{time:"2016"});
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
                    'dataPoint1':feature.properties.S_D_2017,
                    'dataPoint2':feature.properties.W_N_2017,
                    'dataPoint3':feature.properties.W_D_2017,
                    'dataPoint4':feature.properties.S_N_2017,

                },
                //coloring options
                chartOptions:{
                    'dataPoint1':{
                        fillColor: '#ffff00',
                        minValue: feature.properties.S_D_2017,
                        maxValue: feature.properties.S_D_2017,
                        maxHeight: feature.properties.S_D_2017,
                        //displaying text when you hover over the bar which does not work
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint2':{
                        fillColor: '#FCAE91',
                        minValue: feature.properties.W_N_2017,
                        maxValue: feature.properties.W_N_2017,
                        maxHeight: feature.properties.W_N_2017,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint3':{
                        fillColor: '#00ffff',
                        minValue: feature.properties.W_D_2017,
                        maxValue: feature.properties.W_D_2017,
                        maxHeight: feature.properties.W_D_2017,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint4':{
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
            lstmarker2017.bindPopup("This is the District:"+ feature.properties.Districts+'<hr>'+"From left to right"+'<hr>'+"The First Bar Shows The Summer Day Temperature, which is:"+feature.properties.S_D_2017+"Celcius"+'<hr>'+"The Second bar shows the Winter Night Temperature, which is:"+feature.properties.W_N_2017+"Celcius"+'<hr>'+"The Third Bar shows the Winter Day Temperature, which is:"+feature.properties.W_D_2017+"Celcius"+'<hr>'+"The Frourth bar shows the SummerNight temperature,which is:"+feature.properties.S_N_2017+"Celcius")
        //adding the layer stack element with icons on to the map
        lst_2017.addLayer(lstmarker2017);
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
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitaion for the year 2017:'+feature.properties.P_2017+'mm per year'+'<hr>'+'The NDVI Value for the year 2017 is:'+feature.properties.N_2017);
                }
            )
      }
})//.addTo(map)
// Creating a layer group that contains the markers and the choropleth along with the bar chart for year 2012
var fullmap_2017 = L.layerGroup([lst_2017,finalmap2017,circlemarker_2017],{time:"2017"});
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
                    'dataPoint1':feature.properties.S_D_2018,
                    'dataPoint2':feature.properties.W_N_2018,
                    'dataPoint3':feature.properties.W_D_2018,
                    'dataPoint4':feature.properties.S_N_2018,

                },
                //coloring options
                chartOptions:{
                    'dataPoint1':{
                        fillColor: '#ffff00',
                        minValue: feature.properties.S_D_2018,
                        maxValue: feature.properties.S_D_2018,
                        maxHeight: feature.properties.S_D_2018,
                        //displaying text when you hover over the bar which does not work
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint2':{
                        fillColor: '#FCAE91',
                        minValue: feature.properties.W_N_2018,
                        maxValue: feature.properties.W_N_2018,
                        maxHeight: feature.properties.W_N_2018,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint3':{
                        fillColor: '#00ffff',
                        minValue: feature.properties.W_D_2018,
                        maxValue: feature.properties.W_D_2018,
                        maxHeight: feature.properties.W_D_2018,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint4':{
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
            lstmarker2018.bindPopup("This is the District:"+ feature.properties.Districts+'<hr>'+"From left to right"+'<hr>'+"The First Bar Shows The Summer Day Temperature, which is:"+feature.properties.S_D_2018+"Celcius"+'<hr>'+"The Second bar shows the Winter Night Temperature, which is:"+feature.properties.W_N_2018+"Celcius"+'<hr>'+"The Third Bar shows the Winter Day Temperature, which is:"+feature.properties.W_D_2018+"Celcius"+'<hr>'+"The Frourth bar shows the SummerNight temperature,which is:"+feature.properties.S_N_2018+"Celcius")
        //adding the layer stack element with icons on to the map
        lst_2018.addLayer(lstmarker2018);
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
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitaion for the year 2018:'+feature.properties.P_2018+'mm per year'+'<hr>'+'The NDVI Value for the year 2017 is:'+feature.properties.N_2017);
                }
            )
      }
})//.addTo(map)
// Creating a layer group that contains the markers and the choropleth along with the bar chart for year 2012
var fullmap_2018 = L.layerGroup([lst_2018,finalmap2018,circlemarker_2018],{time:"2018"});
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
                    'dataPoint1':feature.properties.S_D_2019,
                    'dataPoint2':feature.properties.W_N_2019,
                    'dataPoint3':feature.properties.W_D_2019,
                    'dataPoint4':feature.properties.S_N_2019,

                },
                //coloring options
                chartOptions:{
                    'dataPoint1':{
                        fillColor: '#ffff00',
                        minValue: feature.properties.S_D_2019,
                        maxValue: feature.properties.S_D_2019,
                        maxHeight: feature.properties.S_D_2019,
                        //displaying text when you hover over the bar which does not work
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint2':{
                        fillColor: '#FCAE91',
                        minValue: feature.properties.W_N_2019,
                        maxValue: feature.properties.W_N_2019,
                        maxHeight: feature.properties.W_N_2019,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint3':{
                        fillColor: '#00ffff',
                        minValue: feature.properties.W_D_2019,
                        maxValue: feature.properties.W_D_2019,
                        maxHeight: feature.properties.W_D_2019,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint4':{
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
            lstmarker2019.bindPopup("This is the District:"+ feature.properties.Districts+'<hr>'+"From left to right"+'<hr>'+"The First Bar Shows The Summer Day Temperature, which is:"+feature.properties.S_D_2019+"Celcius"+'<hr>'+"The Second bar shows the Winter Night Temperature, which is:"+feature.properties.W_N_2019+"Celcius"+'<hr>'+"The Third Bar shows the Winter Day Temperature, which is:"+feature.properties.W_D_2019+"Celcius"+'<hr>'+"The Frourth bar shows the SummerNight temperature,which is:"+feature.properties.S_N_2019+"Celcius")
        //adding the layer stack element with icons on to the map
        lst_2019.addLayer(lstmarker2019);
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
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitaion for the year 2019:'+feature.properties.P_2019+'mm per year'+'<hr>'+'The NDVI Value for the year 2019 is:'+feature.properties.N_2019);
                }
            )
      }
})//.addTo(map)
// Creating a layer group that contains the markers and the choropleth along with the bar chart for year 2012
var fullmap_2019 = L.layerGroup([lst_2019,finalmap2019,circlemarker_2019],{time:"2019"});
// A feature group that contains all the features
var final_from_2010_till_2019=L.featureGroup([fullmap_2010,fullmap_2011,fullmap_2012,fullmap_2013,fullmap_2014,fullmap_2015,fullmap_2016,fullmap_2017,fullmap_2018,fullmap_2019]).addTo(map)
var Absolutepopulation_final=L.featureGroup([stack_2010,stack_2015,stack_2019])
//For Ndvi
var ndvi_2010=L.layerGroup([finalmap2010,circlemarker_2010],{time:"2010"})
var ndvi_2011=L.layerGroup([finalmap2011,circlemarker_2011],{time:"2011"})
var ndvi_2012=L.layerGroup([finalmap2012,circlemarker_2012],{time:"2012"})
var ndvi_2013=L.layerGroup([finalmap2013,circlemarker_2013],{time:"2013"})
var ndvi_2014=L.layerGroup([finalmap2014,circlemarker_2014],{time:"2014"})
var ndvi_2015=L.layerGroup([finalmap2015,circlemarker_2015],{time:"2015"})
var ndvi_2016=L.layerGroup([finalmap2016,circlemarker_2016],{time:"2016"})
var ndvi_2017=L.layerGroup([finalmap2017,circlemarker_2017],{time:"2017"})
var ndvi_2018=L.layerGroup([finalmap2018,circlemarker_2018],{time:"2018"})
var ndvi_2019=L.layerGroup([finalmap2019,circlemarker_2019],{time:"2019"})
var NDVI_final=L.featureGroup([ndvi_2010,ndvi_2011,ndvi_2012,ndvi_2013,ndvi_2014,ndvi_2015,ndvi_2016,ndvi_2017,ndvi_2018,ndvi_2019])
//For Absolute Population
var pop_2010=L.layerGroup([finalmap2010,stack_2010],{time:"2010"})
var pop_2015=L.layerGroup([finalmap2011,stack_2015],{time:"2015"})
var pop_2019=L.layerGroup([finalmap2012,stack_2019],{time:"2019"})
var Absolutepopulation_final=L.featureGroup([pop_2010,pop_2015,pop_2019])
//For Barchart LST
var landtepm_2010=L.layerGroup([finalmap2010,lst_2010],{time:"2010"})
var landtepm_2011=L.layerGroup([finalmap2011,lst_2011],{time:"2011"})
var landtepm_2012=L.layerGroup([finalmap2012,lst_2012],{time:"2012"})
var landtepm_2013=L.layerGroup([finalmap2013,lst_2013],{time:"2013"})
var landtepm_2014=L.layerGroup([finalmap2014,lst_2014],{time:"2014"})
var landtepm_2015=L.layerGroup([finalmap2015,lst_2015],{time:"2015"})
var landtepm_2016=L.layerGroup([finalmap2016,lst_2016],{time:"2016"})
var landtepm_2017=L.layerGroup([finalmap2017,lst_2017],{time:"2017"})
var landtepm_2018=L.layerGroup([finalmap2018,lst_2018],{time:"2018"})
var landtepm_2019=L.layerGroup([finalmap2019,lst_2019],{time:"2019"})
var LST_final=L.featureGroup([landtepm_2010,landtepm_2011,landtepm_2012,landtepm_2013,landtepm_2014,landtepm_2015,landtepm_2016,landtepm_2017,landtepm_2018,landtepm_2019])

var overlay = {
    'Punjab with all variables':final_from_2010_till_2019,
    'Punjab with LST and Precipitation':LST_final,
    'Punjab with NDVI and Precipitation':NDVI_final,
    'Punjab with Population and Precipitation':Absolutepopulation_final,
    
    //'markers': layerGroup
};
// to add control layers
var lcontrol=L.control.layers(null, overlay).addTo(map);
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
map.addControl( searchControl );  //inizialize search control
//legend
var legend = L.control({position : 'bottomright'});
            legend.onAdd = function(map){
                var div = L.DomUtil.create('div', 'legend'); // create a div with a class legend
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
                    div.innerHTML +='<hr>';
                    div.innerHTML += 'Land Surface Temperature';
                    div.innerHTML +='<br>';
                    div.innerHTML += '<i style="background: #ffff00"></i><span>Summer-Day</span><br>';
                    div.innerHTML += '<i style="background: #FCAE91"></i><span>Winter-Night</span><br>';
                    div.innerHTML += '<i style="background: #00ffff"></i><span>Winter-Day</span><br>';
                    div.innerHTML += '<i style="background: #808080"></i><span>Summer-Night</span><br>';
                    div.innerHTML +='<hr>';
                    div.innerHTML += 'NDVI';
                    div.innerHTML +='<br>';
                    div.innerHTML += '<i style="background: #9ACD32"></i><span>0.1950-0.2314</span><br>';
                    div.innerHTML += '<i style="background: #ADFF2F"></i><span>0.2314-0.2955</span><br>';
                    div.innerHTML += '<i style="background: #7CFC00"></i><span>0.2955-0.3685</span><br>';
                    div.innerHTML += '<i style="background: #32CD32"></i><span>0.3685-0.4428</span><br>';
                    div.innerHTML += '<i style="background: #228B22"></i><span>0.4428-0.4878</span><br>';
                    div.innerHTML += '<i style="background: #006400"></i><span>0.4878+</span><br>';        
                return div;
            }
legend.addTo(map)
//2nd legend
//legend
var legend_2 = L.control({position : 'bottomright'});
            legend_2.onAdd = function(map){
                var div = L.DomUtil.create('div', 'legend_2'); // create a div with a class legend
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
                    div.innerHTML +='<hr>';
                    div.innerHTML += 'Land Surface Temperature';
                    div.innerHTML +='<br>';
                    div.innerHTML += '<i style="background: #ffff00"></i><span>Summer-Day</span><br>';
                    div.innerHTML += '<i style="background: #FCAE91"></i><span>Winter-Night</span><br>';
                    div.innerHTML += '<i style="background: #00ffff"></i><span>Winter-Day</span><br>';
                    div.innerHTML += '<i style="background: #808080"></i><span>Summer-Night</span><br>';       
                return div;
            }
//3rd legend
var legend_3 = L.control({position : 'bottomright'});
            legend_3.onAdd = function(map){
                var div = L.DomUtil.create('div', 'legend_3'); // create a div with a class legend
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
                    div.innerHTML +='<hr>';
                    div.innerHTML += 'NDVI';
                    div.innerHTML +='<br>';
                    div.innerHTML += '<i style="background: #9ACD32"></i><span>0.1950-0.2314</span><br>';
                    div.innerHTML += '<i style="background: #ADFF2F"></i><span>0.2314-0.2955</span><br>';
                    div.innerHTML += '<i style="background: #7CFC00"></i><span>0.2955-0.3685</span><br>';
                    div.innerHTML += '<i style="background: #32CD32"></i><span>0.3685-0.4428</span><br>';
                    div.innerHTML += '<i style="background: #228B22"></i><span>0.4428-0.4878</span><br>';
                    div.innerHTML += '<i style="background: #006400"></i><span>0.4878+</span><br>';        
                return div;
            }
//Map options
 map.on('overlayadd', function (eventLayer) {
    //Show legend...
    if (eventLayer.name === 'Punjab with all variables') {
        // to add the information control on to the map
        //Adding and initializing Slider control
        this.addControl(legend)
        this.addControl(sliderControl)
        this.addControl(searchControl)
        sliderControl.startSlider();

    }else if (eventLayer.name==='Punjab with LST and Precipitation') {
        this.addControl(sliderControl2)
        this.addControl(legend_2)
        this.addControl(searchControl)
        sliderControl2.startSlider();
        
    }else if (eventLayer.name==='Punjab with NDVI and Precipitation') {
        this.addControl(legend_3)
        this.addControl(sliderControl3)
        this.addControl(searchControl)
        sliderControl3.startSlider();
    }else if (eventLayer.name==='Punjab with Population and Precipitation') {
        this.addControl(sliderControl4)
        this.addControl(searchControl)
        sliderControl4.startSlider();
        
    }
});

//overlayremove is a LayersControlEvent which is fired when an overlay is deselected through the layer control.
map.on('overlayremove', function (eventLayer) {
    // hide legend
    if (eventLayer.name === 'Punjab with all variables') {
        this.removeControl(legend)
        this.removeControl(searchControl)
        this.removeControl(sliderControl);// removes the legend when you uncheck the option in layer control 
    }else if (eventLayer.name === 'Punjab with LST and Precipitation') {
        this.removeControl(searchControl)
        this.removeControl(legend_2)
        this.removeControl(sliderControl2)
    }else if (eventLayer.name === 'Punjab with NDVI and Precipitation') {
        this.removeControl(legend_3)
        this.removeControl(searchControl)
        this.removeControl(sliderControl3)
    }else if (eventLayer.name === 'Punjab with Population and Precipitation') {
        this.removeControl(searchControl)
        this.removeControl(sliderControl4)
    }
});