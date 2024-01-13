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
var P_2011 ;
//var marker
//var marker1
// scalefactor
var ScaleFactor=1400;
//var sliderControl = null;
//Map through mapbox
//creation of a map variable
// map variable can be declared through L.mapbox.map or L.map in mapbox
L.mapbox.accessToken = 'pk.eyJ1IjoibXVzdGFmYTA1IiwiYSI6ImNrNm1ocHBzNTBldDIzanJ1ODJqc2dzYjMifQ.ppQmulUBSdoPSzVXjT23Dw';
var map = L.map('Map',{zoomControl: false,fullscreenControl:true,fullscreenControlOptions: {position:'topleft'}}).setView([myLat, myLong], zoom).addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));
//Home button on the map
var zoomHome = L.Control.zoomHome({homeZoom:6.5}).addTo(map);
//Declaring the layergroups to be added to the map so that we can show markers
var precipitation_10_markers = L.layerGroup()//.addTo(map);
var precipitation_11_markers = L.layerGroup()//.addTo(map);
// Method of utillizing custom icons for proportional symbol
//function to calculate the size of the SVG accordingly to the parameters(Precepitation) in the GeoJson for 2010
function iconByPrecipitation10(feature){
  var calculatedSize = (Math.sqrt(((feature.properties.P_2010)*10000)/Math.PI)*3);
            
  // create metro icons
  return L.icon({
    iconUrl: 'rain.svg',
    iconSize: [calculatedSize, calculatedSize]
  });
}
//function to calculate the size of the SVG accordingly to the parameters(Precepitation) in the GeoJson for 2010
function iconByPrecipitation11(feature){
  var calculatedSize = (Math.sqrt(((feature.properties.P_2011)*10000)/Math.PI)*3);
            
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
                    icon: iconByPrecipitation10(feature) 
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
    })//.addTo(map)
            //in order to add markers to layer group
            precipitation_10_markers.addLayer(marker);        
    }
});//.addTo(map)
//Layer group to add popup on the slider
var precipitation_2010 = L.layerGroup([precipitation_10_markers],{time:"2010"});
//Custom SVG icon 2011 Precipitation
P_2011 = L.geoJson(punjabprecip, {
    onEachFeature: function (feature, layer) {
        // Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            // Use center to put marker on map
            var marker = L.marker(center,
                {
                    icon: iconByPrecipitation11(feature) 
                }).on({
        // this function takes the layer and changes its color
        mouseover: function(e){
            var layer = e.target;
            //it would not work with just numbers,  it requires the content to be a string or concatination
            this.bindTooltip( 'District:'+feature.properties.Districts+'<br>'+'Precipitation_11:'+feature.properties.P_2011);
        },
        mouseout: function(e){
            var layer = e.target;
            this.closePopup();
        }
    })//.addTo(map)
            //in order to add markers to layer group
            precipitation_11_markers.addLayer(marker);        
    }
});//.addTo(map)
//Layer group to add popup on the slider
var precipitation_2011 = L.layerGroup([precipitation_11_markers],{time:"2011"});
//Feature group
precipitation=L.featureGroup([precipitation_2010,precipitation_2011])
//overlaying
var overlay = {
    'Precipitation':precipitation
    //'markers': layerGroup
};

//Layer control
var lcontrol=L.control.layers(null, overlay).addTo(map);
var sliderControl = L.control.sliderControl({position: "topleft",layer:precipitation,follow: 1,range:true});
//add the slider
//map.addControl(sliderControl)
//And initialize the slider
//sliderControl.startSlider();

//Function to calculate 
//Function which rounds off the number
function roundNumber(inNumber){
    return(Math.round(inNumber/10)*10)
}


//Legend for the SVG icon

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
                //legend.addTo(map);


// overlayadd is a LayersControlEvent which is fired when an overlay is selected through the layer control.
map.on('overlayadd', function (eventLayer) {
    //Show legend...
    if (eventLayer.name === 'Precipitation') {
        // to add the legend to the map
        this.addControl(legend);
        //Adding and initializing Slider control
        this.addControl(sliderControl)
        sliderControl.startSlider();

    }
});

//overlayremove is a LayersControlEvent which is fired when an overlay is deselected through the layer control.
map.on('overlayremove', function (eventLayer) {
    // hide legend
    if (eventLayer.name === 'Precipitation') {
        this.removeControl(legend)
        this.removeControl(sliderControl);// removes the legend when you uncheck the option in layer control 
    }
});
    


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
