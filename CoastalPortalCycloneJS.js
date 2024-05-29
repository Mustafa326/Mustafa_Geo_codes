// Function to go back to the previous page
function goBack() {
    window.history.back();
 }
 var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
function openFullscreen(containerId) {
    var elem = document.getElementById(containerId);
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
    var iframeContainer = document.getElementById('iframe-container');
    var iframe = document.getElementById('main-iframe');
    if (iframe && iframeContainer.requestFullscreen) {
        iframeContainer.requestFullscreen();
    } else if (iframe && iframeContainer.webkitRequestFullscreen) { /* Safari */
        iframeContainer.webkitRequestFullscreen();
    } else if (iframe && iframeContainer.msRequestFullscreen) { /* IE11 */
        iframeContainer.msRequestFullscreen();
    }
}
var bounds = [
    [60.872, 23.634],
    [77.837, 36.962]
];
mapboxgl.accessToken =
    "pk.eyJ1IjoibXVzYW1hcmVoYW4iLCJhIjoiY2xwZHcxeG85MTMyMDJycXI5YjNyaGhqNiJ9.6UL1Nyb_K5dKT6H4KuHk_Q";
const initialCoordinate = [-45.447303, 30.753574];
const targetCoordinate = [70.447303, 30.753574];
const map = new mapboxgl.Map({
    container: "map",
    zoom: 0,
    center: initialCoordinate,
    pitch: 0,
    bearing: 0,
    style: "mapbox://styles/mapbox/streets-v12",
});
// Define the adjusted coordinates based on the bounding box
const southwest = [21.739091, 57.216797];
const northeast = [37.090240, 78.793945];


setTimeout(() => {
    map.flyTo({ center: targetCoordinate, zoom: 5, speed: 0.6 });
}, 1000);
// Creating a control for home
const homePosition = {
    center: [69.3451, 30.3753],
    zoom: 5 // Adding zoom level
  };
  
  // Creating a go to home position button 
  function addHomeButton(map) {
    class HomeButton {
      onAdd(map) {
        const div = document.createElement("div");
        div.className = "mapboxgl-ctrl mapboxgl-ctrl-group";
        div.innerHTML = `<button>
          <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" style="font-size: 20px;"><title>Reset map</title><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg>
          </button>`;
        div.addEventListener("contextmenu", (e) => e.preventDefault());
        div.addEventListener("click", () => map.flyTo(homePosition));
  
        return div;
      }
    }
    const homeButton = new HomeButton();
    map.addControl(homeButton, "bottom-right");
  }
// creating the customn control for the 3d buildings data 
function addBuildingControl(map) {
    let buildingsAdded = false;
  
    class BuildingControl {
      onAdd(map) {
        const container = document.createElement("div");
        container.className = "mapboxgl-ctrl mapboxgl-ctrl-group";
  
        const button = document.createElement("button");
        button.innerHTML = `<img src="Media/svgIcons/buildingicon.svg" alt="Buildings" style="width: 20px; height: 20px;">`;
        button.style.backgroundColor = "#ffffff"; // Default background color
  
        button.addEventListener("click", () => {
          const targetCoordinates = [67.0103,24.8784]; // Target coordinates to fly to
  
          if (buildingsAdded) {
            removeBuildings(map);
            buildingsAdded = false;
            button.style.backgroundColor = "#ffffff"; // Un-highlight the icon
          } else {
            addBuildings(map);
            buildingsAdded = true;
            button.style.backgroundColor = "#007bff"; // Highlight the icon in blue
            // Fly to the target coordinates when buildings are added
            map.flyTo({
              center: targetCoordinates,
              zoom: 15.5,
              pitch: 45,
              bearing: -17.6
            });
          }
        });
  
        container.appendChild(button);
        return container;
      }
    }
  
    const buildingControl = new BuildingControl();
    map.addControl(buildingControl, "top-right");
  }
  
  function addBuildings(map) {
    // Insert the layer beneath any symbol layer.
    const layers = map.getStyle().layers;
    const labelLayerId = layers.find(
      (layer) => layer.type === "symbol" && layer.layout["text-field"]
    ).id;
  
    map.addLayer(
      {
        id: "add-3d-buildings",
        source: "composite",
        "source-layer": "building",
        filter: ["==", "extrude", "true"],
        type: "fill-extrusion",
        minzoom: 15,
        paint: {
          "fill-extrusion-color": "#aaa",
          "fill-extrusion-height": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0,
            15.05,
            ["get", "height"],
          ],
          "fill-extrusion-base": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0,
            15.05,
            ["get", "min_height"],
          ],
          "fill-extrusion-opacity": 0.6,
        },
      },
      labelLayerId
    );
  }
  
  function removeBuildings(map) {
    map.removeLayer("add-3d-buildings");
  }
