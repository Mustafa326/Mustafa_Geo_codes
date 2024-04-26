/*
// code for the slideshow in video-container4
  let slideIndex = 0; // Start from the first iframe

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  
  function showSlides(n) {
    const iframes = document.querySelectorAll(".slideshow-container iframe");
    
    // Ensure slide index stays within bounds
    if (n >= iframes.length) {
      slideIndex = 0; // Loop back to the first iframe
    }
    if (n < 0) {
      slideIndex = iframes.length - 1; // Go to the last iframe
    }
    
    // Hide all iframes
    iframes.forEach(iframe => {
      iframe.style.display = "none";
    });
    
    // Show the current iframe
    iframes[slideIndex].style.display = "block";
  }
  
  // Function to initialize the slideshow
  function initializeSlideshow() {
    const slideshowContainer = document.querySelector(".slideshow-container");
    const iframes = [
      "https://www.globalforestwatch.org/embed/widget/fireAlertStats/country/PAK",
      "https://www.globalforestwatch.org/embed/widget/burnedAreaCumulative/country/PAK",
      "https://www.globalforestwatch.org/embed/widget/treeLossFiresAnnual/country/PAK",
      "https://www.globalforestwatch.org/embed/widget/burnedAreaRanked/country/PAK",
      "https://www.globalforestwatch.org/embed/widget/firesAlertsSimple/country/PAK",
      "https://www.globalforestwatch.org/embed/widget/treeLossFires/country/PAK"
    ];
    
    // Insert iframes into the slideshow container
    iframes.forEach(src => {
      const iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.width = "100%";
      iframe.height = "100%";
      iframe.frameBorder = "0";
      slideshowContainer.appendChild(iframe);
    });
    
    // Show the first iframe initially
    showSlides(slideIndex);
  }
  
  // Initialize the slideshow when the DOM content is loaded
  document.addEventListener("DOMContentLoaded", initializeSlideshow);
  */
  // Declaration of variables containing latitude and longitude
var myLat = 0;
var myLong = 0;
var lathome = 33.738045;
var longhome = 73.084488;
var zoom = 4;
const zoomThreshold = 4;
coordinates = [longhome, lathome];
mapboxgl.accessToken = 'pk.eyJ1IjoibXVzdGFmYTA1IiwiYSI6ImNrNm1ocHBzNTBldDIzanJ1ODJqc2dzYjMifQ.ppQmulUBSdoPSzVXjT23Dw';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: {
      'version': 8,
      'sources': {
          'esri-tiles': {
              'type': 'raster',
              'tiles': ['http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
              'tileSize': 256,
              'attribution': '&copy; Esri',
              'minzoom': 0, // Set the min zoom of the Esri tiles
              'maxzoom': 18 // Set the max zoom of the Esri tiles (adjust as needed)
          }
      },
      'layers': [
          {
              'id': 'esri-layer',
              'type': 'raster',
              'source': 'esri-tiles',
              'minzoom': 0,
              'maxzoom': 18 // Match the max zoom of the Esri tiles
          }
      ]
  },
    projection: 'globe',
    center: [longhome, lathome], // starting position
    zoom: zoom // starting zoom
});
// creating the functionality to change basemap as leaflet in the mapbox gl js 
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
MapboxStyleSwitcherControl.DEFAULT_STYLE = "Esri World";
MapboxStyleSwitcherControl.DEFAULT_STYLES = [
  { title: "Dark", uri: "mapbox://styles/mapbox/dark-v11" },
  { title: "Light", uri: "mapbox://styles/mapbox/light-v11" },
  { title: "Outdoors", uri: "mapbox://styles/mapbox/outdoors-v12" },
  { title: "Satellite", uri: "mapbox://styles/mapbox/satellite-streets-v12" },
  { title: "Streets", uri: "mapbox://styles/mapbox/streets-v10" },
  { title: "Esri World", tiles: [
    "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
]}
];
//adding the fullscreen control to the map
map.addControl(new mapboxgl.FullscreenControl());
// adding the layer swither control to the map
map.addControl(new MapboxStyleSwitcherControl());
//adding the navigation controls to the mapbox map 
const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');
// creating a 3d control for the map in mapbox 
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
      this._button.innerHTML = `<img src="3Dworldicon.svg" alt="Buildings" style="width: 20px; height: 20px;">`;
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
        const targetCoordinates = [73.0479,33.6844]; // Target coordinates to fly to

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

