
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
  map.addControl(new mapboxgl.NavigationControl({
    showZoom: false,
    showCompass: false
  }));
  
  map.addControl(new mapboxgl.ScaleControl());
  
  setTimeout(() => {
    map.flyTo({ center: targetCoordinate, zoom: 5, speed: 0.6 });
  }, 1000);

  map.on('load', () => {
    // Add GeoJSON source
    // map.addSource('countries_covid', {
    //     type: 'geojson',
    //     data: 'static/coviddata.geojson' //need to give path of static folder in django

    // });

    // Add choropleth layer
    // const countriesLayerId = 'countries_layer';
    // map.addLayer({
    //     'id': countriesLayerId,
    //     'type': 'fill',
    //     'source': 'countries_covid',
    //     'paint': {
    //         'fill-color': [
    //             'interpolate', ['linear'],
    //             ['get', 'density_20'],
    //             30, '#FED976',
    //             60, '#FEB24C',
    //             100, '#FD8D3C',
    //             160, '#FC4E2A',
    //             380, '#E31A1C',
    //             670, '#BD0026',
    //             1200, '#800026'
    //         ],
    //         'fill-opacity': 0.7
    //     },
    //     //'layout': { 'visibility': 'none' }
    // });
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
//adding styles onto map
map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style
});
// creating the toggle layer functionalities 
map.on('idle', async () => {
    const toggleableLayerIds = ['mindusdelta', 'mjiwani', 'msandspit', 'mkalmatkhor', 'msonmianikhor']; // IDs of layers with checkboxes and sliders

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

