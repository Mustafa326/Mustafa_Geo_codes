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
    style: 'mapbox://styles/mapbox/satellite-v9', // style URL
    projection: 'globe',
    center: [longhome, lathome], // starting position
    zoom: zoom // starting zoom
});

// loading the map 
map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style
});
/*
function getColor(d) {
    return d > 1200 ? '#800026' :  
           d > 670  ? '#BD0026' :
           d > 380  ? '#E31A1C' :
           d > 160  ? '#FC4E2A' :
           d > 100   ? '#FD8D3C' :
           d > 60   ? '#FEB24C' :
           d > 30   ? '#FED976' :
                      '#FFEDA0';
               
}
*/
map.on('load', () => {
    // Add GeoJSON source
    map.addSource('countries_covid', {
        type: 'geojson',
        data: 'covidcorona2019data2.geojson'
    });

    // Add choropleth layer
    map.addLayer({
        'id': 'countries_layer',
        'type': 'fill',
        'source': 'countries_covid',
        'paint': {
            'fill-color': [
                //property: 'density_20',
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


});
// Add legend that enters map on zoom
const PopulationLegendEl = document.getElementById('Popultation_density');
map.on('zoom', () => {
    if (map.getZoom() > zoom) {
        PopulationLegendEl.style.display = 'none';
    } else {
        PopulationLegendEl.style.display = 'block';
    }
});

// Add info control
map.on('mousemove', (event) => {
    const features = map.queryRenderedFeatures(event.point, {
        layers: ['countries_layer']
    });
    document.getElementById('pd').innerHTML = features.length ?
        `<h3>${features[0].properties.NAME_LONG}</h3><p><strong><em>${features[0].properties.density_20}</strong> people per square km</em></p>` :
        `<p>Hover over a country!</p>`;
});

map.addControl(new mapboxgl.FullscreenControl());
// Add overlay
// Create a custom control
// Create a custom control
var CustomControl = function() {
    // Get the existing HTML div
    var existingDiv = document.getElementById('Popultation_density');

    // Define the onAdd method
    existingDiv.onAdd = function() {
        const existingDiv = document.getElementById('Popultation_density');
        existingDiv.style.display = 'block';
        return existingDiv;
    };

    // Define the onRemove method
    existingDiv.onRemove = function() {
        const existingDiv = document.getElementById('Popultation_density');
        existingDiv.style.display = 'none';
    };

    //return existingDiv;
};

// Add custom control to the map
map.addControl(new CustomControl(), 'bottom-right');
// Create another custom control (CustomControl2)
var CustomControl2 = function() {
    // Get the existing HTML div
    var existingDiv = document.getElementById('features');

    // Define the onAdd method
    existingDiv.onAdd = function() {
        const existingDiv = document.getElementById('features');
        existingDiv.style.display = 'block';
        return existingDiv;
    };

    // Define the onRemove method
    existingDiv.onRemove = function() {
        const existingDiv = document.getElementById('features');
        existingDiv.style.display = 'none';
    };

    //return existingDiv;
};

// Add custom controls to the map
map.addControl(new CustomControl2(), 'top-left');
// adding layer controll
// adding layer control
// Track whether custom controls are added
let isCustomControlAdded = false;
let isCustomControl2Added = false;

// adding layer control
map.on('idle', () => {
    const toggleableLayerIds = ['countries_layer'];

    for (const id of toggleableLayerIds) {
        if (document.getElementById(id)) {
            continue;
        }

        const link = document.createElement('a');
        link.id = id;
        link.href = '#';
        link.textContent = id;
        link.className = 'active';

        link.onclick = function(e) {
            const clickedLayer = this.textContent;
            e.preventDefault();
            e.stopPropagation();

            const visibility = map.getLayoutProperty(
                clickedLayer,
                'visibility'
            );

            if (visibility === 'visible') {
                map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                this.className = '';
            } else {
                this.className = 'active';
                map.setLayoutProperty(
                    clickedLayer,
                    'visibility',
                    'visible'
                );
            }

            // Remove custom controls if added
            if (isCustomControlAdded) {
                map.removeControl(CustomControl);
                isCustomControlAdded = false;
            }
            if (isCustomControl2Added) {
                map.removeControl(CustomControl2);
                isCustomControl2Added = false;
            }
        };

        const layers = document.getElementById('menu');
        layers.appendChild(link);
    }
});

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