// Adjust the addEONETMarkers function to use SVG icons and only display wildfire events
function addEONETMarkers() {
  // Fetch the GeoJSON data from the EONET API
  fetch('https://eonet.gsfc.nasa.gov/api/v3/events/geojson')
      .then(response => response.json())
      .then(data => {
          // For each feature in the GeoJSON object:
          for (const event of data.features) {
              // Check if the event is a wildfire
              const categoryId = event.properties.categories[0].id;
              if (categoryId === 'wildfires') {
                  // Create a div element for the marker
                  const el = document.createElement('div');
                  // Assign a unique `id` to the marker
                  el.id = `eonet-marker-${event.properties.id}`;
                  // Assign the `eonet-marker` class to each marker for styling
                  el.className = 'eonet-marker';

                  // Get the coordinates directly for a Point geometry
                  const coordinates = event.geometry.coordinates;

                  // Log the coordinates to help with debugging
                  console.log('Coordinates:', coordinates);

                  // Use the category ID to construct the path to the Gif icon
                  const iconPath = `forestfireanimated.gif`;

                  // Set the background-image to the SVG icon
                  el.style.backgroundImage = `url(${iconPath})`;
                  // fetching the information for the popup
                  const magnitudeUnit = event.properties.magnitudeUnit;
                  console.log(`the magnitude unit is ${magnitudeUnit}`)
                  const magnitudeValue = event.properties.magnitudeValue;
                  console.log(`the magnitude value is ${magnitudeValue}`)
                  const eventName = event.properties.title;
                  console.log(`the eventName is ${eventName}`)
                  const eventDate = event.properties.date;
                  console.log(`the eventDate is ${eventDate}`)
                  // Create popup content
                  const popupContent = `
                      <h3>${eventName}</h3>
                      <p>Date: ${eventDate}</p>
                      <p>Magnitude Value: ${magnitudeValue}</p>
                      <p>Magnitude Unit: ${magnitudeUnit}</p>
                  `;
                  // Create the popup
                  const popup = new mapboxgl.Popup({ offset: [0, -23] })
                      .setHTML(popupContent);

                  // Check if the coordinates are valid
                  if (coordinates && coordinates.length === 2 && !isNaN(coordinates[0]) && !isNaN(coordinates[1])) {
                      /**
                       * Create a marker using the div element
                       * defined above and add it to the map.
                       **/
                      new mapboxgl.Marker(el, { offset: [0, -23] })
                          .setLngLat(coordinates)
                          .setPopup(popup) // sets a popup on this marker
                          .addTo(map);
                  } else {
                      console.error('Invalid coordinates for event:', event);
                  }
              }
          }
      })
      .catch(error => console.error('Error fetching EONET data:', error));

  console.log("Wildfire events added to the map."); // Log that wildfire events have been added
}

// Function to remove wildfire markers
function removeEONETMarkers() {
  // Remove all markers with class 'eonet-marker'
  const eonetMarkers = document.querySelectorAll('.eonet-marker');
  eonetMarkers.forEach(marker => marker.remove());
}


  // creating a map on load for customn controls 
  map.on('load',() => {;
    addBuildingControl(map);
    add3DControl(map);
    
});
// adding the necessary layers 
// creating a function to load the layers even if styles are changed 
function addAdditionalSourceAndLayer() {
  // Function to format the selected date
  function formatDate(selectedDate) {
    const dateObj = new Date(selectedDate);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}

// Function to generate current time in the required format
function getCurrentTime() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const currentTime = `${year}-${month}-${day}`;

    return currentTime;
}

// Get current time
let currentTime = getCurrentTime();

// Log current time
console.log('Current Time:', currentTime);
// generating time function for 7 days layer
function getLast7DaysRange() {
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 7); // Subtract 7 days from current date

  // Format start date
  const startYear = startDate.getFullYear();
  const startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
  const startDay = String(startDate.getDate()).padStart(2, '0');

  // Format end date
  const endYear = endDate.getFullYear();
  const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
  const endDay = String(endDate.getDate()).padStart(2, '0');

  // Construct time range string
  const timeRange = `${startYear}-${startMonth}-${startDay}/${endYear}-${endMonth}-${endDay}`;

  return timeRange;
}

// Get last 7 days range
const last7DaysRange = getLast7DaysRange();

// Log last 7 days range
console.log('Last 7 Days Range:', last7DaysRange);
// function for 1 day forcast 
function getOneDayAhead() {
  const currentDate = new Date();
  const oneDayLater = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours in milliseconds
  const year = oneDayLater.getFullYear();
  const month = String(oneDayLater.getMonth() + 1).padStart(2, '0');
  const day = String(oneDayLater.getDate()).padStart(2, '0');
  const oneDayAheadTime = `${year}-${month}-${day}`;

  return oneDayAheadTime;
}
// Get one day ahead
let oneDayAheadTime = getOneDayAhead();

