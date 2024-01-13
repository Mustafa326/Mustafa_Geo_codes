//Declaration of variables containing latitude and longitude and zoom
var myLat=31.1704;
var myLong=72.7097;
var zoom=5;
//Declaring the maximum and minimun populations in the geojson data of 2010
var min_D_10=37.26306
var max_D_10=46.37852
// declaring slider variable to be null
//var sliderControl = null;
// declaring the punjab layer
var S_D_2010;
var S_D_2011;
//var marker
//var marker1
// scalefactor
var ScaleFactor=9;
//var sliderControl = null;
//Map through mapbox
//creation of a map variable
// map variable can be declared through L.mapbox.map or L.map in mapbox
L.mapbox.accessToken = 'pk.eyJ1IjoibXVzdGFmYTA1IiwiYSI6ImNrNm1ocHBzNTBldDIzanJ1ODJqc2dzYjMifQ.ppQmulUBSdoPSzVXjT23Dw';
var map = L.map('Map',{zoomControl: false,fullscreenControl:true,fullscreenControlOptions: {position:'topleft'}}).setView([myLat, myLong], zoom).addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));
//Home button on the map
var zoomHome = L.Control.zoomHome({homeZoom:6.5}).addTo(map);
//Declaring the layergroups to be added to the map so that we can show markers
var summer_day_lst10 = L.layerGroup().addTo(map);
var summer_day_lst11 = L.layerGroup().addTo(map);
function getColor(d) {
    return d > 1100 ? 'purple' :
           d > 900  ? '#228B22' :
           d > 700  ? '#32CD32' :
           d > 500 ? '#7CFC00' :
           d > 300  ? '#ADFF2F' :
           d > 100   ? '#9ACD32' :
                      '#FFEDA0';
}
//Geojson for the Summer_Day_2010 LST temperature
S_D_2011 = L.geoJson(punjablstk, {
    onEachFeature: function (feature, layer) {
        // Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            var markerTemp = L.marker();
            var centroid = turf.centroid(feature);
            var lon = centroid.geometry.coordinates[0];
            var lat = centroid.geometry.coordinates[1];

    var iconSettings = {
        mapIconUrl: '<svg id="Layer_1" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m136.33 375.757c-10.09-6.65-19.572-14.389-28.186-23.001-33.83-33.83-52.461-78.837-52.461-126.729 0-122.259 120.666-194.342 217.531-215.913 50.874-11.328 108.058-13.149 169.96-5.412 7.861.983 13.603 7.909 13.11 15.816-.492 7.907-7.048 14.068-14.971 14.068-68.152.001-137.385 41.438-184.598 90.745-61.528 64.258-96.024 148.813-97.133 238.089-.068 5.484-3.124 10.494-7.969 13.064-4.828 2.562-10.691 2.3-15.283-.727z" /><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m144.556 512c-8.284 0-15-6.716-15-15v-133.787c0-8.284 6.716-15 15-15s15 6.716 15 15v133.787c0 8.284-6.716 15-15 15z" /><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="m455.722 15.41c-1.858-6.413-7.731-10.825-14.407-10.825-69.203.001-146.312 37.383-206.266 99.997-66.805 69.768-104.259 161.56-105.463 258.464 0 .032.002.064.002.096-.019.042-.032.07-.032.07v7.838c2.226 1.621 4.482 3.195 6.774 4.706 69.577 45.857 164.208 38.064 225.272-23.002 52.832-52.832 41.873-125.622 38.263-166.473-5.512-62.365-10.272-116.225 49.469-154.021 5.643-3.568 8.246-10.437 6.388-16.85z" /></g></svg>',
        mapIconColor: getColor(feature.properties.pop_dens10),
        mapIconColorInnerCircle: '#fff',
        pinInnerCircleRadius:48
    };

// icon normal state
var divIcon = L.divIcon({
    className: "leaflet-data-marker",
  html: L.Util.template(iconSettings.mapIconUrl, iconSettings) //.replace('#','%23'),
});

// icon active state
var divIconActive = L.divIcon({
    className: "leaflet-data-marker",
  html: L.Util.template(iconSettings.mapIconUrl, iconSettings) //.replace('#','%23'),
});
  var marker = L.marker([lat,lon], {
    icon: divIcon,
  }).addTo(map);

            // Use center to put marker on map

            var marker = L.circleMarker(center,
                {
                    radius:Math.sqrt(((feature.properties.S_D_2010)*ScaleFactor)/Math.PI)*2,
                    fillColor:"#ff7800",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                }).on({
        // this function takes the layer and changes its color
        mouseover: function(e){
            var layer = e.target;
            //it would not work with just numbers,  it requires the content to be a string or concatination
            this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Summer_2010_D:'+feature.properties.S_D_2010+'<br>'+'Summer_2010_N:'+feature.properties.S_N_2010);
            this.setStyle({fillColor:"black"});
        },
        mouseout: function(e){
            var layer = e.target;
            this.closePopup();
            this.setStyle({fillColor:"#ff7800"});
        }
    })//.addTo(map)
            //in order to add markers to layer group
            summer_day_lst10.addLayer(marker);        
    }
})
//Geojson for the Summer_Day_2011 LST temperature
S_D_2011 = L.geoJson(punjablstk, {
    onEachFeature: function (feature, layer) {
        // Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            // Use center to put marker on map
            var marker1 = L.circleMarker(center,
                {
                    radius:Math.sqrt(((feature.properties.S_D_2011)*ScaleFactor)/Math.PI)*2,
                    fillColor:"#ff7800",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                }).on({
        // this function takes the layer and changes its color
        mouseover: function(e){
            var layer = e.target;
            //it would not work with just numbers,  it requires the content to be a string or concatination
            this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Summer_2011_D:'+feature.properties.S_D_2011+'<br>'+'Summer_2010_N:'+feature.properties.S_N_2011);
            this.setStyle({fillColor:"black"});
        },
        mouseout: function(e){
            var layer = e.target;
            this.closePopup();
            this.setStyle({fillColor:"#ff7800"});
        }
    }).addTo(map)
            //in order to add markers to layer group
            summer_day_lst11.addLayer(marker1);        
    }
});//.addTo(map)

