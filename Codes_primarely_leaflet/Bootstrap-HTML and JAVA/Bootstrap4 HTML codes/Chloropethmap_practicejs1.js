//Declaration of variables containing latitude and longitude
var myLat=31.1704;
var myLong=72.7097;
var zoom=12;
var population;
var PunjabpLayer1;
var PunjabpLayer2;
var PunjabpLayer3;
//var PunjabpLayer1;
//Fuction which contains color  regarding population of the countries for 2010//
function getColor1(d) {
    return d > 1500 ? '#800026' :
           d > 1000  ? '#BD0026' :
           d > 900  ? '#E31A1C' :
           d > 800  ? '#FC4E2A' :
           d > 700   ? '#FD8D3C' :
           d > 500   ? '#FEB24C' :
           d > 400   ? '#FED976' :
                      '#FFEDA0';
}
//Function for styling the geojson layer//
function style1(feature) {
    return {
        fillColor: getColor1(feature.properties.pop_dens10),//contains the features property which is varying
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.9
    };
}

function style2(feature) {
    return {
        fillColor: getColor1(feature.properties.pop_dens15),//contains the features property which is varying
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.9
    };
}

function style3(feature) {
    return {
        fillColor: getColor1(feature.properties.pop_dens20),//contains the features property which is varying
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
    PunjabpLayer1.resetStyle(e.target);
    PunjabpLayer2.resetStyle(e.target);
    PunjabpLayer3.resetStyle(e.target);
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


var sliderControl = null;
//creation of a map variable
var map=L.map('Map',{zoomControl: false,fullscreenControl:true,fullscreenControlOptions: {position:'topleft'}}).setView([myLat,myLong],zoom);
//map tile layer
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', { 
		attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors', 
        minZoom:2
		//maxBounds: mybounds
}).addTo(map);
//Home button on the map
var zoomHome = L.Control.zoomHome({homeZoom:6.5}).addTo(map);
//adding  geojson layers
PunjabpLayer1=L.geoJSON(punjabp,{style: style1,onEachFeature: addToFeature})//.addTo(map)
PunjabpLayer2=L.geoJSON(punjabp,{style: style2,onEachFeature: addToFeature})
PunjabpLayer3=L.geoJSON(punjabp,{style: style3,onEachFeature: addToFeature})
//for the bounds
map.fitBounds(PunjabpLayer1.getBounds())
//Layergrouping for adding layers
var population2010 = L.layerGroup([PunjabpLayer1],{time:"2010"});
var population2015 = L.layerGroup([PunjabpLayer2],{time:"2015"});
var population2020 = L.layerGroup([PunjabpLayer3],{time:"2020"});
//variable to be put in time slider
//var population=L.LayerGroup([population2010,population2015,population2020])
//feature group allows us to interact with all the layers at once
population=L.featureGroup([population2010,population2015,population2020])
var overlayMaps = {
	"Population":population,
	//"Population2015":population2015,
	//"Population2020":population2020
};
//Layer control
var lcontrol=L.control.layers(null, overlayMaps).addTo(map);
/*to remove the population layer if necessary and you do not nececcarly need to use it
//lcontrol.removeLayer(Layergroup)
//The code for the first time-slider
//var Slider= L.control.timelineSlider({position:"topright"}).addTo(map);
*/
//The code for the second time slider that works with geojson and layer grouping in time slider
var sliderControl = L.control.sliderControl({position: "topright",layer:population,/*timeAttribute: "DateStart"*/follow: 1,range:true});
//Make sure to add the slider to the map
//map.addControl(sliderControl);
//And initialize the slider
//sliderControl.startSlider();
//A leaflet control to view additional information like the number of people per Square Km of area
var info = L.control();

        info.onAdd = function(map) {
            this._div = L.DomUtil.create('div', 'info');
            this.update();
            return this._div;
        };

        info.update = function(props) {
            if (props) {
                    var labels = ['pop10', 'pop15','pop20'];
                    var data = [props.pop_dens10,props.pop_dens15,props.pop_dens20];
                    console.log('labels', labels, 'data', data);
                    var dems = '<h4>Population density</h4>' +  '<br />' + (props ? props.Districts + ' District' + '<br />' + '<br />'  :'hover over a country');
                    dems += '<canvas id="myChart" width="10" height="10"></canvas>';
                    this._div.innerHTML = dems;
                    newChart(labels, data);
            }

                console.log('props:', props);
        };

        info.addTo(map);
