//Declaration of variables containing latitude and longitude and zoom
var myLat=28.6465;
var myLong=77.109;
var zoom=5;

//Map through mapbox

//creation of a map variable
  // Leaflet uses div .offsetWidth and .offsetHeight to size the map.
// map variable can be declared through L.mapbox.map or L.map in mapbox
L.mapbox.accessToken = 'pk.eyJ1IjoibXVzdGFmYTA1IiwiYSI6ImNrNm1ocHBzNTBldDIzanJ1ODJqc2dzYjMifQ.ppQmulUBSdoPSzVXjT23Dw';
var map = L.map('Map',{zoomControl: false,fullscreenControl:true,fullscreenControlOptions: {position:'topleft'}}).setView([myLat, myLong], zoom).addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));
//Openlayers map
/*
//Declare Map object//
var map=L.map('Map',{zoomControl: false,fullscreenControl:true,fullscreenControlOptions: {position:'topleft'}}).setView([myLat,myLong],zoom);
//title Layers//
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', { 
        attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors', 
        maxZoom: 18,
        minZoom:2
        //maxBounds: mybounds
}).addTo(map);
*/
//zoomHome button on the map
var zoomHome = L.Control.zoomHome({homeZoom:5.5}).addTo(map);
//Map better scale
L.control.betterscale({metric: true, imperial: false}).addTo(map);
//Creating groups for the layer stack
var stack_2016 = L.layerGroup()
var stack_2017 = L.layerGroup()
var stack_2018 = L.layerGroup()
var stack_2019 = L.layerGroup()
var stacksixer_2016 = L.layerGroup()
var stacksixer_2017 = L.layerGroup()
var stacksixer_2018 = L.layerGroup()
var stacksixer_2019 = L.layerGroup()
var stackbowler_2016 = L.layerGroup()
var stackbowler_2017 = L.layerGroup()
var stackbowler_2018 = L.layerGroup()
var stackbowler_2019 = L.layerGroup()
var myIconUrl='rain.svg'
var myIconUrl2='user.svg'
var myIconUrl3='plant2.svg'
// for team colors
function getColor(d){
			if (d == 973) {
				color='blue';
			} else if (d == 848) {
				color='red';
			} else if (d == 489) {
				color='green';
			} else if (d == 480) {
				color='orange';
			} else if (d == 501) {
				color='yellow';
			} else if (d == 453) {
				color='purple';
			} else if (d == 399) {
				color='pink';
			} else if (d == 357) {
				color='cyan';
			} else {
			    color='#800026'; 
			}
			return color;     						
		}