// Log one day ahead time
console.log('One Day Ahead Time:', oneDayAheadTime);

//Function for the burned areas of NASA FIRMS
function burnedAreasLastOneDay() {
  // Get current date
  const currentDate = new Date();

  // Get yesterday's date
  const yesterdayDate = new Date(currentDate);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);

  // Format current date
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
  const currentDay = String(currentDate.getDate()).padStart(2, '0');
  const currentFormattedDate = `${currentYear}-${currentMonth}-${currentDay}`;

  // Format yesterday's date
  const yesterdayYear = yesterdayDate.getFullYear();
  const yesterdayMonth = String(yesterdayDate.getMonth() + 1).padStart(2, '0');
  const yesterdayDay = String(yesterdayDate.getDate()).padStart(2, '0');
  const yesterdayFormattedDate = `${yesterdayYear}-${yesterdayMonth}-${yesterdayDay}`;

  // Construct date range string
  const dateRange = `${yesterdayFormattedDate}/${currentFormattedDate}`;

  return dateRange;
}

// Example usage:
const burnedAreasLastOneDayRange = burnedAreasLastOneDay();
console.log('Burned Areas Last One Day Range:', burnedAreasLastOneDayRange);
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
  //Add the FWI - Drought Code (DC) layer
  map.addSource('FWI_DroughtCode', {
      type: 'raster',
      // use the tiles option to specify a WMS tile source URL
      // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
      tiles: [
        `https://ies-ows.jrc.ec.europa.eu/gwis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=nasa_geos5.dc&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE&TIME=${oneDayAheadTime}`
      ],
      tileSize: 256
  });
  map.addLayer({
      id: 'fwidc',
      type: 'raster',
      source: 'FWI_DroughtCode',
      paint: { 'raster-opacity': 0.7 },
      layout: { visibility: 'none' }
  }, );
  //Add the Fire Weather Index (FWI) layer
  map.addSource('FireWeatherIndex', {
      type: 'raster',
      // use the tiles option to specify a WMS tile source URL
      // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
      tiles: [
        `https://ies-ows.jrc.ec.europa.eu/gwis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=ecmwf.fwi&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE&TIME=${oneDayAheadTime}`
      ],
      tileSize: 256
  });
  map.addLayer({
      id: 'fwi',
      type: 'raster',
      source: 'FireWeatherIndex',
      paint: { 'raster-opacity': 0.7 },
      layout: { visibility: 'none' }
  }, );
  //Add the FWI - Initial Spread Index (ISI) layer
  map.addSource('FWIInitialSpreadIndex', {
      type: 'raster',
      // use the tiles option to specify a WMS tile source URL
      // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
      tiles: [
        `https://ies-ows.jrc.ec.europa.eu/gwis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=ecmwf.isi&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE&TIME=${oneDayAheadTime}`
      ],
      tileSize: 256
  });
  map.addLayer({
      id: 'fwiisi',
      type: 'raster',
      source: 'FWIInitialSpreadIndex',
      paint: { 'raster-opacity': 0.7 },
      layout: { visibility: 'none' }
  }, );
  // adding the MARK-5 - Fire Danger Index (MARK-5 FDI)
  map.addSource('MARK5FireDangerIndex', {
      type: 'raster',
      // use the tiles option to specify a WMS tile source URL
      // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
      tiles: [
        `https://ies-ows.jrc.ec.europa.eu/gwis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=ecmwf.mark5.fdi&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE&TIME=${oneDayAheadTime}`
      ],
      tileSize: 256
  });
  map.addLayer({
      id: 'fdimark',
      type: 'raster',
      source: 'MARK5FireDangerIndex',
      paint: { 'raster-opacity': 0.7 },
      layout: { visibility: 'none' }
  }, );
  //adding the FWI - Build Up Index (BUI) layer
  map.addSource('FWIBuildUpIndex', {
      type: 'raster',
      // use the tiles option to specify a WMS tile source URL
      // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
      tiles: [
        `https://ies-ows.jrc.ec.europa.eu/gwis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=nasa_geos5.bui&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE&TIME=${oneDayAheadTime}`
      ],
      tileSize: 256
  });
  map.addLayer({
    id: 'fdibui',
    type: 'raster',
    source: 'FWIBuildUpIndex',
    paint: { 'raster-opacity': 0.7 },
    layout: { visibility: 'none' }
}, );
//adding the FWI - Fine Fuel Moisture Code (FFMC) layer
map.addSource('FWIFineFuelMoistureCode', {
  type: 'raster',
  // use the tiles option to specify a WMS tile source URL
  // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
  tiles: [
    `https://ies-ows.jrc.ec.europa.eu/gwis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=ecmwf.ffmc&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE&TIME=${oneDayAheadTime}`
  ],
  tileSize: 256
});
map.addLayer({
id: 'fwiffmc',
type: 'raster',
source: 'FWIFineFuelMoistureCode',
paint: { 'raster-opacity': 0.7 },
layout: { visibility: 'none' }
}, );
//adding the FWI - Duff Moisture Code (DMC) layer
map.addSource('FWIDuffMoistureCode', {
  type: 'raster',
  // use the tiles option to specify a WMS tile source URL
  // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
  tiles: [
    `https://ies-ows.jrc.ec.europa.eu/gwis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=nasa_geos5.dmc&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE&TIME=${oneDayAheadTime}`
  ],
  tileSize: 256
});
map.addLayer({
id: 'fwifdmc',
type: 'raster',
source: 'FWIDuffMoistureCode',
paint: { 'raster-opacity': 0.7 },
layout: { visibility: 'none' }
}, );
//adding the FWI - Anomaly layer
map.addSource('FWIAnomaly', {
  type: 'raster',
  // use the tiles option to specify a WMS tile source URL
  // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
  tiles: [
    `https://ies-ows.jrc.ec.europa.eu/gwis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=ecmwf.anomaly&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE&TIME=${oneDayAheadTime}`
  ],
  tileSize: 256
});
map.addLayer({
id: 'fwianomaly',
type: 'raster',
source: 'FWIAnomaly',
paint: { 'raster-opacity': 0.7 },
layout: { visibility: 'none' }
}, );
//adding the FWI - Ranking layer
map.addSource('FWIRanking', {
  type: 'raster',
  // use the tiles option to specify a WMS tile source URL
  // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
  tiles: [
    `https://ies-ows.jrc.ec.europa.eu/gwis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=ecmwf.ranking&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE&TIME=${oneDayAheadTime}`
  ],
  tileSize: 256
});
map.addLayer({
id: 'fwiranking',
type: 'raster',
source: 'FWIRanking',
paint: { 'raster-opacity': 0.7 },
layout: { visibility: 'none' }
}, );
//adding the KBDI - Keetch-Byron Drought Index
map.addSource('KBDIKeetchByronDroughtIndex', {
  type: 'raster',
  // use the tiles option to specify a WMS tile source URL
  // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
  tiles: [
    `https://ies-ows.jrc.ec.europa.eu/gwis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=ecmwf.mark5.kbdi&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE&TIME=${oneDayAheadTime}`
  ],
  tileSize: 256
});
map.addLayer({
id: 'kbdidi',
type: 'raster',
source: 'KBDIKeetchByronDroughtIndex',
paint: { 'raster-opacity': 0.7 },
layout: { visibility: 'none' }
}, );
//adding the MARK-5 - Rate of Spread (MARK-5 ROS) layer
map.addSource('MARK5RateofSpread', {
  type: 'raster',
  // use the tiles option to specify a WMS tile source URL
  // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
  tiles: [
    `https://ies-ows.jrc.ec.europa.eu/gwis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=ecmwf.mark5.ros&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE&TIME=${oneDayAheadTime}`
  ],
  tileSize: 256
});
map.addLayer({
id: 'markros',
type: 'raster',
source: 'MARK5RateofSpread',
paint: { 'raster-opacity': 0.7 },
layout: { visibility: 'none' }
}, );
//adding the NFDRS - Ignition Probability (NFDRS IC) layer
map.addSource('NFDRSIgnitionProbability', {
  type: 'raster',
  // use the tiles option to specify a WMS tile source URL
  // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
  tiles: [
    `https://ies-ows.jrc.ec.europa.eu/gwis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=ecmwf.nfdrs.ic&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE&TIME=${oneDayAheadTime}`
  ],
  tileSize: 256
});
map.addLayer({
id: 'nfdrsic',
type: 'raster',
source: 'NFDRSIgnitionProbability',
paint: { 'raster-opacity': 0.7 },
layout: { visibility: 'none' }
}, );
  //adding the Black Carbon emmision Layer
  map.addSource('BlackCarbonEmission', {
      type: 'raster',
      tiles: [
        `https://ies-ows.jrc.ec.europa.eu/gwis?SERVICE=WMS&REQUEST=GetMap&LAYERS=gfas.bc&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=1439&HEIGHT=602&CRS=EPSG:3857&BBOX={bbox-epsg-3857}&TIME=${last7DaysRange}`
      ],
      tileSize: 256
  });
  map.addLayer({
      id: 'blackcarbon',
      type: 'raster',
      source: 'BlackCarbonEmission',
      paint: { 'raster-opacity': 0.7 },
      layout: { visibility: 'none' }
  }, );
   //adding the Methane emmision Layer
   map.addSource('MethaneEmission', {
    type: 'raster',
    tiles: [
      `https://ies-ows.jrc.ec.europa.eu/gwis?SERVICE=WMS&REQUEST=GetMap&LAYERS=gfas.ch4&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=1439&HEIGHT=602&CRS=EPSG:3857&BBOX={bbox-epsg-3857}&TIME=${last7DaysRange}`
    ],
    tileSize: 256
});
map.addLayer({
    id: 'Methane',
    type: 'raster',
    source: 'MethaneEmission',
    paint: { 'raster-opacity': 0.7 },
    layout: { visibility: 'none' }
}, );
//adding the Carbon Dioxide emmision Layer
map.addSource('CarbonDioxideEmission', {
  type: 'raster',
  tiles: [
    `https://ies-ows.jrc.ec.europa.eu/gwis?SERVICE=WMS&REQUEST=GetMap&LAYERS=gfas.co2&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=1439&HEIGHT=602&CRS=EPSG:3857&BBOX={bbox-epsg-3857}&TIME=${last7DaysRange}`
  ],
  tileSize: 256
});
map.addLayer({
  id: 'carbondioxide',
  type: 'raster',
  source: 'CarbonDioxideEmission',
  paint: { 'raster-opacity': 0.7 },
  layout: { visibility: 'none' }
}, );
//adding the Carbon Monoxide emmision Layer
map.addSource('CarbonMonoxideEmission', {
  type: 'raster',
  tiles: [
    `https://ies-ows.jrc.ec.europa.eu/gwis?SERVICE=WMS&REQUEST=GetMap&LAYERS=gfas.co&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=1439&HEIGHT=602&CRS=EPSG:3857&BBOX={bbox-epsg-3857}&TIME=${last7DaysRange}`
  ],
  tileSize: 256
});
map.addLayer({
  id: 'carbonmonooxide',
  type: 'raster',
  source: 'CarbonMonoxideEmission',
  paint: { 'raster-opacity': 0.7 },
  layout: { visibility: 'none' }
}, );
//adding the Particulate Matter emmision Layer
map.addSource('ParticulateMatterEmission', {
  type: 'raster',
  tiles: [
    `https://ies-ows.jrc.ec.europa.eu/gwis?SERVICE=WMS&REQUEST=GetMap&LAYERS=gfas.pm2p5&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=1439&HEIGHT=602&CRS=EPSG:3857&BBOX={bbox-epsg-3857}&TIME=${last7DaysRange}`
  ],
  tileSize: 256
});
map.addLayer({
  id: 'particulatematter',
  type: 'raster',
  source: 'ParticulateMatterEmission',
  paint: { 'raster-opacity': 0.7 },
  layout: { visibility: 'none' }
}, );
 //adding the Virrs Layer Layer
 map.addSource('VIRSSMain', {
  type: 'raster',
  tiles: [
    'https://firms.modaps.eosdis.nasa.gov/mapserver/wms/fires/48615d588cfc60c9fc9b81e90d881e8f/?SERVICE=WMS&REQUEST=GetMap&LAYERS=fires_viirs_24&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
  ],
  tileSize: 256
});
map.addLayer({
  id: 'VIIRSSNN21',
  type: 'raster',
  source: 'VIRSSMain',
  paint: { 'raster-opacity': 0.7 },
  layout: { visibility: 'none' }
}, );
//adding the Virrs Suomi-NPP Layer
map.addSource('virssSuomiNPP', {
  type: 'raster',
  tiles: [
    'https://firms.modaps.eosdis.nasa.gov/mapserver/wms/fires/48615d588cfc60c9fc9b81e90d881e8f/?SERVICE=WMS&REQUEST=GetMap&LAYERS=fires_viirs_snpp_24&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
  ],
  tileSize: 256
});
map.addLayer({
  id: 'virsssuomi',
  type: 'raster',
  source: 'virssSuomiNPP',
  paint: { 'raster-opacity': 0.7 },
  layout: { visibility: 'none' }
}, );
//adding the Virrs NOAA-20 Layer
map.addSource('virssNOAA20', {
  type: 'raster',
  tiles: [
    'https://firms.modaps.eosdis.nasa.gov/mapserver/wms/fires/48615d588cfc60c9fc9b81e90d881e8f/?SERVICE=WMS&REQUEST=GetMap&LAYERS=fires_viirs_noaa20_24&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
  ],
  tileSize: 256
});
map.addLayer({
  id: 'virssnoaa20',
  type: 'raster',
  source: 'virssNOAA20',
  paint: { 'raster-opacity': 0.7 },
  layout: { visibility: 'none' }
}, );
//adding the Virrs NOAA-21 Layer
map.addSource('virssNOAA21', {
  type: 'raster',
  tiles: [
    'https://firms.modaps.eosdis.nasa.gov/mapserver/wms/fires/48615d588cfc60c9fc9b81e90d881e8f/?SERVICE=WMS&REQUEST=GetMap&LAYERS=fires_viirs_noaa21_24&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
  ],
  tileSize: 256
});
map.addLayer({
  id: 'virssnoaa21',
  type: 'raster',
  source: 'virssNOAA21',
  paint: { 'raster-opacity': 0.7 },
  layout: { visibility: 'none' }
}, );
//adding the MODIS Aqua & Terra Layer
map.addSource('MODISAqua&Terra', {
  type: 'raster',
  tiles: [
    'https://firms.modaps.eosdis.nasa.gov/mapserver/wms/fires/48615d588cfc60c9fc9b81e90d881e8f/?SERVICE=WMS&REQUEST=GetMap&LAYERS=fires_modis_24&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
  ],
  tileSize: 256
});
map.addLayer({
  id: 'modisaquaterra',
  type: 'raster',
  source: 'MODISAqua&Terra',
  paint: { 'raster-opacity': 0.7 },
  layout: { visibility: 'none' }
}, );
//adding the MODIS-Aqua Layer
map.addSource('MODISAqua', {
  type: 'raster',
  tiles: [
    'https://firms.modaps.eosdis.nasa.gov/mapserver/wms/fires/48615d588cfc60c9fc9b81e90d881e8f/?SERVICE=WMS&REQUEST=GetMap&LAYERS=fires_aqua_24&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
  ],
  tileSize: 256
});
map.addLayer({
  id: 'modisaqua',
  type: 'raster',
  source: 'MODISAqua',
  paint: { 'raster-opacity': 0.7 },
  layout: { visibility: 'none' }
}, );
//adding the MODIS-Terra Layer
map.addSource('MODISTerra', {
  type: 'raster',
  tiles: [
    'https://firms.modaps.eosdis.nasa.gov/mapserver/wms/fires/48615d588cfc60c9fc9b81e90d881e8f/?SERVICE=WMS&REQUEST=GetMap&LAYERS=fires_terra_24&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
  ],
  tileSize: 256
});
map.addLayer({
  id: 'modisterra',
  type: 'raster',
  source: 'MODISTerra',
  paint: { 'raster-opacity': 0.7 },
  layout: { visibility: 'none' }
}, );
//adding the Burned Area One day layer Layer
map.addSource('BurnedAreaday1', {
  type: 'raster',
  tiles: [
    `https://maps.effis.emergency.copernicus.eu/gwis?SERVICE=WMS&REQUEST=GetMap&LAYERS=nrt.ba&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}&TIME=${burnedAreasLastOneDayRange}`
  ],
  tileSize: 256
});
map.addLayer({
  id: 'burnedareaday1',
  type: 'raster',
  source: 'BurnedAreaday1',
  paint: { 'raster-opacity': 0.7 },
  layout: { visibility: 'none' }
}, );
//adding the Land Surface Temperature (Day)
map.addSource('LandSurfaceTemperature', {
  type: 'raster',
  tiles: [
    `https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&LAYERS=MODIS_Terra_L3_Land_Surface_Temp_Daily_Day&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}`
  ],
  tileSize: 256
});
map.addLayer({
  id: 'lstd',
  type: 'raster',
  source: 'LandSurfaceTemperature',
  paint: { 'raster-opacity': 0.7 },
  layout: { visibility: 'none' }
}, );
//adding the Land Surface Temperature (Night) Layer
map.addSource('LandSurfaceTemperature(Night)', {
  type: 'raster',
  tiles: [
    `https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&LAYERS=MODIS_Terra_L3_Land_Surface_Temp_Daily_Night&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}`
  ],
  tileSize: 256
});
map.addLayer({
  id: 'lstn',
  type: 'raster',
  source: 'LandSurfaceTemperature(Night)',
  paint: { 'raster-opacity': 0.7 },
  layout: { visibility: 'none' }
}, );
//adding the Vegitation Index Layer
map.addSource('VegitationIndex', {
  type: 'raster',
  tiles: [
    `https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&LAYERS=MODIS_Aqua_L3_NDVI_16Day&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}`
  ],
  tileSize: 256
});
map.addLayer({
  id: 'vegitationindex',
  type: 'raster',
  source: 'VegitationIndex',
  paint: { 'raster-opacity': 0.7 },
  layout: { visibility: 'none' }
}, );
//adding the Fires and Thermal Anomalies (Day and Night) Layer
map.addSource('FiresandThermalAnomalies', {
  type: 'raster',
  tiles: [
    `https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&LAYERS=MODIS_Aqua_Thermal_Anomalies_All&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}`
  ],
  tileSize: 256
});
map.addLayer({
  id: 'fireanomalies',
  type: 'raster',
  source: 'FiresandThermalAnomalies',
  paint: { 'raster-opacity': 0.7 },
  layout: { visibility: 'none' }
}, );
//adding the Lightning Forecast (1 day forecast) Layer
map.addSource('LightningForecast1dayforecast', {
  type: 'raster',
  tiles: [
    `https://ies-ows.jrc.ec.europa.eu/gwis?SERVICE=WMS&REQUEST=GetMap&LAYERS=ecmwf.extra.lightning&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=1439&HEIGHT=602&CRS=EPSG:3857&BBOX={bbox-epsg-3857}&TIME=${currentTime}`
  ],
  tileSize: 256
});
map.addLayer({
  id: 'LightningForecast',
  type: 'raster',
  source: 'LightningForecast1dayforecast',
  paint: { 'raster-opacity': 0.7 },
  layout: { visibility: 'none' }
}, );
//adding the Fuels Emission Layer
map.addSource('FuelsEmission', {
  type: 'raster',
  tiles: [
    'http://localhost:8080/geoserver/GWIS/wms?service=WMS&version=1.1.0&request=GetMap&layers=GWIS%3Afuel_map&bbox={bbox-epsg-3857}&width=256&height=256&srs=EPSG%3A3857&styles=&format=image/png&TRANSPARENT=true'
  ],
  tileSize: 256
});
map.addLayer({
  id: 'Fuelsemission',
  type: 'raster',
  source: 'FuelsEmission',
  paint: { 'raster-opacity': 0.7 },
  layout: { visibility: 'none' }
}, );
// Now that images are loaded, add the NASA EONET source and layer
map.addSource('eonet-source', {
  type: 'geojson',
  data: 'https://eonet.gsfc.nasa.gov/api/v3/events/geojson',
});
// Add a layer to use the icons
map.addLayer({
   id: 'nasa_eonet',
   type: 'symbol',
   source: 'eonet-source',
   
});
 // Function to update WMS layer with the specified time
 function updateWMSLayer(time) {
  // Remove existing WMS layer
  if (map.getLayer('LightningForecast')) {
      map.removeLayer('LightningForecast');
  }
  if (map.getSource('LightningForecast1dayforecast')) {
      map.removeSource('LightningForecast1dayforecast');
  }

  // Construct WMS URL with the specified time
  const wmsUrl = `https://ies-ows.jrc.ec.europa.eu/gwis?SERVICE=WMS&REQUEST=GetMap&LAYERS=ecmwf.extra.lightning&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=1439&HEIGHT=602&CRS=EPSG:3857&BBOX={bbox-epsg-3857}&TIME=${time}`;

  // Add WMS tile service as a source
  map.addSource('LightningForecast1dayforecast', {
      type: 'raster',
      tiles: [wmsUrl],
      tileSize: 256
  });

  // Add WMS tile layer to the map
  map.addLayer({
      id: 'LightningForecast',
      type: 'raster',
      source: 'LightningForecast1dayforecast',
      paint: { 'raster-opacity': 0.7 },
      layout: { visibility: 'none' }
  });
 
}

