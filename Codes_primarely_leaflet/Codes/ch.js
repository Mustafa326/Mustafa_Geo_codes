var myLat=31.1704;
var myLong=72.7097;

var map = L.map('mapid').setView([myLat, myLong], 7);

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//Onchange
function changed(){
	if (document.querySelector('#pop:checked') !== null){
		pop.addTo(map)
		map.removeLayer(prec)
		polygonsWithCenters.remove()

	}
	else if (document.querySelector('#pp:checked') !== null){
		prec.addTo(map)
		map.removeLayer(pop)
		polygonsWithCenters.remove()
	}
	else if (document.querySelector('#symbol:checked') !== null){
		polygonsWithCenters.addTo(map)
		map.removeLayer(prec)
		map.removeLayer(pop)
		console.log(map.getZoom())

	}
	else if ((document.querySelector('#pop:checked') == null) && (document.querySelector('#pp:checked') == null) && (document.querySelector('#symbol:checked') == null)){
		map.removeLayer(prec)
		map.removeLayer(pop)
		polygonsWithCenters.remove()
		
	}
}

// Precipitation

function getColor_precipitation(d) {
    return d > 400  ? '#800026' :
           d > 350  ? '#BD0026' :
           d > 300  ? '#E31A1C' :
           d > 250  ? '#FC4E2A' :
           d > 200  ? '#FD8D3C' :
           d > 150  ? '#FEB24C' :
           d > 100  ? '#FED976' :
                      '#FFEDA0';
}

function style_prec(feature) {
    return {
        fillColor: getColor_precipitation(feature.properties.P_2010),  // you need to change the year here which can be obtained from timeslider
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

var prec = L.geoJson(final, {style: style_prec});

// Population Density

function getColor_pop(d) {
    return d > 1000  ? '#800026' :
           d > 900   ? '#BD0026' :
           d > 700   ? '#E31A1C' :
           d > 600   ? '#FC4E2A' :
           d > 500   ? '#FD8D3C' :
           d > 300   ? '#FEB24C' :
           d > 250   ? '#FED976' :
                       '#FFEDA0';
}

function style_pop(feature) {
    return {
        fillColor: getColor_pop(feature.properties.Pop_2010),  // you need to change the year here which can be obtained from timeslider
        weight: 2,
        opacity: 1,
        color: 'black',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

var pop = L.geoJson(final, {style: style_pop})

// SVG Population
var mySvgString = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 80.13 80.13" style="enable-background:new 0 0 80.13 80.13;" xml:space="preserve"><g><g><path d="M48.355,17.922c3.705,2.323,6.303,6.254,6.776,10.817c1.511,0.706,3.188,1.112,4.966,1.112   c6.491,0,11.752-5.261,11.752-11.751c0-6.491-5.261-11.752-11.752-11.752C53.668,6.35,48.453,11.517,48.355,17.922z M40.656,41.984   c6.491,0,11.752-5.262,11.752-11.752s-5.262-11.751-11.752-11.751c-6.49,0-11.754,5.262-11.754,11.752S34.166,41.984,40.656,41.984   z M45.641,42.785h-9.972c-8.297,0-15.047,6.751-15.047,15.048v12.195l0.031,0.191l0.84,0.263   c7.918,2.474,14.797,3.299,20.459,3.299c11.059,0,17.469-3.153,17.864-3.354l0.785-0.397h0.084V57.833   C60.688,49.536,53.938,42.785,45.641,42.785z M65.084,30.653h-9.895c-0.107,3.959-1.797,7.524-4.47,10.088   c7.375,2.193,12.771,9.032,12.771,17.11v3.758c9.77-0.358,15.4-3.127,15.771-3.313l0.785-0.398h0.084V45.699   C80.13,37.403,73.38,30.653,65.084,30.653z M20.035,29.853c2.299,0,4.438-0.671,6.25-1.814c0.576-3.757,2.59-7.04,5.467-9.276   c0.012-0.22,0.033-0.438,0.033-0.66c0-6.491-5.262-11.752-11.75-11.752c-6.492,0-11.752,5.261-11.752,11.752   C8.283,24.591,13.543,29.853,20.035,29.853z M30.589,40.741c-2.66-2.551-4.344-6.097-4.467-10.032   c-0.367-0.027-0.73-0.056-1.104-0.056h-9.971C6.75,30.653,0,37.403,0,45.699v12.197l0.031,0.188l0.84,0.265   c6.352,1.983,12.021,2.897,16.945,3.185v-3.683C17.818,49.773,23.212,42.936,30.589,40.741z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#C12020"/></g></g> </svg>'
var myIconUrl = 'data:image/svg+xml;base64,' + btoa(mySvgString);

function style(feature) {
    return {
        fillColor:  "#ffffff00",
        weight: 2,
        opacity: 1,
        color: "#000000",
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function getsize(s){
	console.log(map.getZoom())
	return s > 1000  ? 60 :
           s > 900   ? 55 :
           s > 700   ? 50 :
           s > 600   ? 45 :
           s > 500   ? 40 :
           s > 300   ? 35 :
           s > 250   ? 20 :
                       10;
}

var polygonsWithCenters = L.layerGroup();

function onEachFeature(feature, layer) {
	var s = feature.properties.Pop_2010
	var tIcon = L.icon({
			iconUrl: myIconUrl,
			iconSize: getsize(s)
	});
	
	var center = layer.getBounds().getCenter();   // Centre of all polygons within the geojson
    var marker = L.marker(center, {icon: tIcon});
	
	var polygonAndItsCenter = L.layerGroup([layer, marker]);
	polygonAndItsCenter.addTo(polygonsWithCenters);

}

var pop_symbol= L.geoJSON(final, {
			onEachFeature: onEachFeature,
			style: style,
})


//Legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
	
    var div = L.DomUtil.create('div', 'info legend'),
        classes = [250, 500, 1000],
		size = [20, 40, 60],
        labels = [myIconUrl, myIconUrl,myIconUrl];
		
    for (var i = 0; i < classes.length; i++) {
        div.innerHTML +=
            classes[i] + (" <img src="+ labels[i] +" height="+size[i]+ "width="+size[i]+">") +'<br>';
    }

    return div;
};

legend.addTo(map);


/*
---------------------------------LABELS--------------------------------------------
-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------
*/
var labels = L.geoJson(final,{
				style: style,
				onEachFeature: function (feature, layer) {
					var center = layer.getBounds().getCenter();
					layer.bindTooltip(feature.properties.Districts, {
										permanent: true, 
										direction: 'center',
									//	offset: 'Point(0, 0)',
										className: 'districtLabel'
					});
				}
			}).addTo(map)

// The code below will change the font of the label as we zoom in and out. I used 20 and 5 font sizes for testing purposes.
// Please use reasonable size (visible to the eye since 5 is too small). Also, advisable to add more else if statements than shown below.

map.on('zoomend', function () {
    var zoomLevel = map.getZoom();
    var tooltip = $('.leaflet-tooltip.districtLabel');
	console.log(zoomLevel)
	if (zoomLevel > 7){
		tooltip.css('font-size', 20);
	}
	else if (zoomLevel < 7){
		tooltip.css('font-size', 2);
	}
    
})