//function to style the layer
function style2016(feature){
	return{
		fillColor: "#ffffff00",
		weight:2,
		opacity:1,
		color:"blue",
		dashArray: '3',
		fillOpacity:0.7
	}
}
function style2017(feature){
	return{
		fillColor: "#ffffff00",
		weight:2,
		opacity:1,
		color:"blue",
		dashArray: '3',
		fillOpacity:0.7
	}
}
function style2018(feature){
	return{
		fillColor: "#ffffff00",
		weight:2,
		opacity:1,
		color:"blue",
		dashArray: '3',
		fillOpacity:0.7
	}
}
function style2019(feature){
	return{
		fillColor: "#ffffff00",
		weight:2,
		opacity:1,
		color:"blue",
		dashArray: '3',
		fillOpacity:0.7
	}
}
//function for scorer
function batterscore2016(feature){
  //var calculatedSize = 1.0083 * Math.pow(feature.properties.S_N_2010/minValue,.5716) * minRadius;
  var calculatedSize = Math.sqrt(feature.properties.scores_2016)
  //var calculatedSize = Math.sqrt(feature.properties.P_2010 / Math.PI)*2          
  // create  icons
  return L.icon({
    iconUrl: 'rain.svg',
    iconSize: [calculatedSize, calculatedSize],
  });
}
//function for sixer
function scoreforsix2016(feature){
  //var calculatedSize = 1.0083 * Math.pow(feature.properties.S_N_2010/minValue,.5716) * minRadius;
  var calculatedSize = (feature.properties.Most_sixes2016)*2
  //var calculatedSize = Math.sqrt(feature.properties.P_2010 / Math.PI)*2          
  // create  icons
  return L.icon({
    iconUrl: 'user.svg',
    iconSize: [calculatedSize, calculatedSize],
  });
}
//function for vickets
function wickettakker2016(feature){
  //var calculatedSize = 1.0083 * Math.pow(feature.properties.S_N_2010/minValue,.5716) * minRadius;
  var calculatedSize = (feature.properties.wickets2017)
  //var calculatedSize = Math.sqrt(feature.properties.P_2010 / Math.PI)*2          
  // create  icons
  return L.icon({
    iconUrl: 'plant2.svg',
    iconSize: [calculatedSize, calculatedSize],
  });
}
function batterscore2017(feature){
  //var calculatedSize = 1.0083 * Math.pow(feature.properties.S_N_2010/minValue,.5716) * minRadius;
  var calculatedSize = Math.sqrt(feature.properties.scores_2017)
  //var calculatedSize = Math.sqrt(feature.properties.P_2010 / Math.PI)*2          
  // create  icons
  return L.icon({
    iconUrl: 'rain.svg',
    iconSize: [calculatedSize, calculatedSize],
  });
}
function scoreforsix2017(feature){
  //var calculatedSize = 1.0083 * Math.pow(feature.properties.S_N_2010/minValue,.5716) * minRadius;
  var calculatedSize = (feature.properties.Most_sixes2017)*2
  //var calculatedSize = Math.sqrt(feature.properties.P_2010 / Math.PI)*2          
  // create  icons
  return L.icon({
    iconUrl: 'user.svg',
    iconSize: [calculatedSize, calculatedSize],
  });
}
//function for vickets
function wickettakker2017(feature){
  //var calculatedSize = 1.0083 * Math.pow(feature.properties.S_N_2010/minValue,.5716) * minRadius;
  var calculatedSize = (feature.properties.wickets2017)
  //var calculatedSize = Math.sqrt(feature.properties.P_2010 / Math.PI)*2          
  // create  icons
  return L.icon({
    iconUrl: 'plant2.svg',
    iconSize: [calculatedSize, calculatedSize],
  });
}
function batterscore2018(feature){
  //var calculatedSize = 1.0083 * Math.pow(feature.properties.S_N_2010/minValue,.5716) * minRadius;
  var calculatedSize = Math.sqrt(feature.properties.scores2018)
  //var calculatedSize = Math.sqrt(feature.properties.P_2010 / Math.PI)*2          
  // create  icons
  return L.icon({
    iconUrl: 'rain.svg',
    iconSize: [calculatedSize, calculatedSize],
  });
}
function scoreforsix2018(feature){
  //var calculatedSize = 1.0083 * Math.pow(feature.properties.S_N_2010/minValue,.5716) * minRadius;
  var calculatedSize = (feature.properties.Most_sixes2018)*2
  //var calculatedSize = Math.sqrt(feature.properties.P_2010 / Math.PI)*2          
  // create  icons
  return L.icon({
    iconUrl: 'user.svg',
    iconSize: [calculatedSize, calculatedSize],
  });
}
//function for vickets
function wickettakker2018(feature){
  //var calculatedSize = 1.0083 * Math.pow(feature.properties.S_N_2010/minValue,.5716) * minRadius;
  var calculatedSize = (feature.properties.wickets2018)
  //var calculatedSize = Math.sqrt(feature.properties.P_2010 / Math.PI)*2          
  // create  icons
  return L.icon({
    iconUrl: 'plant2.svg',
    iconSize: [calculatedSize, calculatedSize],
  });
}
function batterscore2019(feature){
  //var calculatedSize = 1.0083 * Math.pow(feature.properties.S_N_2010/minValue,.5716) * minRadius;
  var calculatedSize = Math.sqrt(feature.properties.scores2019)
  //var calculatedSize = Math.sqrt(feature.properties.P_2010 / Math.PI)*2          
  // create  icons
  return L.icon({
    iconUrl: 'rain.svg',
    iconSize: [calculatedSize, calculatedSize],
  });
}
function scoreforsix2019(feature){
  //var calculatedSize = 1.0083 * Math.pow(feature.properties.S_N_2010/minValue,.5716) * minRadius;
  var calculatedSize = (feature.properties.Most_sixes2019)*2
  //var calculatedSize = Math.sqrt(feature.properties.P_2010 / Math.PI)*2          
  // create  icons
  return L.icon({
    iconUrl: 'user.svg',
    iconSize: [calculatedSize, calculatedSize],
  });
}
//function for vickets
function wickettakker2019(feature){
  //var calculatedSize = 1.0083 * Math.pow(feature.properties.S_N_2010/minValue,.5716) * minRadius;
  var calculatedSize = (feature.properties.wickets2019)
  //var calculatedSize = Math.sqrt(feature.properties.P_2010 / Math.PI)*2          
  // create  icons
  return L.icon({
    iconUrl: 'plant2.svg',
    iconSize: [calculatedSize, calculatedSize],
  });
}
var finalmap2016=  L.geoJson(iplfinalfull,{
	style:style2016,
    // Creating a choropleth 
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //Adding the leaf SVG icon through dicicon
            var stack2016= L.marker(center,{icon: batterscore2016(feature)})
            var stacksixer2016= L.marker([feature.properties.Y+0.43123,feature.properties.X+0.43123],{icon: scoreforsix2016(feature)})
            var stackbowler2016= L.marker([feature.properties.Y-0.43123,feature.properties.X-0.43123],{icon: wickettakker2016(feature)})
            /*
            var stack2016 = L.marker.stack(center,{
                icons:[
                //iconByNight(feature),
                batterscore2016(feature),
                //ndvi2010(feature)
                ],
                // For placing or oreintating the marker
                stackOffset: [0, -5]

            })
            */
            //for scorer
            stack_2016.addLayer(stack2016);
            //for sixer
             stacksixer_2016.addLayer(stacksixer2016);
             //for bowler
             stackbowler_2016.addLayer(stackbowler2016);
             //for scorer
            stack2016.on({
            mouseover:function(e){
                var layer = e.target;
                this.bindTooltip('Top run scorer2016:'+feature.properties.run_scorer2016+'<hr>'+'Score of the player:'+feature.properties.scores_2016);
            },
            mouseout:function(e){
                var layer = e.target;
                this.closePopup()
            }
        })
            //for sixer
             stacksixer2016.on({
            mouseover:function(e){
                var layer = e.target;
                this.bindTooltip('Player with the Most Sixes:'+feature.properties.Hitters2016+'<hr>'+'Number of sixes by this player:'+feature.properties.Most_sixes2016);
            },
            mouseout:function(e){
                var layer = e.target;
                this.closePopup()
            }
        })
             //for bowler
             stackbowler2016.on({
            mouseover:function(e){
                var layer = e.target;
                this.bindTooltip('Player with the Most Wickets:'+feature.properties.Top_Bowler2016+'<hr>'+'Number of Wickets taken by this player:'+feature.properties.wickets2016);
            },
            mouseout:function(e){
                var layer = e.target;
                this.closePopup()
            }
        })
            //map.addLayer(stack_2016)
            //map.addLayer(stacksixer_2016)
            //map.addLayer(stackbowler_2016)
        // function for clicking on the polygon layer
             layer.on(
                'click', function(e){
                    var layer = e.target;
                    //it would not work with just numbers,  it requires the content to be a string or concatination
                    this.bindTooltip( 'City:'+feature.properties.NAME_1)
                    this.closePopup()
                }
            )
             // To close the popup
      }
})//.addTo(map)
// Layer group that contains the markers 2016
var fullmap_2016 = L.layerGroup([stack_2016,stacksixer_2016,stackbowler_2016,finalmap2016],{time:"2016"}).addTo(map);
//For 2017
var finalmap2017=  L.geoJson(iplfinalfull,{
  style:style2017,
    // Creating a choropleth 
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //Adding the leaf SVG icon through dicicon
            var stack2017= L.marker(center,{icon: batterscore2017(feature)})
            var stacksixer2017= L.marker([feature.properties.Y+0.43123,feature.properties.X+0.43123],{icon: scoreforsix2017(feature)})
            var stackbowler2017= L.marker([feature.properties.Y-0.43123,feature.properties.X-0.43123],{icon: wickettakker2017(feature)})
            /*
            var stack2016 = L.marker.stack(center,{
                icons:[
                //iconByNight(feature),
                batterscore2016(feature),
                //ndvi2010(feature)
                ],
                // For placing or oreintating the marker
                stackOffset: [0, -5]

            })
            */
            //for scorer
            stack_2017.addLayer(stack2017);
            //for sixer
             stacksixer_2017.addLayer(stacksixer2017);
             //for bowler
             stackbowler_2017.addLayer(stackbowler2017);
             //for scorer
            stack2017.on({
            mouseover:function(e){
                var layer = e.target;
                this.bindTooltip('Top run scorer:'+feature.properties.run_score_2017+'<hr>'+'Score of the player:'+feature.properties.scores_2017);
            },
            mouseout:function(e){
                var layer = e.target;
                this.closePopup()
            }
        })
            //for sixer
             stacksixer2017.on({
            mouseover:function(e){
                var layer = e.target;
                this.bindTooltip('Player with the Most Sixes:'+feature.properties.Hitters2017+'<hr>'+'Number of sixes by this player:'+feature.properties.Most_sixes2017);
            },
            mouseout:function(e){
                var layer = e.target;
                this.closePopup()
            }
        })
             //for bowler
             stackbowler2017.on({
            mouseover:function(e){
                var layer = e.target;
                this.bindTooltip('Player with the Most Wickets:'+feature.properties.Top_Bowler2017+'<hr>'+'Number of Wickets taken by this player:'+feature.properties.wickets2017);
            },
            mouseout:function(e){
                var layer = e.target;
                this.closePopup()
            }
        })
        // function for clicking on the polygon layer
             layer.on(
                'click', function(e){
                    var layer = e.target;
                    //it would not work with just numbers,  it requires the content to be a string or concatination
                    this.bindTooltip( 'City:'+feature.properties.NAME_1)
                    this.closePopup()
                }
            )
             // To close the popup
      }
})//.addTo(map)
// Layer group that contains the markers  for 2017
var fullmap_2017 = L.layerGroup([stack_2017,stacksixer_2017,stackbowler_2017,finalmap2017],{time:"2017"});
//for 2018
var finalmap2018=  L.geoJson(iplfinalfull,{
  style:style2018,
    // Creating a choropleth 
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //Adding the leaf SVG icon through dicicon
            var stack2018= L.marker(center,{icon: batterscore2018(feature)})
            var stacksixer2018= L.marker([feature.properties.Y+0.43123,feature.properties.X+0.43123],{icon: scoreforsix2018(feature)})
            var stackbowler2018= L.marker([feature.properties.Y-0.43123,feature.properties.X-0.43123],{icon: wickettakker2018(feature)})
            /*
            var stack2016 = L.marker.stack(center,{
                icons:[
                //iconByNight(feature),
                batterscore2016(feature),
                //ndvi2010(feature)
                ],
                // For placing or oreintating the marker
                stackOffset: [0, -5]

            })
            */
            //for scorer
            stack_2018.addLayer(stack2018);
            //for sixer
             stacksixer_2018.addLayer(stacksixer2018);
             //for bowler
             stackbowler_2018.addLayer(stackbowler2018);
             //for scorer
            stack2018.on({
            mouseover:function(e){
                var layer = e.target;
                this.bindTooltip('Top run scorer:'+feature.properties.run_scorer2018+'<hr>'+'Score of the player:'+feature.properties.scores2018);
            },
            mouseout:function(e){
                var layer = e.target;
                this.closePopup()
            }
        })
            //for sixer
             stacksixer2018.on({
            mouseover:function(e){
                var layer = e.target;
                this.bindTooltip('Player with the Most Sixes:'+feature.properties.Hitters2018+'<hr>'+'Number of sixes by this player:'+feature.properties.Most_sixes2018);
            },
            mouseout:function(e){
                var layer = e.target;
                this.closePopup()
            }
        })
             //for bowler
             stackbowler2018.on({
            mouseover:function(e){
                var layer = e.target;
                this.bindTooltip('Player with the Most Wickets:'+feature.properties.Top_Bowler2018+'<hr>'+'Number of Wickets taken by this player:'+feature.properties.wickets2018);
            },
            mouseout:function(e){
                var layer = e.target;
                this.closePopup()
            }
        })
        // function for clicking on the polygon layer
             layer.on(
                'click', function(e){
                    var layer = e.target;
                    //it would not work with just numbers,  it requires the content to be a string or concatination
                    this.bindTooltip( 'City:'+feature.properties.NAME_1)
                    this.closePopup()
                }
            )
             // To close the popup
      }
})//.addTo(map)
// Layer group that contains the markers for 2018
var fullmap_2018 = L.layerGroup([stack_2018,stacksixer_2018,stackbowler_2018,finalmap2018],{time:"2018"});
// for the year 2019
var finalmap2019=  L.geoJson(iplfinalfull,{
  style:style2019,
    // Creating a choropleth 
    onEachFeature: function( feature, layer ){
        //Check if feature is a polygon
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            //Adding the leaf SVG icon through dicicon
            var stack2019= L.marker(center,{icon: batterscore2019(feature)})
            var stacksixer2019= L.marker([feature.properties.Y+0.43123,feature.properties.X+0.43123],{icon: scoreforsix2019(feature)})
            var stackbowler2019= L.marker([feature.properties.Y-0.43123,feature.properties.X-0.43123],{icon: wickettakker2019(feature)})
            /*
            var stack2016 = L.marker.stack(center,{
                icons:[
                //iconByNight(feature),
                batterscore2016(feature),
                //ndvi2010(feature)
                ],
                // For placing or oreintating the marker
                stackOffset: [0, -5]

            })
            */
            //for scorer
            stack_2019.addLayer(stack2019);
            //for sixer
             stacksixer_2019.addLayer(stacksixer2019);
             //for bowler
             stackbowler_2019.addLayer(stackbowler2019);
             //for scorer
            stack2019.on({
            mouseover:function(e){
                var layer = e.target;
                this.bindTooltip('Top run scorer:'+feature.properties.run_scores2019+'<hr>'+'Score of the player:'+feature.properties.scores2019);
            },
            mouseout:function(e){
                var layer = e.target;
                this.closePopup()
            }
        })
            //for sixer
             stacksixer2019.on({
            mouseover:function(e){
                var layer = e.target;
                this.bindTooltip('Player with the Most Sixes:'+feature.properties.Hitters2019+'<hr>'+'Number of sixes by this player:'+feature.properties.Most_sixes2019);
            },
            mouseout:function(e){
                var layer = e.target;
                this.closePopup()
            }
        })
             //for bowler
             stackbowler2019.on({
            mouseover:function(e){
                var layer = e.target;
                this.bindTooltip('Player with the Most Wickets:'+feature.properties.Top_Bowler2019+'<hr>'+'Number of Wickets taken by this player:'+feature.properties.wickets2019);
            },
            mouseout:function(e){
                var layer = e.target;
                this.closePopup()
            }
        })
        // function for clicking on the polygon layer
             layer.on(
                'click', function(e){
                    var layer = e.target;
                    //it would not work with just numbers,  it requires the content to be a string or concatination
                    this.bindTooltip( 'City:'+feature.properties.NAME_1)
                    this.closePopup()
                }
            )
             // To close the popup
      }
})//.addTo(map)
var fullmap_2019 = L.layerGroup([stack_2019,stacksixer_2019,stackbowler_2019,finalmap2019],{time:"2019"});
var overlayMaps = {
    "IPL2016": fullmap_2016,
    "IPL2017": fullmap_2017,
    "IPL2018": fullmap_2018,
    "IPL2019": fullmap_2019
};
L.control.layers(null, overlayMaps, {position:'topleft'}).addTo(map);
//LEGEND
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        classes = [357, 562, 973],
        classes2 = [12, 16, 23]
        classes3 = [10, 19, 38]
