// Declaring important variables
var myLat=43.8476;
var myLong=18.3564;
var zoom=13;
// declaring the map

L.mapbox.accessToken = 'pk.eyJ1IjoibXVzdGFmYTA1IiwiYSI6ImNrNm1ocHBzNTBldDIzanJ1ODJqc2dzYjMifQ.ppQmulUBSdoPSzVXjT23Dw';
var map = L.map('Map',{zoomControl: false,fullscreenControl:true,fullscreenControlOptions: {position:'topleft'}}).setView([myLat, myLong], zoom).addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));
/*
var map = new L.Map('Map');
map.setView([52.51836, 13.40438], 16, false);
new L.TileLayer('https://api.mapbox.com/styles/v1/osmbuildings/cjt9gq35s09051fo7urho3m0f/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoib3NtYnVpbGRpbmdzIiwiYSI6IjNldU0tNDAifQ.c5EU_3V8b87xO24tuWil0w', {
  attribution: '© Map <a href="https://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  maxNativeZoom: 20
}).addTo(map);
*/
//var map = new L.Map('Map').setView([52.50440, 13.33522], 17);


//var osmb = new OSMBuildings(map).load()
/*
var basemaps =[
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
    maxZoom: 16,
    minZoom:2,
    label: 'Esri NatGeo'
}).addTo(map),
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
    label: 'Esri World topography map'
})
]
*/
/*
//for graphs
var width = 1000,
    height = 800,
    boxWidth = 150,
    boxHeight = 35,
    gap = {
        width: 50,
        height: 12
    },
    margin = {
        top: 16,
        right: 16,
        bottom: 16,
        left: 16
    },
    svg;
*/
//function for choropleth
function getColor(d) {
    return d > 1200 ? '#800026' :
           d > 670  ? '#BD0026' :
           d > 380  ? '#E31A1C' :
           d > 160  ? '#FC4E2A' :
           d > 100   ? '#FD8D3C' :
           d > 60   ? '#FEB24C' :
           d > 30   ? '#FED976' :
                      '#FFEDA0';
}
//Function for styling the geojson layer//
function style1(feature) {
    return {
        fillColor: getColor(feature.properties.density_20),//contains the features property which is varying
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.9
    };
}
// Population dessity map
pop = L.geoJson(covid19, {
    style: style1,
    onEachFeature: function (feature, layer) {
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
           layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
    });


    }
})//.addTo(map)
map.addLayer(pop)
//function for higlight
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    info.update(layer.feature.properties);
}
//reseting higlight
function resetHighlight(e) {
    pop.resetStyle(e.target);
    info.update();
}
//Home button on the map
var zoomHome = L.Control.zoomHome({homeZoom:4.5}).addTo(map);
// Creating Layer groups for 24th march and 30th June
var covid19Map24thMarch2020 = L.layerGroup()
var covid19Map30thJune2020 = L.layerGroup()
var population=L.layerGroup()