// creating a customn control for 3D terrrain
function add3DControl(map) {
    class ThreeDControl {
      constructor() {
        this._button = null;
        this._is3DActive = false;
        this._defaultPitch = 0;
        this._defaultBearing = 0;
      }
  
      onAdd(map) {
        const tooltipText = "For 3D visualization click here";
  
        const div = document.createElement("div");
        div.className = "mapboxgl-ctrl mapboxgl-ctrl-group";
  
        // Create button with tooltip and icon
        this._button = document.createElement("button");
        this._button.innerHTML = `<img src="Media/svgIcons/3Dworldicon.svg" alt="Buildings" style="width: 20px; height: 20px;">`;
        this._button.title = tooltipText;
  
        // Add event listener to toggle 3D terrain and adjust pitch and bearing
        this._button.addEventListener("click", () => {
          this._is3DActive = !this._is3DActive;
          if (this._is3DActive) {
            map.addSource('mapbox-dem', {
              'type': 'raster-dem',
              'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
              'tileSize': 512,
              'maxzoom': 14
            });
            map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 3.5 });
            map.easeTo({
              pitch: 80,
              bearing: 41,
              duration: 1000 // Adjust duration as needed
            });
            this._button.classList.add("active");
            this._button.style.backgroundColor = "#007bff"; // Highlight the icon in blue
          } else {
            map.removeSource('mapbox-dem');
            map.setTerrain(null);
            map.easeTo({
              pitch: this._defaultPitch,
              bearing: this._defaultBearing,
              duration: 1000 // Adjust duration as needed
            });
            this._button.classList.remove("active");
            this._button.style.backgroundColor = "#ffffff"; // Un-highlight the icon
          }
        });
  
        div.appendChild(this._button);
  
        return div;
      }
    }
  
    const threeDControl = new ThreeDControl();
    map.addControl(threeDControl, "top-right");
    
    // Store default pitch and bearing values
    map.once('load', () => {
      threeDControl._defaultPitch = map.getPitch();
      threeDControl._defaultBearing = map.getBearing();
    });
  }