size = [20, 40, 60],
        labels = [myIconUrl, myIconUrl,myIconUrl];
        labels2=[myIconUrl2,myIconUrl2,myIconUrl2];
        labels3=[myIconUrl3,myIconUrl3,myIconUrl3];
        div.innerHTML +="Scorers"
        div.innerHTML +="<br>"

    for (var i = 0; i < classes.length; i++) {
        div.innerHTML +=
            classes[i] + (" <img src="+ labels[i]+" height="+size[i]+ "width="+size[i]+">") +'<br>';
    }
    div.innerHTML +="<hr>"
    div.innerHTML +="Sixers"
    div.innerHTML +="<br>"
    for (var i = 0; i < classes3.length; i++) {
        div.innerHTML +=
            classes3[i] + (" <img src="+ labels2[i]+" height="+size[i]+ "width="+size[i]+">") +'<br>';
    }
    div.innerHTML +="<hr>"
    div.innerHTML +="Wicket takers"
    div.innerHTML +="<br>"
    for (var i = 0; i < classes2.length; i++) {
        div.innerHTML +=
            classes2[i] + (" <img src="+ labels3[i]+" height="+size[i]+ "width="+size[i]+">") +'<br>';
    }


    return div;
};

legend.addTo(map);
//2nd legend for 2017
var legend2017 = L.control({position: 'bottomright'});

