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
    style: 'mapbox://styles/mapbox/streets-v12', //'mapbox://styles/mapbox/satellite-v9', // style URL
    projection: 'globe',
    center: [longhome, lathome], // starting position
    zoom: zoom // starting zoom
});
// creating a popup
var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});
// List of categories
const categories = ['severestorms', 'earthquake', 'sealakeice', 'wildfires','volcanoes'];

const addImages = async () => {
    // Loop through categories and add images
    for (const category of categories) {
        const imgPath = `static/${category}.svg`;

        // Create an image element
        const img = new Image();

        // Use a Promise to wait for the image to load
        const imgLoadPromise = new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        });

        // Set the source URL
        img.src = imgPath;

        try {
            // Wait for the image to load
            await imgLoadPromise;

            // Add the image to the map
            map.addImage(category, img);
        } catch (error) {
            console.error(`Error loading image for ${category}:`, error);
        }
    }

};
// Assuming you have defined the map and added the 'eonet-source' GeoJSON source create a function to represent the nasa eonet layers with svg icons
function addEONETMarkers() {
    // Fetch the GeoJSON data from the EONET API
    fetch('https://eonet.gsfc.nasa.gov/api/v3/events/geojson')
      .then(response => response.json())
      .then(data => {
        // For each feature in the GeoJSON object:
        for (const event of data.features) {
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
  
          // Get the category ID from the properties
          const categoryId = event.properties.categories[0].id;
  
          // Use the category ID to construct the path to the SVG icon
          const iconPath = `static/${categoryId}.svg`;
  
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
      })
      .catch(error => console.error('Error fetching EONET data:', error));
      
  }
// function to remove markers 
function removeEONETMarkers() {
    // Remove all markers with class 'eonet-marker'
    const eonetMarkers = document.querySelectorAll('.eonet-marker');
    eonetMarkers.forEach(marker => marker.remove());
}
  
  

// Call the function to add images
//addImages();
// loading the map 

map.on('load', () => {
    // Add GeoJSON source
    map.addSource('countries_covid', {
        type: 'geojson',
        data: 'static/coviddata.geojson' //need to give path of static folder in django

    });

    // Add choropleth layer
    const countriesLayerId = 'countries_layer';
    map.addLayer({
        'id': countriesLayerId,
        'type': 'fill',
        'source': 'countries_covid',
        'paint': {
            'fill-color': [
                'interpolate', ['linear'],
                ['get', 'density_20'],
                30, '#FED976',
                60, '#FEB24C',
                100, '#FD8D3C',
                160, '#FC4E2A',
                380, '#E31A1C',
                670, '#BD0026',
                1200, '#800026'
            ],
            'fill-opacity': 0.7
        }
    });
    //adding RGB FOG Layer
    map.addSource('Eumetsat_Fog', {
        'type': 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        'tiles': [
            'https://view.eumetsat.int/geoserver/ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=msg_iodc:rgb_fog&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE'
        ],
        'tileSize': 256
    });
    map.addLayer({
        'id': 'rgb_fog',
        'type': 'raster',
        'source': 'Eumetsat_Fog',
        //'paint': { 'raster-opacity': 0.7 },
        'layout': { 'visibility': 'none' }
    }, );
    //adding the RGB Dust layer
    map.addSource('Eumetsat_Dust', {
        'type': 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        'tiles': [
            'https://view.eumetsat.int/geoserver/ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=msg_iodc:rgb_dust&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE'
        ],
        'tileSize': 256
    });
    map.addLayer({
        'id': 'rgb_dust',
        'type': 'raster',
        'source': 'Eumetsat_Dust',
        //'paint': { 'raster-opacity': 0.7 },
        'layout': { 'visibility': 'none' }
    }, );
    //adding the RGB snow layer
    map.addSource('Eumetsat_Snow', {
        'type': 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        'tiles': [
            'https://view.eumetsat.int/geoserver/ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=msg_iodc:rgb_snow&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE'
        ],
        'tileSize': 256
    });
    map.addLayer({
        'id': 'rgb_snow',
        'type': 'raster',
        'source': 'Eumetsat_Snow',
        //'paint': { 'raster-opacity': 0.7 },
        'layout': { 'visibility': 'none' }
    }, );
    //adding the coprecencius layers for drought
    map.addSource('Coper_RDrI_Agri', {
        'type': 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        'tiles': [
            'https://edo.jrc.ec.europa.eu/gdo/php/wms.php?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=grid_1dd_rdri&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE'
        ],
        'tileSize': 256
    });
    map.addLayer({
        'id': 'rdri_agri',
        'type': 'raster',
        'source': 'Coper_RDrI_Agri',
        //'paint': { 'raster-opacity': 0.7 },
        'layout': { 'visibility': 'none' }
    }, );

    // //adding the coprecencius layers for SPI 
    // map.addSource('Coper_SPI', {
    //     'type': 'raster',
    //     // use the tiles option to specify a WMS tile source URL
    //     // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
    //     'tiles': [
    //         'https://edo.jrc.ec.europa.eu/gdo/php/wms.php?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&LAYERS=spi&SRS=EPSG:3857&BBOX={bbox-epsg-3857}&WIDTH=256&HEIGHT=256&STYLE=&FORMAT=image/png&TRANSPARENT=TRUE&TIME=2018-05&TIMESCALE=12'
    //     ],
    //     'tileSize': 256
    // });
    // map.addLayer({
    //     'id': 'coperc_spi',
    //     'type': 'raster',
    //     'source': 'Coper_SPI',
    //     //'paint': { 'raster-opacity': 0.7 },
    //     'layout': { 'visibility': 'none' }
    // }, );
    //adding the coprecencius layers for soil moisture anomaly detection something wrong with this
    // map.addSource('Coper_Soil_Moisture_Anomaly', {
    //     'type': 'raster',
    //     // use the tiles option to specify a WMS tile source URL
    //     // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
    //     'tiles': [
    //         'https://edo.jrc.ec.europa.eu/gdo/php/wms.php?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&LAYERS=sm_anom&SRS=EPSG:3857&BBOX={bbox-epsg-3857}&WIDTH=256&HEIGHT=256&STYLE=&FORMAT=image/png&TRANSPARENT=TRUE'
    //     ],
    //     'tileSize': 256
    // });
    // map.addLayer({
    //     'id': 'sm_anom',
    //     'type': 'raster',
    //     'source': 'Coper_Soil_Moisture_Anomaly',
    //     //'paint': { 'raster-opacity': 0.7 },
    //     'layout': { 'visibility': 'none' }
    // }, );
    //adding the coprecencius layers for fapar anomaly 
    map.addSource('Coper_fAPAR_Anomaly', {
        'type': 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        'tiles': [
            'https://edo.jrc.ec.europa.eu/gdo/php/wms.php?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=fapar_anom_c6_tab&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE'
        ],
        'tileSize': 256
    });
    map.addLayer({
        'id': 'fapar_anom',
        'type': 'raster',
        'source': 'Coper_fAPAR_Anomaly',
        //'paint': { 'raster-opacity': 0.7 },
        'layout': { 'visibility': 'none' }
    }, );
// adding the Fire data of FIRMS Global Modis 
    map.addSource('FIRMS_Modis_hotspots', {
        'type': 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        'tiles': [
            'https://firms.modaps.eosdis.nasa.gov/mapserver/wms/fires/48615d588cfc60c9fc9b81e90d881e8f/?SERVICE=WMS&REQUEST=GetMap&LAYERS=fires_modis_48&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
        ],
        'tileSize': 256
    });
    map.addLayer({
        'id': 'fire_hmodis',
        'type': 'raster',
        'source': 'FIRMS_Modis_hotspots',
        //'paint': { 'raster-opacity': 0.7 },
        'layout': { 'visibility': 'none' }
    }, );

    // adding the Fire data of FIRMS Global Viirs 
    map.addSource('FIRMS_Viirs_hotspots', {
        'type': 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        'tiles': [
            'https://firms.modaps.eosdis.nasa.gov/mapserver/wms/fires/48615d588cfc60c9fc9b81e90d881e8f/?SERVICE=WMS&REQUEST=GetMap&LAYERS=fires_viirs_48&VERSION=1.3.0&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}'
        ],
        'tileSize': 256
    });
    map.addLayer({
        'id': 'fire_hviirs',
        'type': 'raster',
        'source': 'FIRMS_Viirs_hotspots',
        //'paint': { 'raster-opacity': 0.7 },
        'layout': { 'visibility': 'none' }
    }, );

    // adding the GLIMS dataset of Glacier Thickness 
    map.addSource('GLIMS_glacier_thickness', {
        'type': 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        'tiles': [
            'https://glims.org/geoserver/ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=GLIMS:glathida_points&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE'
        ],
        'tileSize': 256
    });
    map.addLayer({
        'id': 'gtd',
        'type': 'raster',
        'source': 'GLIMS_glacier_thickness',
        //'paint': { 'raster-opacity': 0.7 },
        'layout': { 'visibility': 'none' }
    }, );

    // adding the GLIMS dataset of Glacier Outlines 
    map.addSource('GLIMS_glacier_outlines', {
        'type': 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        'tiles': [
            'https://glims.org/geoserver/ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=GLIMS:GLIMS_GLACIERS&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE'
        ],
        'tileSize': 256
    });
    map.addLayer({
        'id': 'ggo',
        'type': 'raster',
        'source': 'GLIMS_glacier_outlines',
        //'paint': { 'raster-opacity': 0.7 },
        'layout': { 'visibility': 'none' }
    }, );
    // Load your images
    addImages();

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
    //addEONETMarkers();
    // map.addSource('eonet-source', {
    //     type: 'geojson',
    //     data: 'https://eonet.gsfc.nasa.gov/api/v3/events/geojson'
    // });

    // map.addLayer({
    //     id: 'nasa_eonet',
    //     type: 'symbol',
    //     source: 'eonet-source',
    //     layout: {
    //         'icon-image': ['get', ['get', 'categories', 0, 'id']], // Access nested 'categories' > [0] > 'id'
    //         'icon-size': 1.5,
    //         'icon-allow-overlap': true,
    //     }
    // });
});
//adding styles onto map
map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style
});

 // Popup functionality for EONET layer
 map.on('click', 'nasa_eonet', function (e) {
    var features = e.features;
    if (features.length > 0) {
        var feature = features[0];

        var magnitudeUnit = feature.properties.magnitudeUnit;
        var magnitudeValue = feature.properties.magnitudeValue;
        var eventName = feature.properties.title;
        var eventDate = feature.properties.date;

        console.log('Event Name:', eventName);
        console.log('Event Date:', eventDate);
        console.log('Magnitude Unit:', magnitudeUnit);
        console.log('Magnitude Value:', magnitudeValue);
// setting the html for the popup
        popup.setHTML(
            `<h3>${eventName}</h3>` +
            `<p>Date: ${eventDate}</p>` +
            `<p>Magnitude Value:${magnitudeValue}</p>` +
            `<p>Magnitude Unit:${magnitudeUnit}</p>`
        );
        popup.setLngLat(e.lngLat).addTo(map);
    }
});

