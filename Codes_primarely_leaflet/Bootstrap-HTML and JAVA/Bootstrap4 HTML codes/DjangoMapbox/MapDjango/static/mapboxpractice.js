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
        'paint': { 'raster-opacity': 0.7 },
        'layout': { 'visibility': 'none' }
    }, );
});
//adding styles onto map
map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style
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





// Toggleable layer control
map.on('idle', () => {
    const toggleableLayerIds = ['countries_layer', 'rgb_fog'];

    for (const id of toggleableLayerIds) {
        if (document.getElementById(id)) {
            continue;
        }

        // Create a container div for each layer
        const container = document.createElement('div');
        container.className = 'layer-container';

        // Create a link for the layer
        const link = document.createElement('a');
        link.id = id;
        link.href = '#';
        link.textContent = id;
        link.className = 'active';

        // Create an opacity slider
        const opacitySlider = document.createElement('input');
        opacitySlider.type = 'range';
        opacitySlider.min = '0';
        opacitySlider.max = '1';
        opacitySlider.step = '0.1';
        opacitySlider.value = '0.7';

        // Add event listener to update layer opacity when slider changes
        opacitySlider.addEventListener('input', function() {
            const opacityValue = parseFloat(this.value);
            //map.setPaintProperty(id, 'fill-opacity', opacityValue);
            // Check if the layer is 'rgb_fog'
            if (id === 'rgb_fog') {
                map.setPaintProperty(id, 'raster-opacity', opacityValue);
            } else if (id === 'countries_layer') {
                // Check if the layer is 'countries_layer'
                map.setPaintProperty(id, 'fill-opacity', opacityValue);
                // Additional logic for countries_layer, if needed
            }
        });

        // Append link and slider to the container
        container.appendChild(link);
        container.appendChild(opacitySlider);

        // Add click event to the link
        link.onclick = function(e) {
            const clickedLayer = this.textContent;
            e.preventDefault();
            e.stopPropagation();

            if (clickedLayer === 'countries_layer') {
                // If the clicked layer is countries_layer, handle visibility and legend/info control
                const visibility = map.getLayoutProperty(clickedLayer, 'visibility');
                map.setLayoutProperty(clickedLayer, 'visibility', visibility === 'visible' ? 'none' : 'visible');

                if (visibility === 'visible') {
                    map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                    this.className = '';
                    // Remove legend and info control when layer is removed
                    PopulationLegendEl.style.display = 'none';
                    document.getElementById('features').style.display = 'none';
                } else {
                    this.className = 'active';
                    map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
                    // Add legend and info control back when layer is added
                    PopulationLegendEl.style.display = 'block';
                    document.getElementById('features').style.display = 'block';
                }
            } else if (clickedLayer === 'rgb_fog') {
                // For other layers, handle as before (rgb_fog)
                const visibility = map.getLayoutProperty(clickedLayer, 'visibility');
                map.setLayoutProperty(clickedLayer, 'visibility', visibility === 'visible' ? 'none' : 'visible');
            }
        };

        // Append the container to the menu
        const layerMenuId = 'menu_' + id;
        const layerMenu = document.getElementById(layerMenuId);
        layerMenu.appendChild(container);
    }
});
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