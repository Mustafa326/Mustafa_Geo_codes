// Declaring important variables
var myLat=31.1704;
var myLong=72.7097;
var zoom=5;
//var myLat=43.8476
//var myLong=18.3564
//var zoom=13
var ScaleFactor=0.2
// declaring the map
var map=L.map('Map',{zoomControl: false,fullscreenControl:true,fullscreenControlOptions: {position:'topleft'}}).setView([myLat,myLong],zoom);
//map tile layer
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', { 
		attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors', 
        minZoom:2
		//maxBounds: mybounds
}).addTo(map);
//Home button on the map
var zoomHome = L.Control.zoomHome({homeZoom:6.5}).addTo(map);

// Creating a Bar-Chart with the Geogjon


var finalmaplst2010 = L.layerGroup();
final = L.geoJson(final, {
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
            var marker = L.marker(center).addTo(map)
            // Use center to put marker on map
            var lstmarker = new L.BarChartMarker(center, options)
            // A pop up which shows the data
            lstmarker.bindPopup("This is the District:"+ feature.properties.Districts+'<hr>'+"From left to right"+'<hr>'+"The First Bar Shows The Summer Day Temperature, which is:"+feature.properties.S_D_2010+"Celcius"+'<hr>'+"The Second bar shows the Winter Night Temperature, which is:"+feature.properties.W_N_2010+"Celcius"+'<hr>'+"The Third Bar shows the Winter Day Temperature, which is:"+feature.properties.W_D_2010+"Celcius"+'<hr>'+"The Frourth bar shows the SummerNight temperature,which is:"+feature.properties.S_N_2010+"Celcius")
            //in order to add markers to layer group
            finalmaplst2010.addLayer(lstmarker);
            map.addLayer(finalmaplst2010)
    }
})//.addTo(map) this will show the polugon boundries

var finalmaplst2011 = L.layerGroup();
final2011=L.geoJSON(final,{
     onEachFeature: function (feature, layer) {
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //Assigning the data to be shown on the bar-chart
            var marker= L.marker(center).addTo(map)
    }
}).addTo(map)
map.fitBounds(final.getBounds())
/*
var lcontrol=L.control.layers(null).addTo(map);

var sliderControl = L.control.sliderControl({position: "topright"});
map.addControl(sliderControl)
sliderControl.startSlider()
*/
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
                    div.innerHTML += '<i style="background: #FEE5D9"></i><span>Summer_Day</span><br>';
                    div.innerHTML += '<i style="background: #FCAE91"></i><span>Winter_Night</span><br>';
                    div.innerHTML += '<i style="background: #FB6A4A"></i><span>Winter_Day</span><br>';
                    div.innerHTML += '<i style="background: #FB6A4A"></i><span>Summer_Night</span><br>';
                
                return div;
            }
legend.addTo(map)
var finalmap=L.L.layerGroup([finalmaplst2010,finalmaplst2011]).addTo
//var sliderControl = L.control.sliderControl({position: "bottomleft",layer:finalmap,/*timeAttribute: "DateStart"*/follow: 1,range:true});
//add the slider
//map.addControl(sliderControl)
//And initialize the slider
//sliderControl.startSlider();

/* Sample radial meter marker
var minHue = 120;
        var maxHue = 0;
        var meterMarkerOptions = {
            data: {
                'Speed': Math.random() * 200
            },
            chartOptions: {
                'Speed': {
                    displayName: 'Speed',
                    displayText: function (value) {
                        return value.toFixed(1);
                    },
                    color: 'hsl(240,100%,55%)',
                    fillColor: 'hsl(240,80%,55%)',
                    maxValue: 200,
                    minValue: 0
                }
            },
            displayOptions: {
                'Speed': {
                    color: new L.HSLHueFunction(new L.Point(0,minHue), new L.Point(200,maxHue), {outputSaturation: '100%', outputLuminosity: '25%'}),
                    fillColor: new L.HSLHueFunction(new L.Point(0,minHue), new L.Point(200,maxHue), {outputSaturation: '100%', outputLuminosity: '50%'})
                }
            },
            fillOpacity: 0.8,
            opacity: 1,
            weight: 0.5,
            radius: 30,
            barThickness: 15,
            maxDegrees: 360,
            rotation: 0,
            numSegments: 10
        };

        var marker = new L.RadialMeterMarker(new L.LatLng(31.1704, 72.7097), meterMarkerOptions);
        map.addLayer(marker)
*/
/* Sample barchart with randomn data (for practice)
var options = {
    data: {
        'dataPoint1': Math.random() * 20,
        'dataPoint2': Math.random() * 20,
        'dataPoint3': Math.random() * 20,
        'dataPoint4': Math.random() * 20
    },
    chartOptions: {
        'dataPoint1': {

            minValue: 0,
            maxValue: 20,
            maxHeight: 20,
            displayText: function (value) {
                return value.toFixed(2);
            }
        },
        'dataPoint2': {

            minValue: 0,
            maxValue: 20,
            maxHeight: 20,
            displayText: function (value) {
                return value.toFixed(2);
            }
        },
        'dataPoint3': {

            minValue: 0,
            maxValue: 20,
            maxHeight: 20,
            displayName: 'Romney',
            displayText: function (value) {
                return value;
            }
        },
        'dataPoint4': {

            minValue: 0,
            maxValue: 20,
            maxHeight: 20,
            displayText: function (value) {
                return value;
            }
        }
    },
}

var barChartMarker = new L.BarChartMarker(new L.LatLng(31.1704, 72.7097), options);
barChartMarker.on({
    mouseover(e){
        this.bindTooltip("lala")
    },
    mouseout(e){
        this.closePopup()
    }
})
map.addLayer(barChartMarker);
*/
/*
var marker = new L.MapMarker(new L.LatLng(0, 0), {
    radius: 10,
    // L.Path style options
});

map.addLayer(marker);
*/
//Old code
/*
var zoomHome = L.Control.zoomHome({homeZoom:6.5}).addTo(map);
// declaring the layer group
var corona_covid = L.layerGroup().addTo(map);
//Adding the geojson
covid = L.geoJson(corona, {
    onEachFeature: function (feature, layer) {
        // Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            // Use center to put marker on map
            var marker = L.circleMarker(center,
                {
                	//radius:1.0083 * Math.pow(feature.properties.total_corona_cases/1,.5716) * ScaleFactor,
                    radius:Math.sqrt(((feature.properties.total_corona_cases)*ScaleFactor)/Math.PI)*2,
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
            this.bindTooltip( 'Name:'+feature.properties.NAME_LONG+'<br>'+'Total cases'+feature.properties.total_corona_cases);
        },
        mouseout: function(e){
            var layer = e.target;
            this.closePopup();
        }
    })//.addTo(map)
            //in order to add markers to layer group
            corona_covid.addLayer(marker);

    }
});//.addTo(map)
map.fitBounds(covid.getBounds())
*/