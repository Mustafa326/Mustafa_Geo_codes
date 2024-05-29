
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
// Define thresholds for thematic styling based on maximum, minimum, and mean 'mpw' values.
var maxMpw = 5685870000;
var minMpw = 0;
var meanMpw = 1383029.785233205;

var highThreshold = meanMpw * 2;
var mediumThreshold = meanMpw / 2;

// Function to style each feature in the GeoJSON layer
function styleFeature(feature) {
    // Get 'mpw' value from feature properties
    var mpwValue = feature.properties.mpw;

    // Calculate point size based on the square root of 'mpw' divided by 2000, and add 1
    var size = Math.sqrt(mpwValue) / 2000 + 1;

    // Thematic color scheme based on 'mpw' values
    var color;
    if (mpwValue >= highThreshold) {
        color = 'red';
    } else if (mpwValue >= mediumThreshold) {
        color = 'yellow';
    } else {
        color = 'green';
    }

    // Return the styled circle properties
    return {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: feature.geometry.coordinates
        },
        properties: {
            size: size,
            color: color
        }
    };
}
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
        button.innerHTML = `<img src="buildingicon.svg" alt="Buildings" style="width: 20px; height: 20px;">`;
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
    { title: "Dark", uri: "mapbox://styles/mapbox/dark-v9" },
    { title: "Light", uri: "mapbox://styles/mapbox/light-v9" },
    { title: "Outdoors", uri: "mapbox://styles/mapbox/outdoors-v10" },
    { title: "Satellite", uri: "mapbox://styles/mapbox/satellite-streets-v10" },
    { title: "Streets", uri: "mapbox://styles/mapbox/streets-v10" }
];
// Create the GeoJSON data with styled features
var styledFeatures = {
    type: 'FeatureCollection',
    features: coastallitter.features.map(styleFeature)
};
// creating a function to load the layers even if styles are changed 
function addAdditionalSourceAndLayer() {
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
    map.addSource('Plastic_Waste_Generation', {
        type: 'geojson',
        data: plasticwaste
    });
    // Add choropleth layer for plastic waste generation
    map.addLayer({
        'id': 'plasticwgeneration',
        'type': 'fill',
        'source': 'Plastic_Waste_Generation',
        'paint': {
            'fill-color': [
                'interpolate', ['linear'],
                ['get', 'Plastic_Wa'],
                267234, '#FED976',
                1022683, '#FEB24C',
                2031675, '#FD8D3C',
                3919268, '#FC4E2A',
                7993489, '#E31A1C',
                14476561, '#BD0026',
                59079741, '#800026'
            ],
            'fill-opacity': 0.7
        },
        'layout': { 'visibility': 'none' }
    });
    // Add choropleth layer for Missmanaged PW
    map.addLayer({
        'id': 'misplasticwaste',
        'type': 'fill',
        'source': 'Plastic_Waste_Generation',
        'paint': {
            'fill-color': [
                'interpolate', ['linear'],
                ['get', 'Mismanaged'],
                73139, '#FED976',
                247495, '#FEB24C',
                520002, '#FD8D3C',
                1021990, '#FC4E2A',
                1948950, '#E31A1C',
                4942514, '#BD0026',
                12994100, '#800026'
            ],
            'fill-opacity': 0.7
        },
        'layout': { 'visibility': 'none' }
    });
    // Add choropleth layer for Missmanaged PW Ocean
    map.addLayer({
        'id': 'misplasticwasteocean',
        'type': 'fill',
        'source': 'Plastic_Waste_Generation',
        'paint': {
            'fill-color': [
                'interpolate', ['linear'],
                ['get', 'Mismanag_1'],
                1465, '#FED976',
                5237, '#FEB24C',
                14329, '#FD8D3C',
                37799, '#FC4E2A',
                73098, '#E31A1C',
                126513, '#BD0026',
                356371, '#800026'
            ],
            'fill-opacity': 0.7
        },
        'layout': { 'visibility': 'none' }
    });

    // Add choropleth layer for propability of plastic  Ocean
    map.addLayer({
        'id': 'propplasticocean',
        'type': 'fill',
        'source': 'Plastic_Waste_Generation',
        'paint': {
            'fill-color': [
                'interpolate', ['linear'],
                ['get', 'Probabilit'],
                0.22, '#FED976',
                0.63, '#FEB24C',
                1.27, '#FD8D3C',
                2.71, '#FC4E2A',
                5.05, '#E31A1C',
                7.92, '#BD0026',
                13.74, '#800026'
            ],
            'fill-opacity': 0.7
        },
        'layout': { 'visibility': 'none' }
    });
    map.addSource('marinelitterconcentration', {
        type: 'geojson',
        data: styledFeatures
    });

    map.addLayer({
        id: 'marinemicroemicnoc',
        type: 'circle',
        source: 'marinelitterconcentration',
        paint: {
            'circle-radius': ['get', 'size'],
            'circle-color': ['get', 'color'],
            'circle-opacity': 0.4,
            'circle-stroke-color': '#000',
            'circle-stroke-width': 1
        },
        'layout': { 'visibility': 'none' }
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
    //adding the Sea Surface Temperature Monthly Day Layer
    map.addSource('seasurfacetemp_sstmonthday', {
        type: 'raster',
        tiles: [
            'https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&LAYERS=MODIS_Aqua_L3_SST_Thermal_4km_Day_Monthly&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'sstmonthday',
        type: 'raster',
        source: 'seasurfacetemp_sstmonthday',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
    //adding the Sea Surface Temperature Monthly Night Layer
    map.addSource('seasurfacetemp_sstmonthnight', {
        type: 'raster',
        tiles: [
            'https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&LAYERS=MODIS_Aqua_L3_SST_Thermal_4km_Night_Monthly&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'sstmonthnight',
        type: 'raster',
        source: 'seasurfacetemp_sstmonthnight',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
    //adding the Sea Surface Temperature Anomalies Layer
    map.addSource('seasurfacetemp_sstanomalies', {
        type: 'raster',
        tiles: [
            'https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&LAYERS=GHRSST_L4_MUR_Sea_Surface_Temperature_Anomalies&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'sstanomalies',
        type: 'raster',
        source: 'seasurfacetemp_sstanomalies',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
    //adding the Sea Level Rise Scenario 1m Layer
    map.addSource('onemSource', {
        type: 'geojson',
        data: onem
    });
    // Add the layer with style defined within paint property
    map.addLayer({
        id: 'swronemeter',
        type: 'fill',
        source: 'onemSource',
        paint: {
            "fill-color": "#ff4000", // Hollow fill color
            "fill-opacity": 0.4,     // Opacity of fill
            "line-color": "brown",   // Red boundary color
            "line-width": 1          // Border width
        },layout: { visibility: 'none' }
    });
    //adding the Sea Level Rise Scenario 2m Layer
    map.addSource('twomSource', {
        type: 'geojson',
        data: twom
    });
    // Add the layer with style defined within paint property
    map.addLayer({
        id: 'swrtwometer',
        type: 'fill',
        source: 'twomSource',
        paint: {
            "fill-color": "#bf00ff", // Hollow fill color
            "fill-opacity": 0.4,     // Opacity of fill
            "line-color": "purple",   // Red boundary color
            "line-width": 1          // Border width
        },layout: { visibility: 'none' }
    });
    //adding the Sea Level Rise Scenario 5m Layer
    map.addSource('fivemSource', {
        type: 'geojson',
        data: fivem
    });
    // Add the layer with style defined within paint property
    map.addLayer({
        id: 'swrfivemeter',
        type: 'fill',
        source: 'fivemSource',
        paint: {
            "fill-color": "#ff8000", // Hollow fill color
            "fill-opacity": 0.4,     // Opacity of fill
            "line-color": "orange",   // Red boundary color
            "line-width": 1          // Border width
        },layout: { visibility: 'none' }
    });
    //adding the Sea Level Rise Scenario 10m Layer
    map.addSource('tenmSource', {
        type: 'geojson',
        data: tenm
    });
    // Add the layer with style defined within paint property
    map.addLayer({
        id: 'swrtenmeter',
        type: 'fill',
        source: 'tenmSource',
        paint: {
            "fill-color": "#ff0080", // Hollow fill color
            "fill-opacity": 0.4,     // Opacity of fill
            "line-color": "red",   // Red boundary color
            "line-width": 1          // Border width
        },layout: { visibility: 'none' }
    });
    //adding the Coastal Flood Projection Layer
    map.addSource('CoastalFloodProjection', {
        type: 'raster',
        tiles: [
            'https://www.geonode-gfdrrlab.org/geoserver/ows?SERVICE=WMS&REQUEST=GetMap&LAYERS=hazard:ss_muis_rp0100m&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'coastalflood',
        type: 'raster',
        source: 'CoastalFloodProjection',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
    //adding the sea level rise layer
    map.addSource('SeaLevelRiseAnaomalies', {
        type: 'raster',
        tiles: [
            'https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&LAYERS=TOPEX-Poseidon_JASON_Sea_Surface_Height_Anomalies_GDR_Cycles&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'sealevelriseanomalies',
        type: 'raster',
        source: 'SeaLevelRiseAnaomalies',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );

    //adding the sea surface salinity layer 2020
    map.addSource('SalinityIndex2020', {
        type: 'raster',
        tiles: [
            'http://172.18.1.4:8080/geoserver/NDMA-costal-rasters/wms?SERVICE=WMS&REQUEST=GetMap&LAYERS=2020&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'salinity2020',
        type: 'raster',
        source: 'SalinityIndex2020',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
    //adding the sea surface salinity layer 2021
    map.addSource('SalinityIndex2021', {
        type: 'raster',
        tiles: [
            'http://172.18.1.4:8080/geoserver/NDMA-costal-rasters/wms?SERVICE=WMS&REQUEST=GetMap&LAYERS=Mosaic21-Salinity&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'salinity2021',
        type: 'raster',
        source: 'SalinityIndex2021',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
    //adding the sea surface salinity layer Nasa gibs monthly
    map.addSource('SeaSurfaceSalinityMonthly', {
        type: 'raster',
        tiles: [
            'https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&LAYERS=SMAP_L3_Sea_Surface_Salinity_REMSS_Monthly&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'seasalmonthly',
        type: 'raster',
        source: 'SeaSurfaceSalinityMonthly',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
    //adding the sea surface salinity layer Nasa gibs daily
    map.addSource('SeaSurfaceSalinityDaily', {
        type: 'raster',
        tiles: [
            'https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&LAYERS=SMAP_L3_Sea_Surface_Salinity_REMSS_8Day_RunningMean&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'seasaldaily',
        type: 'raster',
        source: 'SeaSurfaceSalinityDaily',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
    //adding the saline water intrusion
    map.addSource('salineWaterintrusion', {
        type: 'raster',
        tiles: [
            'http://172.18.1.4:8080/geoserver/NDMA-costal-rasters/wms?SERVICE=WMS&REQUEST=GetMap&LAYERS=saline_tarces&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'salinewater',
        type: 'raster',
        source: 'salineWaterintrusion',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
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
}
// adding the layers and sources (do not need when the layer swithing control is added)
/*
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
    map.addSource('Plastic_Waste_Generation', {
        type: 'geojson',
        data: plasticwaste
    });
    // Add choropleth layer for plastic waste generation
    map.addLayer({
        'id': 'plasticwgeneration',
        'type': 'fill',
        'source': 'Plastic_Waste_Generation',
        'paint': {
            'fill-color': [
                'interpolate', ['linear'],
                ['get', 'Plastic_Wa'],
                267234, '#FED976',
                1022683, '#FEB24C',
                2031675, '#FD8D3C',
                3919268, '#FC4E2A',
                7993489, '#E31A1C',
                14476561, '#BD0026',
                59079741, '#800026'
            ],
            'fill-opacity': 0.7
        },
        'layout': { 'visibility': 'none' }
    });
    // Add choropleth layer for Missmanaged PW
    map.addLayer({
        'id': 'misplasticwaste',
        'type': 'fill',
        'source': 'Plastic_Waste_Generation',
        'paint': {
            'fill-color': [
                'interpolate', ['linear'],
                ['get', 'Mismanaged'],
                73139, '#FED976',
                247495, '#FEB24C',
                520002, '#FD8D3C',
                1021990, '#FC4E2A',
                1948950, '#E31A1C',
                4942514, '#BD0026',
                12994100, '#800026'
            ],
            'fill-opacity': 0.7
        },
        'layout': { 'visibility': 'none' }
    });
    // Add choropleth layer for Missmanaged PW Ocean
    map.addLayer({
        'id': 'misplasticwasteocean',
        'type': 'fill',
        'source': 'Plastic_Waste_Generation',
        'paint': {
            'fill-color': [
                'interpolate', ['linear'],
                ['get', 'Mismanag_1'],
                1465, '#FED976',
                5237, '#FEB24C',
                14329, '#FD8D3C',
                37799, '#FC4E2A',
                73098, '#E31A1C',
                126513, '#BD0026',
                356371, '#800026'
            ],
            'fill-opacity': 0.7
        },
        'layout': { 'visibility': 'none' }
    });

    // Add choropleth layer for propability of plastic  Ocean
    map.addLayer({
        'id': 'propplasticocean',
        'type': 'fill',
        'source': 'Plastic_Waste_Generation',
        'paint': {
            'fill-color': [
                'interpolate', ['linear'],
                ['get', 'Probabilit'],
                0.22, '#FED976',
                0.63, '#FEB24C',
                1.27, '#FD8D3C',
                2.71, '#FC4E2A',
                5.05, '#E31A1C',
                7.92, '#BD0026',
                13.74, '#800026'
            ],
            'fill-opacity': 0.7
        },
        'layout': { 'visibility': 'none' }
    });
    map.addSource('marinelitterconcentration', {
        type: 'geojson',
        data: styledFeatures
    });

    map.addLayer({
        id: 'marinemicroemicnoc',
        type: 'circle',
        source: 'marinelitterconcentration',
        paint: {
            'circle-radius': ['get', 'size'],
            'circle-color': ['get', 'color'],
            'circle-opacity': 0.4,
            'circle-stroke-color': '#000',
            'circle-stroke-width': 1
        },
        'layout': { 'visibility': 'none' }
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
    //adding the Sea Surface Temperature Monthly Day Layer
    map.addSource('seasurfacetemp_sstmonthday', {
        type: 'raster',
        tiles: [
            'https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&LAYERS=MODIS_Aqua_L3_SST_Thermal_4km_Day_Monthly&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'sstmonthday',
        type: 'raster',
        source: 'seasurfacetemp_sstmonthday',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
    //adding the Sea Surface Temperature Monthly Night Layer
    map.addSource('seasurfacetemp_sstmonthnight', {
        type: 'raster',
        tiles: [
            'https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&LAYERS=MODIS_Aqua_L3_SST_Thermal_4km_Night_Monthly&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'sstmonthnight',
        type: 'raster',
        source: 'seasurfacetemp_sstmonthnight',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
    //adding the Sea Surface Temperature Anomalies Layer
    map.addSource('seasurfacetemp_sstanomalies', {
        type: 'raster',
        tiles: [
            'https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&LAYERS=GHRSST_L4_MUR_Sea_Surface_Temperature_Anomalies&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'sstanomalies',
        type: 'raster',
        source: 'seasurfacetemp_sstanomalies',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
    //adding the Sea Level Rise Scenario 1m Layer
    map.addSource('onemSource', {
        type: 'geojson',
        data: onem
    });
    // Add the layer with style defined within paint property
    map.addLayer({
        id: 'swronemeter',
        type: 'fill',
        source: 'onemSource',
        paint: {
            "fill-color": "#ff4000", // Hollow fill color
            "fill-opacity": 0.4,     // Opacity of fill
            "line-color": "brown",   // Red boundary color
            "line-width": 1          // Border width
        },layout: { visibility: 'none' }
    });
    //adding the Sea Level Rise Scenario 2m Layer
    map.addSource('twomSource', {
        type: 'geojson',
        data: twom
    });
    // Add the layer with style defined within paint property
    map.addLayer({
        id: 'swrtwometer',
        type: 'fill',
        source: 'twomSource',
        paint: {
            "fill-color": "#bf00ff", // Hollow fill color
            "fill-opacity": 0.4,     // Opacity of fill
            "line-color": "purple",   // Red boundary color
            "line-width": 1          // Border width
        },layout: { visibility: 'none' }
    });
    //adding the Sea Level Rise Scenario 5m Layer
    map.addSource('fivemSource', {
        type: 'geojson',
        data: fivem
    });
    // Add the layer with style defined within paint property
    map.addLayer({
        id: 'swrfivemeter',
        type: 'fill',
        source: 'fivemSource',
        paint: {
            "fill-color": "#ff8000", // Hollow fill color
            "fill-opacity": 0.4,     // Opacity of fill
            "line-color": "orange",   // Red boundary color
            "line-width": 1          // Border width
        },layout: { visibility: 'none' }
    });
    //adding the Sea Level Rise Scenario 10m Layer
    map.addSource('tenmSource', {
        type: 'geojson',
        data: tenm
    });
    // Add the layer with style defined within paint property
    map.addLayer({
        id: 'swrtenmeter',
        type: 'fill',
        source: 'tenmSource',
        paint: {
            "fill-color": "#ff0080", // Hollow fill color
            "fill-opacity": 0.4,     // Opacity of fill
            "line-color": "red",   // Red boundary color
            "line-width": 1          // Border width
        },layout: { visibility: 'none' }
    });
    //adding the Coastal Flood Projection Layer
    map.addSource('CoastalFloodProjection', {
        type: 'raster',
        tiles: [
            'https://www.geonode-gfdrrlab.org/geoserver/ows?SERVICE=WMS&REQUEST=GetMap&LAYERS=hazard:ss_muis_rp0100m&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'coastalflood',
        type: 'raster',
        source: 'CoastalFloodProjection',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
     //adding the sea level rise layer
     map.addSource('SeaLevelRiseAnaomalies', {
        type: 'raster',
        tiles: [
            'https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&LAYERS=TOPEX-Poseidon_JASON_Sea_Surface_Height_Anomalies_GDR_Cycles&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'sealevelriseanomalies',
        type: 'raster',
        source: 'SeaLevelRiseAnaomalies',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );

    //adding the sea surface salinity layer 2020
    map.addSource('SalinityIndex2020', {
        type: 'raster',
        tiles: [
            'http://172.18.1.4:8080/geoserver/NDMA-costal-rasters/wms?SERVICE=WMS&REQUEST=GetMap&LAYERS=2020&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'salinity2020',
        type: 'raster',
        source: 'SalinityIndex2020',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
    //adding the sea surface salinity layer 2021
    map.addSource('SalinityIndex2021', {
        type: 'raster',
        tiles: [
            'http://172.18.1.4:8080/geoserver/NDMA-costal-rasters/wms?SERVICE=WMS&REQUEST=GetMap&LAYERS=Mosaic21-Salinity&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'salinity2021',
        type: 'raster',
        source: 'SalinityIndex2021',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
    //adding the sea surface salinity layer Nasa gibs monthly
    map.addSource('SeaSurfaceSalinityMonthly', {
        type: 'raster',
        tiles: [
            'https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&LAYERS=SMAP_L3_Sea_Surface_Salinity_REMSS_Monthly&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'seasalmonthly',
        type: 'raster',
        source: 'SeaSurfaceSalinityMonthly',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
    //adding the sea surface salinity layer Nasa gibs daily
    map.addSource('SeaSurfaceSalinityDaily', {
        type: 'raster',
        tiles: [
            'https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&LAYERS=SMAP_L3_Sea_Surface_Salinity_REMSS_8Day_RunningMean&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'seasaldaily',
        type: 'raster',
        source: 'SeaSurfaceSalinityDaily',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
    //adding the saline water intrusion
    map.addSource('salineWaterintrusion', {
        type: 'raster',
        tiles: [
            'http://172.18.1.4:8080/geoserver/NDMA-costal-rasters/wms?SERVICE=WMS&REQUEST=GetMap&LAYERS=saline_tarces&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
        ],
        tileSize: 256
    });
    map.addLayer({
        id: 'salinewater',
        type: 'raster',
        source: 'salineWaterintrusion',
        //'paint': { 'raster-opacity': 0.7 },
        layout: { visibility: 'none' }
    }, );
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

map.on('load',() => {
    addHomeButton(map)
    addBuildingControl(map);

});
//adding styles onto map
map.on('style.load', () => {
    addAdditionalSourceAndLayer();
    map.setFog({}); // Set the default atmosphere style
});
// creating the toggle layer functionalities 
map.on('idle', async() => {
    const toggleableLayerIds = ['mindusdelta', 'mjiwani', 'msandspit', 'mkalmatkhor', 'msonmianikhor', 'sstmonthday', 'sstmonthnight', 'sstanomalies', 'plasticwgeneration', 'misplasticwaste', 'misplasticwasteocean', 'propplasticocean', 'marinemicroemicnoc', 'marineplastictracker','marinesurveillance','swronemeter','swrtwometer','swrfivemeter','swrtenmeter','coastalflood','sealevelriseanomalies','salinewater','seasaldaily','seasalmonthly','salinity2021','salinity2020','tcyclone50','tcyclonepopulation','tcyclonemortality']; // IDs of layers with checkboxes and sliders

    const layerZoomLocations = {
        mindusdelta: [24.8607, 67.0011], // Example values for mindusdelta
        mjiwani: [25.0538, 61.7707], // Example values for mjiwani
        msandspit: [24.8404, 66.9098], // Example values for msandspit
        mkalmatkhor: [25.4211, 64.0769], // Example values for mkalmatkhor
        msonmianikhor: [25.1667, 66.5000], // Example values for msonmianikhor
        swronemeter: [24.8404, 66.9098], // Example values for swronemeter
        swrtwometer: [24.8404, 66.9098], // Example values for swrtwometer
        swrfivemeter: [24.8404, 66.9098], // Example values for swrfivemeter
        swrtenmeter: [24.8404, 66.9098],
        salinity2020:[24.860966,66.990501],
        salinity2021:[24.860966,66.990501],
        salinewater:[24.860966,66.990501]

        // Example values for msandspit
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
// for iframe mangrove watch
document.addEventListener('DOMContentLoaded', function() {
    const mangroveWatchCheckbox = document.querySelector('input[data-layername="mwatch"]');
    const mainContainer = document.getElementById('main-container');
    let iframeMangroveWatch; // Declare iframe variable outside event listener

    mangroveWatchCheckbox.addEventListener('change', function() {
        if (this.checked) {
            // If checkbox is checked, show the iframe
            iframeMangroveWatch = document.createElement('iframe');
            iframeMangroveWatch.src = "https://www.globalmangrovewatch.org/country/PAK?bounds=[[4.076083885254093,13.17872774821977],[126.38415324199758,57.87126016158558]]&basemap=%22light%22";
            iframeMangroveWatch.style.width = '100%';
            iframeMangroveWatch.style.height = '100%';
            iframeMangroveWatch.style.border = 'none';

            mainContainer.appendChild(iframeMangroveWatch);
        } else {
            // If checkbox is unchecked, remove the iframe
            if (iframeMangroveWatch) {
                iframeMangroveWatch.remove();
            }
        }
    });
});
// for iframe global fishing watch
document.addEventListener('DOMContentLoaded', function() {
    const EEZWatchCheckbox = document.querySelector('input[data-layername="marinesurveillance"]');
    const mainContainer = document.getElementById('main-container');
    let iframeEezMarineSurveillance; // Declare iframe variable outside event listener

    EEZWatchCheckbox.addEventListener('change', function() {
        if (this.checked) {
            // If checkbox is checked, show the iframe
            iframeEezMarineSurveillance = document.createElement('iframe');
            iframeEezMarineSurveillance.src = "https://globalfishingwatch.org/map/index?latitude=22.067957416742075&longitude=63.65159782519663&zoom=5.602048799804306&start=2023-11-09T00%3A00%3A00.000Z&end=2024-02-09T00%3A00%3A00.000Z&dvIn[0][id]=rfmo-1707988537257&dvIn[0][dvId]=tuna-rfmo-areas&dvIn[0][cfg][clr]=%238E24A9&dvIn[1][id]=~0&dvIn[1][cfg][vis]=false&dvIn[2][id]=oxygen-1707988387199&dvIn[2][dvId]=~1&dvIn[2][cfg][clr]=%2300EEFF&dvIn[2][cfg][colorRamp]=sky&dvIn[2][cfg][breaks][0]=198.942&dvIn[2][cfg][breaks][1]=200.582&dvIn[2][cfg][breaks][2]=201.764&dvIn[2][cfg][breaks][3]=203.313&dvIn[2][cfg][breaks][4]=204.673&dvIn[2][cfg][breaks][5]=205.797&dvIn[2][cfg][breaks][6]=206.639&dvIn[2][cfg][breaks][7]=207.473&dvIn[2][cfg][breaks][8]=209.044&dvIn[2][cfg][breaks][9]=209.054&dvIn[2][cfg][vis]=true&dvIn[2][dsC][0][pms][0][id]=type&dvIn[2][dsC][0][pms][0][val]=~2&dvIn[2][dsC][0][ept]=~3&dvIn[2][dsC][0][dsId]=public-global-oxygen%3Av20231213&dvIn[3][id]=ph-1707988372551&dvIn[3][dvId]=~1&dvIn[3][cfg][clr]=%239CA4FF&dvIn[3][cfg][colorRamp]=lilac&dvIn[3][cfg][intervals][0]=MONTH&dvIn[3][cfg][vis]=true&dvIn[3][cfg][breaks][0]=7.94&dvIn[3][cfg][breaks][1]=7.963&dvIn[3][cfg][breaks][2]=7.98&dvIn[3][cfg][breaks][3]=7.99&dvIn[3][cfg][breaks][4]=8&dvIn[3][cfg][breaks][5]=8.01&dvIn[3][cfg][breaks][6]=8.023&dvIn[3][cfg][breaks][7]=8.037&dvIn[3][cfg][breaks][8]=8.05&dvIn[3][cfg][breaks][9]=8.06&dvIn[3][dsC][0][pms][0][id]=type&dvIn[3][dsC][0][pms][0][val]=~2&dvIn[3][dsC][0][ept]=~3&dvIn[3][dsC][0][dsId]=public-global-ph%3Av20231213&dvIn[4][id]=phosphate-1707987943337&dvIn[4][dvId]=~1&dvIn[4][cfg][clr]=%23FFAA0D&dvIn[4][cfg][colorRamp]=orange&dvIn[4][cfg][vis]=true&dvIn[4][cfg][breaks][0]=0.171&dvIn[4][cfg][breaks][1]=0.22&dvIn[4][cfg][breaks][2]=0.258&dvIn[4][cfg][breaks][3]=0.297&dvIn[4][cfg][breaks][4]=0.327&dvIn[4][cfg][breaks][5]=0.351&dvIn[4][cfg][breaks][6]=0.375&dvIn[4][cfg][breaks][7]=0.402&dvIn[4][cfg][breaks][8]=0.435&dvIn[4][cfg][breaks][9]=0.445&dvIn[4][dsC][0][pms][0][id]=type&dvIn[4][dsC][0][pms][0][val]=~2&dvIn[4][dsC][0][ept]=~3&dvIn[4][dsC][0][dsId]=public-global-phosphate%3Av20231213&dvIn[5][id]=mangroves-1707987936195&dvIn[5][dvId]=gfw-environmental-layer&dvIn[5][cfg][clr]=%23A6FF59&dvIn[5][cfg][vis]=true&dvIn[5][dsC][0][ept]=context-tiles&dvIn[5][dsC][0][dsId]=public-mangroves&dvIn[6][id]=nitrate-1707987931553&dvIn[6][dvId]=~1&dvIn[6][cfg][clr]=%23FF6854&dvIn[6][cfg][colorRamp]=red&dvIn[6][cfg][vis]=true&dvIn[6][cfg][breaks][0]=0.01&dvIn[6][cfg][breaks][1]=0.051&dvIn[6][cfg][breaks][2]=0.108&dvIn[6][cfg][breaks][3]=0.167&dvIn[6][cfg][breaks][4]=0.223&dvIn[6][cfg][breaks][5]=0.283&dvIn[6][cfg][breaks][6]=0.365&dvIn[6][cfg][breaks][7]=0.458&dvIn[6][cfg][breaks][8]=0.543&dvIn[6][cfg][breaks][9]=0.553&dvIn[6][dsC][0][pms][0][id]=type&dvIn[6][dsC][0][pms][0][val]=~2&dvIn[6][dsC][0][ept]=~3&dvIn[6][dsC][0][dsId]=public-global-nitrate%3Av20231213&dvIn[7][id]=vessel-ba069b7b9-9148-2ea6-49c9-2b46893ef3a3&dvIn[7][dvId]=fishing-map-vessel-track&dvIn[7][cfg][track]=public-global-all-tracks%3Av20231026&dvIn[7][cfg][info]=public-global-vessel-identity%3Av20231026&dvIn[7][cfg][events][0]=public-global-fishing-events%3Av20231026&dvIn[7][cfg][events][1]=public-global-port-visits-c2-events%3Av20231026&dvIn[7][cfg][events][2]=public-global-encounters-events%3Av20231026&dvIn[7][cfg][events][3]=public-global-loitering-events%3Av20231026&dvIn[7][cfg][events][4]=public-global-gaps-events%3Av20231026&dvIn[7][cfg][clr]=%23F95E5E&dvIn[8][id]=~4&dvIn[8][cfg][vis]=true&dvIn[9][id]=~5&dvIn[9][cfg][vis]=false&dvIn[9][cfg][clr]=%23AD1457&dvIn[9][cfg][colorRamp]=jazzberry-jam&dvIn[10][id]=sar&dvIn[10][cfg][vis]=false&dvIn[11][id]=viirs&dvIn[11][cfg][vis]=false&dvIn[12][id]=~6&dvIn[12][cfg][vis]=true&dvIn[12][cfg][filters][flag][0]=PAK&dvIn[12][cfg][filters][vessel_type][0]=fishing&dvIn[13][id]=~7&dvIn[13][cfg][vis]=true&dvIn[14][id]=~8&dvIn[14][cfg][vis]=true&dvIn[15][id]=~9&dvIn[15][cfg][vis]=false&dvIn[16][id]=~10&dvIn[16][cfg][vis]=true&dvIn[16][cfg][breaks][0]=1&dvIn[16][cfg][breaks][1]=526.02&dvIn[16][cfg][breaks][2]=1308.85&dvIn[16][cfg][breaks][3]=1859.58&dvIn[16][cfg][breaks][4]=2382.49&dvIn[16][cfg][breaks][5]=2864.74&dvIn[16][cfg][breaks][6]=3211.38&dvIn[16][cfg][breaks][7]=3453.01&dvIn[16][cfg][breaks][8]=3691.81&dvIn[16][cfg][breaks][9]=3691.82&dvIn[17][id]=vms&dvIn[17][deleted]=true&timebarVisualisation=vessel&dvInOr[0]=basemap&dvInOr[1]=~8&dvInOr[2]=vms&dvInOr[3]=~6&dvInOr[4]=viirs&dvInOr[5]=sar&dvInOr[6]=~9&dvInOr[7]=~0&dvInOr[8]=~10&dvInOr[9]=~5&dvInOr[10]=~7&dvInOr[11]=context-layer-mpa&dvInOr[12]=context-layer-protectedseas&dvInOr[13]=context-layer-rfmo&dvInOr[14]=context-layer-high-seas&dvInOr[15]=fixed-sar-infrastructure&dvInOr[16]=~4&sO=advanced&lTD=&fTD=&timebarSelectedEnvId=~10&tk[0]=context-layer-graticules&tk[1]=heatmap-environmental-layer&tk[2]=heatmap&tk[3]=4wings-tiles&tk[4]=basemap-labels&tk[5]=context-layer-fao-areas&tk[6]=presence&tk[7]=context-layer-eez&tk[8]=fishing-ais&tk[9]=encounter-events&tk[10]=bathymetry-workspace";
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
// Add info control for plastic waste generation
map.on('mousemove', (event) => {
    let layers = ['plasticwgeneration', 'misplasticwaste', 'misplasticwasteocean', 'propplasticocean']; // Add more layers as needed

    let visibleLayer = null;
    for (let layer of layers) {
        if (map.getLayoutProperty(layer, 'visibility') === 'visible') {
            visibleLayer = layer;
            break;
        }
    }

    if (visibleLayer) {
        const features = map.queryRenderedFeatures(event.point, {
            layers: [visibleLayer]
        });

        if (features.length > 0) {
            console.log(features[0].properties); // Log properties to inspect

            let propertyName;
            let unit;
            let infoControlId;
            if (visibleLayer === 'plasticwgeneration') {
                propertyName = 'Plastic_Wa';
                unit = 'tonne';
                infoControlId = 'pdplasticgeneration';
            } else if (visibleLayer === 'misplasticwaste') {
                propertyName = 'Mismanaged';
                unit = 'Metric/tonne';
                infoControlId = 'pdmisplasticwastenon';
            } else if (visibleLayer === 'misplasticwasteocean') {
                propertyName = 'Mismanag_1';
                unit = 'tonne/year';
                infoControlId = 'pdmismanagedpwo';
            } else if (visibleLayer === 'propplasticocean') {
                propertyName = 'Probabilit';
                unit = 'percent propability';
                infoControlId = 'pdpropability';
            }

            document.getElementById(infoControlId).innerHTML = `
                <h3>${features[0].properties.NAME_EN}</h3>
                <p><strong><em>${features[0].properties[propertyName]}</strong> ${unit}</em></p>`;
        } else {
            // Reset info control if no features found
            resetInfoControl();
        }
    } else {
        // Reset info control if no layer is visible
        resetInfoControl();
    }
});

function resetInfoControl() {
    document.getElementById('pdplasticgeneration').innerHTML = `<p>Hover over a region!</p>`;
    document.getElementById('pdmisplasticwastenon').innerHTML = `<p>Hover over a region!</p>`;
    document.getElementById('pdmismanagedpwo').innerHTML = `<p>Hover over a region!</p>`;
    document.getElementById('pdpropability').innerHTML = `<p>Hover over a region!</p>`;
    // Add more reset lines for other layers if needed
}
//adding the controls onto the map
map.addControl(new mapboxgl.FullscreenControl());
const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');
map.addControl(new mapboxgl.ScaleControl());
map.addControl(new MapboxStyleSwitcherControl());