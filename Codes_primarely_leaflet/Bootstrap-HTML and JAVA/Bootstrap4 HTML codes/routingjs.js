//Inorder to create a platform that enables communication with the backend created by the mapping api
// Initialize the platform object:
      var platform = new H.service.Platform({
        'app_id': 'bf3YMT6Hg2I4FMFtk5Ta',
        'apikey': 'b0S_DXoQt1rGuIdKDwd0bcn1nUXlaOYXO1lM6GFBjaE'
      });

      // Obtain the default map types from the platform object
      var defaultLayers = platform.createDefaultLayers();

      // Instantiate (and display) a map object:
      var map = new H.Map(
        document.getElementById('Map'),
        defaultLayers.vector.normal.map,
        {
          zoom: 10,
          center: { lng: 73.084488, lat: 33.738045 }
        });
      //For interactive map
      var mapEvents = new H.mapevents.MapEvents(map);
      var behavior = new H.mapevents.Behavior(mapEvents);
// Create the parameters for the routing request:
var routingParameters = {
  'routingMode': 'fast',
  'transportMode': 'car',
  // The start point of the route:
  'origin': '33.626057,73.071442',
  // The end point of the route:
  'destination': '31.582045,74.329376',
  // Include the route shape in the response
  'return': 'polyline'
};
// Define a callback function to process the routing response:
var onResult = function(result) {
  // ensure that at least one route was found
  if (result.routes.length) {
    result.routes[0].sections.forEach((section) => {
         // Create a linestring to use as a point source for the route line
        let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

        // Create a polyline to display the route:
        let routeLine = new H.map.Polyline(linestring, {
          style: { strokeColor: 'blue', lineWidth: 3 }
        });

        // Create a marker for the start point:
        let startMarker = new H.map.Marker(section.departure.place.location);

        // Create a marker for the end point:
        let endMarker = new H.map.Marker(section.arrival.place.location);

        // Add the route polyline and the two markers to the map:
        map.addObjects([routeLine, startMarker, endMarker]);

        // Set the map's viewport to make the whole route visible:
        map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});
    });
  }
};

// Get an instance of the routing service version 8:
var router = platform.getRoutingService(null, 8);

// Call calculateRoute() with the routing parameters,
// the callback and an error callback function (called if a
// communication error occurs):
router.calculateRoute(routingParameters, onResult,
  function(error) {
    alert(error.message);
  });