//This is the Map of coronavirus for 24th March 2020
coronavirus = L.geoJson(covid19, {
    onEachFeature: function (feature, layer) {
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //Assigning the data to be shown on the bar-chart
            var options={
                data:{
                    'Covid-19 Cases':feature.properties.total_coronavirus_cases_24March,
                    'Covid-19 deaths':feature.properties.total_coronavirus_deaths_24March,
                    'Covid-19 recoveries':feature.properties.total_coronavirus_recoveries_24March,
                },
                //coloring options
                chartOptions:{
                    'Covid-19 Cases':{
                        fillColor: '#F9FF33',
                        minValue: feature.properties.total_coronavirus_cases_24March,
                        maxValue: feature.properties.total_coronavirus_cases_24March,
                        maxHeight: Math.sqrt(feature.properties.total_coronavirus_cases_24March)/5,
                        //displaying text when you hover over the bar which does not work
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Covid-19 deaths':{
                        fillColor: '#FF3333',
                        minValue: feature.properties.total_coronavirus_deaths_24March,
                        maxValue: feature.properties.total_coronavirus_deaths_24March,
                        maxHeight: Math.sqrt(feature.properties.total_coronavirus_deaths_24March)/5,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Covid-19 recoveries':{
                        fillColor: '#33FF46',
                        minValue: feature.properties.total_coronavirus_recoveries_24March,
                        maxValue: feature.properties.total_coronavirus_recoveries_24March,
                        maxHeight: Math.sqrt(feature.properties.total_coronavirus_recoveries_24March)/5,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                },
                weight: 1,
                color: '#000000',
            }
            // Use center to put marker on map
            var coronamarker24thMarch = new L.BarChartMarker([feature.properties.latitude,feature.properties.longitude], options)
            // A pop up which shows the data
            coronamarker24thMarch.bindPopup("The Country is:"+ feature.properties.NAME_LONG+'<hr>'+"The population density is:"+feature.properties.density_20+'<hr>'+"Read the barchart From left to right"+'<hr>'+"The First Bar Shows The total confirmed corona cases for 24th March in absolute term, which is:"+feature.properties.total_coronavirus_cases_24March+'<hr>'+"The Second bar shows the total confirmed death due to Covid-19 for 24th March in absolute terms, which is:"+feature.properties.total_coronavirus_deaths_24March+'<hr>'+"The Third Bar shows the total recovered for 24th March in absolute terms, which is:"+feature.properties.total_coronavirus_recoveries_24March)
            //in order to add markers to layer group
            covid19Map24thMarch2020.addLayer(coronamarker24thMarch);
            map.addLayer(covid19Map24thMarch2020)

    }
})//.addTo(map) this will show the polugon boundries
// Layer group that contains the data for 24th march
var March24th = L.layerGroup([covid19Map24thMarch2020],{time:"24th March 2020"});
//This is the Map of coronavirus for 30th June 2020
coronavirus2 = L.geoJson(covid19, {
    onEachFeature: function (feature, layer) {
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //Assigning the data to be shown on the bar-chart
            var options={
                data:{
                    'Covid-19 Cases':feature.properties.total_coronavirus_cases_30June,
                    'Covid-19 deaths':feature.properties.total_coronavirus_deaths_30June,
                    'Covid-19 recoveries':feature.properties.total_coronavirus_recoveries_30June_2,
                },
                //coloring options
                chartOptions:{
                    'Covid-19 Cases':{
                        fillColor: '#F9FF33',
                        minValue: feature.properties.total_coronavirus_cases_30June,
                        maxValue: feature.properties.total_coronavirus_cases_30June,
                        maxHeight: Math.sqrt(feature.properties.total_coronavirus_cases_30June)/5,
                        //displaying text when you hover over the bar which does not work
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Covid-19 deaths':{
                        fillColor: '#FF3333',
                        minValue: feature.properties.total_coronavirus_deaths_30June,
                        maxValue: feature.properties.total_coronavirus_deaths_30June,
                        maxHeight: Math.sqrt(feature.properties.total_coronavirus_deaths_30June)/5,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Covid-19 recoveries':{
                        fillColor: '#33FF46',
                        minValue: feature.properties.total_coronavirus_recoveries_30June_2,
                        maxValue: feature.properties.total_coronavirus_recoveries_30June_2,
                        maxHeight: Math.sqrt(feature.properties.total_coronavirus_recoveries_30June_2)/5,
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                },
                weight: 1,
                color: '#000000',
            }
            // Use center to put marker on map
            var coronamarker30thJune = new L.BarChartMarker([feature.properties.latitude,feature.properties.longitude], options)
            // A pop up which shows the data
            coronamarker30thJune.bindPopup("The Country is:"+ feature.properties.NAME_LONG+'<hr>'+"The population density is:"+feature.properties.density_20+'<hr>'+"Read the barchart From left to right"+'<hr>'+"The First Bar Shows The total confirmed corona cases for 30th June in absolute term, which is:"+feature.properties.total_coronavirus_cases_30June+'<hr>'+"The Second bar shows the total confirmed death due to Covid-19 for 30th June in absolute terms, which is:"+feature.properties.total_coronavirus_deaths_30June+'<hr>'+"The Third Bar shows the total recovered for 30th March in absolute terms, which is:"+feature.properties.total_coronavirus_recoveries_30June_2)
            //in order to add markers to layer group
            covid19Map30thJune2020.addLayer(coronamarker30thJune);
            map.addLayer(covid19Map30thJune2020)
    }
})//.addTo(map) this will show the polugon boundries
// Layer group that contains the data for 24th march

var June30th = L.layerGroup([covid19Map30thJune2020],{time:"30th June 2020"});
map.fitBounds(coronavirus.getBounds())
// Creating a Feature group that contains all the maps
covid19_from_24thMarch_till_30thJune2020=L.featureGroup([March24th,June30th])
var overlay = {
    'Covid19':covid19_from_24thMarch_till_30thJune2020
};
//search control
/*
var searchControl= new L.Control.Search({
    layer: pop,
    propertyName: 'NAME',
    marker: false,
    position:'topleft',
    zoom: 4
});
map.addControl( searchControl );
*/
//To add the slider controler
var sliderControl = L.control.sliderControl({position: "topleft",layer:covid19_from_24thMarch_till_30thJune2020,follow: 1,range:true});
//For adding the control
map.addControl(sliderControl)
//initiating the slider controler
sliderControl.startSlider()
//Esri search control
var searchControl = new L.esri.Controls.Geosearch({position:"topleft"}).addTo(map);
//adding control to switch basemaps
/*
map.addControl(L.control.basemaps({
    position:"bottomleft",
    basemaps: basemaps,
    tileX: 0,  // tile X coordinate
    tileY: 0,  // tile Y coordinate
    tileZ: 1   // tile zoom level
}));
*/
// Creating the legend
var legend = L.control({position : 'bottomright'});
            legend.onAdd = function(map){
                var div = L.DomUtil.create('div', 'legend'); // create a div with a class legend
                var label = [
                    "kept empty"
                ];
                grades = [30, 60, 100, 160, 380, 670, 1200],
                // these are the div elements

                div.innerHTML = '<div>Legend</div>'; // name or heading of legend
                //These are the legend entries
                    div.innerHTML += '<i style="background: #F9FF33"></i><span>Total Confirmed Covid-19 Cases</span><br>';
                    div.innerHTML += '<i style="background: #FF3333"></i><span>Total Deaths</span><br>';
                    div.innerHTML += '<i style="background: #33FF46"></i><span>Total Recovered</span><br>';
                    div.innerHTML +='<hr>';
                    div.innerHTML += ' Population Density in people/km^2';
                    div.innerHTML +='<br>';
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
                }
                return div;
            }
legend.addTo(map)
//info 

var info = L.control();
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4> Population Density</h4>' +  (props ?
        '<b>' + props.NAME + '</b><br />' + props.density_20 + ' people / km<sup>2</sup>'
        : 'Hover over a Country');
};

info.addTo(map);