legend2017.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend2017'),
        classes = [357, 562, 973],
        classes2 = [12, 16, 23]
        classes3 = [10, 19, 38]
size = [20, 40, 60],
        labels = [myIconUrl, myIconUrl,myIconUrl];
        labels2=[myIconUrl2,myIconUrl2,myIconUrl2];
        labels3=[myIconUrl3,myIconUrl3,myIconUrl3];
        div.innerHTML +="Scorers"
        div.innerHTML +="<br>"

    for (var i = 0; i < classes.length; i++) {
        div.innerHTML +=
            classes[i] + (" <img src="+ labels[i]+" height="+size[i]+ "width="+size[i]+">") +'<br>';
    }
    div.innerHTML +="<hr>"
    div.innerHTML +="Sixers"
    div.innerHTML +="<br>"
    for (var i = 0; i < classes3.length; i++) {
        div.innerHTML +=
            classes3[i] + (" <img src="+ labels2[i]+" height="+size[i]+ "width="+size[i]+">") +'<br>';
    }
    div.innerHTML +="<hr>"
    div.innerHTML +="Wicket takers"
    div.innerHTML +="<br>"
    for (var i = 0; i < classes2.length; i++) {
        div.innerHTML +=
            classes2[i] + (" <img src="+ labels3[i]+" height="+size[i]+ "width="+size[i]+">") +'<br>';
    }


    return div;
};
//legend for 2018
var legend2018 = L.control({position: 'bottomright'});