// creating a class for a control of style switcher basemap
class MapboxStyleSwitcherControl {
    constructor(styles) {
        this.styles = styles || MapboxStyleSwitcherControl.DEFAULT_STYLES;
    }
    getDefaultPosition() {
        const defaultPosition = "top-right";
        return defaultPosition;
    }
    onAdd(map) {
        this.controlContainer = document.createElement("div");
        this.controlContainer.classList.add("mapboxgl-ctrl");
        this.controlContainer.classList.add("mapboxgl-ctrl-group");
        const mapStyleContainer = document.createElement("div");
        const styleButton = document.createElement("button");
        mapStyleContainer.classList.add("mapboxgl-style-list");
        for (const style of this.styles) {
            const styleElement = document.createElement("button");
            styleElement.innerText = style.title;
            styleElement.classList.add(style.title.replace(/[^a-z0-9-]/gi, '_'));
            styleElement.dataset.uri = JSON.stringify(style.uri);
            styleElement.addEventListener("click", event => {
                const srcElement = event.srcElement;
                map.setStyle(JSON.parse(srcElement.dataset.uri));
                mapStyleContainer.style.display = "none";
                styleButton.style.display = "block";
                const elms = mapStyleContainer.getElementsByClassName("active");
                while (elms[0]) {
                    elms[0].classList.remove("active");
                }
                srcElement.classList.add("active");
            });
            if (style.title === MapboxStyleSwitcherControl.DEFAULT_STYLE) {
                styleElement.classList.add("active");
            }
            mapStyleContainer.appendChild(styleElement);
        }
        styleButton.classList.add("mapboxgl-ctrl-icon");
        styleButton.classList.add("mapboxgl-style-switcher");
        styleButton.addEventListener("click", () => {
            styleButton.style.display = "none";
            mapStyleContainer.style.display = "block";
        });
        document.addEventListener("click", event => {
            if (!this.controlContainer.contains(event.target)) {
                mapStyleContainer.style.display = "none";
                styleButton.style.display = "block";
            }
        });
        this.controlContainer.appendChild(styleButton);
        this.controlContainer.appendChild(mapStyleContainer);
        return this.controlContainer;
    }
    onRemove() {
        return;
    }
}
MapboxStyleSwitcherControl.DEFAULT_STYLE = "Streets";
MapboxStyleSwitcherControl.DEFAULT_STYLES = [
    { title: "Dark", uri: "mapbox://styles/mapbox/dark-v11" },
    { title: "Light", uri: "mapbox://styles/mapbox/light-v11" },
    { title: "Outdoors", uri: "mapbox://styles/mapbox/outdoors-v12" },
    { title: "Satellite", uri: "mapbox://styles/mapbox/satellite-streets-v12" },
    { title: "Streets", uri: "mapbox://styles/mapbox/streets-v10" }
];
//adding the gdac layers
var data; // Define data in a wider scope
var pointLayers = {};
var polygonLayers = {};

fetch('https://www.gdacs.org/gdacsapi/api/events/geteventlist/MAP?')
.then(response => response.json())
.then(responseData => {
    data = responseData; // Assign fetched data to the data variable
    console.log(data.features); // Logging events
    addGDACMarkers(); // Call addGDACMarkers after fetching data
    addPolygonLayers(); // Call addPolygonLayers after fetching data
});

// Function to generate popup content
function generatePopupContent(properties) {
    const popupContent = `
        <h3>Event Information</h3>
        <table>
            <tr><th>Attribute</th><th>Value</th></tr>
            <tr><td>Event Type</td><td>${properties.eventtype}</td></tr>
            <tr><td>Event Name</td><td>${properties.eventname}</td></tr>
            <tr><td>Description</td><td>${properties.description}</td></tr>
            <tr><td>Alert Level</td><td>${properties.alertlevel}</td></tr>
            <tr><td>Alert Score</td><td>${properties.alertscore}</td></tr>
            <tr><td>Severity</td><td>${properties.severitydata.severity} ${properties.severitydata.severityunit}</td></tr>
            <tr><td>Severity Text</td><td>${properties.severitydata.severitytext}</td></tr>
            <tr><td>Country</td><td>${properties.country}</td></tr>
            <tr><td>From Date</td><td>${properties.fromdate}</td></tr>
            <tr><td>To Date</td><td>${properties.todate}</td></tr>
        </table>
        <button id="close-popup">Close</button>
    `;
    return popupContent;
}

