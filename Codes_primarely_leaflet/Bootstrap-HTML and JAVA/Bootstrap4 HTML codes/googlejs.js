let map;
function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  map = new google.maps.Map(document.getElementById("Map"), {
    center: { lat: 33.5205, lng: 73.1769 },
    zoom: 16
  });
  var infoWindow = new google.maps.InfoWindow(
            {content: 'Click the map to get Lat/Lng!', position: { lat: 33.5205, lng: 73.1769 }});
        infoWindow.open(map);

        // Configure the click listener.
        map.addListener('click', function(mapsMouseEvent) {
          // Close the current InfoWindow.
          infoWindow.close();

          // Create a new InfoWindow.
          infoWindow = new google.maps.InfoWindow({position: mapsMouseEvent.latLng});
          infoWindow.setContent(mapsMouseEvent.latLng.toString());
          infoWindow.open(map);
        });
  directionsDisplay.setMap(map);
  var onChangeHandler = function() {
  	calculateAndDisplayRoute(directionsService, directionsDisplay);
  };  
  document.getElementById('start').addEventListener('change', onChangeHandler);
  document.getElementById('end').addEventListener('change', onChangeHandler);
}
//to Display the routes pass the values into the function down below
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
          origin: document.getElementById('start').value,// set origin to start
          destination: document.getElementById('end').value,// set destination to end
          travelMode: 'WALKING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);// display directions
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }