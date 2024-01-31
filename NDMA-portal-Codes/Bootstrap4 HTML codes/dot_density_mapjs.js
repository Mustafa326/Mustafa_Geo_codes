//Declaration of variables containing latitude and longitude and zoom
var myLat=31.1704;
var myLong=72.7097;
var zoom=5;
//Declaring the maximum and minimun populations in the geojson data of 2010
var min_P_10=0.02825
var max_P_10=0.13275
// declaring slider variable to be null
//var sliderControl = null;
// declaring the punjab layer
var P_2010;
var P_2011;
//var marker
//var marker1
// scalefactor
var ScaleFactor=10;
//var sliderControl = null;
//Map through mapbox
//creation of a map variable
  // Leaflet uses div .offsetWidth and .offsetHeight to size the map.
// map variable can be declared through L.mapbox.map or L.map in mapbox
L.mapbox.accessToken = 'pk.eyJ1IjoibXVzdGFmYTA1IiwiYSI6ImNrNm1ocHBzNTBldDIzanJ1ODJqc2dzYjMifQ.ppQmulUBSdoPSzVXjT23Dw';
var map = L.map('Map',{zoomControl: false,fullscreenControl:true,fullscreenControlOptions: {position:'topleft'}}).setView([myLat, myLong], zoom).addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));
//Home button on the map
var zoomHome = L.Control.zoomHome({homeZoom:6.5}).addTo(map);
//Declaring the layergroups to be added to the map so that we can show markers
//var lst_2010= L.layerGroup().addTo(map);
//var lst_2010 = L.canvasLayer({}).addTo(map);
//var lst_2010 = L.featureGroup().addTo(map)
var lst_2010 = L.markerClusterGroup().addTo(map);
//var winter_N_10= L.layerGroup().addTo(map);
//var clustermarkers1 = L.markerClusterGroup().addTo(map)
//var clustermarkers2 = L.markerClusterGroup().addTo(map)
//var summer_N_100= L.layerGroup(clustermarkers1,clustermarkers2);
//var oms = new OverlappingMarkerSpiderfier(map)
// dot density generation options
  