// Set the default date to the current date
document.getElementById('date-selector').valueAsDate = new Date();

// Listen for changes in the date input
document.getElementById('date-selector').addEventListener('change', function (event) {
  const selectedDate = event.target.value;
  const formattedDate = formatDate(selectedDate);
  currentTime = formattedDate;

  // Update WMS layer with the new time
  updateWMSLayer(currentTime);
});

// Update WMS layer with the initial current time
updateWMSLayer(currentTime);
}
//adding styles onto map
map.on('style.load', () => {
  addAdditionalSourceAndLayer()
  map.setFog({}); // Set the default atmosphere style
});
// creating the toggle layer functionalities
map.on('idle', async() => {
  const toggleableLayerIds = ['fwidc', 'fwi', 'fwiisi', 'fdimark','fdibui','fwiffmc','fwifdmc','fwianomaly','fwiranking','kbdidi','markros','nfdrsic','blackcarbon', 'Methane', 'carbondioxide', 'carbonmonooxide', 'particulatematter','LightningForecast','Fuelsemission','nasa_eonet','VIIRSSNN21','virsssuomi','virssnoaa20','virssnoaa21','modisaquaterra','modisaqua','modisterra','burnedareaday1','lstd','lstn','vegitationindex','fireanomalies']; // IDs of layers with switches in the navbar

  for (const id of toggleableLayerIds) {
      const visibilitySwitch = document.querySelector(`#${id}`);
      
      if (!visibilitySwitch) {
          continue;
      }

      // Add event listener for switch change
      visibilitySwitch.addEventListener('change', function() {
          const visibility = this.checked ? 'visible' : 'none';

          if (map.getLayer(id)) {
              map.setLayoutProperty(id, 'visibility', visibility);
          }
      });
  }
  const nasaEonetCheckbox = document.getElementById('nasa_eonet');

    nasaEonetCheckbox.addEventListener('change', function () {
        if (this.checked) {
            if (!map.getSource('eonet-source')) {
                map.addSource('eonet-source', {
                    type: 'geojson',
                    data: 'https://eonet.gsfc.nasa.gov/api/v3/events/geojson',
                });
            }
            addEONETMarkers();
        } else {
            removeEONETMarkers();
        }
    });
});
// Function to add or remove legend image
function toggleLegendImage(layerId, add) {
  const legendContainer = document.getElementById('Legend_container');
  if (!legendContainer) return;

  if (add) {
      const legendImageDiv = document.createElement('div');
      legendImageDiv.id = `${layerId}_legend_div`;
      legendImageDiv.classList.add('legend-image-div');
      const legendImage = document.createElement('img');
      legendImage.src = `${layerId}_legend.png`;
      legendImage.alt = `Legend for ${layerId}`;
      legendImage.classList.add('legend-image');

      // Adjust image width and height to fit within the legend container
      legendImage.style.maxWidth = '100%';
      legendImage.style.maxHeight = '100%';

      legendImageDiv.appendChild(legendImage);
      legendContainer.appendChild(legendImageDiv);
  } else {
      const legendImageDiv = document.getElementById(`${layerId}_legend_div`);
      if (legendImageDiv) {
          legendImageDiv.parentNode.removeChild(legendImageDiv);
      }
  }
}

