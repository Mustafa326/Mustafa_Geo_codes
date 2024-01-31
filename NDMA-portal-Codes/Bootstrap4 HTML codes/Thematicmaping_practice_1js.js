//Fuction which contains a conditional statement regarding population of the countries//
function Getcountry(popEst){
	if(popEst>100000000){
		return 'red';
	}else if(popEst>50000000){
		return 'blue';
	}else {
		return 'green'
	}
}
//Function for styling the geojson layer//
function countryStyle(feature) {
  return {
	fillColor: Getcountry(feature.properties.POP_EST),// for filling the color of the polygons acording to Getcountry function//
	weight: 2,
	opacity: 1,
	color: 'white',
	dashArray: '3',
	fillOpacity: 0.7
 };
}
//for adding the geoJson to a map layer
var sliderControl = null;
var map=L.map('Map',{fullscreenControl:true,fullscreenControlOptions: {position:'topleft'}}).setView([43.8476,18.3564],13);
var CountryLayer=L.geoJSON(countries,
	{style:countryStyle}).addTo(map);
map.fitBounds(CountryLayer.getBounds())
//The code for the first time-slider
//var Slider= L.control.timelineSlider({position:"topright"}).addTo(map);
//The code for the second time slider that works with geojson 
var sliderControl = L.control.sliderControl({position: "topright", layer: CountryLayer});
//Make sure to add the slider to the map
map.addControl(sliderControl);
//And initialize the slider
sliderControl.startSlider();
                
                


//Make sure to add the slider to the map ;-)


// Custom control Legend leaflet
var legend = L.control({position : 'bottomright'});
			legend.onAdd = function(map){
				var div = L.DomUtil.create('div', 'legend'); // create a div with a class legend
				var label = [
					"Population greater than 100000000", 
					"Population greater than 50000000", 
					"Population equal or less than 50000000"
				];
				var grades = [100000001, 50000001, 50000000]; // this defines the ranges
				div.innerHTML = '<div>Legend</div>'; // name or heading of legend
				for(var i = 0; i < grades.length; i++){
					div.innerHTML += '<i style="background:' 
					+ Getcountry(grades[i]) + '">&nbsp;&nbsp;</i>&nbsp;&nbsp;'
					+ label[i] + '<br />';
				}
				return div;
			}
			legend.addTo(map);

$("#Button1").click(function(event) {
    event.preventDefault();
    if(map.hasLayer(CountryLayer)) {
        map.removeLayer(CountryLayer);
    } else if (map.hasLayer(CountryLayer)==false) {
    	map.addLayer(CountryLayer)
    }
});
// for marker
//var point=[30.3753,69.3451]
//var marker=L.marker(point)
//marker.addTo(map)

//Simple popups
//marker.bindPopup('<b>Pakistan</b>')