//Feature group

var finalmaplst2010 = L.layerGroup({time:"2010"});
final = L.geoJson(punjablstk, {
    onEachFeature: function (feature, layer) {
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //Assigning the data to be shown on the bar-chart
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
                        fillColor: '#FEE5D9',
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
                        fillColor: '#FB6A4A',
                        minValue: feature.properties.W_D_2010,
                        maxValue: feature.properties.W_D_2010,
                        maxHeight: feature.properties.W_D_2010,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint4':{
                        fillColor: '#FB6A4A',
                        minValue: feature.properties.S_N_2010,
                        maxValue: feature.properties.S_N_2010,
                        maxHeight: feature.properties.S_N_2010,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    }
                },
                weight: 1,
                color: '#000000',
            }
            // Use center to put marker on map
            var lstmarker = new L.BarChartMarker(center, options)
            // A pop up which shows the data
            lstmarker.bindPopup("This is the District:"+ feature.properties.Districts+'<hr>'+"From left to right"+'<hr>'+"The First Bar Shows The Summer Day Temperature, which is:"+feature.properties.S_D_2010+"Celcius"+'<hr>'+"The Second bar shows the Winter Night Temperature, which is:"+feature.properties.W_N_2010+"Celcius"+'<hr>'+"The Third Bar shows the Winter Day Temperature, which is:"+feature.properties.W_D_2010+"Celcius"+'<hr>'+"The Frourth bar shows the SummerNight temperature,which is:"+feature.properties.S_N_2010+"Celcius")
            //in order to add markers to layer group
            finalmaplst2010.addLayer(lstmarker);
            map.addLayer(finalmaplst2010)
    }
})//.addTo(map) this will show the polugon boundries
var finalmaplst2011 = L.layerGroup({time:"2010"}).addTo(map);
final = L.geoJson(punjablstk, {
    onEachFeature: function (feature, layer) {
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //Assigning the data to be shown on the bar-chart
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
                        fillColor: '#FEE5D9',
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
                        fillColor: '#FB6A4A',
                        minValue: feature.properties.W_D_2011,
                        maxValue: feature.properties.W_D_2011,
                        maxHeight: feature.properties.W_D_2011,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'dataPoint4':{
                        fillColor: '#FB6A4A',
                        minValue: feature.properties.S_N_2011,
                        maxValue: feature.properties.S_N_2011,
                        maxHeight: feature.properties.S_N_2011,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    }
                },
                weight: 1,
                color: '#000000',
            }
            // Use center to put marker on map
            var lstmarker1 = new L.BarChartMarker(center, options)
            // A pop up which shows the data
            lstmarker1.bindPopup("This is the District:"+ feature.properties.Districts+'<hr>'+"From left to right"+'<hr>'+"The First Bar Shows The Summer Day Temperature, which is:"+feature.properties.S_D_2010+"Celcius"+'<hr>'+"The Second bar shows the Winter Night Temperature, which is:"+feature.properties.W_N_2010+"Celcius"+'<hr>'+"The Third Bar shows the Winter Day Temperature, which is:"+feature.properties.W_D_2010+"Celcius"+'<hr>'+"The Frourth bar shows the SummerNight temperature,which is:"+feature.properties.S_N_2010+"Celcius")
            //in order to add markers to layer group
            finalmaplst2011.addLayer(lstmarker1);
            map.addLayer(finalmaplst2011)
    }
})//.addTo(map) this will show the polugon boundries
var maps= L.layerGroup([finalmaplst2010],{time:"2010"})
var maps2= L.layerGroup([finalmaplst2010],{time:"2011"})
summer_day_lst=L.featureGroup([summer_day_lst10,summer_day_lst11,maps,maps2])
//overlaying
var overlay = {
    'S_D_LST':summer_day_lst
    //'markers': layerGroup
};
//Layer control
var lcontrol=L.control.layers(null, overlay).addTo(map);
var sliderControl = L.control.sliderControl({position: "bottomleft",layer:summer_day_lst,/*timeAttribute: "DateStart"*/follow: 1,range:true});
//add the slider
map.addControl(sliderControl)
//And initialize the slider
sliderControl.startSlider();
//Function to calculate 
//Function which rounds off the number
function roundNumber(inNumber){
        return (Math.round(inNumber/10) * 10);
    }
