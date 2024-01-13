//to scroll to the bottom of the page
function myFunction() {
  var elmnt = document.getElementById("buttonbottom");
  elmnt.scrollIntoView();
}
//to scroll to the top of the page
function myFunction2() {
  var elmnt = document.getElementById("top");
  elmnt.scrollIntoView();
}
function myFunction3() {
    location.href = 'Thematicmapshtml.html';
}
function myFunction4() {
    location.href = "graphicalhtml.html";
}
// Declaring important variables
var myLat=33.673038;
var myLong=72.984138;
var zoom=7;
var coronavirus;
var coronavirus2;
var coronavirus3;
/*
// declaring the map
var map=L.map('Map',{zoomControl: false,fullscreenControl:true,fullscreenControlOptions: {position:'topleft'}}).setView([myLat,myLong],zoom);
//title Layers//
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', { 
        attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors', 
        maxZoom: 18,
        minZoom:2
        //maxBounds: mybounds
}).addTo(map);
*/
L.mapbox.accessToken = 'pk.eyJ1IjoibXVzdGFmYTA1IiwiYSI6ImNrNm1ocHBzNTBldDIzanJ1ODJqc2dzYjMifQ.ppQmulUBSdoPSzVXjT23Dw';
var map = L.map('Map',{zoomControl: false,fullscreenControl:true,fullscreenControlOptions: {position:'topleft'}}).setView([myLat, myLong], zoom).addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));
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
//Home button on the map
var zoomHome = L.Control.zoomHome({homeZoom:7}).addTo(map);
// Creating Layer groups for  march, april and june
var covid19PakistanMarch2020 = L.layerGroup()
var covid19PakistanApril = L.layerGroup()
var covid19PakistanJune2020 = L.layerGroup()
//for search bar
var finalmap_search=  L.geoJson(coronapak,{
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
//This is the Map of coronavirus for 24th March 2020
coronavirus = L.geoJson(coronapak, {
    onEachFeature: function (feature, layer) {
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //Assigning the data to be shown on the bar-chart
            var options={
                data:{
                    'Covid-19 Cases March':feature.properties.Total_corona_cases_March,
                    'Covid-19 deaths March':feature.properties.Total_corona_death_March,
                    'Covid-19 recoveries March':feature.properties.Total_corona_recoveries_March,
                },
                //coloring options
                chartOptions:{
                    'Covid-19 Cases March':{
                        fillColor: '#F9FF33',
                        minValue: feature.properties.Total_corona_cases_March,
                        maxValue: feature.properties.Total_corona_cases_March,
                        maxHeight: Math.sqrt(feature.properties.Total_corona_cases_March),
                        //displaying text when you hover over the bar which does not work
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Covid-19 deaths March':{
                        fillColor: '#FF3333',
                        minValue: feature.properties.Total_corona_death_March,
                        maxValue: feature.properties.Total_corona_death_March,
                        maxHeight: Math.sqrt(feature.properties.Total_corona_death_March),
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Covid-19 recoveries March':{
                        fillColor: '#33FF46',
                        minValue: feature.properties.Total_corona_recoveries_March,
                        maxValue: feature.properties.Total_corona_recoveries_March,
                        maxHeight: Math.sqrt(feature.properties.Total_corona_recoveries_March),
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                },
                weight: 1,
                color: '#000000',
            }
            // Use center to put marker on map
            var coronamarkerMarch2020 = new L.BarChartMarker([feature.properties.Latitude,feature.properties.Longitude], options)
            // A pop up which shows the data
            coronamarkerMarch2020.bindPopup("The District is:"+ feature.properties.District+'<hr>'+"Read the barchart From left to right"+'<hr>'+"The First Bar Shows The total confirmed corona cases for March in absolute term, which is:"+feature.properties.Total_corona_cases_March+'<hr>'+"The Second bar shows the total confirmed death due to Covid-19 for March in absolute terms, which is:"+feature.properties.Total_corona_death_March+'<hr>'+"The Third Bar shows the total recovered for March in absolute terms, which is:"+feature.properties.Total_corona_recoveries_March)
            //in order to add markers to layer group
            covid19PakistanMarch2020.addLayer(coronamarkerMarch2020);
            map.addLayer(covid19PakistanMarch2020)

    }
})//.addTo(map) this will show the polugon boundries
// Layer group that contains the data for  march
var March2020 = L.layerGroup([covid19PakistanMarch2020],{time:"March 2020"});
//This is the Map of coronavirus for  April 2020
coronavirus2 = L.geoJson(coronapak, {
    onEachFeature: function (feature, layer) {
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //Assigning the data to be shown on the bar-chart
            var options={
                data:{
                    'Covid-19 Cases April2020':feature.properties.Total_corona_cases_April,
                    'Covid-19 deaths April2020':feature.properties.Total_corona_death_April,
                    'Covid-19 recoveries April2020':feature.properties.Total_corona_recoveries_April,
                },
                //coloring options
                chartOptions:{
                    'Covid-19 Cases April2020':{
                        fillColor: '#F9FF33',
                        minValue: feature.properties.Total_corona_cases_April,
                        maxValue: feature.properties.Total_corona_cases_April,
                        maxHeight: Math.sqrt(feature.properties.Total_corona_cases_April),
                        //displaying text when you hover over the bar which does not work
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Covid-19 deaths April2020':{
                        fillColor: '#FF3333',
                        minValue: feature.properties.Total_corona_death_April,
                        maxValue: feature.properties.Total_corona_death_April,
                        maxHeight: Math.sqrt(feature.properties.Total_corona_death_April),
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Covid-19 recoveries April2020':{
                        fillColor: '#33FF46',
                        minValue: feature.properties.Total_corona_recoveries_April,
                        maxValue: feature.properties.Total_corona_recoveries_April,
                        maxHeight: Math.sqrt(feature.properties.Total_corona_recoveries_April),
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                },
                weight: 1,
                color: '#000000',
            }
            // Use center to put marker on map
            var coronamarkerApril = new L.BarChartMarker([feature.properties.Latitude,feature.properties.Longitude], options)
            // A pop up which shows the data
            coronamarkerApril.bindPopup("The District  is:"+ feature.properties.District+'<hr>'+"Read the barchart From left to right"+'<hr>'+"The First Bar Shows The total confirmed corona cases for April in absolute term, which is:"+feature.properties.Total_corona_cases_April+'<hr>'+"The Second bar shows the total confirmed death due to Covid-19 for April in absolute terms, which is:"+feature.properties.Total_corona_death_April+'<hr>'+"The Third Bar shows the total recovered for April in absolute terms, which is:"+feature.properties.Total_corona_recoveries_April)
            //in order to add markers to layer group
            covid19PakistanApril.addLayer(coronamarkerApril);
            map.addLayer(covid19PakistanApril)
    }
})//.addTo(map) this will show the polugon boundries
// Layer group that contains the data for 24th march

var April2020 = L.layerGroup([covid19PakistanApril],{time:"April 2020"});
map.fitBounds(coronavirus.getBounds())
//Creating charts for June 2020 data
coronavirus3 = L.geoJson(coronapak, {
    onEachFeature: function (feature, layer) {
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //Assigning the data to be shown on the bar-chart
            var options={
                data:{
                    'Covid-19 Cases June2020':feature.properties.Total_corona_cases_June,
                    'Covid-19 deaths June2020':feature.properties.Total_corona_death_June,
                    'Covid-19 recoveries June2020':feature.properties.Total_corona_recoveries_june,
                },
                //coloring options
                chartOptions:{
                    'Covid-19 Cases June2020':{
                        fillColor: '#F9FF33',
                        minValue: feature.properties.Total_corona_cases_June,
                        maxValue: feature.properties.Total_corona_cases_June,
                        maxHeight: Math.sqrt(feature.properties.Total_corona_cases_June),
                        //displaying text when you hover over the bar which does not work
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Covid-19 deaths June2020':{
                        fillColor: '#FF3333',
                        minValue: feature.properties.Total_corona_death_June,
                        maxValue: feature.properties.Total_corona_death_June,
                        maxHeight: Math.sqrt(feature.properties.Total_corona_death_June),
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                    'Covid-19 recoveries June2020':{
                        fillColor: '#33FF46',
                        minValue: feature.properties.Total_corona_recoveries_june,
                        maxValue: feature.properties.Total_corona_recoveries_june,
                        maxHeight: Math.sqrt(feature.properties.Total_corona_recoveries_june),
                        displayText: function (value){
                             return value.toFixed(2);
                        }
                    },
                },
                weight: 1,
                color: '#000000',
            }
            // Use center to put marker on map
            var coronamarkerJune = new L.BarChartMarker([feature.properties.Latitude,feature.properties.Longitude], options)
            // A pop up which shows the data
            coronamarkerJune.bindPopup("The Country is:"+ feature.properties.District+'<hr>'+"Read the barchart From left to right"+'<hr>'+"The First Bar Shows The total confirmed corona cases for June in absolute term, which is:"+feature.properties.Total_corona_cases_June+'<hr>'+"The Second bar shows the total confirmed death due to Covid-19 for June in absolute terms, which is:"+feature.properties.Total_corona_death_June+'<hr>'+"The Third Bar shows the total recovered for June in absolute terms, which is:"+feature.properties.Total_corona_recoveries_june)
            //in order to add markers to layer group
            covid19PakistanJune2020.addLayer(coronamarkerJune);
            map.addLayer(covid19PakistanJune2020)
    }
})//.addTo(map) this will show the polugon boundries
// Layer group that contains the data for 24th march

var June2020 = L.layerGroup([covid19PakistanJune2020],{time:"June 2020"});
map.fitBounds(coronavirus.getBounds())
// Creating a Feature group that contains all the maps
covid19_from_March_till_June2020=L.featureGroup([March2020,April2020,June2020])
var overlay = {
    'Covid19':covid19_from_March_till_June2020
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
var sliderControl = L.control.sliderControl({position: "topleft",layer:covid19_from_March_till_June2020,follow: 1,range:true});
//For adding the control
map.addControl(sliderControl)
//initiating the slider controler
sliderControl.startSlider()
//For leaflet Search Control
var searchControl= new L.Control.Search({
    layer: finalmap_search,
    propertyName: 'District',
    marker: false,
    position:'topleft',
    zoom: 12
});
map.addControl( searchControl );  //inizialize search control
// Creating the legend
var legend = L.control({position : 'bottomright'});
            legend.onAdd = function(map){
                var div = L.DomUtil.create('div', 'legend'); // create a div with a class legend
                var label = [
                    "kept empty"
                ];
                // these are the div elements

                div.innerHTML = '<div>Legend</div>'; // name or heading of legend
                //These are the legend entries
                    div.innerHTML += '<i style="background: #F9FF33"></i><span>Total Confirmed Covid-19 Cases</span><br>';
                    div.innerHTML += '<i style="background: #FF3333"></i><span>Total Deaths</span><br>';
                    div.innerHTML += '<i style="background: #33FF46"></i><span>Total Recovered</span><br>';
                return div;
            }
legend.addTo(map)

//function to click image to fullscreen
$(document).ready(function() {
  $('a').click( function(e) {
      e.preventDefault();
      $("#hidden").show();
  });
  $('.close').click(function(){
      $("#hidden").hide();
  })
});