//Declaration of variables containing latitude and longitude
var myLat = 31.1704;
var myLong = 72.7097;
var zoom = 12;
var CLMdataset;
//Fuction which contains color  regarding population of the countries for 2010//
function getColor1(d) {
    return d == 0 ? '#800026' :
        d == 1 ? '#BD0026' :
        d == 2 ? '#E31A1C' :
        d == 3 ? '#FC4E2A' :
        '#FFEDA0';
}
//Function for styling the geojson layer//
function style1(feature) {
    return {
        fillColor: getColor1(feature.properties.pop_dens10), //contains the features property which is varying
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.9
    };
}

function highlight(e) {
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
    info.update(layer.feature.properties);
}
// function to style the layer to their defult style
function resetHighlight(e) {
    CLMdataset.resetStyle(e.target);
    // Send information to the info class defined below:
    info.update();
}

function addToFeature(feature, layer) {
    // Grab the layer and perform the actions
    layer.on({
        mouseover: highlight,
        mouseout: resetHighlight
    });
}
//Function for styling the geojson layer//
//creation of a map variable
var map = L.map('Map', { zoomControl: false, fullscreenControl: true, fullscreenControlOptions: { position: 'topleft' } }).setView([myLat, myLong], zoom);
//map tile layer
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 2
        //maxBounds: mybounds
}).addTo(map);
//Home button on the map
var zoomHome = L.Control.zoomHome({ homeZoom: 6.5 }).addTo(map);
//adding  geojson layers
CLMdataset = L.geoJSON(punjabp, { style: style1, onEachFeature: addToFeature }) //.addTo(map)
    //for the bounds
map.fitBounds(CLMdataset.getBounds())
    //Layergrouping for adding layers
var clmdata1 = L.layerGroup([CLMdataset]);
//feature group allows us to interact with all the layers at once
var datatoshow = L.featureGroup([clmdata1])
var overlayMaps = {
    "CLM": datatoshow,
    //"Population2015":population2015,
    //"Population2020":population2020
};
//Layer control
var lcontrol = L.control.layers(null, overlayMaps).addTo(map);

//A leaflet control to view additional information like the number of people per Square Km of area
var info = L.control();

info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function(props) {
    if (props) {
        var labels = ['Value', 'Longitude', 'Latitude'];
        var data = [props.dataNode, props.longitude, props.latitude];
        console.log('labels', labels, 'data', data);
        var dems = '<h4>CLM Representation</h4>' + '<br />' + (props ? props.name + ' Discription' + '<br />' + '<br />' : 'hover over a region');
        dems += '<canvas id="myChart" width="10" height="10"></canvas>';
        this._div.innerHTML = dems;
    }

    console.log('props:', props);
};

info.addTo(map);