// Dot density map with coropleth
//LST data
var minValue = 23.2787;
var minRadius = 30;
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
function iconByNight2(feature){
  //var calculatedSize = 1.0083 * Math.pow(feature.properties.S_N_2010/minValue,.5716) * minRadius;
  //var calculatedSize = Math.sqrt(feature.properties.AbsPop_15 /10000)
  var calculatedSize = Math.sqrt(feature.properties.P_2010 / Math.PI)*2

            
  // create  icons
  return L.icon({
    iconUrl: 'rain.svg',
    iconSize: [calculatedSize, calculatedSize],
    rotationAngle: -280
  });
}
//Functions that assigns a SVG image to a specific column in geojson
function iconByDay(feature){
  //var calculatedSize = 1.0083 * Math.pow(feature.properties.S_N_2010/minValue,.5716) * minRadius;
  var calculatedSize = Math.sqrt(feature.properties.N_2010 / Math.PI) *50  
  // create  icons
  return L.icon({
    iconUrl: 'grass.svg',
    iconSize: [calculatedSize, calculatedSize],
  });
  
}
var density1=  L.geoJson(final,{
    style: function(feature){
        //for choropleth
        var fillColor,
        density = feature.properties.Pop_2010;
        if ( density > 1500 ) fillColor = "#800026";
        else if ( density > 1000 ) fillColor = "#BD0026";
        else if ( density > 900 ) fillColor = "#E31A1C";
        else if ( density > 800 ) fillColor = "#FC4E2A";
        else if ( density > 700 ) fillColor = "#FD8D3C";
        else if ( density > 500 ) fillColor = "#FEB24C";
        else if ( density > 400 ) fillColor = "#FED976";
        else fillColor = "#FFEDA0";  // no data
        return { color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .6 };
    },
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //var newLng = center[x].lng() + (Math.random() / 10000);
            layer.on({
                mouseover: function(e){
                    var layer = e.target;
                    //it would not work with just numbers,  it requires the content to be a string or concatination
                    this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Population Density:'+feature.properties.Pop_2010+'People per kilometer square');
                },
                mouseout: function(e){
                    var layer = e.target;
                    this.closePopup();
                }

            })
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
            circlemarker=L.circleMarker([feature.properties.Latitude+0.10421,feature.properties.Longitude+0.00421])
            map.addLayer(circlemarker)
            var stack = L.marker.stack([feature.properties.Latitude,feature.properties.Longitude],{
                icons:[
                //iconByNight(feature),
                iconByNight2(feature),
                iconByDay(feature)
                ],
                // For placing or oreintating the marker
                stackOffset: [15, -26]

            })
            map.addLayer(stack)
            // Use center to put marker on map
            var lstmarker = new L.BarChartMarker(center, options)
            //marker=L.marker(center)
            // A pop up which shows the data
            lstmarker.bindPopup("This is the District:"+ feature.properties.Districts+'<hr>'+"From left to right"+'<hr>'+"The First Bar Shows The Summer Day Temperature, which is:"+feature.properties.S_D_2010+"Celcius"+'<hr>'+"The Second bar shows the Winter Night Temperature, which is:"+feature.properties.W_N_2010+"Celcius"+'<hr>'+"The Third Bar shows the Winter Day Temperature, which is:"+feature.properties.W_D_2010+"Celcius"+'<hr>'+"The Frourth bar shows the SummerNight temperature,which is:"+feature.properties.S_N_2010+"Celcius")
            //initiating marker stack. The SVG icons are randomn they were chosen for practice purposes.
            
            //markers.addLayer(lstmarker);
            //map.addLayer(markers);
            //Markers without the marker stack plugin
            // Use center to put marker on map
            /*
            var marker = L.marker((center),
                {
                    icon: iconByNight(feature) 
                }).on({
                    mouseover: function(e){
                        var layer = e.target;
                        //it would not work with just numbers,  it requires the content to be a string or concatination
                        this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Summer_Night_2010:'+feature.properties.S_N_2010);
                    },

                    mouseout: function(e){
                        var layer = e.target;
                        this.closePopup();
                    }   

                })
            var marker1=L.circleMarker([feature.properties.Latitude,feature.properties.Longitude],{
                radius:feature.properties.W_N_2010,
                fillColor:"#ff7800",
                color:'#000',
                weight:1,
                fillOpacity:0.8

            })
            */
        //adding the layer stack element with icons on to the map
        
        lst_2010.addLayer(lstmarker);
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
        //lst_2010.bringToBack();
        //adding the layer that contains the markers
        //winter_N_10.addLayer(marker1);
        // adding the clusters for marker cluster plugin
        //clustermarkers1.addLayer(stack);
        //clustermarkers2.addLayer(marker1);
        //adding the layer
        //map.addLayer(summer_N_100)
        //clustermarkers.addLayer(marker1);

      }
}).addTo(map)
//Dot density map
/*
  var dotDensityFeature = [];
            // loop that generates the points
            for (var i = 0; i < features.length; i++) {
                //getting the extent of the geometry
                var bounds = features[i].getGeometry().getExtent();
                // Get the Center of the feature
                var x0 = bounds[0] + (bounds[2] - bounds[0]) / 2; 
                var y0 = bounds[1] + (bounds[3] - bounds[1]) / 2;
                var w = bounds[2] - bounds[0];
                var h = bounds[3] - bounds[1];

                for (var j = 0; j < features[i].getProperties()["NumOfDots"]; j ++) {
                    // Plot the dots around the center that way they'll be contained inside the feature
                    var x = parseInt(x0 + Math.random() * (w/8));
                    var y = parseInt(y0 + Math.random() * (h/8));
                    //cloning the features
                    var newFeature = features[i].clone();
                    newFeature.setGeometry(new ol.geom.Point([x, y]));
                    newFeature.setStyle(new ol.style.Style({
                        image: new ol.style.Circle({
                            fill: new ol.style.Fill({ color: 'red' }),
                            stroke: new ol.style.Stroke({ color: 'black', width: '0.5' }),
                            radius: 2,
                        })
                    }));

                    dotDensityFeature.push(newFeature);
                }
            }

            var dotDensityLayer = new ol.layer.Vector({
                source: new ol.source.Vector({ features: dotDensityFeature }),
            });

            map.addLayer(dotDensityLayer);
*/
/*
// Another method for generating dot density maps
//Variable to define dots
  let dots = []
  var myRenderer = L.canvas({ padding: 2.5 });

  let geojsonLayer = L.geoJson(punjabprecip, {
    weight: 1,
    color: '#432',
    onEachFeature: (feature, layer) => {
      // dot density generation options
      let options = {maxIterations: 50, distance: 20, numDots: feature.properties.S_D_2011}
      layer.bindPopup(feature.properties.Districts)
      layer.bindTooltip(feature.properties.Districts)

      let bounds = layer.getBounds()
      let width = Math.abs(bounds._northEast.lng - bounds._southWest.lng)
      let height = Math.abs(bounds._northEast.lat - bounds._southWest.lat)
      for (let i=0; i < options.numDots; i++) {
        let p = [bounds._southWest.lat + Math.random() * height, bounds._southWest.lng + Math.random() * width]
          // check distance to other dots
          // for (let j=0; j<dots.length; j++) {
          //   let dx = p[0]-dots[j][0],
          //       dy = p[1]-dots[j][1]
          //   if (Math.sqrt(dx*dx+dy*dy) < options.distance) 
          //     // continue outer
          // }
          // check distance to polygon edge
          // for (let j=0; j<polygon.length-1; j++) {
          //   if (distPointEdge(p, polygon[j], polygon[j+1]) < options.edgeDistance) continue outer;
          // }
          //radius: Math.sqrt(((feature.properties.P_2010)*ScaleFactor)/Math.PI)*2
        dots.push(p)
        L.circleMarker(p, {renderer: myRenderer,radius:4, weight: 1, color: 'black'}).addTo(map)
        if (dots.length == options.numDots) break;
      }
    }
  }).addTo(map)
  map.fitBounds(geojsonLayer.getBounds())
//Layer control
var lcontrol=L.control.layers(null, overlay).addTo(map);
var sliderControl = L.control.sliderControl({position: "bottomleft",layer:precipitation,follow: 1,range:true});
//add the slider
map.addControl(sliderControl)
//And initialize the slider
sliderControl.startSlider();
*/
//Function to calculate 
//Function which rounds off the number
function roundNumber(inNumber){
    return(Math.round(inNumber/10)*10)
}