legend2018.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend2018'),
        classes = [357, 562, 973],
        classes2 = [12, 16, 23]
        classes3 = [10, 19, 38]
size = [20, 40, 60],
        labels = [myIconUrl, myIconUrl,myIconUrl];
        labels2=[myIconUrl2,myIconUrl2,myIconUrl2];
        labels3=[myIconUrl3,myIconUrl3,myIconUrl3];
        div.innerHTML +="Scorers"
        div.innerHTML +="<br>"

    for (var i = 0; i < classes.length; i++) {
        div.innerHTML +=
            classes[i] + (" <img src="+ labels[i]+" height="+size[i]+ "width="+size[i]+">") +'<br>';
    }
    div.innerHTML +="<hr>"
    div.innerHTML +="Sixers"
    div.innerHTML +="<br>"
    for (var i = 0; i < classes3.length; i++) {
        div.innerHTML +=
            classes3[i] + (" <img src="+ labels2[i]+" height="+size[i]+ "width="+size[i]+">") +'<br>';
    }
    div.innerHTML +="<hr>"
    div.innerHTML +="Wicket takers"
    div.innerHTML +="<br>"
    for (var i = 0; i < classes2.length; i++) {
        div.innerHTML +=
            classes2[i] + (" <img src="+ labels3[i]+" height="+size[i]+ "width="+size[i]+">") +'<br>';
    }


    return div;
};