// Function to add GDAC markers with icons
function addGDACMarkers() {
    data.features.forEach(feature => {
        // Check for event type TC or FL
        if (feature.properties.eventtype === 'TC' || feature.properties.eventtype === 'FL') {
            var coordinates = feature.geometry.coordinates;
            var popupContent = generatePopupContent(feature.properties);

            // Check if the icon URL is present in the properties
            var iconUrl = feature.properties.icon;

            // Create a marker element
            var el = document.createElement('div');
            el.id = `gdac-marker-${feature.properties.id}`;
            el.className = 'marker gdac-marker';

            // If icon URL is present, set the background-image to the icon
            if (iconUrl) {
                el.style.backgroundImage = `url(${iconUrl})`;
            } else {
                console.warn('Icon URL not found for feature:', feature);
            }

            // Set the size of the marker
            el.style.width = '30px';
            el.style.height = '30px';

            if (feature.geometry.type === 'Point') {
                var pointLayerId = 'point-layer-' + Math.random().toString(36).substr(2, 9);
                pointLayers[pointLayerId] = coordinates;

                map.addLayer({
                    'id': pointLayerId,
                    'type': 'symbol',
                    'source': {
                        'type': 'geojson',
                        'data': {
                            'type': 'FeatureCollection',
                            'features': [{
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': coordinates
                                }
                            }]
                        }
                    },
                    'layout': {
                        'icon-image': 'marker-15', // default Mapbox marker
                        'icon-size': 1.5
                    }
                });

                new mapboxgl.Marker(el)
                    .setLngLat(coordinates)
                    .setPopup(new mapboxgl.Popup().setHTML(popupContent))
                    .addTo(map);
            }
        }
    });
}

// Function to add polygon layers
function addPolygonLayers() {
    data.features.forEach(feature => {
        // Check for event type TC or FL
        if (feature.properties.eventtype === 'TC' || feature.properties.eventtype === 'FL') {
            var fillColor;
            var coordinates = feature.geometry.coordinates;
            var alertLevel = feature.properties.alertlevel;

            if (alertLevel === 'Red') {
                fillColor = '#FF0000'; // Red
            } else if (alertLevel === 'Orange') {
                fillColor = '#FFA500'; // Orange
            } else if (alertLevel === 'Green') {
                fillColor = '#008000'; // Green
            } else {
                fillColor = '#000000'; // Default color
            }

            if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
                var polygonId = 'polygon-' + Math.random().toString(36).substr(2, 9); // Generate unique ID
                polygonLayers[polygonId] = coordinates;

                map.addLayer({
                    'id': polygonId,
                    'type': 'fill',
                    'source': {
                        'type': 'geojson',
                        'data': {
                            'type': 'Feature',
                            'geometry': feature.geometry
                        }
                    },
                    'layout': {},
                    'paint': {
                        'fill-color': fillColor,
                        'fill-opacity': 0.4
                    }
                });

                // Add click event listener to each polygon layer
                map.on('click', polygonId, function (e) {
                    var popupContent = generatePopupContent(feature.properties);
                    new mapboxgl.Popup()
                        .setLngLat(e.lngLat)
                        .setHTML(`<p>${popupContent}</p>`)
                        .addTo(map);
                });
            }
        }
    });
}

 // Function to remove GDAC markers
function removeGDACMarkers() {
    // Remove all markers with class 'gdac-marker'
    const gdacMarkers = document.querySelectorAll('.gdac-marker');
    gdacMarkers.forEach(marker => marker.remove());

    // Remove all point layers
    for (const layerId in pointLayers) {
        if (map.getLayer(layerId)) {
            map.removeLayer(layerId);
        }
    }
}
  
