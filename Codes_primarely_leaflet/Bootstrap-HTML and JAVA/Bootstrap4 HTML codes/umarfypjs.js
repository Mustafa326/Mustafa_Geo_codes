var mymap = L.map('Map').setView([32.71431184734643, 71.80698109631263], 12);
        var CyclOSM = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
            maxZoom: 20,
            attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap);

// a function that takes user current location
navigator.geolocation.getCurrentPosition(function(location){
  // the latitude and longitude of the users location is stored in this
  var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
  console.log(latlng)
  navigator.geolocation.watchPosition
  // Storing the longitude and latitude values into an array and passing said array into the option your location on the floating
  document.getElementById("starting").value = [location.coords.latitude ,location.coords.longitude]
  console.log(document.getElementById("starting").value)
  document.getElementById("ending").value = [location.coords.latitude ,location.coords.longitude]
  console.log(document.getElementById("ending").value)
  })
// icons
var startIcon = L.icon({
    iconUrl: 'start.png',
    iconSize: [45, 40],
    iconAnchor: [22, 40],
    popupAnchor: [-3, -76]
});
var endIcon = L.icon({
    iconUrl: 'end.png',
    iconSize: [45, 40],
    iconAnchor: [22, 40],
    popupAnchor: [-3, -76]
});
  //a control which tells you where the user is located at
  L.control.locate().addTo(mymap);
var control
control =L.Routing.control({
  waypoints:[document.getElementById('start').value.split(/,\s*/).map(function(v) { return +v; }),
  L.latLng(document.getElementById('end').value.split(/,\s*/).map(function(v) { return +v; }))
  ],
  draggableWaypoints : false,//to set draggable option to false
    addWaypoints : false, //disable adding new waypoints to the existing path,
    show: true,
    showAlternatives: true,
    fitSelectedRoutes:true,// zooms according to the route selected
    //for alternative routes
    urlParameters: {
        vehicle: 'car'
    },
    altLineOptions: {
        styles: [
            {color: 'white', opacity: 0.8, weight: 6},
            {color: 'blue', opacity: 0.5, weight: 2}
        ]
    },
    createMarker: function(number, waypoint, n) {
    if (number === 0) {
        return L.marker(waypoint.latLng, {icon: startIcon }).bindPopup('You are Here');
    } else if (number === 1) {
        return L.marker(waypoint.latLng, {icon: endIcon }).bindPopup('Your destination');
    }
control.getRouter().options.urlParameters.vehicle = 'foot';
}

    /*
    //Creates a customn marker
    createMarker: function ( number, waypoint, n ) {
            const marker = L.marker(waypoint.latLng, {
              draggable: false,
              bounceOnAdd: false,
              bounceOnAddOptions: {
                duration: 1000,
                height: 800,
                function() {
                  (bindPopup(myPopup).openOn(mymap))
                }
              },
              icon: L.icon({
                iconUrl: 'icon.svg',
                iconSize: [45, 90],
                iconAnchor: [22, 63],
                popupAnchor: [-3, -76]
              })
            });
            return marker
          }
*/
}).addTo(mymap);
//A Dom event that catters the routing for the start point
L.DomEvent.on(document.getElementById('start'), 'click', function() {
        control.spliceWaypoints(0, 1, document.getElementById('start').value.split(/,\s*/).map(function(v) { return +v; }));
    });
//A Dom event that catters the routing for the end point
 L.DomEvent.on(document.getElementById('end'), 'click', function() {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, document.getElementById('end').value.split(/,\s*/).map(function(v) { return +v; }));
    });
 //control.getRouter().options.urlParameters.vehicle = 'foot';


//Control to have a moving marker

var current_position, current_accuracy;

    function onLocationFound(e) {
      // if position defined, then remove the existing position marker and accuracy circle from the map
      if (current_position) {
          mymap.removeLayer(current_position);
          mymap.removeLayer(current_accuracy);
      }

      var radius = e.accuracy / 20;

      current_position = L.marker(e.latlng).addTo(mymap)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

      current_accuracy = L.circle(e.latlng, radius).addTo(mymap);
    }

    function onLocationError(e) {
      alert(e.message);
    }

    mymap.on('locationfound', onLocationFound);
    mymap.on('locationerror', onLocationError);

    // wrap map.locate in a function    
    function locate() {
      mymap.locate({setView: true, maxZoom: 16});
    }

    // call locate every 3 seconds... forever
    //setInterval(locate, 6000);

//another method for geolocation
/*\\
var marker;

this.mymap.locate({
  setView: true,
  maxZoom: 120
}).on("locationfound", e => {
    if (!marker) {
        marker = new L.marker(e.latlng).addTo(this.mymap);
    } else {
        marker.setLatLng(e.latlng);
    }
}).on("locationerror", error => {
    if (marker) {
        mymap.removeLayer(marker);
        marker = undefined;
    }
});
*
//setInterval(locate, 6000);
/*another routing routing without dragable oprion
var control, waypoints;

waypoints = [L.latLng(33.5193, 73.1775),
            L.latLng(33.5183, 73.1755)];

control = L.Routing.control({
  waypoints: waypoints,
  plan: L.Routing.plan(waypoints, {
    createMarker: function(i, wp) {
      return L.marker(wp.latLng, {
        draggable: false
      });
    }
  }),
  addWaypoints: false,
  routeWhileDragging: false,
  show: false
}).addTo(mymap);
*/
