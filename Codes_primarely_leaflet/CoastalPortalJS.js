
var bounds = [[60.872, 23.634], [77.837, 36.962]  ];
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

// Create the GeoJSON data with styled features
var styledFeatures = {
  type: 'FeatureCollection',
  features: coastallitter.features.map(styleFeature)
};

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
                267234 , '#FED976',
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
                1465 , '#FED976',
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
                0.22 , '#FED976',
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
    map.addSource('video-overlay', {
        type: 'video',
        urls: [
            'Plastic_Waste_trackingfinal.mp4',
        ],
        coordinates: [
            [-122.51596391201019, 37.56238816766053],
            [-122.51467645168304, 37.56410183312965],
            [-122.51309394836426, 37.563391708549425],
            [-122.51423120498657, 37.56161849366671]
        ]
    });

    // Add the video layer
    map.addLayer({
        id: 'video-overlay',
        type: 'raster',
        source: 'video-overlay'
    });

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
});
//adding styles onto map
map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style
});
// creating the toggle layer functionalities 
map.on('idle', async () => {
    const toggleableLayerIds = ['mindusdelta', 'mjiwani', 'msandspit', 'mkalmatkhor', 'msonmianikhor','sstmonthday','sstmonthnight','sstanomalies','plasticwgeneration','misplasticwaste','misplasticwasteocean','propplasticocean','marinemicroemicnoc','marineplastictracker']; // IDs of layers with checkboxes and sliders

    const layerZoomLocations = {
        mindusdelta: [24.8607, 67.0011], // Example values for mindusdelta
        mjiwani: [25.0538, 61.7707], // Example values for mjiwani
        msandspit: [24.8404, 66.9098], // Example values for msandspit
        mkalmatkhor: [25.4211, 64.0769], // Example values for mkalmatkhor
        msonmianikhor: [25.1667,  66.5000] // Example values for msonmianikhor
    };

    for (const id of toggleableLayerIds) {
        const visibilityCheckbox = document.querySelector(`input[data-layername="${id}"]`);
        const opacitySlider = document.querySelector(`input[data-opacitylayername="${id}"]`);

        if (!visibilityCheckbox || !opacitySlider) {
            continue;
        }

        // Add event listener for checkbox change
        visibilityCheckbox.addEventListener('change', function () {
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
        opacitySlider.addEventListener('input', function () {
            const opacityValue = parseFloat(this.value) / 100; // Convert range [0-100] to [0-1]

            if (map.getLayer(id)) {
                map.setPaintProperty(id, 'raster-opacity', opacityValue);
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const mangroveWatchCheckbox = document.querySelector('input[data-layername="mwatch"]');
    const mainContainer = document.getElementById('main-container');
    let iframeEezMarineSurveillance; // Declare iframe variable outside event listener

    mangroveWatchCheckbox.addEventListener('change', function () {
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
// Add info control for plastic waste generation
map.on('mousemove', (event) => {
    let layers = ['plasticwgeneration', 'misplasticwaste','misplasticwasteocean','propplasticocean']; // Add more layers as needed

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
            }else if (visibleLayer === 'misplasticwasteocean') {
                propertyName = 'Mismanag_1';
                unit = 'tonne/year';
                infoControlId = 'pdmismanagedpwo';
            }else if (visibleLayer === 'propplasticocean') {
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
