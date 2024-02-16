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
            'https://edo.jrc.ec.europa.eu/gdo/php/wms.php?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1439&HEIGHT=602&LAYERS=RDrI-Agri&STYLES=&FORMAT=image/png&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE'
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

    //adding the coprecencius layers for SPI 
    map.addSource('Coper_SPI', {
        'type': 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        'tiles': [
            'https://edo.jrc.ec.europa.eu/gdo/php/wms.php?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&LAYERS=spi&SRS=EPSG:3857&BBOX={bbox-epsg-3857}&WIDTH=256&HEIGHT=256&STYLE=&FORMAT=image/png&TRANSPARENT=TRUE&TIME=2018-05&TIMESCALE=12'
        ],
        'tileSize': 256
    });
    map.addLayer({
        'id': 'coperc_spi',
        'type': 'raster',
        'source': 'Coper_SPI',
        //'paint': { 'raster-opacity': 0.7 },
        'layout': { 'visibility': 'none' }
    }, );
    //adding the coprecencius layers for soil moisture anomaly detection something wrong with this
    map.addSource('Coper_Soil_Moisture_Anomaly', {
        'type': 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        'tiles': [
            'https://edo.jrc.ec.europa.eu/gdo/php/wms.php?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&LAYERS=sm_anom&SRS=EPSG:3857&BBOX={bbox-epsg-3857}&WIDTH=256&HEIGHT=256&STYLE=&FORMAT=image/png&TRANSPARENT=TRUE'
        ],
        'tileSize': 256
    });
    map.addLayer({
        'id': 'sm_anom',
        'type': 'raster',
        'source': 'Coper_Soil_Moisture_Anomaly',
        //'paint': { 'raster-opacity': 0.7 },
        'layout': { 'visibility': 'none' }
    }, );
    //adding the coprecencius layers for fapar anomaly 
    map.addSource('Coper_fAPAR_Anomaly', {
        'type': 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.comhttps://docs.mapbox.com/style-spec/reference/sources/
        'tiles': [
            'https://edo.jrc.ec.europa.eu/gdo/php/wms.php?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&LAYERS=fapar_anom&SRS=EPSG:3857&BBOX={bbox-epsg-3857}&WIDTH=256&HEIGHT=256&STYLE=&FORMAT=image/png&TRANSPARENT=TRUE'
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
    const toggleableLayerIds = ['countries_layer', 'rgb_fog', 'rgb_dust', 'rgb_snow','rdri_agri','sm_anom','coperc_spi','fapar_anom','fire_hmodis','fire_hviirs','gtd','ggo'];

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
            // map.setPaintProperty(id, 'fill-opacity', opacityValue);
            // Check if the layer is 'rgb_fog'
            if (id === 'rgb_fog') {
                map.setPaintProperty(id, 'raster-opacity', opacityValue);
            } else if (id === 'countries_layer') {
                // Check if the layer is 'countries_layer'
                map.setPaintProperty(id, 'fill-opacity', opacityValue);
                // Additional logic for countries_layer, if needed
            }else if (id === 'rgb_snow') {
                // Check if the layer is 'countries_layer'
                map.setPaintProperty(id, 'raster-opacity', opacityValue);
                // Additional logic for countries_layer, if needed
            }else if (id === 'rgb_dust') {
                // Check if the layer is 'countries_layer'
                map.setPaintProperty(id, 'raster-opacity', opacityValue);
                // Additional logic for countries_layer, if needed
            }else if (id === 'rdri_agri') {
                // Check if the layer is 'countries_layer'
                map.setPaintProperty(id, 'raster-opacity', opacityValue);
                // Additional logic for countries_layer, if needed
            }else if (id === 'sm_anom') {
                // Check if the layer is 'countries_layer'
                map.setPaintProperty(id, 'raster-opacity', opacityValue);
                // Additional logic for countries_layer, if needed
            }else if (id === 'coperc_spi') {
                // Check if the layer is 'countries_layer'
                map.setPaintProperty(id, 'raster-opacity', opacityValue);
                // Additional logic for countries_layer, if needed
            }else if (id === 'fapar_anom') {
                // Check if the layer is 'countries_layer'
                map.setPaintProperty(id, 'raster-opacity', opacityValue);
                // Additional logic for countries_layer, if needed
            }else if (id === 'fire_hmodis') {
                // Check if the layer is 'countries_layer'
                map.setPaintProperty(id, 'raster-opacity', opacityValue);
                // Additional logic for countries_layer, if needed
            }else if (id === 'fire_hviirs') {
                // Check if the layer is 'countries_layer'
                map.setPaintProperty(id, 'raster-opacity', opacityValue);
                // Additional logic for countries_layer, if needed
            }else if (id === 'gtd') {
                // Check if the layer is 'countries_layer'
                map.setPaintProperty(id, 'raster-opacity', opacityValue);
                // Additional logic for countries_layer, if needed
            }else if (id === 'ggo') {
                // Check if the layer is 'countries_layer'
                map.setPaintProperty(id, 'raster-opacity', opacityValue);
                // Additional logic for countries_layer, if needed
            }
        });
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