//Legend for the SVG icon
/*
var legend = L.control({position : 'bottomright'});
            legend.onAdd = function(map){
                //created a container for the leggend
                var legendContainer = L.DomUtil.create("div", "legend"); // create a div with a class legend
                //creates a container for the symbols
                var symbolsContainer = L.DomUtil.create("div", "symbolsContainer");
                //Number for the classes
                var classes = [(min_P_10),roundNumber(((max_P_10-min_P_10)/2)),(max_P_10)];
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
                    $(legendCircle).attr("style", "width: " + currentRadius*5 +
                        "px; height: " + currentRadius*5 + 
                        "px; margin-left: " + 5 + "px" );
                        legendCircle.innerHTML +=
                             (" <img src=rain.svg"+" height='currentRadius' width='50'>");              
                    $(legendCircle).append("<span class='legendValue'>"+'<br>'+classes[i]+"</span>");

                    $(symbolsContainer).append(legendCircle);

                    lastRadius = currentRadius;
                }
                $(legendContainer).append(symbolsContainer);
                return legendContainer;
                };
                legend.addTo(map);

*/
// Old codes which were used in precipitation map 


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
/* Method of utillizing custom icons for proportional symbol
//function to calculate the size of the SVG accordingly to the parameters in the GeoJson
function iconByPrecipitation(feature){
  var calculatedSize = (Math.sqrt(((feature.properties.P_2010)*10000)/Math.PI)*2);
            
  // create metro icons
  return L.icon({
    iconUrl: 'rain.svg',
    iconSize: [calculatedSize, calculatedSize]
  });
}
P_2010 = L.geoJson(punjabprecip, {
    onEachFeature: function (feature, layer) {
        // Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            // Use center to put marker on map
            var marker = L.marker(center,
                {
                    icon: iconByPrecipitation(feature) 
                }).on({
        // this function takes the layer and changes its color
        mouseover: function(e){
            var layer = e.target;
            //it would not work with just numbers,  it requires the content to be a string or concatination
            this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitation_10:'+feature.properties.P_2010);
        },
        mouseout: function(e){
            var layer = e.target;
            this.closePopup();
        }
    }).addTo(map)
            //in order to add markers to layer group
            //precipitation_10.addLayer(marker);        
    }
});//.addTo(map)
*/

/*old code
var map=L.map('Map',{zoomControl: false,fullscreenControl:true,fullscreenControlOptions: {position:'topleft'}}).setView([myLat,myLong],zoom);
//map tile layer
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', { 
        attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors', 
        minZoom:2
        //maxBounds: mybounds
}).addTo(map);

/*Circle markers
//Declaring the layergroups to be added to the map so that we can show markers
var precipitation_10 = L.layerGroup().addTo(map);
var precipitation_11 = L.layerGroup().addTo(map);
//Geojson for the 2010 Precipitation
P_2010 = L.geoJson(punjabprecip, {
    onEachFeature: function (feature, layer) {
        // Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            // Use center to put marker on map
            var marker = L.circleMarker(center,
                {
                    radius:Math.sqrt(((feature.properties.P_2010)*ScaleFactor)/Math.PI)*2,
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
            this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitation_10:'+feature.properties.P_2010);
            this.setStyle({fillColor:"black"});
        },
        mouseout: function(e){
            var layer = e.target;
            this.closePopup();
            this.setStyle({fillColor:"#ff7800"});
        }
    })//.addTo(map)
            //in order to add markers to layer group
            precipitation_10.addLayer(marker);        
    }
});//.addTo(map)
//Geojson for the 2011 Precipitation
P_2011 = L.geoJson(punjabprecip, {
    onEachFeature: function (feature, layer) {
        // Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            // Use center to put marker on map
            var marker1 = L.circleMarker(center,
                {
                    radius:Math.sqrt(((feature.properties.P_2011)*ScaleFactor)/Math.PI)*2,
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
            this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitation_2011:'+feature.properties.P_2011);
            this.setStyle({fillColor:"black"});
        },
        mouseout: function(e){
            var layer = e.target;
            this.closePopup();
            this.setStyle({fillColor:"#ff7800"});
        }
    })//.addTo(map)
            //in order to add markers to layer group
            precipitation_11.addLayer(marker1);        
    }
});//.addTo(map)

//Feature group
precipitation=L.featureGroup([precipitation_10,precipitation_11])
//overlaying
var overlay = {
    'Precipitation':precipitation
    //'markers': layerGroup
};

//Layer control
var lcontrol=L.control.layers(null, overlay).addTo(map);
var sliderControl = L.control.sliderControl({position: "bottomleft",layer:precipitation,follow: 1,range:true});
//add the slider
map.addControl(sliderControl)
//And initialize the slider
sliderControl.startSlider();

//Function to calculate 
//Function which rounds off the number
function roundNumber(inNumber){
    return(Math.round(inNumber/10)*10)
}
*/