// creating a function to load the layers even if styles are changed 
function addAdditionalSourceAndLayer() {
    //adding the District data set
    map.addSource('pakdistricts', {
        type: 'geojson',
        data: district
    });
    map.addLayer({
        'id': 'pakdistricts-layer',
        'type': 'fill',
        'source': 'pakdistricts',
        'paint': {
            'fill-color': 'transparent', // Transparent fill color
            'fill-outline-color': 'black', // Black outline color
            'fill-opacity': 0.5, // Adjust transparency if needed
        }
    });
    //adding the rivers data set
    map.addSource('pakrivers', {
        type: 'geojson',
        data: rivers
    });
    map.addLayer({
        'id': 'pakrivers-layer',
        'type': 'line',
        'source': 'pakrivers',
        'paint': {
            'line-color': 'blue', // Blue line color
            'line-width': 1 // Line width
        }
    });
    // Add GeoJSON source from Plastic Waste Geojson
    //adding the Tropycal Cyclone Layer
    map.addSource('cyclonelayers', {
        type: 'raster',
        tiles: [
            'https://datacore.unepgrid.ch/geoserver/ows?SERVICE=WMS&REQUEST=GetMap&LAYERS=wesr_risk:cy_hazard_50_yrp&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'tcyclone50',
        type: 'raster',
        source: 'cyclonelayers',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );

    //adding the Tropycal Cyclone Layer population explosure tropicalcyclonepopulation
    map.addSource('tropicalcyclonepopulation', {
        type: 'raster',
        tiles: [
            'https://datacore.unepgrid.ch/geoserver/ows?service=WMS&request=GetMap&layers=wesr_risk:cy_physexp&version=1.3.0&format=image/png&transparent=true&width=256&height=256&crs=EPSG:3857&bbox={bbox-epsg-3857}'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'tcyclonepopulation',
        type: 'raster',
        source: 'tropicalcyclonepopulation',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );

    //adding the Tropycal Cyclone Layer mortality 
    map.addSource('TropicalCyclonesMortality', {
        type: 'raster',
        tiles: [
            'https://datacore.unepgrid.ch/geoserver/ows?SERVICE=WMS&REQUEST=GetMap&LAYERS=wesr_risk:cy_risk&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'tcyclonemortality',
        type: 'raster',
        source: 'TropicalCyclonesMortality',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
}
/* Adding the layers through map.onload which is not needed if basemap switcher tool is used
map.on('load', () => {
    //adding the District data set
    map.addSource('pakdistricts', {
        type: 'geojson',
        data: district
    });
    map.addLayer({
        'id': 'pakdistricts-layer',
        'type': 'fill',
        'source': 'pakdistricts',
        'paint': {
            'fill-color': 'transparent', // Transparent fill color
            'fill-outline-color': 'black', // Black outline color
            'fill-opacity': 0.5, // Adjust transparency if needed
        }
    });
    //adding the rivers data set
    map.addSource('pakrivers', {
        type: 'geojson',
        data: rivers
    });
    map.addLayer({
        'id': 'pakrivers-layer',
        'type': 'line',
        'source': 'pakrivers',
        'paint': {
            'line-color': 'blue', // Blue line color
            'line-width': 1 // Line width
        }
    });
    // Add GeoJSON source from Plastic Waste Geojson
    //the mangrove-cover-indusdelta layer
    map.addSource('Mangrove_Cover_indusdelta', {
        type: 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        tiles: [
            'http://172.18.1.4:8080/geoserver/Mustafa_Coastal_Mangrooves/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=Indus2020mmu&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'mindusdelta',
        type: 'raster',
        source: 'Mangrove_Cover_indusdelta',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
    map.addSource('Mangrove_Cover_sandspit', {
        type: 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        tiles: [
            'http://172.18.1.4:8080/geoserver/Mustafa_Coastal_Mangrooves/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=Sandspit2020mmu&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'msandspit',
        type: 'raster',
        source: 'Mangrove_Cover_sandspit',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
    map.addSource('Mangrove_Cover_Jiwani', {
        type: 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        tiles: [
            'http://172.18.1.4:8080/geoserver/Mustafa_Coastal_Mangrooves/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=jiwani2020mmu&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'mjiwani',
        type: 'raster',
        source: 'Mangrove_Cover_Jiwani',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
    // adding the Mangrove_Cover_kalmatkhor
    map.addSource('Mangrove_Cover_kalmatkhor', {
        type: 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        tiles: [
            'http://172.18.1.4:8080/geoserver/Mustafa_Coastal_Mangrooves/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=Kalmat2020mmu&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'mkalmatkhor',
        type: 'raster',
        source: 'Mangrove_Cover_kalmatkhor',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
    //adding the Mangrove_Cover_sonmianikhor layer
    map.addSource('Mangrove_Cover_sonmianikhor', {
        type: 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        tiles: [
            'http://172.18.1.4:8080/geoserver/Mustafa_Coastal_Mangrooves/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=Sonmiani2020mmu&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE'
        ],
        tileSize: 256
    });
    //adding the Tropycal Cyclone Layer
    map.addSource('cyclonelayers', {
        type: 'raster',
        tiles: [
            'https://datacore.unepgrid.ch/geoserver/ows?SERVICE=WMS&REQUEST=GetMap&LAYERS=wesr_risk:cy_hazard_50_yrp&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'tcyclone50',
        type: 'raster',
        source: 'cyclonelayers',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );

    //adding the Tropycal Cyclone Layer population explosure tropicalcyclonepopulation
    map.addSource('tropicalcyclonepopulation', {
        type: 'raster',
        tiles: [
            'https://datacore.unepgrid.ch/geoserver/ows?SERVICE=WMS&REQUEST=GetMap&LAYERS=wesr_risk:cy_physexp&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'tcyclonepopulation',
        type: 'raster',
        source: 'tropicalcyclonepopulation',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );

    //adding the Tropycal Cyclone Layer mortality 
    map.addSource('TropicalCyclonesMortality', {
        type: 'raster',
        tiles: [
            'https://datacore.unepgrid.ch/geoserver/ows?SERVICE=WMS&REQUEST=GetMap&LAYERS=wesr_risk:cy_risk&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'tcyclonemortality',
        type: 'raster',
        source: 'TropicalCyclonesMortality',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
});
*/
// creating a map on load for customn controls 
map.on('load',() => {
    addHomeButton(map);
    addBuildingControl(map);
    add3DControl(map);

});


//adding styles onto map
map.on('style.load', () => {
    addAdditionalSourceAndLayer()
    map.setFog({}); // Set the default atmosphere style
});
// creating the toggle layer functionalities 
map.on('idle', async() => {
    const toggleableLayerIds = ['tcyclone50','tcyclonepopulation','tcyclonemortality','nasa_eonet']; // IDs of layers with checkboxes and sliders
    // Check if the NASA EONET layer is present


    for (const id of toggleableLayerIds) {
        const visibilityCheckbox = document.querySelector(`input[data-layername="${id}"]`);
        const opacitySlider = document.querySelector(`input[data-opacitylayername="${id}"]`);

        if (!visibilityCheckbox || !opacitySlider) {
            continue;
        }

        // Add event listener for checkbox change
        visibilityCheckbox.addEventListener('change', function() {
            const visibility = this.checked ? 'visible' : 'none';

            if (map.getLayer(id)) {
                map.setLayoutProperty(id, 'visibility', visibility);
                if (visibility === 'visible') {
                }
            }
            // Check if the layer is 'nasa_eonet' and perform actions accordingly
        // Check if the layer is 'nasa_eonet' and perform actions accordingly
        if (id === 'nasa_eonet') {
            if (visibility === 'visible') {
                addEONETMarkers(); // Call the function to add NASA EONET markers
            } else {
                removeEONETMarkers(); // Call the function to remove NASA EONET markers
            }
        }
        });
        // Add event listener for removing GDAC markers
    document.getElementById('checkbox_gdacalert').addEventListener('change', function() {
        const visibility = this.checked ? 'visible' : 'none';
        for (const layerId in polygonLayers) {
            if (map.getLayer(layerId)) {
                map.setLayoutProperty(layerId, 'visibility', visibility);
            }
        }
        if (!this.checked) {
            removeGDACMarkers();
        } else {
            addGDACMarkers();
        }
    });

        
        // Add event listener for slider input
        opacitySlider.addEventListener('input', function() {
            const opacityValue = parseFloat(this.value) / 100; // Convert range [0-100] to [0-1]

            if (map.getLayer(id)) {
                map.setPaintProperty(id, 'raster-opacity', opacityValue);
            }
        });
    }
});
//adding the controls onto the map
map.addControl(new mapboxgl.FullscreenControl());
map.addControl(new MapboxStyleSwitcherControl());
const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');
map.addControl(new mapboxgl.ScaleControl());