//legend for 2019
var legend2019 = L.control({position: 'bottomright'});

legend2019.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend2019'),
        classes = [357, 562, 973],
        classes2 = [12, 16, 23]
        classes3 = [10, 19, 38]
size = [20, 40, 60],
        labels = [myIconUrl, myIconUrl,myIconUrl];
        labels2=[myIconUrl2,myIconUrl2,myIconUrl2];
        labels3=[myIconUrl3,myIconUrl3,myIconUrl3];
        div.innerHTML +="Scorers"
        div.innerHTML +="<br>"

    for (var i = 0; i < classes.length; i++) {
        div.innerHTML +=
            classes[i] + (" <img src="+ labels[i]+" height="+size[i]+ "width="+size[i]+">") +'<br>';
    }
    div.innerHTML +="<hr>"
    div.innerHTML +="Sixers"
    div.innerHTML +="<br>"
    for (var i = 0; i < classes3.length; i++) {
        div.innerHTML +=
            classes3[i] + (" <img src="+ labels2[i]+" height="+size[i]+ "width="+size[i]+">") +'<br>';
    }
    div.innerHTML +="<hr>"
    div.innerHTML +="Wicket takers"
    div.innerHTML +="<br>"
    for (var i = 0; i < classes2.length; i++) {
        div.innerHTML +=
            classes2[i] + (" <img src="+ labels3[i]+" height="+size[i]+ "width="+size[i]+">") +'<br>';
    }


    return div;
};
//Map overlay add and overlay remove for layer control
 map.on('overlayadd', function (eventLayer) {
    //Show legend...
    if (eventLayer.name === 'IPL2016') {
        // to add the information control on to the map
        //Adding and initializing Slider control
        this.addControl(legend)
      }else if (eventLayer.name === 'IPL2016'){
        this.addControl(legend)
      }else if(eventLayer.name === 'IPL2017'){
        this.addControl(legend2017)
      }else if(eventLayer.name === 'IPL2018'){
        this.addControl(legend2018)
      }else if(eventLayer.name === 'IPL2019'){
        this.addControl(legend2019)
      }

});

//overlayremove is a LayersControlEvent which is fired when an overlay is deselected through the layer control.
map.on('overlayremove', function (eventLayer) {
    // hide legend
    if (eventLayer.name === 'Punjab with all variables') {
        this.removeControl(legend)// removes the legend when you uncheck the option in layer control 
      }else if(eventLayer.name === 'IPL2016'){
        this.removeControl(legend)
      }else if(eventLayer.name === 'IPL2017'){
        this.removeControl(legend2017)
      }else if(eventLayer.name === 'IPL2018'){
        this.removeControl(legend2018)
      }else if(eventLayer.name === 'IPL2019'){
        this.removeControl(legend2019)
      }
});