//Legend for circle marker
/*
var legend = L.control({position : 'bottomright'});
            legend.onAdd = function(map){
                //created a container for the leggend
                var legendContainer = L.DomUtil.create("div", "legend"); // create a div with a class legend
                //creates a container for the symbols
                var symbolsContainer = L.DomUtil.create("div", "symbolsContainer");
                //Number for the classes
                var classes = [(min_P_10),roundNumber(((max_P_10-min_P_10)/2)),(max_P_10)];
                var labels = ["http://datentaeter.de/wp-content/uploads/2016/06/flag_de.png","http://datentaeter.de/wp-content/uploads/2016/06/flag_de.png"];
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
*/
/* SImple Legend with SVG
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        classes = [(min_P_10),roundNumber(((max_P_10-min_P_10)/2)),(max_P_10)];
        //labels = ["http://datentaeter.de/wp-content/uploads/2016/06/flag_de.png","http://datentaeter.de/wp-content/uploads/2016/06/flag_de.png"];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < classes.length; i++) {
        div.innerHTML +=
            classes[i] + (" <img src=rain.svg"+" height='50' width='50'>") +'<br>';
    }

    return div;
};

legend.addTo(map);
*/
/*
//Variable to define dots
let dots = []
function iconByPrecipitation11(feature){
  //var calculatedSize = (Math.sqrt(((feature.properties.P_2011)*10000)/Math.PI)*3);
            
  // create metro icons
  return L.icon({
    iconUrl: 'http://andywoodruff.com/maptime-leaflet/rat.png',
    iconSize: [60,50]
  });
}
var density1=  L.geoJson(punjabprecip,{
    style: function(feature){
        var fillColor,
        density = feature.properties.S_D_2010;
        if ( density >= 40 ) fillColor = "#C80000";
        else if ( density >= 30 ) fillColor = "#31a354";
        else if ( density >= 20 ) fillColor = "#78c679";
        else if ( density >= 10 ) fillColor = "#c2e699";
        else if ( density >= 0 ) fillColor = "#ffffcc";
        else fillColor = "#f7f7f7";  // no data
        return { color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .6 };
    },
    onEachFeature: function( feature, layer ){
        // dot density generation options
        let options = {maxIterations: 50, distance: 1, numDots: feature.properties.S_D_2010}
        layer.bindPopup( "<strong>" + feature.properties.Name + "</strong><br/>" + feature.properties.S_D_2010 + " rats per square mile" )
        var bounds = layer.getBounds();
        let width = Math.abs(bounds._northEast.lng - bounds._southWest.lng)
        let height = Math.abs(bounds._northEast.lat - bounds._southWest.lat)
        for (let i=0; i < options.maxIterations; i++){
            let p = [bounds._southWest.lat + Math.random() * height, bounds._southWest.lng + Math.random() * width]
            dots.push(p)
            var marker=L.circleMarker(p, {radius: 1, weight: 1, color: 'black'}).addTo(map)
            if (dots.length == options.numDots) break;
        }
        
          // check distance to other dots
          // for (let j=0; j<dots.length; j++) {
          //   let dx = p[0]-dots[j][0],
          //       dy = p[1]-dots[j][1]
          //   if (Math.sqrt(dx*dx+dy*dy) < options.distance) 
          //     // continue outer
          // }
          // check distance to polygon edge
          // for (let j=0; j<polygon.length-1; j++) {
          //   if (distPointEdge(p, polygon[j], polygon[j+1]) < options.edgeDistance) continue outer;
          // }
            // Get center of bounds
        precipitation_10.addLayer(marker);
      }
}).addTo(map)
*/