//Legend
var legend = L.control({position : 'bottomright'});
            legend.onAdd = function(map){
                //created a container for the leggend
                var legendContainer = L.DomUtil.create("div", "legend"); // create a div with a class legend
                //creates a container for the symbols
                var symbolsContainer = L.DomUtil.create("div", "symbolsContainer");
                //Number for the classes
                var classes = [roundNumber(min_D_10), roundNumber((max_D_10-min_D_10)/2), roundNumber(max_D_10)];
                var legendCircle;  
                var lastRadius = 0;
                var currentRadius;
                var margin;
                //Styling for The legend
                L.DomEvent.addListener(legendContainer, 'mousedown', function(e){
                    L.DomEvent.stopPropagation(e); 
                });
                $(legendContainer).append("<h2 id='legendTitle'>Land Surface Temperature in K</h2>");
                //looping to gain the legend titles and symbols
                for (var i = 0; i <= classes.length-1; i++){
                    legendCircle = L.DomUtil.create("div", "legendCircle");
                    var area = classes[i] * ScaleFactor;
                    currentRadius=Math.sqrt(area/Math.PI)*4;
                    margin = -currentRadius - lastRadius - 2;
                    $(legendCircle).attr("style", "width: " + currentRadius*2 +
                        "px; height: " + currentRadius*2 + 
                        "px; margin-left: " + margin + "px" );              
                    $(legendCircle).append("<span class='legendValue'>"+classes[i]+"</span>");

                    $(symbolsContainer).append(legendCircle);

                    lastRadius = currentRadius;
                }
                $(legendContainer).append(symbolsContainer);
                return legendContainer;
                };
                legend.addTo(map);



    


/*  external variable Styling for circle marker
var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
//Point to layer function is utillized if you have point type geometry in your geoJson
L.geoJSON(latlonpun, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
}).addTo(map);
*/
/* Loading Geojson and csv through omnivoreplugin
geojsonLayer = L.geoJson(latlonpun, {
    pointToLayer: function(feature, latlng) {
        return new L.CircleMarker(latlng,geojsonMarkerOptions);
    },
    onEachFeature: function (feature, layer) {
        var area = layer.feature.properties.pop_dens10 * 10000000000;
        var radius = Math.sqrt(area/Math.PI);
    }
});
geojsonLayer.addTo(map)
//  omnivore layer
var runLayer = omnivore.csv('population_density_punjab1csv.csv', null, geojsonLayer).addTo(map)
featregroup=L.featureGroup(runLayer)
*/

