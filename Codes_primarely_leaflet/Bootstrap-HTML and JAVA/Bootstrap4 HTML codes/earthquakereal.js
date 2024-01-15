//Declaration of variables containing latitude and longitude
var myLat = 31.1704;
var myLong = 72.7097;
var zoom = 2;
// assinging maximum and minimum magnitude 
//Declaring the maximum and minimun earthquake magnitude
var min_E_Mag = 0
var max_E_Mag = 7
    // scalefactor
var ScaleFactor = 10;
//creation of a map variable
var map = L.map('Map', { zoomControl: false, fullscreenControl: true, fullscreenControlOptions: { position: 'topleft' } }).setView([myLat, myLong], zoom);
//map tile layer
var osm = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 2
        //maxBounds: mybounds
}).addTo(map);
//Home button on the map
var zoomHome = L.Control.zoomHome({ homeZoom: 6.5 }).addTo(map);
// using the realtime leaflet pluggin
//function to calculate the size of the SVG accordingly to the parameters(earthquake magnitude) in the usgs url
function iconsbymagnitude(f) {
    var calculatedSize = (Math.sqrt(((f.properties.mag) * 100) / Math.PI) * 3);

    // create svg earthquake icons
    return L.icon({
        iconUrl: 'earthquake.svg',
        iconSize: [calculatedSize, calculatedSize]
    });
}
// using the leaflet realtime for update of usgs earthquake data
function createRealtimeLayer(url, container) {
    return L.realtime(url, {
        interval: 60 * 1000,
        getFeatureId: function(f) {
            return f.properties.url;
        },
        // for adding svg icons to the earthquake point geogjson
        pointToLayer: function(f, latlng) {
            return L.marker(latlng, {
                icon: iconsbymagnitude(f)
            })
        },
        cache: true,
        container: container,
        onEachFeature(f, l) {
            l.on({
                mouseover: function(e) {
                    highlightFeature(e, l);
                },
                mouseout: function(e) {
                    resetHighlight(e, l);
                }
            });

            return l;
            // for bind popups
            //l.bindPopup(function() {
            //return '<h3>' + f.properties.place + '</h3>' +
            //  '<p>' + new Date(f.properties.time) +
            //'<br/>Magnitude: <strong>' + f.properties.mag + '</strong></p>' +
            //'<p><a href="' + f.properties.url + '">More information</a></p>';
            //});
        }
    });
}
// create feature group for different earthquake layers
clusterGroup = L.markerClusterGroup().addTo(map)
subgroup1 = L.featureGroup.subGroup(clusterGroup)
subgroup2 = L.featureGroup.subGroup(clusterGroup)
subgroup3 = L.featureGroup.subGroup(clusterGroup)
subgroup4 = L.featureGroup.subGroup(clusterGroup)
    //Adding the url api of usgs to leaflet realtime
realtimeallhour = createRealtimeLayer('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson', subgroup1) //.addTo(map)
realtimeallday = createRealtimeLayer('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson', subgroup2);
realtimeallweek = createRealtimeLayer('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson', subgroup3) //.addTo(map)
realtimeallmonth = createRealtimeLayer('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson', subgroup4);
//basemaps for layer control
var baseMaps = {
    "OpenStreetMap": osm,
};

var overlayMaps = {
    'Earthquakes in hours': realtimeallhour,
    'Earthquakes in days': realtimeallday,
    'Earthquakes in weeks': realtimeallweek,
    'Earthquakes in months': realtimeallmonth
};
//layercontroll
var layerControl = L.control.layers(baseMaps, overlayMaps, { position: 'topleft' }).addTo(map);
//Legend for the SVG icon
var legend = L.control({ position: 'bottomright' });
legend.onAdd = function(map) {
    //created a container for the leggend
    var legendContainer = L.DomUtil.create("div", "legend"); // create a div with a class legend
    //creates a container for the symbols
    var symbolsContainer = L.DomUtil.create("div", "symbolsContainer");
    //Number for the classes
    var classes = [(min_E_Mag), ((max_E_Mag - min_E_Mag) / 2), (max_E_Mag)];
    var legendCircle;
    var lastRadius = 0;
    var currentRadius;
    var margin;
    //Styling for The legend
    L.DomEvent.addListener(legendContainer, 'mousedown', function(e) {
        L.DomEvent.stopPropagation(e);
    });
    $(legendContainer).append("<h2 id='legendTitle'>Earthquakes By magnitude</h2>");
    // Looping to gain the legend titles and symbols
    for (var i = 0; i <= classes.length - 1; i++) {
        legendCircle = L.DomUtil.create("div", "legendCircle");
        var area = classes[i] * ScaleFactor;
        currentRadius = Math.sqrt(area / Math.PI) * 7;

        // Adjust the icon size based on magnitude
        var iconSize = currentRadius * 2; // You can adjust this factor according to your preference

        // Set a fixed margin to ensure alignment and space between icons
        var margin = 6; // Adjust this value to set the space between icons

        // Calculate the total width including icon size and margin
        var totalWidth = iconSize + 2 * margin;

        // Set the style for the legend circle/svg icon
        $(legendCircle).attr("style", "width: " + iconSize + "px; height: " + iconSize + "px; margin-right: " + margin + "px");
        legendCircle.innerHTML += ("<img src=earthquake.svg height='" + iconSize + "' width='" + iconSize + "'>");
        $(legendCircle).append("<span class='legendValue'>" + '<br>' + classes[i] + "</span>");

        // Append the legend circle to the symbols container
        $(symbolsContainer).append(legendCircle);

        // Adjust the margin for the next legend circle
        if (i < classes.length - 1) {
            $(symbolsContainer).append("<div style='width: " + margin + "px; display: inline-block;'></div>");
        }
    }

    $(legendContainer).append(symbolsContainer);
    return legendContainer;
};
legend.addTo(map);

var info = L.control();

info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};
info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function(props) {
    this._div.innerHTML = '<h4>Earthquake Information</h4>' + (props ?
        '<b>' + props.place + '</b><br />' +
        '<p>' + new Date(props.time) +
        '<br/>Magnitude: <strong>' + props.mag + '</strong></p>' +
        '<br/>Alert Message: <strong>' + props.alert + '</strong></p>' +
        '<br/>Tsunami occurence: <strong>' + props.tsunami + '</strong></p>' +
        '<p><a href="' + props.url + '">More information</a></p>' :
        'Hover over an occured earthquake');
};

// functions to alter the info controll
function highlightFeature(e) {
    var layer = e.target;
    var properties = layer.feature.properties;
    info.update(properties);
}

function resetHighlight(e) {
    info.update();
}
info.addTo(map);