var newChart = function(labels, data) {
        var dataLength = labels ? labels.length : 0;
        console.log
        console.log('we\'re in newChart', labels, data);
        var backgroundColors = ['rgba(235,127,134, 0.9)',
                                'rgba(206,102,147, 0.9)',
                                'rgba(129,55,83, 0.9)',
                                'rgba(211,156,131, 0.9)',
                                'rgba(153, 102, 255, 0.9)',
                                'rgba(255, 159, 64, 0.9)'];
        var colors = [];
        for (var i = 0; i < dataLength; i++) {
            colors.push(backgroundColors[i]);
        };
        console.log('newChart colors', colors);
        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: '# of Votes',
                        data: data,
                        backgroundColor: colors,
                        borderColor: colors,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
    };

//info3.addTo(map);
var legend = L.control({position : 'bottomright'});
			legend.onAdd = function(map){
				var div = L.DomUtil.create('div', 'legend'); // create a div with a class legend
				var label = [
					"kept empty"
				];
				var grades = [0, 400, 500,700, 800, 900,1000,1500]; // this defines the ranges
				div.innerHTML = '<div>Legend</div>'; // name or heading of legend
				for(var i = 0; i < grades.length; i++){
					div.innerHTML +=
                    '<i style="background:' + getColor1(grades[i] + 1) + '"></i> ' +
                    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
				}
				return div;
			}
			//legend.addTo(map);

// overlayadd is a LayersControlEvent which is fired when an overlay is selected through the layer control.
map.on('overlayadd', function (eventLayer) {
    //Show legend...
    if (eventLayer.name === 'Population') {
        // to add the legend to the map
        this.addControl(legend);
        // to add the information control on to the map
        this.addControl(info);
        //Adding and initializing Slider control
        this.addControl(sliderControl)
        sliderControl.startSlider();

    }
});

//overlayremove is a LayersControlEvent which is fired when an overlay is deselected through the layer control.
map.on('overlayremove', function (eventLayer) {
    // hide legend
    if (eventLayer.name === 'Population') {
        this.removeControl(legend)
        this.removeControl(info)
        this.removeControl(sliderControl);// removes the legend when you uncheck the option in layer control 
    }
});
//Function for having a button outside the map to remove anything from map on click
/*
$("#Button1").click(function(event) {
    event.preventDefault();
    if(map.hasLayer(population)==false) {
    	map.addLayer(population)
        map.addControl(legend)// slider vanishes
        map.addControl(sliderControl)
        sliderControl.startSlider();// slider vanishes
    } else if (map.hasLayer(population)==true) {
    	map.removeLayer(population);
        map.removeControl(legend)
        map.removeControl(sliderControl)
    }
});             
*/








