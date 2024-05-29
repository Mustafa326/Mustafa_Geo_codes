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
function openFullscreen2(containerId) {
    var elem = document.getElementById(containerId);
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}
function openFullscreen3(containerId) {
    var elem = document.getElementById(containerId);
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
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
    style: "mapbox://styles/mapbox/satellite-streets-v12",
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
    // Define the video source
    //the mangrove-cover-indusdelta layer of 2020
    map.addSource('Mangrove_Cover_indusdelta', {
        type: 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        tiles: [
            'http://172.18.1.39:8080/geoserver/NDMA-Coastal/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=Indus2020mmu&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE'
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
     //the mangrove-cover-indusdelta layer of 1990
     map.addSource('Mangrove_Cover_indusdelta1990', {
        type: 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        tiles: [
            'http://172.18.1.39:8080/geoserver/NDMA-Coastal/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=Indus1990mmu&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'mindusdelta1990',
        type: 'raster',
        source: 'Mangrove_Cover_indusdelta1990',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
    //the mangrove-cover-indusdelta layer of 2005
    map.addSource('Mangrove_Cover_indusdelta2005', {
        type: 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        tiles: [
            'http://172.18.1.39:8080/geoserver/NDMA-Coastal/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=Indus2005mmu&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'mindusdelta2005',
        type: 'raster',
        source: 'Mangrove_Cover_indusdelta2005',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
    // adding the snadspit 2020 layer 
    map.addSource('Mangrove_Cover_sandspit', {
        type: 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        tiles: [
            'http://172.18.1.39:8080/geoserver/NDMA-Coastal/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=Sandspit2020mmu&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE'
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
    // adding the snadspit 2005 layer 
    map.addSource('Mangrove_Cover_sandspit2005', {
        type: 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        tiles: [
            'http://172.18.1.39:8080/geoserver/NDMA-Coastal/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=Sandspit2005mmu&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'msandspit2005',
        type: 'raster',
        source: 'Mangrove_Cover_sandspit2005',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
    // adding the snadspit 1990 layer 
    map.addSource('Mangrove_Cover_sandspit1990', {
        type: 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        tiles: [
            'http://172.18.1.39:8080/geoserver/NDMA-Coastal/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=Sandspit1990mmu&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'msandspit1990',
        type: 'raster',
        source: 'Mangrove_Cover_sandspit1990',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
    //adding the jiwani layer 2020
    map.addSource('Mangrove_Cover_Jiwani', {
        type: 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        tiles: [
            'http://172.18.1.39:8080/geoserver/NDMA-Coastal/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=jiwani2020mmu&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE'
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
    //adding the jiwani layer 2005
    map.addSource('Mangrove_Cover_Jiwani2005', {
        type: 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        tiles: [
            'http://172.18.1.39:8080/geoserver/NDMA-Coastal/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=jiwani2005mmu&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'mjiwani2005',
        type: 'raster',
        source: 'Mangrove_Cover_Jiwani2005',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
    //adding the jiwani layer 1990
    map.addSource('Mangrove_Cover_Jiwani1990', {
        type: 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        tiles: [
            'http://172.18.1.39:8080/geoserver/NDMA-Coastal/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=jiwani1990mmu&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'mjiwani1990',
        type: 'raster',
        source: 'Mangrove_Cover_Jiwani1990',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
    // adding the Mangrove_Cover_kalmatkhor 2020 layer
    map.addSource('Mangrove_Cover_kalmatkhor', {
        type: 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        tiles: [
            'http://172.18.1.39:8080/geoserver/NDMA-Coastal/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=Kalmat2020mmu&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE'
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
    // adding the Mangrove_Cover_kalmatkhor 2005 layer
    map.addSource('Mangrove_Cover_kalmatkhor2005', {
        type: 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        tiles: [
            'http://172.18.1.39:8080/geoserver/NDMA-Coastal/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=Kalmat2005mmu&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'mkalmatkhor2005',
        type: 'raster',
        source: 'Mangrove_Cover_kalmatkhor2005',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
    // adding the Mangrove_Cover_kalmatkhor 1990 layer
    map.addSource('Mangrove_Cover_kalmatkhor1990', {
        type: 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        tiles: [
            'http://172.18.1.39:8080/geoserver/NDMA-Coastal/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=Kalmat1990mmu&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'mkalmatkhor1990',
        type: 'raster',
        source: 'Mangrove_Cover_kalmatkhor1990',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
    //adding the Mangrove_Cover_sonmianikhor 2020 layer
    map.addSource('Mangrove_Cover_sonmianikhor', {
        type: 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        tiles: [
            'http://172.18.1.39:8080/geoserver/NDMA-Coastal/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=Sonmiani2020mmu&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'msonmianikhor',
        type: 'raster',
        source: 'Mangrove_Cover_sonmianikhor',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
    //adding the Mangrove_Cover_sonmianikhor 2005 layer
    map.addSource('Mangrove_Cover_sonmianikhor2005', {
        type: 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        tiles: [
            'http://172.18.1.39:8080/geoserver/NDMA-Coastal/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=Sonmiani2005mmu&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'msonmianikhor2005',
        type: 'raster',
        source: 'Mangrove_Cover_sonmianikhor2005',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
    //adding the Mangrove_Cover_sonmianikhor 1990 layer
    map.addSource('Mangrove_Cover_sonmianikhor1990', {
        type: 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        tiles: [
            'http://172.18.1.39:8080/geoserver/NDMA-Coastal/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=Sonmiani1990mmu&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'msonmianikhor1990',
        type: 'raster',
        source: 'Mangrove_Cover_sonmianikhor1990',
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
    // Define the video source
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
    map.addLayer({
        id: 'msonmianikhor',
        type: 'raster',
        source: 'Mangrove_Cover_sonmianikhor',
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
    const toggleableLayerIds = ['mindusdelta', 'mjiwani', 'msandspit', 'mkalmatkhor', 'msonmianikhor']; // IDs of layers with checkboxes and sliders

    const layerZoomLocations = {
        mindusdelta: [24.8607, 67.0011], // Example values for mindusdelta
        mjiwani: [25.0538, 61.7707], // Example values for mjiwani
        msandspit: [24.8404, 66.9098], // Example values for msandspit
        mkalmatkhor: [25.4211, 64.0769], // Example values for mkalmatkhor
        msonmianikhor: [25.1667, 66.5000], // Example values for msonmianikhor
        swronemeter: [24.8404, 66.9098], // Example values for swronemeter
        swrtwometer: [24.8404, 66.9098], // Example values for swrtwometer
        swrfivemeter: [24.8404, 66.9098], // Example values for swrfivemeter
        swrtenmeter: [24.8404, 66.9098] // Example values for msandspit
    };

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
                    const [lat, lng] = layerZoomLocations[id];
                    map.flyTo({
                        center: [lng, lat],
                        zoom: 10, // Adjust the zoom level as needed
                        essential: true // This animation is considered essential with respect to prefers-reduced-motion media query
                    });
                }
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
document.addEventListener('DOMContentLoaded', function() {
    const mangroveWatchCheckbox = document.querySelector('input[data-layername="mwatch"]');
    const mainContainer = document.getElementById('main-container-mangroves');
    let iframeEezMarineSurveillance; // Declare iframe variable outside event listener

    mangroveWatchCheckbox.addEventListener('change', function() {
        if (this.checked) {
            // If checkbox is checked, show the iframe
            iframeEezMarineSurveillance = document.createElement('iframe');
            iframeEezMarineSurveillance.src = "https://www.globalmangrovewatch.org/country/PAK?bounds=[[4.076083885254093,13.17872774821977],[126.38415324199758,57.87126016158558]]&basemap=%22light%22";
            iframeEezMarineSurveillance.style.width = '100%';
            iframeEezMarineSurveillance.style.height = '100%';
            iframeEezMarineSurveillance.style.border = 'none';

            mainContainer.appendChild(iframeEezMarineSurveillance);
        } else {
            // If checkbox is unchecked, remove the iframe
            if (iframeEezMarineSurveillance) {
                iframeEezMarineSurveillance.remove();
            }
        }
    });
});
//adding a functionality for time slider of mangrove cover indus delta
document.addEventListener('DOMContentLoaded', () => {
    const mangroveLayers = ['mindusdelta1990', 'mindusdelta2005', 'mindusdelta'];
    const mangroveLayerNames = ['1990', '2005', '2021'];
    let currentMangroveLayerIndex = 0;
    let isMangrovePlaying = false;
    let mangroveIntervalId;

    const mangroveSlider = document.getElementById('mangrove-slider');
    const mangrovePlayButton = document.getElementById('mangrove-playButton');
    const mangroveRemoveButton = document.getElementById('mangrove-removeButton');
    const mangroveLayerName = document.getElementById('mangrove-layerName');
    const mangroveSliderContainer = document.getElementById('mangrove-slider-container');

    mangroveSliderContainer.style.display = 'none'; // Initially hide the slider container

    // Function to update layers
    function updateMangroveLayer(index) {
        map.setLayoutProperty(mangroveLayers[currentMangroveLayerIndex], 'visibility', 'none');
        map.setLayoutProperty(mangroveLayers[index], 'visibility', 'visible');
        currentMangroveLayerIndex = index;
        mangroveLayerName.textContent = mangroveLayerNames[index];
        mangroveSlider.value = index;
    }

    // Slider input event
    mangroveSlider.addEventListener('input', function (e) {
        const index = parseInt(e.target.value);
        updateMangroveLayer(index);
    });

    // Play/Pause button event
    mangrovePlayButton.addEventListener('click', function () {
        if (isMangrovePlaying) {
            clearInterval(mangroveIntervalId);
            isMangrovePlaying = false;
            this.textContent = '▶️';
        } else {
            isMangrovePlaying = true;
            this.textContent = '⏸️';
            mangroveIntervalId = setInterval(() => {
                const nextIndex = (currentMangroveLayerIndex + 1) % mangroveLayers.length;
                updateMangroveLayer(nextIndex);
            }, 2000); // Adjust the interval as needed
        }
    });

    // Remove button event
    mangroveRemoveButton.addEventListener('click', function () {
        mangroveLayers.forEach(layer => {
            map.setLayoutProperty(layer, 'visibility', 'none');
        });
        mangroveSliderContainer.style.display = 'none';
        clearInterval(mangroveIntervalId);
        isMangrovePlaying = false;
        mangrovePlayButton.textContent = '▶️';
    });

    // Checkbox change event
    const mangroveCheckbox = document.querySelector('.layers-checkbox[data-layername="mindusdelta"]');
    mangroveCheckbox.addEventListener('change', function () {
        if (this.checked) {
            updateMangroveLayer(0);
            mangroveSliderContainer.style.display = 'block';
        } else {
            mangroveLayers.forEach(layer => {
                map.setLayoutProperty(layer, 'visibility', 'none');
            });
            mangroveSliderContainer.style.display = 'none';
            clearInterval(mangroveIntervalId);
            isMangrovePlaying = false;
            mangrovePlayButton.textContent = '▶️';
        }
    });
});
// creating a time slider functionality for the kalmat khor rasters
document.addEventListener('DOMContentLoaded', () => {
    const kalmatkhorLayers = ['mkalmatkhor1990', 'mkalmatkhor2005', 'mkalmatkhor'];
    const kalmatkhorLayerNames = ['1990', '2005', '2020'];
    let currentKalmatkhorLayerIndex = 0;
    let isKalmatkhorPlaying = false;
    let kalmatkhorIntervalId;

    const kalmatkhorSlider = document.getElementById('mangrove-slider-kalmatkhor');
    const kalmatkhorPlayButton = document.getElementById('mangrove-kalmatkhor-playButton');
    const kalmatkhorRemoveButton = document.getElementById('mangrove-kalmatkhor-removeButton');
    const kalmatkhorLayerName = document.getElementById('mangrove-kalmatkhor-layerName');
    const kalmatkhorSliderContainer = document.getElementById('mangrove-slider-container-kalmatkhor');

    kalmatkhorSliderContainer.style.display = 'none'; // Initially hide the slider container

    // Function to update layers
    function updateKalmatkhorLayer(index) {
        map.setLayoutProperty(kalmatkhorLayers[currentKalmatkhorLayerIndex], 'visibility', 'none');
        map.setLayoutProperty(kalmatkhorLayers[index], 'visibility', 'visible');
        currentKalmatkhorLayerIndex = index;
        kalmatkhorLayerName.textContent = kalmatkhorLayerNames[index];
        kalmatkhorSlider.value = index;
    }

    // Slider input event
    kalmatkhorSlider.addEventListener('input', function (e) {
        const index = parseInt(e.target.value);
        updateKalmatkhorLayer(index);
    });

    // Play/Pause button event
    kalmatkhorPlayButton.addEventListener('click', function () {
        if (isKalmatkhorPlaying) {
            clearInterval(kalmatkhorIntervalId);
            isKalmatkhorPlaying = false;
            this.textContent = '▶️';
        } else {
            isKalmatkhorPlaying = true;
            this.textContent = '⏸️';
            kalmatkhorIntervalId = setInterval(() => {
                const nextIndex = (currentKalmatkhorLayerIndex + 1) % kalmatkhorLayers.length;
                updateKalmatkhorLayer(nextIndex);
            }, 2000); // Adjust the interval as needed
        }
    });

    // Remove button event
    kalmatkhorRemoveButton.addEventListener('click', function () {
        kalmatkhorLayers.forEach(layer => {
            map.setLayoutProperty(layer, 'visibility', 'none');
        });
        kalmatkhorSliderContainer.style.display = 'none';
        clearInterval(kalmatkhorIntervalId);
        isKalmatkhorPlaying = false;
        kalmatkhorPlayButton.textContent = '▶️';
        // Uncheck the checkbox when layers are removed
        kalmatkhorCheckbox.checked = false;
    });

    // Checkbox change event
    const kalmatkhorCheckbox = document.querySelector('.layers-checkbox[data-layername="mkalmatkhor"]');
    kalmatkhorCheckbox.addEventListener('change', function () {
        if (this.checked) {
            updateKalmatkhorLayer(0);
            kalmatkhorSliderContainer.style.display = 'block';
        } else {
            kalmatkhorLayers.forEach(layer => {
                map.setLayoutProperty(layer, 'visibility', 'none');
            });
            kalmatkhorSliderContainer.style.display = 'none';
            clearInterval(kalmatkhorIntervalId);
            isKalmatkhorPlaying = false;
            kalmatkhorPlayButton.textContent = '▶️';
        }
    });
});
//creating a time slider functionality for the sonniani khor data layers
document.addEventListener('DOMContentLoaded', () => {
    const sonmianikhorLayers = ['msonmianikhor1990', 'msonmianikhor2005', 'msonmianikhor'];
    const sonmianikhorLayerNames = ['1990', '2005', '2020'];
    let currentSonmianikhorLayerIndex = 0;
    let isSonmianikhorPlaying = false;
    let sonmianikhorIntervalId;

    const sonmianikhorSlider = document.getElementById('mangrove-slider-sonmianikhor');
    const sonmianikhorPlayButton = document.getElementById('mangrove-sonmianikhor-playButton');
    const sonmianikhorRemoveButton = document.getElementById('mangrove-sonmianikhor-removeButton');
    const sonmianikhorLayerName = document.getElementById('mangrove-sonmianikhor-layerName');
    const sonmianikhorSliderContainer = document.getElementById('mangrove-slider-container-sonmianikhor');

    sonmianikhorSliderContainer.style.display = 'none'; // Initially hide the slider container

    // Function to update layers
    function updateSonmianikhorLayer(index) {
        map.setLayoutProperty(sonmianikhorLayers[currentSonmianikhorLayerIndex], 'visibility', 'none');
        map.setLayoutProperty(sonmianikhorLayers[index], 'visibility', 'visible');
        currentSonmianikhorLayerIndex = index;
        sonmianikhorLayerName.textContent = sonmianikhorLayerNames[index];
        sonmianikhorSlider.value = index;
    }

    // Slider input event
    sonmianikhorSlider.addEventListener('input', function (e) {
        const index = parseInt(e.target.value);
        updateSonmianikhorLayer(index);
    });

    // Play/Pause button event
    sonmianikhorPlayButton.addEventListener('click', function () {
        if (isSonmianikhorPlaying) {
            clearInterval(sonmianikhorIntervalId);
            isSonmianikhorPlaying = false;
            this.textContent = '▶️';
        } else {
            isSonmianikhorPlaying = true;
            this.textContent = '⏸️';
            sonmianikhorIntervalId = setInterval(() => {
                const nextIndex = (currentSonmianikhorLayerIndex + 1) % sonmianikhorLayers.length;
                updateSonmianikhorLayer(nextIndex);
            }, 2000); // Adjust the interval as needed
        }
    });

    // Remove button event
    sonmianikhorRemoveButton.addEventListener('click', function () {
        sonmianikhorLayers.forEach(layer => {
            map.setLayoutProperty(layer, 'visibility', 'none');
        });
        sonmianikhorSliderContainer.style.display = 'none';
        clearInterval(sonmianikhorIntervalId);
        isSonmianikhorPlaying = false;
        sonmianikhorPlayButton.textContent = '▶️';
        // Uncheck the checkbox when layers are removed
        sonmianikhorCheckbox.checked = false;
    });

    // Checkbox change event
    const sonmianikhorCheckbox = document.querySelector('.layers-checkbox[data-layername="msonmianikhor"]');
    sonmianikhorCheckbox.addEventListener('change', function () {
        if (this.checked) {
            updateSonmianikhorLayer(0);
            sonmianikhorSliderContainer.style.display = 'block';
        } else {
            sonmianikhorLayers.forEach(layer => {
                map.setLayoutProperty(layer, 'visibility', 'none');
            });
            sonmianikhorSliderContainer.style.display = 'none';
            clearInterval(sonmianikhorIntervalId);
            isSonmianikhorPlaying = false;
            sonmianikhorPlayButton.textContent = '▶️';
        }
    });
});
//creating a timeslider for the the jiwani
document.addEventListener('DOMContentLoaded', () => {
    const jiwaniLayers = ['mjiwani1990', 'mjiwani2005', 'mjiwani'];
    const jiwaniLayerNames = ['1990', '2005', '2020'];
    let currentJiwaniLayerIndex = 0;
    let isJiwaniPlaying = false;
    let jiwaniIntervalId;

    const jiwaniSlider = document.getElementById('mangrove-slider-jiwani');
    const jiwaniPlayButton = document.getElementById('mangrove-jiwani-playButton');
    const jiwaniRemoveButton = document.getElementById('mangrove-jiwani-removeButton');
    const jiwaniLayerName = document.getElementById('mangrove-jiwani-layerName');
    const jiwaniSliderContainer = document.getElementById('mangrove-slider-container-jiwani');

    jiwaniSliderContainer.style.display = 'none'; // Initially hide the slider container

    // Function to update layers
    function updateJiwaniLayer(index) {
        map.setLayoutProperty(jiwaniLayers[currentJiwaniLayerIndex], 'visibility', 'none');
        map.setLayoutProperty(jiwaniLayers[index], 'visibility', 'visible');
        currentJiwaniLayerIndex = index;
        jiwaniLayerName.textContent = jiwaniLayerNames[index];
        jiwaniSlider.value = index;
    }

    // Slider input event
    jiwaniSlider.addEventListener('input', function (e) {
        const index = parseInt(e.target.value);
        updateJiwaniLayer(index);
    });

    // Play/Pause button event
    jiwaniPlayButton.addEventListener('click', function () {
        if (isJiwaniPlaying) {
            clearInterval(jiwaniIntervalId);
            isJiwaniPlaying = false;
            this.textContent = '▶️';
        } else {
            isJiwaniPlaying = true;
            this.textContent = '⏸️';
            jiwaniIntervalId = setInterval(() => {
                const nextIndex = (currentJiwaniLayerIndex + 1) % jiwaniLayers.length;
                updateJiwaniLayer(nextIndex);
            }, 2000); // Adjust the interval as needed
        }
    });

    // Remove button event
    jiwaniRemoveButton.addEventListener('click', function () {
        jiwaniLayers.forEach(layer => {
            map.setLayoutProperty(layer, 'visibility', 'none');
        });
        jiwaniSliderContainer.style.display = 'none';
        clearInterval(jiwaniIntervalId);
        isJiwaniPlaying = false;
        jiwaniPlayButton.textContent = '▶️';
        // Uncheck the checkbox when layers are removed
        jiwaniCheckbox.checked = false;
    });

    // Checkbox change event
    const jiwaniCheckbox = document.querySelector('.layers-checkbox[data-layername="mjiwani"]');
    jiwaniCheckbox.addEventListener('change', function () {
        if (this.checked) {
            updateJiwaniLayer(0);
            jiwaniSliderContainer.style.display = 'block';
        } else {
            jiwaniLayers.forEach(layer => {
                map.setLayoutProperty(layer, 'visibility', 'none');
            });
            jiwaniSliderContainer.style.display = 'none';
            clearInterval(jiwaniIntervalId);
            isJiwaniPlaying = false;
            jiwaniPlayButton.textContent = '▶️';
        }
    });
});
//adding the slider functionality for sandspit
document.addEventListener('DOMContentLoaded', () => {
    const sandspitLayers = ['msandspit1990', 'msandspit2005', 'msandspit'];
    const sandspitLayerNames = ['1990', '2005', '2020'];
    let currentSandspitLayerIndex = 0;
    let isSandspitPlaying = false;
    let sandspitIntervalId;

    const sandspitSlider = document.getElementById('mangrove-slider-sandspit');
    const sandspitPlayButton = document.getElementById('mangrove-sandspit-playButton');
    const sandspitRemoveButton = document.getElementById('mangrove-sandspit-removeButton');
    const sandspitLayerName = document.getElementById('mangrove-sandspit-layerName');
    const sandspitSliderContainer = document.getElementById('mangrove-slider-container-sandspit');

    sandspitSliderContainer.style.display = 'none'; // Initially hide the slider container

    // Function to update layers
    function updateSandspitLayer(index) {
        map.setLayoutProperty(sandspitLayers[currentSandspitLayerIndex], 'visibility', 'none');
        map.setLayoutProperty(sandspitLayers[index], 'visibility', 'visible');
        currentSandspitLayerIndex = index;
        sandspitLayerName.textContent = sandspitLayerNames[index];
        sandspitSlider.value = index;
    }

    // Slider input event
    sandspitSlider.addEventListener('input', function (e) {
        const index = parseInt(e.target.value);
        updateSandspitLayer(index);
    });

    // Play/Pause button event
    sandspitPlayButton.addEventListener('click', function () {
        if (isSandspitPlaying) {
            clearInterval(sandspitIntervalId);
            isSandspitPlaying = false;
            this.textContent = '▶️';
        } else {
            isSandspitPlaying = true;
            this.textContent = '⏸️';
            sandspitIntervalId = setInterval(() => {
                const nextIndex = (currentSandspitLayerIndex + 1) % sandspitLayers.length;
                updateSandspitLayer(nextIndex);
            }, 2000); // Adjust the interval as needed
        }
    });

    // Remove button event
    sandspitRemoveButton.addEventListener('click', function () {
        sandspitLayers.forEach(layer => {
            map.setLayoutProperty(layer, 'visibility', 'none');
        });
        sandspitSliderContainer.style.display = 'none';
        clearInterval(sandspitIntervalId);
        isSandspitPlaying = false;
        sandspitPlayButton.textContent = '▶️';
        // Uncheck the checkbox when layers are removed
        sandspitCheckbox.checked = false;
    });

    // Checkbox change event
    const sandspitCheckbox = document.querySelector('.layers-checkbox[data-layername="msandspit"]');
    sandspitCheckbox.addEventListener('change', function () {
        if (this.checked) {
            updateSandspitLayer(0);
            sandspitSliderContainer.style.display = 'block';
        } else {
            sandspitLayers.forEach(layer => {
                map.setLayoutProperty(layer, 'visibility', 'none');
            });
            sandspitSliderContainer.style.display = 'none';
            clearInterval(sandspitIntervalId);
            isSandspitPlaying = false;
            sandspitPlayButton.textContent = '▶️';
        }
    });
});
//adding the controls onto the map
map.addControl(new mapboxgl.FullscreenControl());
map.addControl(new MapboxStyleSwitcherControl());
const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');
map.addControl(new mapboxgl.ScaleControl());