map.on('mouseenter', 'nasa_eonet', function () {
    map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'nasa_eonet', function () {
    map.getCanvas().style.cursor = '';
});
// Add legend that enters map on zoom
const PopulationLegendEl = document.getElementById('Popultation_density');
/*

map.on('zoom', () => {
    if (map.getZoom() > zoom) {
        PopulationLegendEl.style.display = 'none';
    } else {
        PopulationLegendEl.style.display = 'block';
    }
});
*/
// Add info control
map.on('mousemove', (event) => {
    const countriesFeatures = map.queryRenderedFeatures(event.point, {
        layers: ['countries_layer']
    });

    if (countriesFeatures.length > 0) {
        document.getElementById('pd').innerHTML = `
            <h3>${countriesFeatures[0].properties.NAME_LONG}</h3>
            <p><strong><em>${countriesFeatures[0].properties.density_20}</strong> people per square km</em></p>`;
    } else {
        document.getElementById('pd').innerHTML = `<p>Hover over a country!</p>`;
    }
});
// Function to fetch WMS data and update layerData
async function fetchWMSData(layer) {
    const bbox = map.getBounds().toArray().flat();
    const wmsUrl = `https://view.eumetsat.int/geoserver/ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=-180,-85.05112877980659,180,85.05112877980659&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=msg_iodc:${layer}&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE`;

    const response = await fetch(wmsUrl);
    const data = await response.blob();

    console.log('Latest fetched WMS:', wmsUrl);

    return URL.createObjectURL(data);
}

// Function to initialize time slider for a layer
function initializeTimeSlider(layer) {
    const sliderContainer = document.createElement('div');
    sliderContainer.id = 'time-slider-container';

    const playButton = document.createElement('button');
    playButton.id = 'play-button';
    playButton.textContent = 'Play';
    playButton.addEventListener('click', async () => {
        let currentIndex = 0;
        const interval = setInterval(async () => {
            currentIndex++;
            if (currentIndex >= layerData[layer].length) {
                clearInterval(interval);
            } else {
                const imageUrl = await fetchWMSData(layer);
                map.getSource(layer).updateImage(imageUrl);
                timeSlider.value = currentIndex; // Update slider position
            }
        }, 5 * 3600 * 1000); // Adjust the interval as needed
    });

    const timeSlider = document.createElement('input');
    timeSlider.type = 'range';
    timeSlider.id = 'time-slider';
    timeSlider.min = 0;
    timeSlider.max = 10; // Set an initial value (adjust as needed)
    timeSlider.value = 0; // Set an initial value
    timeSlider.step = 1;

    sliderContainer.appendChild(playButton);
    sliderContainer.appendChild(timeSlider);

    // Append elements to the map container
    document.body.appendChild(sliderContainer);

    sliders[layer] = sliderContainer;
}

// Usage
const eumetsatLayers = ['rgb_fog', 'rgb_dust', 'rgb_snow'];
const layerData = {};
const sliders = {};
// creating a map.on for the eonet layers
map.on('idle',async () => {
//     // Fetch NASA EONET features through API
// const response = await fetch('https://eonet.gsfc.nasa.gov/api/v3/events/geojson');
// const eonetData = await response.json();
// console.log('EONET Data:', eonetData); // Add this line for debugging
// const eonetFeatures = eonetData.features;
// // Log categories and their ids from each feature
// eonetData.features.forEach((feature, index) => {
//     const categories = feature.properties && feature.properties.categories;

//     if (categories && Array.isArray(categories) && categories.length > 0) {
//         console.log(`Categories for feature ${index}:`, categories);

//         // Iterate through each category and log its id
//         categories.forEach((category, catIndex) => {
//             const categoryId = category && category.id;
//             if (categoryId) {
//                 console.log(`  Category ${catIndex + 1} - ID: ${categoryId}`);
//             } else {
//                 console.warn(`  Category ${catIndex + 1} - ID is undefined`);
//             }
//         });
//     } else {
//         console.warn(`Categories are empty or undefined for feature ${index}`);
//     }
// });
// console.log(`these are the features:${eonetFeatures}`)
// //console.log(`these are the features properties:${eonetFeaturesfeature.properties.categories}`)

// // Load the NASA EONET events from the source
// map.getSource('eonet-source').setData(eonetData);

// eonetFeatures.forEach(async (feature) => {
//     // Check if the necessary properties are present in the feature
//     if (feature.properties && feature.properties.categories) {
//         // Remove the JSON.parse since 'categories' is already an array
//         const categories = feature.properties.categories;

//         // Check if categories is an array and has at least one element
//         if (Array.isArray(categories) && categories.length > 0) {
//             // Use the first category's id to construct the icon name
//             const categoryName = categories[0].id;

//             // Check if the categoryName is valid before proceeding
//             if (categoryName) {
//                 const iconUrl = `static/${categoryName.toLowerCase()}.svg`;

//                 try {
//                     if (!map.hasImage(categoryName)) {
//                         const img = new Image();
//                         img.onload = (function (currentFeature) {
//                             return function () {
//                                 map.addImage(categoryName, img);
//                                 // Check if the feature id is defined before using it
//                                 const featureId = currentFeature.id || 'default-icon';
//                                 map.setLayoutProperty('nasa_eonet', 'icon-image', [
//                                     'case',
//                                     ['==', ['get', 'id'], featureId],
//                                     categoryName,
//                                     'default-icon',
//                                 ]);
//                             };
//                         })(feature);
//                         img.src = iconUrl;
//                     }
//                 } catch (error) {
//                     console.error('Error loading image:', iconUrl, error);
//                 }
//             } else {
//                 console.warn('Category name is undefined for feature:', feature);
//             }
//         } else {
//             console.warn('Categories array is empty or undefined for feature:', feature);
//         }
//     } else {
//         console.warn('Feature is missing required properties:', feature);
//     }
//     });


    map.on('click', function (e) {
        // Check if the clicked feature is part of the 'nasa_eonet' layer
        var features = map.queryRenderedFeatures(e.point, { layers: ['nasa_eonet'] });

        if (!features.length) {
            // If no features from 'nasa_eonet' layer are clicked, close the popup
            popup.remove();
        }
    });
    for (const layer of eumetsatLayers) {
        layerData[layer] = []; // Clear the array for each layer
        const imageUrl = await fetchWMSData(layer);
        layerData[layer].push(imageUrl);
        initializeTimeSlider(layer);
    }
    const toggleableLayerIds = ['countries_layer', 'rgb_fog', 'rgb_dust', 'rgb_snow', 'rdri_agri','fapar_anom', 'fire_hmodis', 'fire_hviirs', 'gtd', 'ggo','nasa_eonet'];

    // Check if the NASA EONET layer is present
    const hasNasaEonetLayer = toggleableLayerIds.includes('nasa_eonet');

    // If the NASA EONET layer is present, add/remove based on checkbox state
    if (hasNasaEonetLayer) {
        const nasaEonetCheckbox = document.getElementById('checkbox_nasa_eonet');

        nasaEonetCheckbox.addEventListener('change', function () {
            // Check if the checkbox is checked
            if (this.checked) {
                // If checked, add the NASA EONET source and layer only if not already added
                if (!map.getLayer('nasa_eonet') || !map.getSource('eonet-source')) {
                    map.addSource('eonet-source', {
                        type: 'geojson',
                        data: 'https://eonet.gsfc.nasa.gov/api/v3/events/geojson',
                    });

                    map.addLayer({
                        id: 'nasa_eonet',
                        type: 'symbol',
                        source: 'eonet-source',
                    });

                    addEONETMarkers();
                }
            } else {
                // If unchecked, remove the NASA EONET layer and source only if they exist
                if (map.getLayer('nasa_eonet') && map.getSource('eonet-source')) {
                    map.removeLayer('nasa_eonet');
                    map.removeSource('eonet-source');
                    popup.remove(); // Remove the popup if it's open
                    removeEONETMarkers(); // Remove EONET markers from the map
                }
            }
        });
    }

    // Check if any of the RGB layers are present
    const hasRgbLayers = toggleableLayerIds.some(id => ['rgb_fog', 'rgb_dust', 'rgb_snow'].includes(id));

    // Check if the time slider container exists
    const timeSliderContainer = document.getElementById('time-slider-container');

    // If any RGB layer is present and the time slider container doesn't exist, create it
    if (hasRgbLayers && !timeSliderContainer) {
        initializeTimeSlider();
    } else if (!hasRgbLayers && timeSliderContainer) {
        // If no RGB layer is present and the time slider container exists, remove it
        timeSliderContainer.parentNode.removeChild(timeSliderContainer);
    }

    for (const id of toggleableLayerIds) {
        const visibilityCheckbox = document.getElementById(`checkbox_${id}`);
        const opacitySlider = document.querySelector(`.opacity-slider[data-layer="${id}"]`);

        if (!visibilityCheckbox || !opacitySlider) {
            continue;
        }

        // Get the initial visibility state of the layer
        const initialVisibility = map.getLayoutProperty(id, 'visibility') || 'none';

        // Set the checked attribute based on the initial visibility state
        visibilityCheckbox.checked = initialVisibility === 'visible';

        visibilityCheckbox.addEventListener('change', function () {
            const visibility = this.checked ? 'visible' : 'none';

            // Check if the map and layer exist before setting properties
            if (map.getLayer(id)) {
                map.setLayoutProperty(id, 'visibility', visibility);

                if (id === 'countries_layer') {
                    const features = document.getElementById('features');

                    if (visibility === 'visible') {
                        PopulationLegendEl.style.display = 'block';
                        features.style.display = 'block';
                    } else {
                        PopulationLegendEl.style.display = 'none';
                        features.style.display = 'none';
                    }
                }
            }
        });

        opacitySlider.addEventListener('input', function () {
            const opacityValue = parseFloat(this.value);

            if (id === 'rgb_fog') {
                map.setPaintProperty(id, 'raster-opacity', opacityValue);
            } else if (id === 'countries_layer') {
                map.setPaintProperty(id, 'fill-opacity', opacityValue);
                // Additional logic for countries_layer, if needed
            } else if (id === 'rgb_snow') {
                map.setPaintProperty(id, 'raster-opacity', opacityValue);
                // Additional logic for rgb_snow, if needed
            } else if (id === 'rgb_dust') {
                map.setPaintProperty(id, 'raster-opacity', opacityValue);
                // Additional logic for rgb_dust, if needed
            } else if (id === 'rdri_agri') {
                map.setPaintProperty(id, 'raster-opacity', opacityValue);
                // Additional logic for rdri_agri, if needed
            // } else if (id === 'sm_anom') {
            //     map.setPaintProperty(id, 'raster-opacity', opacityValue);
                // Additional logic for sm_anom, if needed
            // } else if (id === 'coperc_spi') {
            //     map.setPaintProperty(id, 'raster-opacity', opacityValue);
            //     // Additional logic for coperc_spi, if needed
            } else if (id === 'fapar_anom') {
                map.setPaintProperty(id, 'raster-opacity', opacityValue);
                // Additional logic for fapar_anom, if needed
            } else if (id === 'fire_hmodis') {
                map.setPaintProperty(id, 'raster-opacity', opacityValue);
                // Additional logic for fire_hmodis, if needed
            } else if (id === 'fire_hviirs') {
                map.setPaintProperty(id, 'raster-opacity', opacityValue);
                // Additional logic for fire_hviirs, if needed
            } else if (id === 'gtd') {
                map.setPaintProperty(id, 'raster-opacity', opacityValue);
                // Additional logic for gtd, if needed
            } else if (id === 'ggo') {
                map.setPaintProperty(id, 'raster-opacity', opacityValue);
                // Additional logic for ggo, if needed
            }
        });
    }
});
// // Function to load an image asynchronously
// function loadImage(url) {
//     return new Promise((resolve, reject) => {
//         map.loadImage(url, (error, image) => {
//             if (error) {
//                 reject(error);
//             } else {
//                 resolve(image);
//             }
//         });
//     });
// }
//adding the controls onto the map
map.addControl(new mapboxgl.FullscreenControl());
const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');

// Create a new custom control (CustomControl3)
/*
var CustomControl3 = function() {
    // Get the existing HTML div with id 'menu'
    var existingDiv = document.getElementById('menu');

    // Define the onAdd method
    existingDiv.onAdd = function() {
        return existingDiv;
    };

    // Define the onRemove method
    existingDiv.onRemove = function() {
        // No action needed for removal
    };

    return existingDiv;
};

// Add custom controls to the map
map.addControl(new CustomControl3(), 'right'); // Add CustomControl3 below Fullscreen Control
*/





// Add info control
/*
map.on('mousemove', 'countries-layer', (e) => {
    var features = map.queryRenderedFeatures(e.point, { layers: ['countries-layer'] });
    if (features.length > 0) {
        var feature = features[0];
        var popupHtml = `<strong>${feature.properties.NAME}</strong><br>
                         Total Coronavirus Cases (24 March): ${feature.properties.total_coronavirus_cases_24March}`;
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(popupHtml)
            .addTo(map);
    }
});
*/