/* function to label lauers
var infopopdensity = L.control();

        infopopdensity.onAdd = function(map) {
            this._div = L.DomUtil.create('div', 'infopopdensity');
            this.update();
            return this._div;
        };

        infopopdensity.update = function(props) {
            if (props) {
                    var labelspopdensity = ['Popd2010', 'Popd2015','Popd2019'];
                    var datapopdensity = [props.S_D_2010,props.S_D_2015,props.S_D_2019];
                    var labelspopdensity2 = ['P2010', 'P2015','P2019'];
                    var datapopdensity2 = [props.S_N_2010,props.S_N_2015,props.S_N_2019];
                    console.log('labels', labelspopdensity, 'data', datapopdensity);
                    console.log('labels', labelspopdensity2, 'data', datapopdensity2);
                    var dems2 = '<h4>Population Density</h4>' +  '<br />' + (props ? props.Districts + ' District' + '<br />' + '<br />'  :'hover over a country');
                    dems2 += '<canvas id="myChartpopdensity" width="200" height="200"></canvas>';
                    this._div.innerHTML = dems2;
                    newChartpopdensity(labelspopdensity, datapopdensity,labelspopdensity2,datapopdensity2);
            }

                console.log('props:', props);
        };
//chart for choropleth of ndvi
var newChartpopdensity = function(labelspopdensity, datapopdensity,labelspopdensity2,datapopdensity2) {
        var dataLengthpopdensity = labelspopdensity ? labelspopdensity.length : 0;
        var dataLengthpopdensity2 = labelspopdensity2 ? labelspopdensity2.length : 0;
        console.log
        console.log('Population density', labelspopdensity, datapopdensity);
        var backgroundColors = ['red'];
        var backgroundColors2 = ['blue'];
        var colors = [];
        for (var i = 0; i < dataLengthpopdensity & dataLengthpopdensity2 ; i++) {
            colors.push(backgroundColors[i]);
            colors.push(backgroundColors2[i]);
        };
        console.log('newChartpopdensity colors', colors);
        var ctx3 = document.getElementById("myChartpopdensity");
                var lineChartData = {
            labels: ['2010', '2015', '2019'],
            datasets: [{
                label: 'My First dataset',
                backgroundColors: 'red',
                fill: false,
                fillColor: "rgba(0,0,0,0)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(200,122,20,1)",
                data:datapopdensity,
            }, {
                label: 'My Second dataset',
                backgroundColors2:'blue',
                fill: false,
                fillColor: 'rgba(0,0,0,0)',
                strokeColor: 'rgba(220,180,0,1)',
                pointColor: 'rgba(220,180,0,1)',
                data:datapopdensity2
            }]
        };

        var myChartpopdensity = new Chart(ctx3, {
                type: 'line',
                data:lineChartData,
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:false
                            }
                        }]
                    }
                }
            });
    };
function label(feature, layer) {
    layer.bindTooltip(feature.properties.Districts);
}
/*
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


















/*Old Code.

//adding  geojson layers
var PunjabpLayer1=L.geoJSON(punjabp,{style: style1})//.addTo(map)
var PunjabpLayer2=L.geoJSON(punjabp,{style: style2})
var PunjabpLayer3=L.geoJSON(punjabp,{style: style3})
//for the bounds
map.fitBounds(PunjabpLayer1.getBounds())
//Layergrouping for adding layers
var population2010 = L.layerGroup([PunjabpLayer1]);// population of year 2010
var population2015 = L.layerGroup([PunjabpLayer2]);
var population2020 = L.layerGroup([PunjabpLayer3]);
//variable to be put in time slider
var population=L.layerGroup([population2010,population2015,population2020])
var overlayMaps = {
	"Population":population,
	//"Population2015":population2015,
	//"Population2020":population2020
};
var lcontrol=L.control.layers(null, overlayMaps).addTo(map);
/*to remove the population layer if necessary and you do not nececcarly need to use it
lcontrol.removeLayer(population)

//The code for the first time-slider
//var Slider= L.control.timelineSlider({position:"topright"}).addTo(map);
//The code for the second time slider that works with geojson
//layer grouping in time slider 
var sliderControl = L.control.sliderControl({position: "bottomleft",layer:population, follow: 1});
//Make sure to add the slider to the map
map.addControl(sliderControl);
//And initialize the slider
sliderControl.startSlider();

var legend = L.control({position : 'bottomright'});
			legend.onAdd = function(map){
				var div = L.DomUtil.create('div', 'legend'); // create a div with a class legend
				var label = [
					"kept empty"
				];
				var grades = [0, 400, 500,700, 800, 900,1000,1500]; // this defines the ranges
				div.innerHTML = '<div>Legend</div>'; // name or heading of legend
				for(var i = 0; i < grades.length; i++){
					div.innerHTML +=
                    '<i style="background:' + getColor1(grades[i] + 1) + '"></i> ' +
                    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
				}
				return div;
			}
			legend.addTo(map);
//overlayremove is a LayersControlEvent which is fired when an overlay is deselected through the layer control.
map.on('overlayremove', function (eventLayer) {
    // hide legend
    if (eventLayer.name === 'Population') {
        this.removeControl(legend);
        //this.removeControl(sliderControl);// removes the legend when you uncheck the option in layer control 
    }
});
// overlayadd is a LayersControlEvent which is fired when an overlay is selected through the layer control.
map.on('overlayadd', function (eventLayer) {

    //Show legend...
    if (eventLayer.name === 'Population2010') {
        this.addControl(legend);
        //this.addControl(sliderControl);
    }
});
/*Function for having a button outside the map to remove anything from map on click
$("#Button1").click(function(event) {
    event.preventDefault();
    if(map.hasLayer(population2010)) {
        map.removeLayer(population2010);
        map.removeControl(legend)
        map.removeControl(sliderControl)
    } else if (map.hasLayer(population2010)==false) {
    	map.addLayer(population2010)
        map.addControl(legend,sliderControl)// slider vanishes
    }
});
// for marker
//var point=[30.3753,69.3451]
//var marker=L.marker(point)
//marker.addTo(map)

//Simple popups
//marker.bindPopup('<b>Pakistan</b>')
*/

// for marker
//var point=[30.3753,69.3451]
//var marker=L.marker(point)
//marker.addTo(map)

//Simple popups
//marker.bindPopup('<b>Pakistan</b>')