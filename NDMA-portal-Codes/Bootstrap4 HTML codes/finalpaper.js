var latlngs = Array()
L.mapbox.accessToken = 'pk.eyJ1IjoibXVzdGFmYTA1IiwiYSI6ImNrNm1ocHBzNTBldDIzanJ1ODJqc2dzYjMifQ.ppQmulUBSdoPSzVXjT23Dw';
var map = L.map('Map').setView([33.738045, 73.084488],6).addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));
var islamabadmarker=L.marker([33.738045,73.084488]).addTo(map)
islamabadmarker.bindTooltip('Name of the destination:Islamabad:');
latlngs.push(islamabadmarker.getLatLng());
var lahoremarker=L.marker([31.582045,74.329376]).addTo(map)
lahoremarker.bindTooltip('Name of the destination:Lahore:');
latlngs.push(lahoremarker.getLatLng());
var karachimarker=L.marker([24.860966,66.990501]).addTo(map)
karachimarker.bindTooltip('Name of the destination:Karachi:');
latlngs.push(karachimarker.getLatLng());
var peshawarmarker=L.marker([34.025917,71.560135]).addTo(map)
peshawarmarker.bindTooltip('Name of the destination:Pehsawar:');
latlngs.push(peshawarmarker.getLatLng());
latlngs.push(islamabadmarker.getLatLng());
var distance=L.polyline(latlngs, {color: 'blue'}).addTo(map)
map.fitBounds(distance.getBounds())
var legend = L.control({position : 'bottomright'});
            legend.onAdd = function(map){
                var div = L.DomUtil.create('div', 'legend'); // create a div with a class legend
                div.innerHTML = '<div>Discription Box</div>'; // name or heading of legend
                    div.innerHTML += '<i></i><span>The first location I traveled to:Lahore from islamabad</span><br>';
                    div.innerHTML += '<i></i><span>The second location I traveled to:Krhachi from Lahore</span><br>';
                    div.innerHTML += '<i></i><span>The third location I traveled to:peshawar from karachi</span><br>';
                    div.innerHTML += '<i ></i><span>The last location I traveled to:Back to islamabad from peshawar</span><br>';
                return div;
            }
legend.addTo(map)