/* Through OpenStreatMaps
var map=L.map('Map',{zoomControl: false,fullscreenControl:true,fullscreenControlOptions: {position:'topleft'}}).setView([myLat,myLong],zoom);
//map tile layer
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', { 
        attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors', 
        maxZoom:7,
        minZoom:2
        //maxBounds: mybounds
}).addTo(map);
omnivore.csv('population_density_punjab1csv.csv').addTo(map)
*/
//Through functions 
/* Functions to change the size
function size(value) {
    var population=value
    var ScaleFactor=125;
    var area=population*ScaleFactor;
    return Math.sqrt(area/Math.PI)*2;
}
function geojsonMarkerOptions(feature) {
    return {
        radius:size(feature.properties.pop_dense_10),
        fillColor: "black",
        color: "black",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    }
};
*/

/* Method of utillizing custom icons for proportional symbol
function iconByStations(feature){
  var calculatedSize = (Math.sqrt(((feature.properties.pop_dens_10)*0.4)/Math.PI)*2);
            
  // create metro icons
  return L.icon({
    iconUrl: 'population.svg',
    iconSize: [calculatedSize, calculatedSize]
  });
}
 punjabLayer = L.geoJSON(latlonpun,  {
  onEachFeature: function (feature, layer) {
    // Get bounds of polygon
    var bounds = layer.getBounds();
            // Get center of bounds
    var center = bounds.getCenter();
            // Use center to put marker on map
    var marker = L.marker(center,{
        icon: iconByStations(feature)
}).on({
        // this function takes the layer and changes its color
        mouseover: function(e){
            var layer = e.target;
            //it would not work with just numbers,  it requires the content to be a string or concatination
            this.bindTooltip( 'District:'+feature.properties.District+'<br>'+'Latitude:'+feature.properties.Latitude+'<br>'+'Longitude:'+feature.properties.Longitude);
        },
        mouseout: function(e){
            var layer = e.target;
            this.closePopup();
        }
    }).addTo(map)
}
});//.addTo(map);
*/

/*old code
var map=L.map('Map',{zoomControl: false,fullscreenControl:true,fullscreenControlOptions: {position:'topleft'}}).setView([myLat,myLong],zoom);
//map tile layer
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', { 
        attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors', 
        minZoom:2
        //maxBounds: mybounds
}).addTo(map);
//Link or display csv onto the map through omnivore

//// defining layer_groups beforehand in order to add markers to layer group
var summer_day_lst10 = L.layerGroup().addTo(map);
var summer_day_lst11 = L.layerGroup().addTo(map);
S_D_2010 = L.geoJson(punjablstk, {
    onEachFeature: function (feature, layer) {
        // Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            // Use center to put marker on map
            var marker = L.circleMarker(center,
                {
                    radius:Math.sqrt(((feature.properties.S_D_2010)*ScaleFactor)/Math.PI)*2,
                    fillColor:"#ff7800",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                })//.addTo(map)
            //in order to add markers to layer group
            summer_day_lst10.addLayer(marker);            
    }
});//.addTo(map)

S_D_2011 = L.geoJson(punjablstk, {
    onEachFeature: function (feature, layer) {
        // Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            // Use center to put marker on map
            var marker1 = L.circleMarker(center,
                {
                    radius:Math.sqrt(((feature.properties.S_D_2011)*ScaleFactor)/Math.PI)*2,
                    fillColor:"#ff7800",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                })
            //in order to add markers to layer group
            summer_day_lst11.addLayer(marker1);        
    }
});//.addTo(map)
//overlaying
summer_day_lst=L.featureGroup([summer_day_lst10,summer_day_lst11])
var overlay = {
    'S_D_LST':summer_day_lst
    //'markers': layerGroup
};
//Layer control option on map
var lcontrol=L.control.layers(null, overlay).addTo(map);
//adding the timeslider
var slider = L.control({ position: 'bottomleft'} );
//Make sure to add the slider to the map
map.addControl(slider)
//And initialize the slider
*/