// Attach event listeners to layer switches in the navbar
const toggleableLayerIds = ['fwidc', 'fwi', 'fwiisi', 'fdimark', 'fdibui', 'fwiffmc', 'fwifdmc', 'fwianomaly', 'fwiranking', 'kbdidi', 'markros', 'nfdrsic', 'blackcarbon', 'Methane', 'carbondioxide', 'carbonmonooxide', 'particulatematter', 'LightningForecast', 'Fuelsemission','nasa_eonet','VIIRSSNN21','virsssuomi','virssnoaa20','virssnoaa21','modisaquaterra','modisaqua','modisterra','burnedareaday1','lstd','lstn','vegitationindex','fireanomalies'];
toggleableLayerIds.forEach(id => {
  const visibilitySwitch = document.getElementById(id);
  if (visibilitySwitch) {
      visibilitySwitch.addEventListener('change', function () {
          const addLegend = this.checked; // Add legend if switch is checked
          toggleLegendImage(id, addLegend);
      });
  }
});



/*
document.addEventListener('DOMContentLoaded', function() {
  // Get references to the toggler switches
  const togglerSwitches = document.querySelectorAll('.form-check-input');

  // Add event listeners to each toggler switch
  togglerSwitches.forEach(function(togglerSwitch) {
      togglerSwitch.addEventListener('change', function() {
          const layerId = this.getAttribute('id'); // Get the layer ID from the switch ID
          const visibility = this.checked ? 'visible' : 'none'; // Determine visibility based on toggler state

          // Check if the layer exists in the map
          if (map.getLayer(layerId)) {
              // Update the visibility of the layer
              map.setLayoutProperty(layerId, 'visibility', visibility);
          }
      });
  });
});
*/
// adding the scale control to the map in mapbox
map.addControl(new mapboxgl.ScaleControl());
  
  
  
