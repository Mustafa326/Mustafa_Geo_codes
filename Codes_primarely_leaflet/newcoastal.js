// functionality for the navbar
$(document).ready(function () {
    var trigger = $('.hamburger'),
        overlay = $('.overlay'),
        isClosed = false,
        runningTextBox = $('.running-text-box');

    trigger.click(function () {
        hamburger_cross();
    });

    function hamburger_cross() {
        if (isClosed == true) {
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
            runningTextBox.show(); // Show running text when sidebar is untoggled
        } else {
            overlay.show();
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            isClosed = true;
            runningTextBox.hide(); // Hide running text when sidebar is toggled
        }
    }

    $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
    });
});


  // Replace with your actual map initialization code
  var map = L.map('map').setView([30.3753, 69.3451], 4.5);
  // Create tile layers for different maps
const esriWorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
const mapboxTileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-streets-v12', // Specify your Mapbox style ID here
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibXVzYW1hcmVoYW4iLCJhIjoiY2xwZHcxeG85MTMyMDJycXI5YjNyaGhqNiJ9.6UL1Nyb_K5dKT6H4KuHk_Q' // Replace with your Mapbox access token
});

const cartodb=new L.TileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
    attribution: 'Map tiles &copy; <a href="https://mapbox.com">MapBox</a>',
    maxZoom: 18,
    maxNativeZoom: 20
  })//.addTo(map);

// Add the Mapbox tile layer to the map
mapboxTileLayer.addTo(map)

// Create an object to hold the different map layers
const baseMaps = {
    "Esri World Imagery": esriWorldImagery,
    "Mapbox Satellite Streets": mapboxTileLayer,
    "Cartodb Positron": cartodb
};
//Add tiles and zoom buttons

// Move zoom buttons to the top right and 10 lines below the top
//map.zoomControl.setPosition('topright'); // Move zoom control to the top right corner
//map.zoomControl.getContainer().style.marginTop = '3em'; // Adjust the margin-top for the zoom buttons
//-------------------adding the plastic waste data set-----------//
//to generate a style for the plastic waste variable
//creaating a color function for the plastic waste variable
function getColorplasticwaste(d) {
    return d > 59079741 ? '#800026' :
        d > 14476561 ? '#BD0026' :
        d > 7993489 ? '#E31A1C' :
        d > 3919268 ? '#FC4E2A' :
        d > 2031675 ? '#FD8D3C' :
        d > 1022683 ? '#FEB24C' :
        d > 267234 ? '#FED976' :
        '#FFEDA0';
}
// using color fuction to generate style for geojason for plastic waste variable
function style(feature) {
    return {
        fillColor: getColorplasticwaste(feature.properties.Plastic_Wa),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
//creaating a color function for the plastic waste variable
function getColormissmanaged(d) {
    return d > 12994100 ? '#800026' :
        d > 4942514 ? '#BD0026' :
        d > 1948950 ? '#E31A1C' :
        d > 1021990 ? '#FC4E2A' :
        d > 520002 ? '#FD8D3C' :
        d > 247495 ? '#FEB24C' :
        d > 73139 ? '#FED976' :
        '#FFEDA0';
}
// using color fuction to generate style for geojason for plastic waste variable
function style2(feature) {
    return {
        fillColor: getColormissmanaged(feature.properties.Mismanaged),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
//creaating a color function for the missmanaged_1 variable
function getColormissmanaged1(d) {
    return d > 356371 ? '#800026' :
        d > 126513 ? '#BD0026' :
        d > 73098 ? '#E31A1C' :
        d > 37799 ? '#FC4E2A' :
        d > 14329 ? '#FD8D3C' :
        d > 5237 ? '#FEB24C' :
        d > 1465 ? '#FED976' :
        '#FFEDA0';
}
//using color fuction to generate style for geojason for missmanaged_1 variable
function style3(feature) {
    return {
        fillColor: getColormissmanaged1(feature.properties.Mismanag_1),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
//creaating a color function for the propability variable
function getColorpropability(d) {
    return d > 13.74 ? '#800026' :
        d > 7.92 ? '#BD0026' :
        d > 5.05 ? '#E31A1C' :
        d > 2.71 ? '#FC4E2A' :
        d > 1.27 ? '#FD8D3C' :
        d > 0.63 ? '#FEB24C' :
        d > 0.22 ? '#FED976' :
        '#FFEDA0';
}
//using color fuction to generate style for geojason for propability variable
function style4(feature) {
    return {
        fillColor: getColorpropability(feature.properties.Probabilit),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
// creating the plastic waste geojson
var plastic_wastegeojsondata = L.geoJson(plasticwaste, {
        style: style,
        onEachFeature: function(feature, layer) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight
            });
        }
    }) //.addTo(map);
    // creating the missmanaged geojason keep in mind that plasticwaste is the variable in which the geojson data is stored in
var missmanagedgeojsondata = L.geoJson(plasticwaste, {
        style: style2,
        onEachFeature: function(feature, layer) {
            layer.on({
                mouseover: highlightFeaturemissmanaged,
                mouseout: resetHighlightmissmanaged
            });
        }
    }) //.addTo(map);

// creating the missmanaged_1 geojason keep in mind that plasticwaste is the variable in which the geojson data is stored in
var missmanagedgeojsondata1 = L.geoJson(plasticwaste, {
        style: style3,
        onEachFeature: function(feature, layer) {
            layer.on({
                mouseover: highlightFeaturemissmanaged1,
                mouseout: resetHighlightmissmanaged1
            });
        }
    }) //.addTo(map);

    // creating the propability geojason keep in mind that plasticwaste is the variable in which the geojson data is stored in
var propabilitygeojsondata = L.geoJson(plasticwaste, {
        style: style4,
        onEachFeature: function(feature, layer) {
            layer.on({
                mouseover: highlightFeaturepropability,
                mouseout: resetHighlightpropability
            });
        }
    }) //.addTo(map);

    //adding the districts to map
var district = L.geoJSON(district, {
    style: {
        fillColor: "Transparent", // Hollow fill color
        color: "black", // Red boundary color

        weight: 1, // Border width
    },
}).addTo(map); 
//adding the Pakistan Rivers to map
var pakrivers = L.geoJSON(rivers, {
    style: {
        fillColor: "Transparent", // Hollow fill color
        color: "blue", // Red boundary color
        weight: 1, // Border width
    },
}).addTo(map); 
// //Geoserver layers through the use of L.tilelayers for the costal portal rasters-------------------------------------------------------------
// var geoserver15 = L.tileLayer.wms("http://172.18.1.4:8080/geoserver/NDMA-costal-rasters/wms", { layers: 'savi15', format: 'image/png', transparent: true, srs: 'EPSG:3857' }) //.addTo(map)
// geoserver15.setOpacity(1.0)
// var savi15raster = L.layerGroup([geoserver15])
// var geoserver23 = L.tileLayer.wms("http://172.18.1.4:8080/geoserver/NDMA-costal-rasters/wms", { layers: 'savi23', format: 'image/png', transparent: true, srs: 'EPSG:3857' }) //.addTo(map)
// geoserver23.setOpacity(1.0)
// var savi23raster = L.layerGroup([geoserver23])
// var geoserverRef15 = L.tileLayer.wms("http://172.18.1.4:8080/geoserver/NDMA-costal-rasters/wms", { layers: 'reflectance15', format: 'image/png', transparent: true, srs: 'EPSG:3857' }) //.addTo(map)
// geoserverRef15.setOpacity(1.0)
// var Reflectance15 = L.layerGroup([geoserverRef15])

// var geoserverRef23 = L.tileLayer.wms("http://172.18.1.4:8080/geoserver/NDMA-costal-rasters/wms", { layers: 'reflectance23', format: 'image/png', transparent: true, srs: 'EPSG:3857' }) //.addTo(map)
// geoserverRef23.setOpacity(1.0)
// var Reflectance23 = L.layerGroup([geoserverRef23])

var geoserverSal21 = L.tileLayer.wms("http://172.18.1.4:8080/geoserver/NDMA-costal-rasters/wms", { layers: 'Mosaic21-Salinity', format: 'image/png', transparent: true, srs: 'EPSG:3857' }) //.addTo(map)
geoserverSal21.setOpacity(1.0)
var SalinityIndex21 = L.layerGroup([geoserverSal21])

var geoserverSal21boundry = L.tileLayer.wms("http://172.18.1.4:8080/geoserver/NDMA-costal-rasters/wms", { layers: 'saline_tarces', format: 'image/png', transparent: true, srs: 'EPSG:3857' }) //.addTo(map)
geoserverSal21boundry.setOpacity(1.0)
var SalinityIndex21boundry = L.layerGroup([geoserverSal21boundry])

var geoserverSal20 = L.tileLayer.wms("http://172.18.1.4:8080/geoserver/NDMA-costal-rasters/wms", { layers: '2020', format: 'image/png', transparent: true, srs: 'EPSG:3857' }) //.addTo(map)
geoserverSal20.setOpacity(1.0)
var SalinityIndex20 = L.layerGroup([geoserverSal20])
var geoservergibslandcover = L.tileLayer.wms('https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi?', {
    layers: 'MODIS_Combined_L3_IGBP_Land_Cover_Type_Annual',
    format: 'image/png',
    transparent: true,
    srs: 'EPSG:3857'
})//.addTo(map);
// adding the NASA GIBS sea salinity global monthly
var geoservergibssalinityMonthly = L.tileLayer.wms('https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi?', {
    layers: 'SMAP_L3_Sea_Surface_Salinity_REMSS_Monthly',
    format: 'image/png',
    transparent: true,
    srs: 'EPSG:3857'
})//.addTo(map);
geoservergibssalinityMonthly.setOpacity(1.0)

// adding the NASA GIBS sea salinity global daily
var geoservergibssalinityDaily = L.tileLayer.wms('https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi?', {
    layers: 'SMAP_L3_Sea_Surface_Salinity_REMSS_8Day_RunningMean',
    format: 'image/png',
    transparent: true,
    srs: 'EPSG:3857'
})//.addTo(map);
geoservergibssalinityDaily .setOpacity(1.0)

// adding the NASA GIBS sea level rise anomalies global
var geoservergibssealevelriseanomalies = L.tileLayer.wms('https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi?', {
    layers: 'TOPEX-Poseidon_JASON_Sea_Surface_Height_Anomalies_GDR_Cycles',
    format: 'image/png',
    transparent: true,
    srs: 'EPSG:3857'
})//.addTo(map);
geoservergibssealevelriseanomalies .setOpacity(1.0)
// Adding projection of coastal flood layer of 100 years
var coastalfloodprojection100 = L.tileLayer.wms('https://www.geonode-gfdrrlab.org/geoserver/ows?', {
    layers: 'hazard:ss_muis_rp0100m', // Replace 'dataset-id' with the actual dataset ID or layer name
    format: 'image/png',
    transparent: true,
    srs: 'EPSG:3857'
})//.addTo(map);
coastalfloodprojection100 .setOpacity(1.0)

// adding the NASA GIBS sea surface temperature day global
var geoservergibsseasurfacetemprature = L.tileLayer.wms('https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi?', {
    layers: 'MODIS_Aqua_L3_SST_Thermal_4km_Day_Monthly',
    format: 'image/png',
    transparent: true,
    srs: 'EPSG:3857'
})//.addTo(map);
geoservergibsseasurfacetemprature .setOpacity(1.0)

// adding the NASA GIBS sea surface temperature night global
var geoservergibsseasurfacetempraturenight = L.tileLayer.wms('https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi?', {
    layers: 'MODIS_Aqua_L3_SST_Thermal_4km_Night_Monthly',
    format: 'image/png',
    transparent: true,
    srs: 'EPSG:3857'
})//.addTo(map);
geoservergibsseasurfacetempraturenight .setOpacity(1.0)

// adding the NASA GIBS sea surface temperature anomalies global
var geoservergibsseasurfacetempratureanomalies = L.tileLayer.wms('https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi?', {
    layers: 'GHRSST_L4_MUR_Sea_Surface_Temperature_Anomalies',
    format: 'image/png',
    transparent: true,
    srs: 'EPSG:3857'
})//.addTo(map);
geoservergibsseasurfacetempratureanomalies .setOpacity(1.0)
var landcover = L.layerGroup([geoservergibslandcover])
// creating the 3d osm buildings layer

// creating the Mangrove cover indus delta layer
var geoservermangroveindusdelta = L.tileLayer.wms('http://172.18.1.4:8080/geoserver/Mustafa_Coastal_Mangrooves/wms', {
    layers: 'Indus2020mmu',
    format: 'image/png',
    transparent: true,
    srs: 'EPSG:3857'
})//.addTo(map);
geoservermangroveindusdelta .setOpacity(1.0)

// creating the Mangrove cover Jiwani layer
var geoservermangroveJiwani = L.tileLayer.wms('http://172.18.1.4:8080/geoserver/Mustafa_Coastal_Mangrooves/wms', {
    layers: 'jiwani2020mmu',
    format: 'image/png',
    transparent: true,
    srs: 'EPSG:3857'
})//.addTo(map);
geoservermangroveJiwani .setOpacity(1.0)
 
// creating the Mangrove cover Kalmat Khor layer
var geoservermangroveKalmatKhor = L.tileLayer.wms('http://172.18.1.4:8080/geoserver/Mustafa_Coastal_Mangrooves/wms', {
    layers: 'Kalmat2020mmu',
    format: 'image/png',
    transparent: true,
    srs: 'EPSG:3857'
})//.addTo(map);
geoservermangroveKalmatKhor .setOpacity(1.0)

// creating the Mangrove cover Sonmiani Khor layer
var geoservermangroveSonmianiKhor = L.tileLayer.wms('http://172.18.1.4:8080/geoserver/Mustafa_Coastal_Mangrooves/wms', {
    layers: 'Sonmiani2020mmu',
    format: 'image/png',
    transparent: true,
    srs: 'EPSG:3857'
})//.addTo(map);
geoservermangroveSonmianiKhor .setOpacity(1.0)

// creating the Mangrove cover Sonmiani Khor layer
var geoservermangroveSandspit = L.tileLayer.wms('http://172.18.1.4:8080/geoserver/Mustafa_Coastal_Mangrooves/wms', {
    layers: 'Sandspit2020mmu',
    format: 'image/png',
    transparent: true,
    srs: 'EPSG:3857'
})//.addTo(map);
geoservermangroveSandspit .setOpacity(1.0)

// creating the Tsunami Exposure Model layer
var geoservertsunamiexposure = L.tileLayer.wms('https://datacore.unepgrid.ch/geoserver/ows?', {
    layers: 'ECO-DRR:ts_phex',
    format: 'image/png',
    transparent: true,
    srs: 'EPSG:3857',
})//.addTo(map);
geoservertsunamiexposure .setOpacity(1.0)

// creating a tsunami frequeny layer
var geoservertsunamifrequency = L.tileLayer.wms('https://datacore.unepgrid.ch/geoserver/ows?', {
    layers: 'ECO-DRR:ts_freqaf_P3',
    format: 'image/png',
    transparent: true,
    srs: 'EPSG:3857',
})//.addTo(map);
geoservertsunamifrequency  .setOpacity(1.0)

// creating a tsunami frequeny layer
var geoservertsunamiprojection100 = L.tileLayer.wms('https://www.geonode-gfdrrlab.org/geoserver/ows?', {
    layers: 'hazard:ts_mih_rp1000',
    format: 'image/png',
    transparent: true,
    srs: 'EPSG:3857',
})//.addTo(map);
geoservertsunamiprojection100  .setOpacity(1.0)

// creating a microplastic litter layer
var geoservermicroplasticlitter = L.tileLayer.wms('https://sextant.ifremer.fr/services/wms/emodnet_chemistry2?', {
    layers: 'mlf_density_nb_km2_other',
    format: 'image/png',
    transparent: true,
    srs: 'EPSG:3857',
})//.addTo(map);
geoservermicroplasticlitter .setOpacity(1.0)

// creating a Cyclone combination with mangrove cover layer
var geoserverCyclonemortalityrisk = L.tileLayer.wms('https://datacore.unepgrid.ch/geoserver/ows?', {
    layers: 'wesr_risk:cy_risk',
    format: 'image/png',
    transparent: true,
    srs: 'EPSG:3857',
})//.addTo(map);
geoservermicroplasticlitter .setOpacity(1.0)

// creating a Tropical Cyclone Wind 25 year Period Return layer
var geoservermicroplasticlitter = L.tileLayer.wms('https://sextant.ifremer.fr/services/wms/emodnet_chemistry2?', {
    layers: 'mlf_density_nb_km2_other',
    format: 'image/png',
    transparent: true,
    srs: 'EPSG:3857',
})//.addTo(map);
geoservermicroplasticlitter .setOpacity(1.0)

// creating a Tropical Cyclone  50 year Period Return layer
var geoserverTropicalCyclone50 = L.tileLayer.wms('https://datacore.unepgrid.ch/geoserver/ows?', {
    layers: 'wesr_risk:cy_hazard_50_yrp',
    format: 'image/png',
    transparent: true,
    srs: 'EPSG:3857',
})//.addTo(map);
geoserverTropicalCyclone50 .setOpacity(1.0)

// creating a Tropical Cyclone Population exposure per year layer
var geoservermicroplasticlitter = L.tileLayer.wms('https://sextant.ifremer.fr/services/wms/emodnet_chemistry2?', {
    layers: 'mlf_density_nb_km2_other',
    format: 'image/png',
    transparent: true,
    srs: 'EPSG:3857',
})//.addTo(map);
geoservermicroplasticlitter .setOpacity(1.0)

// creating a Tropical Cyclone Population exposure per year layer
var geoserverCyclonePopulationexposure = L.tileLayer.wms('https://datacore.unepgrid.ch/geoserver/ows?', {
    layers: 'wesr_risk:cy_physexp',
    format: 'image/png',
    transparent: true,
    srs: 'EPSG:3857',
})//.addTo(map);
geoserverCyclonePopulationexposure .setOpacity(1.0)

// onemeter layer add
var onemLayer = L.geoJSON(onem, {
    style: {
        fillColor: "#ff4000", // Hollow fill color
        color: "brown", // Red boundary color

        weight: 1, // Border width
    },
});
// twometer layer add
var twomLayer = L.geoJSON(twom, {
    style: {
        fillColor: "#bf00ff", // Hollow fill color
        color: "purple", // Red boundary color

        weight: 1, // Border width
    },
});
// fivemeter layer add
var fivemLayer = L.geoJSON(fivem, {
    style: {
        fillColor: "#ff8000", // Hollow fill color
        color: "orange", // Red boundary color

        weight: 1, // Border width
    },
});
// fivemeter layer add
var tenmLayer = L.geoJSON(tenm, {
    style: {
        fillColor: "#ff0080", // Hollow fill color
        color: "red", // Red boundary color

        weight: 1, // Border width
    },
});
var LeafIcon = L.Icon.extend({
    options: {
        iconSize:     [18, 35],
    }
});
// // Create an Icon for layer
// var litterIcon = new LeafIcon({iconUrl: 'marine-debris.svg'})
// // Create the GeoJSON layer with the custom icon
// var microplastic = L.geoJSON(coastallitter, {
//     pointToLayer: function (feature, latlng) {
//         return L.marker(latlng, {
//             icon: litterIcon
//         });
//     },
//     // Other options or styles if needed
// })//.addTo(map); // Assuming 'map' is your Leaflet map object

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

  // Return the styled circle marker
  return L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
    radius: size,
    fillColor: color,
    color: '#000',
    weight: 1,
    opacity: 1,
    fillOpacity: 0.4
  });
}

// Create the GeoJSON layer with the custom icon and apply styling to features
var microplastic = L.geoJSON(coastallitter, {
  pointToLayer: styleFeature,
  // Other options or styles if needed
});

//Creating a Vidieo Overlay option for the scenario based sea level rise of karachi 
var videoUrls = [
    'sea_level_rise_flood_inundation.mp4'
];
var errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';
var latLngBounds = L.latLngBounds([[24.731864, 66.931458], [24.906367, 67.228088]]);

var videoOverlay = L.videoOverlay(videoUrls, latLngBounds, {
    opacity: 0.8,
    errorOverlayUrl: errorOverlayUrl,
    interactive: true,
    autoplay: true,
    muted: true,
    playsInline: true
})//.addTo(map);



// creating the osm building layer
var osmb = new OSMBuildings(map,{ minZoom: 16,maxZoom: 22,tilt:13,attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).load('https://{s}.data.osmbuildings.org/0.2/anonymous/tile/{z}/{x}/{y}.json');

/* Add this JavaScript to create and add the custom control to the map */
var customControl = L.Control.extend({
    options: {
        position: 'topright'
    },

    onAdd: function(map) {
        var container = L.DomUtil.create('div', 'custom-control');
        var icon = L.DomUtil.create('i', 'fa fa-building');
        container.appendChild(icon);

        // Add tooltip to the control
        container.title = "2.5D OpenStreetMap Buildings";

        container.addEventListener('click', function () {
            if (!osmb) {
                osmb = new OSMBuildings(map).load('https://{s}.data.osmbuildings.org/0.2/anonymous/tile/{z}/{x}/{y}.json');
                map.setView([24.860966, 66.990501], 15); // Zoom to level 25 and move to Karachi
            } else {
                osmb.remove();
                osmb = null;
            }
        });

        return container;
    }
});

var myCustomControl = new customControl();
myCustomControl.addTo(map);
// adding the 3d tilt control 
// Enable Leaflet-3d for the map
// Enable Leaflet-THREE for the map
//L.LeafletTHREE({ tilt: true }).addTo(map);

/*
var build= L.easyButton('fa-home fa-lg', function(){
    osmb = new OSMBuildings(map).load('https://{s}.data.osmbuildings.org/0.2/anonymous/tile/{z}/{x}/{y}.json'); 
  },"Show 2.5D Buildings",)

  var toggle = L.easyButton ('fa-home fa-lg',{
    position: 'topright', // topleft, topright, bottomleft, bottomright
    function(){
        osmb = new OSMBuildings(map).load('https://{s}.data.osmbuildings.org/0.2/anonymous/tile/{z}/{x}/{y}.json');
    },
  }).addTo(map);
*/
//********************************************************

function ajax(url, callback) {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (req.readyState !== 4) {
      return;
    }
    if (!req.status || req.status < 200 || req.status > 299) {
      return;
    }

    callback(JSON.parse(req.responseText));
  };
  req.open('GET', url);
  req.send(null);
}

function formatJSON(json) {
  var html = '';
  for (var key in json) {
    html += '<em>'+ key +'</em> '+ json[key] +'<br>';
  }
  return html;
}

var popup;
osmb.click(function(e) {
  popup = L.popup({ maxHeight:200, autoPanPaddingTopLeft:[50,50] })
    .setLatLng(L.latLng(e.lat, e.lon))
    .setContent('<b>OSM ID '+ e.feature +'</b>')
    .openOn(map);
  map.flyTo([e.lat, e.lon], 18, {animate: true});

  var url = 'https://data.osmbuildings.org/0.2/uejws863/feature/'+ e.feature +'.json';
  ajax(url, function(json) {
    alert(json);
    var content = '<b>OSM ID '+ e.feature +'</b>';
    console.log(e.feature)
    for (var i = 0; i < json.features.length; i++) {
      content += '<br><em>OSM Part ID</em> '+ json.features[i].name;
      console.log('this is features[i]',json.features[i].name)
      content += '<br>'+ formatJSON(json.features[i].properties.tags);
      console.log('this is feature id',formatJSON(json.features[i].properties.tags))
    }
    popup.setContent(content).openOn(map);
  });
});
osmb.style({ wallColor: "rgb(255,0,0)", roofColor: 'rgb(255,128,0)',  "roofHeight": 72.3,height: 500,minHeight: 0,shadows: 'rgb(0,0,0)' });

// creating layer groups for the plastic waste layers
var plasticwaste = L.layerGroup([plastic_wastegeojsondata]);
var missmanaged = L.layerGroup([missmanagedgeojsondata]);
var missmanaged1 = L.layerGroup([missmanagedgeojsondata1]);
var propability = L.layerGroup([propabilitygeojsondata]);
//creating overlays
var overlayMaps = {
    "District": district,
    "Rivers": pakrivers,
    "OSM3D":osmb,
    // "Savi15": savi15raster,
    // "Savi23": savi23raster,
    // "Reflectance15": Reflectance15,
    // "Reflectance23": Reflectance23,
    "SalinityIndex21": SalinityIndex21,
    "SalinityIndex21Boundry": SalinityIndex21boundry,
    "SalinityIndex20": SalinityIndex20,
    "Global Salinity levels Monthly":geoservergibssalinityMonthly,
    "Global Salinity levels Daily":geoservergibssalinityDaily,
    "Global Sea Level Rise Anomalies":geoservergibssealevelriseanomalies,
    "Coastal FLood 100 years":coastalfloodprojection100,
    "Global Sea Surface Temperature Day":geoservergibsseasurfacetemprature,
    "Global Sea Surface Temperature Night":geoservergibsseasurfacetempraturenight,
    "Global Sea Surface Temperature Anomalies":geoservergibsseasurfacetempratureanomalies,
    "Landcover": landcover,
    "Mangrove cover Indus Delta": geoservermangroveindusdelta,
    "Mangrove Cover Jiwani":geoservermangroveJiwani,
    "Mangrove Cover Kalmat Khor":geoservermangroveKalmatKhor,
    "Mangrove Cover Sonmiani Khor":geoservermangroveSonmianiKhor,
    "Mangrove Cover Sandspit":geoservermangroveSandspit,
    "Tsunami Exposure Model":geoservertsunamiexposure ,
    "Tsunami Frequency ":geoservertsunamifrequency ,
    "Tsunami projection 100 year return ":geoservertsunamiprojection100,
    "Micro PLastic litter":geoservermicroplasticlitter,
    "Cyclone With Mangroove":geoserverCyclonemortalityrisk,
    "Cyclone with 50 year return period":geoserverTropicalCyclone50,
    "Cyclone Population Exposure":geoserverCyclonePopulationexposure,
    "Micro Plastic litter Concenteration":microplastic,
    "Video Overlay Of Sea Level Rise":videoOverlay
};
L.control.layers(baseMaps, overlayMaps, { position: 'topright', }).addTo(map);
// function to highlight features for the plastic waste layer
//adding the easy controll 
var helloPopup = L.popup().setContent('Hello World!');


function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    layer.bringToFront();
    infoplastic.update(layer.feature.properties);
}
// function to reset the highlight for the plastic waste layer 
function resetHighlight(e) {
    plastic_wastegeojsondata.resetStyle(e.target);
    infoplastic.update();
}
// function to highlight features for the missmanaged waste layer
function highlightFeaturemissmanaged(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    layer.bringToFront();
    infomissmanaged.update(layer.feature.properties);
}
// function to reset the highlight for the missmanaged waste layer 
function resetHighlightmissmanaged(e) {
    missmanagedgeojsondata.resetStyle(e.target);
    infomissmanaged.update();
}
// function to highlight features for the missmanaged_1 waste layer
function highlightFeaturemissmanaged1(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    layer.bringToFront();
    infomissmanaged1.update(layer.feature.properties);
}
// function to reset the highlight for the missmanaged waste layer 
function resetHighlightmissmanaged1(e) {
    missmanagedgeojsondata1.resetStyle(e.target);
    infomissmanaged1.update();
}
// function to highlight features for the propability waste layer
function highlightFeaturepropability(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    layer.bringToFront();
    infopropability.update(layer.feature.properties);
}
// function to reset the highlight for the propabilitywaste layer 
function resetHighlightpropability(e) {
    propabilitygeojsondata.resetStyle(e.target);
    infopropability.update();
}


//creating an info controller for the plastic wastes map
var infoplastic = L.control();

infoplastic.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'infoplastic'); // create a div with a class "info"----------------------
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed-----------------------------------------
infoplastic.update = function(props) {
    this._div.innerHTML = '<h4>Plastic Waste Generation </h4>' + (props ?
        '<b>' + props.NAME_ID + '</b><br />' + props.Plastic_Wa + ' tonnes' :
        'Hover over a region');
};
//creating an info controller for the missmanaged map
var infomissmanaged = L.control();

infomissmanaged.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'infomissmanaged'); // create a div with a class "info"----------------------
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed-----------------------------------------
infomissmanaged.update = function(props) {
    this._div.innerHTML = '<h4>Mismanaged</h4>' + (props ?
        '<b>' + props.NAME_ID + '</b><br />' + props.Mismanaged + ' Metric Tonnes/year' :
        'Hover over a region ');
};
//creating an info controller for the missmanaged map
var infomissmanaged1 = L.control();

infomissmanaged1.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'infomissmanaged1'); // create a div with a class "info"----------------------
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed-----------------------------------------
infomissmanaged1.update = function(props) {
    this._div.innerHTML = '<h4>Mismanaged PW Ocean</h4>' + (props ?
        '<b>' + props.NAME_ID + '</b><br />' + props.Mismanag_1 + ' Metric Tonnes/year' :
        'Hover over a region ');
};
//creating an info controller for the propability map
var infopropability = L.control();

infopropability.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'infopropability'); // create a div with a class "info"----------------------
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed-----------------------------------------
infopropability.update = function(props) {
    this._div.innerHTML = '<h4>Propability of Plastic (ocean)</h4>' + (props ?
        '<b>' + props.NAME_ID + '</b><br />' + props.Probabilit + ' propability' :
        'Hover over a region ');
};

// Create a legend control for landcover
var legendLandcover = L.control({ position: 'bottomright' });

legendLandcover.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'infolandcover legendlandcover');

    // Add label for land cover
    div.innerHTML += '<h4>Land Cover Legend</h4>';

    // Add image from the specified URL
    div.innerHTML += '<img src="https://gibs.earthdata.nasa.gov/legends/MODIS_IGBP_Land_Cover_Type_H.png?" alt="Land Cover Legend">';

    return div;
};

// Add the legend control to the map
//legendLandcover.addTo(map);


// adding a legend for the plastic waste layer---------------------------------------------------------------------
var legendplastic = L.control({ position: 'bottomright' });

legendplastic.onAdd = function(map) {

    var div = L.DomUtil.create('div', 'infoplastic legendplastic'),
        grades = [0, 267234, 1022683, 2031675, 3919268, 7993489, 14476561, 59079741],
        labels = [];
    // Add label for plastic waste
    div.innerHTML += '<h4>Plastic Waste Generation (tonnes)</h4>';
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColorplasticwaste(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

//Legend for thematic color scheme
var legendmicroplastic = L.control({ position: 'topright' });

legendmicroplastic.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'MarineMicroPlasticConcentration'), // Using a class for styling
        legendText = 'Legend For Marine Plastic Emission';

    // Add label for GIBS Salinity Monthly layer legend
    div.innerHTML += '<h4>' + legendText + '</h4>';

    // Include any legend details specific to GIBS Salinity Monthly layer
    // You may use image tag for PNG or other suitable method
    div.innerHTML += '<img src="Marinelitteremissions.png" alt="Legend for Mangrove Cover">';

    return div;
};
//legendplastic.addTo(map);
//infoplastic.addTo(map);
// adding a legend for the missmanaged  layer
var legendmissmanaged = L.control({ position: 'bottomright' });

legendmissmanaged.onAdd = function(map) {

    var div = L.DomUtil.create('div', 'infomissmanaged legendmissmanaged'),
        grades = [0, 73139, 247495, 520002, 1021990, 1948950, 4942514, 12994100],
        labels = [];
    // Add label for plastic waste
    div.innerHTML += '<h4>Missmanaged PW (Metric/tonns)</h4>';
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColormissmanaged(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};
// creating legend for missmanaged_1
var legendmissmanaged1 = L.control({ position: 'bottomright' });

legendmissmanaged1.onAdd = function(map) {

    var div = L.DomUtil.create('div', 'infomissmanaged1 legendmissmanaged1'),
        grades = [0, 1465, 5237, 14329, 37799, 73098, 126513, 356371],
        labels = [];
    // Add label for plastic waste
    div.innerHTML += '<h4>Missmanaged PW (ocean)</h4>';
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColormissmanaged1(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};
// creating legend for propability layer
var legendpropability = L.control({ position: 'bottomright' });

legendpropability.onAdd = function(map) {

    var div = L.DomUtil.create('div', 'infopropability legendpropability'),
        grades = [0, 0.22, 0.63, 1.27, 2.71, 5.05, 7.92, 13.74],
        labels = [];
    // Add label for plastic waste
    div.innerHTML += '<h4>Probability Of Plastic (ocean)</h4>';
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColorpropability(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};
// // creating legend for Savi Raster 
// var savi15rasterLegend = L.control({ position: 'bottomright' });

// savi15rasterLegend.onAdd = function(map) {
//     var div = L.DomUtil.create('div', 'savi15raster'), // Using legendplastic class for styling
//         colorMapEntries = [
//             { color: "#30123b", label: "-0.4556" },
//             { color: "#4686fb", label: "-0.2414" },
//             { color: "#1be5b5", label: "-0.0271" },
//             { color: "#a4fc3c", label: "0.1872" },
//             { color: "#fbb938", label: "0.4015" },
//             { color: "#e3440a", label: "0.6158" },
//             { color: "#7a0403", label: "0.8301" }
//         ];

//     // Add label for SAVI raster image legend
//     div.innerHTML += '<h4>SAVI Raster Image 2015</h4>';

//     // Loop through color map entries and generate a label with a colored square for each entry
//     for (var i = 0; i < colorMapEntries.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + colorMapEntries[i].color + '"></i> ' +
//             colorMapEntries[i].label + (colorMapEntries[i + 1] ? '&ndash;' + colorMapEntries[i + 1].label + '<br>' : '+');
//     }

//     return div;
// };
// // creating a legend for savi23 raster
// var savi23rasterLegend = L.control({ position: 'bottomright' });
// savi23rasterLegend.onAdd = function(map) {
//     var div = L.DomUtil.create('div', 'savi23raster'), // Using legendplastic class for styling
//     colorMapEntries = [
//         { color: "#30123b", label: "-0.33" },
//         { color: "#4686fb", label: "-0.14" },
//         { color: "#1be5b5", label: "0.05" },
//         { color: "#a4fc3c", label: "0.24" },
//         { color: "#fbb938", label: "0.42" },
//         { color: "#e3440a", label: "0.61" },
//         { color: "#7a0403", label: "0.80" }
//     ];

//     // Add label for SAVI raster image legend
//     div.innerHTML += '<h4>SAVI Raster Image 2023</h4>';

//     // Loop through color map entries and generate a label with a colored square for each entry
//     for (var i = 0; i < colorMapEntries.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + colorMapEntries[i].color + '"></i> ' +
//             colorMapEntries[i].label + (colorMapEntries[i + 1] ? '&ndash;' + colorMapEntries[i + 1].label + '<br>' : '+');
//     }

//     return div;
// };

// creating a legend for reflectance15 raster
// var reflectance15rasterLegend = L.control({ position: 'bottomright' });
// reflectance15rasterLegend.onAdd = function(map) {
//     var div = L.DomUtil.create('div', 'reflectance15raster'), // Using legendplastic class for styling
//     colorMapEntries = [
//         { color: "#30123b", label: "1" },
//         { color: "#4686fb", label: "2" },
//         { color: "#1be5b5", label: "3" },
//         { color: "#a4fc3c", label: "4" },
//         { color: "#fbb938", label: "4" },
//         { color: "#e3440a", label: "5" },
//         { color: "#7a0403", label: "6" }
//     ];

//     // Add label for SAVI raster image legend
//     div.innerHTML += '<h4>Reflectance Raster 2015</h4>';

//     // Loop through color map entries and generate a label with a colored square for each entry
//     for (var i = 0; i < colorMapEntries.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + colorMapEntries[i].color + '"></i> ' +
//             colorMapEntries[i].label + (colorMapEntries[i + 1] ? '&ndash;' + colorMapEntries[i + 1].label + '<br>' : '+');
//     }

//     return div;
// };

// // creating a legend for reflectance23 raster
// var reflectance23rasterLegend = L.control({ position: 'bottomright' });
// reflectance23rasterLegend.onAdd = function(map) {
//     var div = L.DomUtil.create('div', 'reflectance23raster'), // Using legendplastic class for styling
//     colorMapEntries = [
//         { color: "#30123b", label: "1" },
//         { color: "#4686fb", label: "2" },
//         { color: "#1be5b5", label: "3" },
//         { color: "#a4fc3c", label: "4" },
//         { color: "#fbb938", label: "4" },
//         { color: "#e3440a", label: "5" },
//         { color: "#7a0403", label: "6" }
//     ];

//     // Add label for SAVI raster image legend
//     div.innerHTML += '<h4>Reflectance Raster 2023</h4>';

//     // Loop through color map entries and generate a label with a colored square for each entry
//     for (var i = 0; i < colorMapEntries.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + colorMapEntries[i].color + '"></i> ' +
//             colorMapEntries[i].label + (colorMapEntries[i + 1] ? '&ndash;' + colorMapEntries[i + 1].label + '<br>' : '+');
//     }

//     return div;
// };

var SalinityIndex21rasterLegend = L.control({ position: 'bottomright' });
SalinityIndex21rasterLegend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'SalinityIndex21rasterraster'), // Using legendplastic class for styling
    colorMapEntries = [
        { color: "#30123b", label: "-0.40" },
        { color: "#4686fb", label: "-0.27" },
        { color: "#1be5b5", label: "-0.15" },
        { color: "#a4fc3c", label: "-0.02" },
        { color: "#fbb938", label: "0.11" },
        { color: "#e3440a", label: "0.24" },
        { color: "#7a0403", label: "0.37" }
    ];

    // Add label for SAVI raster image legend
    div.innerHTML += '<h4>Salinity Index 2021 </h4>';

    // Loop through color map entries and generate a label with a colored square for each entry
    for (var i = 0; i < colorMapEntries.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colorMapEntries[i].color + '"></i> ' +
            colorMapEntries[i].label + (colorMapEntries[i + 1] ? '&ndash;' + colorMapEntries[i + 1].label + '<br>' : '+');
    }

    return div;
}; 

var SalinityIndex20rasterLegend = L.control({ position: 'bottomright' });
SalinityIndex20rasterLegend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'SalinityIndex20rasterraster'), // Using legendplastic class for styling
    colorMapEntries = [
        { color: "#30123b", label: "-0.71" },
        { color: "#4686fb", label: "-0.48" },
        { color: "#1be5b5", label: "-0.26" },
        { color: "#a4fc3c", label: "-0.03" },
        { color: "#fbb938", label: "0.20" },
        { color: "#e3440a", label: "0.43" },
        { color: "#7a0403", label: "0.65" }
    ];

    // Add label for SAVI raster image legend
    div.innerHTML += '<h4>Salinity Index 2020 </h4>';

    // Loop through color map entries and generate a label with a colored square for each entry
    for (var i = 0; i < colorMapEntries.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colorMapEntries[i].color + '"></i> ' +
            colorMapEntries[i].label + (colorMapEntries[i + 1] ? '&ndash;' + colorMapEntries[i + 1].label + '<br>' : '+');
    }

    return div;
}; 
// gibs sea surface salinity legend
var gibssalinityMonthlyLegend = L.control({ position: 'topright' });

gibssalinityMonthlyLegend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'gibssalinityMonthly'), // Using a class for styling
        legendText = 'Legend for GIBS Salinity Monthly';

    // Add label for GIBS Salinity Monthly layer legend
    div.innerHTML += '<h4>' + legendText + '</h4>';

    // Include any legend details specific to GIBS Salinity Monthly layer
    // You may use image tag for PNG or other suitable method
    div.innerHTML += '<img src="Sea_Surface_Salinity_global_legend.png" alt="Legend for GIBS Salinity Monthly">';

    return div;
};

// Mangrove cover legend
var MangrovecoverLegend = L.control({ position: 'topright' });

MangrovecoverLegend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'Mangrovecoverindus'), // Using a class for styling
        legendText = 'Legend for Mangrove Cover';

    // Add label for GIBS Salinity Monthly layer legend
    div.innerHTML += '<h4>' + legendText + '</h4>';

    // Include any legend details specific to GIBS Salinity Monthly layer
    // You may use image tag for PNG or other suitable method
    div.innerHTML += '<img src="Mangrove_cover_legend.png" alt="Legend for Mangrove Cover">';

    return div;
};
// sea level rise anomalies legend
var gibssealevelriseanomaliesLegend = L.control({ position: 'topright' });

gibssealevelriseanomaliesLegend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'globalsealevelriseanomaly'), // Using a class for styling
        legendText = 'Legend for GIBS Sea Level Rise Anomalies';

    // Add label for GIBS Salinity Monthly layer legend
    div.innerHTML += '<h4>' + legendText + '</h4>';

    // Include any legend details specific to GIBS Salinity Monthly layer
    // You may use image tag for PNG or other suitable method
    div.innerHTML += '<img src="sea_level_rise_anomalies_gibs.png" alt="Legend for GIBS Salinity Monthly">';

    return div;
};

var sealevelrisecmessLegend = L.control({ position: 'topright' });

sealevelrisecmessLegend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'coastalfloodprojection100'), // Using a class for styling
        legendText = 'Coastal Flood Projection 50 years';

    // Add label for GIBS Salinity Monthly layer legend
    div.innerHTML += '<h4>' + legendText + '</h4>';

    // Include any legend details specific to GIBS Salinity Monthly layer
    // You may use image tag for PNG or other suitable method
    div.innerHTML += '<img src="https://www.geonode-gfdrrlab.org/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=hazard%3Ass_muis_rp0100m&style=MUIS_SS" alt="Legend for GIBS Salinity Monthly">';

    return div;
};


var cyclonemortalityriskLegend = L.control({ position: 'topright' });

cyclonemortalityriskLegend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'TropicalCyclonesMortalityRisk'), // Using a class for styling
        legendText = 'Tropical Cyclones Mortality Risk Legend';

    // Add label for GIBS Salinity Monthly layer legend
    div.innerHTML += '<h4>' + legendText + '</h4>';

    // Include any legend details specific to GIBS Salinity Monthly layer
    // You may use image tag for PNG or other suitable method
    div.innerHTML += '<img src="https://datacore.unepgrid.ch/geoserver/ows?service=WMS&version=1.3.0&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=wesr_risk%3Acy_risk" alt="Legend for GIBS Salinity Monthly">';

    return div;
};

var cyclone50yearrepreatLegend = L.control({ position: 'topright' });

cyclone50yearrepreatLegend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'TropicalCyclone50yearPeriodReturn'), // Using a class for styling
        legendText = 'Tropical Cyclone 50 year Period Return';

    // Add label for GIBS Salinity Monthly layer legend
    div.innerHTML += '<h4>' + legendText + '</h4>';

    // Include any legend details specific to GIBS Salinity Monthly layer
    // You may use image tag for PNG or other suitable method
    div.innerHTML += '<img src="https://datacore.unepgrid.ch/geoserver/ows?service=WMS&version=1.3.0&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=wesr_risk%3Acy_hazard_50_yrp" alt="Legend for GIBS Salinity Monthly">';

    return div;
};

var CyclonesPopulationExposureLegend = L.control({ position: 'topright' });

CyclonesPopulationExposureLegend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'TropicalCyclonePopulationexposureperyear'), // Using a class for styling
        legendText = 'Tropical Cyclone Population Exposureper Year';

    // Add label for GIBS Salinity Monthly layer legend
    div.innerHTML += '<h4>' + legendText + '</h4>';

    // Include any legend details specific to GIBS Salinity Monthly layer
    // You may use image tag for PNG or other suitable method
    div.innerHTML += '<img src="https://datacore.unepgrid.ch/geoserver/ows?service=WMS&version=1.3.0&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=wesr_risk%3Acy_physexp" alt="Legend for GIBS Salinity Monthly">';

    return div;
};

var PlasticwastedensityLegend = L.control({ position: 'topright' });

PlasticwastedensityLegend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'PlasticLitterDensity'), // Using a class for styling
        legendText = 'Plastic Waste Litter Density Legend';

    // Add label for GIBS Salinity Monthly layer legend
    div.innerHTML += '<h4>' + legendText + '</h4>';

    // Include any legend details specific to GIBS Salinity Monthly layer
    // You may use image tag for PNG or other suitable method
    div.innerHTML += '<img src="microlitter.png" alt="Legend for GIBS Salinity Monthly">';

    return div;
};
var TsunamiExposureLegend = L.control({ position: 'topright' });

TsunamiExposureLegend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'TsunamiExposurepoppersqkm'), // Using a class for styling
        legendText = 'Legend for Tsunami Exposure';

    // Add label for GIBS Salinity Monthly layer legend
    div.innerHTML += '<h4>' + legendText + '</h4>';

    // Include any legend details specific to GIBS Salinity Monthly layer
    // You may use image tag for PNG or other suitable method
    div.innerHTML += '<img src="TsunamiExposurelegend.png" alt="Legend for GIBS Salinity Monthly">';

    return div;
};

var TsunamiFrequencyLegend = L.control({ position: 'topright' });

TsunamiFrequencyLegend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'TsunamiFrequency'), // Using a class for styling
        legendText = 'Legend for Tsunami Frequency';

    // Add label for GIBS Salinity Monthly layer legend
    div.innerHTML += '<h4>' + legendText + '</h4>';

    // Include any legend details specific to GIBS Salinity Monthly layer
    // You may use image tag for PNG or other suitable method
    div.innerHTML += '<img src="TsunamihazardfrequencyLegend.png" alt="Legend for Tsunami Frequency">';

    return div;
};

var TsunamiProjectionLegend = L.control({ position: 'topright' });

TsunamiProjectionLegend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'Tsunamihazardprojection'), // Using a class for styling
        legendText = 'Legend for Tsunami Projection 100 year return period';

    // Add label for GIBS Salinity Monthly layer legend
    div.innerHTML += '<h4>' + legendText + '</h4>';

    // Include any legend details specific to GIBS Salinity Monthly layer
    // You may use image tag for PNG or other suitable method
    div.innerHTML += '<img src="https://www.geonode-gfdrrlab.org/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=hazard%3Ats_mih_rp1000&style=ts_mih_rp2500_24af3240" alt="Legend for Tsunami Projection 100 year return period">';

    return div;
};

var seasurfacetemperaturedayLegend = L.control({ position: 'topright' });

seasurfacetemperaturedayLegend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'SeaSurfaceTemperaturemonthlyday'), // Using a class for styling
        legendText = 'Legend for GIBS Sea Surface Temperature';

    // Add label for GIBS Salinity Monthly layer legend
    div.innerHTML += '<h4>' + legendText + '</h4>';

    // Include any legend details specific to GIBS Salinity Monthly layer
    // You may use image tag for PNG or other suitable method
    div.innerHTML += '<img src="Sea_surface_temperature_monthly_day.png" alt="Legend for GIBS Salinity Monthly">';

    return div;
};

var seasurfacetemperatureanomaliesLegend = L.control({ position: 'topright' });

seasurfacetemperatureanomaliesLegend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'Seasurfacetemperatureanomalies'), // Using a class for styling
        legendText = 'Legend for GIBS Sea Surface Temperature';

    // Add label for GIBS Salinity Monthly layer legend
    div.innerHTML += '<h4>' + legendText + '</h4>';

    // Include any legend details specific to GIBS Salinity Monthly layer
    // You may use image tag for PNG or other suitable method
    div.innerHTML += '<img src="Sea_Surface_Temp_anomalies.png" alt="Legend for GIBS Salinity Monthly">';

    return div;
};
//savi15rasterLegend.addTo(map); // Add the legend to the map
/*
map.on('overlayadd', function (eventLayer) {
    // Check if the added layer is the plastic waste layer
    if (eventLayer.name === 'Plastic Waste(PW) Generation') {
        // Add the plastic waste layer group and info control to the map
        plasticwaste.addTo(map);
        infoplastic.addTo(map);
        legendplastic.addTo(map);
    }
})
map.on('overlayremove', function (eventLayer) {
    // Check if the removed layer is the plastic waste layer
    if (eventLayer.name === 'Plastic Waste(PW) Generation') {
        // Remove the plastic waste layer group and info control from the map
        map.removeLayer(plasticwaste);
        map.removeControl(infoplastic);
        map.removeControl(legendplastic);
    }
});

map.on('overlayadd', function (eventLayer) {
    // Check if the added layer is the plastic waste layer
    if (eventLayer.name === 'Missmanaged PW') {
        // Add the plastic waste layer group and info control to the map
        map.removeLayer(plasticwaste);
        map.removeControl(infoplastic);
        map.removeControl(legendplastic);
        missmanaged.addTo(map);
        infomissmanaged.addTo(map);
        legendmissmanaged.addTo(map);
       
    }
})
map.on('overlayremove', function (eventLayer) {
    // Check if the removed layer is the plastic waste layer
    if (eventLayer.name === 'Missmanaged PW') {
        // Remove the plastic waste layer group and info control from the map
        map.removeLayer(missmanaged);
        map.removeControl(infomissmanaged);
        map.removeControl(legendmissmanaged);
    }
});

map.on('overlayadd', function (eventLayer) {
    // Check if the added layer is the plastic waste layer
    if (eventLayer.name === 'Missmanaged PW (ocean)') {
        // Add the plastic waste layer group and info control to the map
        map.removeLayer(plasticwaste);
        map.removeControl(infoplastic);
        map.removeControl(legendplastic);
        map.removeLayer(missmanaged);
        map.removeControl(infomissmanaged);
        map.removeControl(legendmissmanaged);
        missmanaged1.addTo(map);
        infomissmanaged1.addTo(map);
        legendmissmanaged1.addTo(map);
       
    }
})
map.on('overlayremove', function (eventLayer) {
    // Check if the removed layer is the plastic waste layer
    if (eventLayer.name === 'Missmanaged PW (ocean)') {
        // Remove the plastic waste layer group and info control from the map
        map.removeLayer(missmanaged1);
        map.removeControl(infomissmanaged1);
        map.removeControl(legendmissmanaged1);
    }
});
map.on('overlayadd', function (eventLayer) {
    // Check if the added layer is the plastic waste layer
    if (eventLayer.name === 'Propability OF Plastic (ocean)') {
        // Add the plastic waste layer group and info control to the map
        map.removeLayer(plasticwaste);
        map.removeControl(infoplastic);
        map.removeControl(legendplastic);
        map.removeLayer(missmanaged);
        map.removeControl(infomissmanaged);
        map.removeControl(legendmissmanaged);
        map.removeLayer(missmanaged1);
        map.removeControl(infomissmanaged1);
        map.removeControl(legendmissmanaged1);
        propability.addTo(map);
        infopropability.addTo(map);
        legendpropability.addTo(map);
       
    }
})
map.on('overlayremove', function (eventLayer) {
    // Check if the removed layer is the plastic waste layer
    if (eventLayer.name === 'Propability OF Plastic (ocean)') {
        // Remove the plastic waste layer group and info control from the map
        map.removeLayer(propability);
        map.removeControl(infopropability);
        map.removeControl(legendpropability);
    }
});
*/
//----------------------------------------toggel other nav buttons----------------------------------------//
// Add a click event listener to the EEZ Marine Surveillance 
document.addEventListener('DOMContentLoaded', function () {
    // Get the map container
    var mapContainer = document.getElementById('map');

    // Get the main container
    var mainContainer = document.getElementById('main-container');

    // Get the EEZ Marine Surveillance list item
    var eezListItem = document.querySelector('li a[href="#EEZ"]');

    // Add click event listener to the EEZ Marine Surveillance list item
    eezListItem.addEventListener('click', function () {
        // Hide the map container
        var iframeEezMarineSurveillance = document.createElement('iframe');
        // Set the source URL for the iframe
        iframeEezMarineSurveillance.src = "https://globalfishingwatch.org/map/index?latitude=22.067957416742075&longitude=63.65159782519663&zoom=5.602048799804306&start=2023-11-09T00%3A00%3A00.000Z&end=2024-02-09T00%3A00%3A00.000Z&dvIn[0][id]=rfmo-1707988537257&dvIn[0][dvId]=tuna-rfmo-areas&dvIn[0][cfg][clr]=%238E24A9&dvIn[1][id]=~0&dvIn[1][cfg][vis]=false&dvIn[2][id]=oxygen-1707988387199&dvIn[2][dvId]=~1&dvIn[2][cfg][clr]=%2300EEFF&dvIn[2][cfg][colorRamp]=sky&dvIn[2][cfg][breaks][0]=198.942&dvIn[2][cfg][breaks][1]=200.582&dvIn[2][cfg][breaks][2]=201.764&dvIn[2][cfg][breaks][3]=203.313&dvIn[2][cfg][breaks][4]=204.673&dvIn[2][cfg][breaks][5]=205.797&dvIn[2][cfg][breaks][6]=206.639&dvIn[2][cfg][breaks][7]=207.473&dvIn[2][cfg][breaks][8]=209.044&dvIn[2][cfg][breaks][9]=209.054&dvIn[2][cfg][vis]=true&dvIn[2][dsC][0][pms][0][id]=type&dvIn[2][dsC][0][pms][0][val]=~2&dvIn[2][dsC][0][ept]=~3&dvIn[2][dsC][0][dsId]=public-global-oxygen%3Av20231213&dvIn[3][id]=ph-1707988372551&dvIn[3][dvId]=~1&dvIn[3][cfg][clr]=%239CA4FF&dvIn[3][cfg][colorRamp]=lilac&dvIn[3][cfg][intervals][0]=MONTH&dvIn[3][cfg][vis]=true&dvIn[3][cfg][breaks][0]=7.94&dvIn[3][cfg][breaks][1]=7.963&dvIn[3][cfg][breaks][2]=7.98&dvIn[3][cfg][breaks][3]=7.99&dvIn[3][cfg][breaks][4]=8&dvIn[3][cfg][breaks][5]=8.01&dvIn[3][cfg][breaks][6]=8.023&dvIn[3][cfg][breaks][7]=8.037&dvIn[3][cfg][breaks][8]=8.05&dvIn[3][cfg][breaks][9]=8.06&dvIn[3][dsC][0][pms][0][id]=type&dvIn[3][dsC][0][pms][0][val]=~2&dvIn[3][dsC][0][ept]=~3&dvIn[3][dsC][0][dsId]=public-global-ph%3Av20231213&dvIn[4][id]=phosphate-1707987943337&dvIn[4][dvId]=~1&dvIn[4][cfg][clr]=%23FFAA0D&dvIn[4][cfg][colorRamp]=orange&dvIn[4][cfg][vis]=true&dvIn[4][cfg][breaks][0]=0.171&dvIn[4][cfg][breaks][1]=0.22&dvIn[4][cfg][breaks][2]=0.258&dvIn[4][cfg][breaks][3]=0.297&dvIn[4][cfg][breaks][4]=0.327&dvIn[4][cfg][breaks][5]=0.351&dvIn[4][cfg][breaks][6]=0.375&dvIn[4][cfg][breaks][7]=0.402&dvIn[4][cfg][breaks][8]=0.435&dvIn[4][cfg][breaks][9]=0.445&dvIn[4][dsC][0][pms][0][id]=type&dvIn[4][dsC][0][pms][0][val]=~2&dvIn[4][dsC][0][ept]=~3&dvIn[4][dsC][0][dsId]=public-global-phosphate%3Av20231213&dvIn[5][id]=mangroves-1707987936195&dvIn[5][dvId]=gfw-environmental-layer&dvIn[5][cfg][clr]=%23A6FF59&dvIn[5][cfg][vis]=true&dvIn[5][dsC][0][ept]=context-tiles&dvIn[5][dsC][0][dsId]=public-mangroves&dvIn[6][id]=nitrate-1707987931553&dvIn[6][dvId]=~1&dvIn[6][cfg][clr]=%23FF6854&dvIn[6][cfg][colorRamp]=red&dvIn[6][cfg][vis]=true&dvIn[6][cfg][breaks][0]=0.01&dvIn[6][cfg][breaks][1]=0.051&dvIn[6][cfg][breaks][2]=0.108&dvIn[6][cfg][breaks][3]=0.167&dvIn[6][cfg][breaks][4]=0.223&dvIn[6][cfg][breaks][5]=0.283&dvIn[6][cfg][breaks][6]=0.365&dvIn[6][cfg][breaks][7]=0.458&dvIn[6][cfg][breaks][8]=0.543&dvIn[6][cfg][breaks][9]=0.553&dvIn[6][dsC][0][pms][0][id]=type&dvIn[6][dsC][0][pms][0][val]=~2&dvIn[6][dsC][0][ept]=~3&dvIn[6][dsC][0][dsId]=public-global-nitrate%3Av20231213&dvIn[7][id]=vessel-ba069b7b9-9148-2ea6-49c9-2b46893ef3a3&dvIn[7][dvId]=fishing-map-vessel-track&dvIn[7][cfg][track]=public-global-all-tracks%3Av20231026&dvIn[7][cfg][info]=public-global-vessel-identity%3Av20231026&dvIn[7][cfg][events][0]=public-global-fishing-events%3Av20231026&dvIn[7][cfg][events][1]=public-global-port-visits-c2-events%3Av20231026&dvIn[7][cfg][events][2]=public-global-encounters-events%3Av20231026&dvIn[7][cfg][events][3]=public-global-loitering-events%3Av20231026&dvIn[7][cfg][events][4]=public-global-gaps-events%3Av20231026&dvIn[7][cfg][clr]=%23F95E5E&dvIn[8][id]=~4&dvIn[8][cfg][vis]=true&dvIn[9][id]=~5&dvIn[9][cfg][vis]=false&dvIn[9][cfg][clr]=%23AD1457&dvIn[9][cfg][colorRamp]=jazzberry-jam&dvIn[10][id]=sar&dvIn[10][cfg][vis]=false&dvIn[11][id]=viirs&dvIn[11][cfg][vis]=false&dvIn[12][id]=~6&dvIn[12][cfg][vis]=true&dvIn[12][cfg][filters][flag][0]=PAK&dvIn[12][cfg][filters][vessel_type][0]=fishing&dvIn[13][id]=~7&dvIn[13][cfg][vis]=true&dvIn[14][id]=~8&dvIn[14][cfg][vis]=true&dvIn[15][id]=~9&dvIn[15][cfg][vis]=false&dvIn[16][id]=~10&dvIn[16][cfg][vis]=true&dvIn[16][cfg][breaks][0]=1&dvIn[16][cfg][breaks][1]=526.02&dvIn[16][cfg][breaks][2]=1308.85&dvIn[16][cfg][breaks][3]=1859.58&dvIn[16][cfg][breaks][4]=2382.49&dvIn[16][cfg][breaks][5]=2864.74&dvIn[16][cfg][breaks][6]=3211.38&dvIn[16][cfg][breaks][7]=3453.01&dvIn[16][cfg][breaks][8]=3691.81&dvIn[16][cfg][breaks][9]=3691.82&dvIn[17][id]=vms&dvIn[17][deleted]=true&timebarVisualisation=vessel&dvInOr[0]=basemap&dvInOr[1]=~8&dvInOr[2]=vms&dvInOr[3]=~6&dvInOr[4]=viirs&dvInOr[5]=sar&dvInOr[6]=~9&dvInOr[7]=~0&dvInOr[8]=~10&dvInOr[9]=~5&dvInOr[10]=~7&dvInOr[11]=context-layer-mpa&dvInOr[12]=context-layer-protectedseas&dvInOr[13]=context-layer-rfmo&dvInOr[14]=context-layer-high-seas&dvInOr[15]=fixed-sar-infrastructure&dvInOr[16]=~4&sO=advanced&lTD=&fTD=&timebarSelectedEnvId=~10&tk[0]=context-layer-graticules&tk[1]=heatmap-environmental-layer&tk[2]=heatmap&tk[3]=4wings-tiles&tk[4]=basemap-labels&tk[5]=context-layer-fao-areas&tk[6]=presence&tk[7]=context-layer-eez&tk[8]=fishing-ais&tk[9]=encounter-events&tk[10]=bathymetry-workspace";
        iframeEezMarineSurveillance.style.display = 'block';
        iframeEezMarineSurveillance.style.width = '100%'; // Adjust width as needed
        iframeEezMarineSurveillance.style.height = 'calc(100vh - 60px)'; // Adjust height to leave space for the navbar
        mainContainer.appendChild(iframeEezMarineSurveillance);

    });
});

// Add a click event listener to the Mangrove Watch 
document.addEventListener('DOMContentLoaded', function () {
    // Get the map container
    var mapContainer = document.getElementById('map');

    // Get the main container
    var mainContainer = document.getElementById('main-container');

    // Get the EEZ Marine Surveillance list item
    var Mangrovewatch = document.querySelector('li a[href="#MW"]');

    // Add click event listener to the EEZ Marine Surveillance list item
    Mangrovewatch.addEventListener('click', function () {
        event.preventDefault();
        event.stopPropagation();
        // Hide the map container
        var iframeMangroveWatch = document.createElement('iframe');
        // Set the source URL for the iframe
        iframeMangroveWatch.src = "https://www.globalmangrovewatch.org/country/PAK?bounds=[[55.458311544522985,22.010396573549514],[70.73443829913438,28.55903485079685]]&active=[%22mangrove_net_change%22,%22mangrove_habitat_extent%22]";
        iframeMangroveWatch.style.display = 'block';
        iframeMangroveWatch.style.width = '100%'; // Adjust width as needed
        iframeMangroveWatch.style.height = 'calc(100vh - 60px)'; // Adjust height to leave space for the navbar
        mainContainer.appendChild(iframeMangroveWatch);

    });
});
//Add a click event listener to the Plastic Waste Detection button
document.addEventListener('DOMContentLoaded', function () {
    // Get the main container
    var mainContainer = document.getElementById('main-container');

    // Get the Plastic Waste & Detection dropdown link
    var plasticWasteDropdown = document.querySelector('a[href="#PlasticWaste&Detection"]');

    // Add click event listener to the Plastic Waste & Detection dropdown link
    plasticWasteDropdown.addEventListener('click', function () {
        // Remove the main container from the page
        mainContainer.innerHTML = '';
    });
});

//Add a click event listener to the Sea Water Rise button
document.addEventListener('DOMContentLoaded', function () {
    // Get the main container
    var mainContainer = document.getElementById('main-container');

    // Get the Sea Water Rise dropdown link
    var plasticWasteDropdown = document.querySelector('a[href="#SeaWaterRise"]');

    // Add click event listener to the Sea Water Rise dropdown link
    plasticWasteDropdown.addEventListener('click', function () {
        // Remove the main container from the page
        mainContainer.innerHTML = '';
    });
});
//Add a click event listener to the Sea Water Intrusion button
document.addEventListener('DOMContentLoaded', function () {
    // Get the main container
    var mainContainer = document.getElementById('main-container');

    // Get the Sea Water Intrusion dropdown link
    var plasticWasteDropdown = document.querySelector('a[href="#SeaWaterIntrusion"]');

    // Add click event listener to the Sea Water Intrusion dropdown link
    plasticWasteDropdown.addEventListener('click', function () {
        // Remove the main container from the page
        mainContainer.innerHTML = '';
    });
});
//Add a click event listener to the Tsunami button
document.addEventListener('DOMContentLoaded', function () {
    // Get the main container
    var mainContainer = document.getElementById('main-container');

    // Get the Tsunami dropdown link
    var plasticWasteDropdown = document.querySelector('a[href="#Tsunami"]');

    // Add click event listener to the Tsunami dropdown link
    plasticWasteDropdown.addEventListener('click', function () {
        // Remove the main container from the page
        mainContainer.innerHTML = '';
    });
});

//Add a click event listener to the Mangroves button
document.addEventListener('DOMContentLoaded', function () {
    // Get the main container
    var mainContainer = document.getElementById('main-container');

    // Get the Mangroves  dropdown link
    var plasticWasteDropdown = document.querySelector('a[href="#Mangroves"]');

    // Add click event listener to the Mangroves  dropdown link
    plasticWasteDropdown.addEventListener('click', function () {
        // Remove the main container from the page
        mainContainer.innerHTML = '';
    });
});
// Add a click event listener to the Plastic Waste Button 
/*
document.addEventListener('DOMContentLoaded', function () {
    // Function to find the list item containing specific text
    function findListItemByText(text) {
        const listItems = document.querySelectorAll('.nav.sidebar-nav > li');
        for (let i = 0; i < listItems.length; i++) {
            if (listItems[i].textContent.trim() === text) {
                return listItems[i];
            }
        }
        return null; // Return null if not found
    }

    // Get the Plastic Waste  list item element
    const PlasticWasteandDetection = findListItemByText('Plastic Waste and Detection');

    // Add a click event listener to the Plastic Waste Surveillance list item
    if (PlasticWasteandDetection) {
        PlasticWasteandDetection.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default behavior of the anchor tag

            // Remove existing content from the main container
            const mainContainer = document.getElementById('main-container');
            mainContainer.innerHTML = '';
        });
    }
});
*/



//An event listner for the  seal level rise 1m layer
document.getElementById('SeaLevelRise1m').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(plasticwaste);
    map.removeControl(infoplastic);
    map.removeControl(legendplastic);
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeLayer(missmanaged1);
    map.removeControl(infomissmanaged1);
    map.removeControl(legendmissmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoservermangroveSandspit)
    map.removeControl(MangrovecoverLegend)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeControl(cyclone50yearrepreatLegend)
    map.removeControl(cyclonemortalityriskLegend)
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoserverCyclonePopulationexposure)
    map.removeLayer(microplastic)
    map.removeLayer(legendmicroplastic)
    map.removeLayer(coastalfloodprojection100)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeLayer(videoOverlay)
    map.removeControl(PlasticwastedensityLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    onemLayer.addTo(map);
});

//An event listner for the  seal level rise 2m layer
document.getElementById('SeaLevelRise2m').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    map.removeLayer(onemLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeLayer(missmanaged1);
    map.removeControl(infomissmanaged1);
    map.removeControl(legendmissmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    map.removeLayer(plasticwaste);
    map.removeControl(infoplastic);
    map.removeControl(legendplastic);
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoserverCyclonePopulationexposure)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoservermangroveSandspit)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeControl(cyclonemortalityriskLegend)
    map.removeControl(MangrovecoverLegend)
    map.removeLayer(geoservertsunamifrequency)
    map.removeLayer(microplastic)
    map.removeLayer(legendmicroplastic)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(coastalfloodprojection100)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeControl(cyclone50yearrepreatLegend)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeControl(PlasticwastedensityLegend)
    map.removeLayer(videoOverlay)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    twomLayer.addTo(map);
});
//An event listner for the  seal level rise 5m layer
document.getElementById('SeaLevelRise5m').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeLayer(missmanaged1);
    map.removeControl(infomissmanaged1);
    map.removeControl(legendmissmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    map.removeLayer(plasticwaste);
    map.removeControl(infoplastic);
    map.removeControl(legendplastic);
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoservermangroveSandspit)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeControl(cyclone50yearrepreatLegend)
    map.removeLayer(geoservertsunamifrequency)
    map.removeLayer(videoOverlay)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoserverCyclonePopulationexposure)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeLayer(microplastic)
    map.removeControl(legendmicroplastic)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeControl(cyclonemortalityriskLegend)
    map.removeLayer(coastalfloodprojection100)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeControl(PlasticwastedensityLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    map.removeControl(MangrovecoverLegend)
    fivemLayer.addTo(map);
    //geoserver15.addTo(map);
});
//An event listner for the  seal level rise 10m layer
document.getElementById('SeaLevelRise10m').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeLayer(missmanaged1);
    map.removeControl(infomissmanaged1);
    map.removeControl(legendmissmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    map.removeLayer(plasticwaste);
    map.removeControl(infoplastic);
    map.removeControl(legendplastic);
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeControl(legendLandcover)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(videoOverlay)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoserverCyclonePopulationexposure)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoservermangroveSandspit)
    map.removeControl(MangrovecoverLegend)
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeControl(cyclone50yearrepreatLegend)
    map.removeLayer(microplastic)
    map.removeControl(legendmicroplastic)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(coastalfloodprojection100)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeControl(cyclonemortalityriskLegend)
    map.removeControl(PlasticwastedensityLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    map.removeLayer(landcover)
    tenmLayer.addTo(map);
});
//An event listner for the  plasticwaste layer
document.getElementById('PlasticWasteGeneration').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeLayer(missmanaged1);
    map.removeControl(infomissmanaged1);
    map.removeControl(legendmissmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(videoOverlay)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoserverCyclonePopulationexposure)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeLayer(geoservermangroveSandspit)
    map.removeControl(MangrovecoverLegend)
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeControl(cyclone50yearrepreatLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeControl(cyclonemortalityriskLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    map.addControl(infoplastic)
    map.removeLayer(coastalfloodprojection100)
    map.removeLayer(microplastic)
    map.removeControl(legendmicroplastic)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeControl(PlasticwastedensityLegend)
    map.addControl(legendplastic)
    map.addLayer(plasticwaste);
});
//An event listner for the  plasticwaste Mismanaged  layer
document.getElementById('MissmanagedPW').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(plasticwaste)
    map.removeControl(legendplastic)
    map.removeControl(infoplastic)
    map.removeLayer(missmanaged1);
    map.removeControl(infomissmanaged1);
    map.removeControl(legendmissmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoservermangroveSandspit)
    map.removeLayer(videoOverlay)
    map.removeControl(MangrovecoverLegend)
    map.removeLayer(geoservertsunamifrequency)
    map.removeLayer(geoserverCyclonePopulationexposure)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeControl(legendmicroplastic)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeControl(cyclone50yearrepreatLegend)
    map.removeControl(PlasticwastedensityLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    map.removeLayer(coastalfloodprojection100)
    map.removeLayer(microplastic)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeControl(cyclonemortalityriskLegend)
    map.addControl(infomissmanaged)
    map.addControl(legendmissmanaged)
    map.addLayer(missmanaged);

});
//An event listner for the  plasticwaste Mismanaged ocean  layer
document.getElementById('MissmanagedPWOcean').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(plasticwaste)
    map.removeControl(legendplastic)
    map.removeControl(infoplastic)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoservermangroveSandspit)
    map.removeControl(MangrovecoverLegend)
    map.removeLayer(videoOverlay)
    map.removeLayer(geoservertsunamifrequency)
    map.removeLayer(geoserverCyclonePopulationexposure)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeControl(PlasticwastedensityLegend)
    map.removeLayer(coastalfloodprojection100)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeControl(cyclonemortalityriskLegend)
    map.removeControl(TsunamiExposureLegend)
    map.removeLayer(microplastic)
    map.removeControl(legendmicroplastic)
    map.addControl(infomissmanaged1)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeControl(cyclone50yearrepreatLegend)
    map.addControl(legendmissmanaged1)
    map.addLayer(missmanaged1);
});
//An event listner for the  propability of plastic ocean  layer
document.getElementById('ProbabilityofPlasticocean').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(plasticwaste)
    map.removeControl(legendplastic)
    map.removeControl(infoplastic)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeControl(legendmissmanaged1)
    map.removeControl(infomissmanaged1)
    map.removeLayer(missmanaged1);
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeLayer(videoOverlay)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoservermangroveSandspit)
    map.removeControl(MangrovecoverLegend)
    map.removeLayer(geoservertsunamifrequency)
    map.removeLayer(geoserverCyclonePopulationexposure)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeControl(cyclone50yearrepreatLegend)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeLayer(coastalfloodprojection100)
    map.removeControl(cyclonemortalityriskLegend)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeControl(PlasticwastedensityLegend)
    map.removeLayer(microplastic)
    map.removeControl(legendmicroplastic)
    map.addLayer(propability)
    map.addControl(infopropability)
    map.addControl(legendpropability)
});
//An event listner for the  propability of SalinityIndex21  layer
document.getElementById('SalinityIndex2021').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(plasticwaste)
    map.removeControl(legendplastic)
    map.removeControl(infoplastic)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeControl(legendmissmanaged1)
    map.removeControl(infomissmanaged1)
    map.removeLayer(missmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeLayer(SalinityIndex21boundry)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(videoOverlay)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoservermangroveSandspit)
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeLayer(geoserverCyclonePopulationexposure)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeControl(cyclonemortalityriskLegend)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeControl(PlasticwastedensityLegend)
    map.removeControl(TsunamiExposureLegend)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeLayer(coastalfloodprojection100)
    map.removeControl(cyclone50yearrepreatLegend)
    map.removeControl(MangrovecoverLegend)
    map.removeLayer(microplastic)
    map.removeControl(legendmicroplastic)
    map.addLayer(SalinityIndex21)
    map.addControl(SalinityIndex21rasterLegend)
    
});
//An event listner for the  propability of SalineWaterBoundry  layer
document.getElementById('SalineWaterBoundry').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(plasticwaste)
    map.removeControl(legendplastic)
    map.removeControl(infoplastic)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeControl(legendmissmanaged1)
    map.removeControl(infomissmanaged1)
    map.removeLayer(missmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeLayer(SalinityIndex21)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeControl(cyclone50yearrepreatLegend)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(videoOverlay)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoservermangroveSandspit)
    map.removeLayer(geoservertsunamifrequency)
    map.removeLayer(geoserverCyclonePopulationexposure)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeLayer(microplastic)
    map.removeControl(legendmicroplastic)
    map.removeLayer(coastalfloodprojection100)
    map.removeControl(cyclonemortalityriskLegend)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeControl(PlasticwastedensityLegend)
    map.removeControl(TsunamiExposureLegend)
    map.removeControl(MangrovecoverLegend)
    map.addLayer(SalinityIndex21boundry)
    
});
//An event listner for the  propability of SalinityIndex20  layer
document.getElementById('SalinityIndex2020').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(plasticwaste)
    map.removeControl(legendplastic)
    map.removeControl(infoplastic)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeControl(legendmissmanaged1)
    map.removeControl(infomissmanaged1)
    map.removeLayer(missmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeLayer(SalinityIndex21boundry)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoservermangroveSandspit)
    map.removeControl(MangrovecoverLegend)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeControl(cyclone50yearrepreatLegend)
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeLayer(geoserverCyclonePopulationexposure)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeLayer(videoOverlay)
    map.removeControl(PlasticwastedensityLegend)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(microplastic)
    map.removeControl(legendmicroplastic)
    map.removeLayer(coastalfloodprojection100)
    map.removeLayer(geoservertsunamiexposure)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeControl(cyclonemortalityriskLegend)
    map.removeControl(TsunamiExposureLegend)
    map.addControl(SalinityIndex20rasterLegend)
    map.addLayer(SalinityIndex20)
});
//An event listner for the  propability of landcovermodisgibs  layer
document.getElementById('LandCover').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(plasticwaste)
    map.removeControl(legendplastic)
    map.removeControl(infoplastic)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeControl(legendmissmanaged1)
    map.removeControl(infomissmanaged1)
    map.removeLayer(missmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.addControl(legendLandcover)
    map.removeLayer(geoservergibsseasurfacetemprature)
    map.removeLayer(geoservergibsseasurfacetempraturenight)
    map.removeControl(seasurfacetemperaturedayLegend)
    map.removeControl(seasurfacetemperatureanomaliesLegend)
    map.removeLayer(geoservergibsseasurfacetempratureanomalies)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoservermangroveSandspit)
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeControl(cyclone50yearrepreatLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeLayer(microplastic)
    map.removeControl(legendmicroplastic)
    map.removeLayer(coastalfloodprojection100)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeLayer(geoserverCyclonePopulationexposure)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeControl(cyclonemortalityriskLegend)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeControl(PlasticwastedensityLegend)
    map.removeLayer(videoOverlay)
    map.removeControl(TsunamiExposureLegend)
    map.removeControl(MangrovecoverLegend)
    map.addLayer(landcover)
});
//An event listner for the  propability of GIBSGlobalSalinityMonthly  layer
document.getElementById('NASAGIBSSeaSurfaceSalinityMonthly').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(plasticwaste)
    map.removeControl(legendplastic)
    map.removeControl(infoplastic)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeControl(legendmissmanaged1)
    map.removeControl(infomissmanaged1)
    map.removeLayer(missmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeControl(gibssealevelriseanomaliesLegend)
    map.removeLayer(geoservergibssealevelriseanomalies)
    map.addControl(sealevelrisecmessLegend)
    map.addControl(gibssalinityMonthlyLegend)
    map.removeLayer(coastalfloodprojection100)
    map.removeLayer(geoservergibsseasurfacetemprature)
    map.removeControl(seasurfacetemperaturedayLegend)
    map.removeLayer(geoservergibsseasurfacetempraturenight)
    map.removeControl(sealevelrisecmessLegend)
    map.removeControl(seasurfacetemperatureanomaliesLegend)
    map.removeLayer(geoservergibsseasurfacetempratureanomalies)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeControl(legendmicroplastic)
    map.removeLayer(geoservermangroveSandspit)
    map.removeLayer(geoservertsunamifrequency)
    map.removeLayer(geoserverCyclonePopulationexposure)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeControl(cyclone50yearrepreatLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeControl(PlasticwastedensityLegend)
    map.removeControl(TsunamiExposureLegend)
    map.removeLayer(microplastic)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeLayer(videoOverlay)
    map.removeControl(cyclonemortalityriskLegend)
    map.removeControl(MangrovecoverLegend)
    map.addLayer(geoservergibssalinityMonthly)
});
//An event listner for the  propability of GIBSGlobalSalinityDaily  layer
document.getElementById('NASAGIBSSeaSurfaceSalinityDaily').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(plasticwaste)
    map.removeControl(legendplastic)
    map.removeControl(infoplastic)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeControl(legendmissmanaged1)
    map.removeControl(infomissmanaged1)
    map.removeLayer(missmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.addControl(gibssalinityMonthlyLegend)
    map.removeControl(gibssealevelriseanomaliesLegend)
    map.removeLayer(geoservergibssealevelriseanomalies)
    map.removeLayer(geoservergibssalinityMonthly)
    map.removeLayer(coastalfloodprojection100)
    map.removeControl(sealevelrisecmessLegend)
    map.removeLayer(geoservergibsseasurfacetemprature)
    map.removeLayer(geoservergibsseasurfacetempraturenight)
    map.removeControl(legendmicroplastic)
    map.removeControl(seasurfacetemperaturedayLegend)
    map.removeControl(seasurfacetemperatureanomaliesLegend)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoservermangroveSandspit)
    map.removeControl(MangrovecoverLegend)
    map.removeLayer(geoservergibsseasurfacetempratureanomalies)
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoserverCyclonePopulationexposure)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeControl(cyclone50yearrepreatLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeLayer(videoOverlay)
    map.removeControl(cyclonemortalityriskLegend)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeControl(PlasticwastedensityLegend)
    map.removeLayer(microplastic)
    map.removeControl(TsunamiExposureLegend)
    map.addLayer(geoservergibssalinityDaily)
});
//An event listner for the  propability of globalsealevelriseanomaly  layer
document.getElementById('NASAGIBSSeaLevelRiseAnomalies').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(plasticwaste)
    map.removeControl(legendplastic)
    map.removeControl(infoplastic)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeControl(legendmissmanaged1)
    map.removeControl(infomissmanaged1)
    map.removeLayer(missmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeControl(gibssalinityMonthlyLegend)
    map.removeLayer(geoservergibssalinityMonthly)
    map.removeLayer(geoservergibssalinityDaily)
    map.addControl(gibssealevelriseanomaliesLegend)
    map.removeLayer(coastalfloodprojection100)
    map.removeControl(sealevelrisecmessLegend)
    map.removeLayer(geoservergibsseasurfacetemprature)
    map.removeLayer(geoservergibsseasurfacetempraturenight)
    map.removeControl(seasurfacetemperaturedayLegend)
    map.removeControl(seasurfacetemperatureanomaliesLegend)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoservermangroveSandspit)
    map.removeControl(MangrovecoverLegend)
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeLayer(geoserverCyclonePopulationexposure)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeControl(cyclone50yearrepreatLegend)
    map.removeLayer(videoOverlay)
    map.removeLayer(microplastic)
    map.removeControl(legendmicroplastic)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeControl(cyclonemortalityriskLegend)
    map.removeControl(PlasticwastedensityLegend)
    map.removeControl(TsunamiExposureLegend)
    map.removeLayer(geoservergibsseasurfacetempratureanomalies)
    map.addLayer(geoservergibssealevelriseanomalies)
});
//An event listner for the  propability of coastalfloodprojection100  layer
document.getElementById('CoastalFloodProjection50year').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(plasticwaste)
    map.removeControl(legendplastic)
    map.removeControl(infoplastic)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeControl(legendmissmanaged1)
    map.removeControl(infomissmanaged1)
    map.removeLayer(missmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeControl(gibssalinityMonthlyLegend)
    map.removeLayer(geoservergibssalinityMonthly)
    map.removeLayer(geoservergibssalinityDaily)
    map.removeControl(gibssealevelriseanomaliesLegend)
    map.removeLayer(geoservergibssealevelriseanomalies)
    map.removeLayer(geoservergibsseasurfacetemprature)
    map.removeLayer(geoservergibsseasurfacetempraturenight)
    map.removeControl(seasurfacetemperaturedayLegend)
    map.removeControl(seasurfacetemperatureanomaliesLegend)
    map.removeLayer(geoservergibsseasurfacetempratureanomalies)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoservermangroveSandspit)
    map.removeControl(MangrovecoverLegend)
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeLayer(geoserverCyclonePopulationexposure)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeControl(PlasticwastedensityLegend)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeLayer(videoOverlay)
    map.removeLayer(microplastic)
    map.removeControl(legendmicroplastic)
    map.removeControl(cyclone50yearrepreatLegend)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeControl(cyclonemortalityriskLegend)
    map.addLayer(coastalfloodprojection100)
    map.addControl(sealevelrisecmessLegend)
});

//An event listner for the  propability of SeaSurfaceTemperaturemonthlyday  layer
document.getElementById('SSTMonthlyDay').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(plasticwaste)
    map.removeControl(legendplastic)
    map.removeControl(infoplastic)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeControl(legendmissmanaged1)
    map.removeControl(infomissmanaged1)
    map.removeLayer(missmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeControl(gibssalinityMonthlyLegend)
    map.removeLayer(geoservergibssalinityMonthly)
    map.removeLayer(geoservergibssalinityDaily)
    map.removeControl(gibssealevelriseanomaliesLegend)
    map.removeLayer(geoservergibssealevelriseanomalies)
    map.removeLayer(coastalfloodprojection100)
    map.removeControl(sealevelrisecmessLegend)
    map.addLayer(geoservergibsseasurfacetemprature)
    map.removeLayer(geoservergibsseasurfacetempraturenight)
    map.removeControl(seasurfacetemperatureanomaliesLegend)
    map.removeLayer(geoservergibsseasurfacetempratureanomalies)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoservermangroveSandspit)
    map.removeControl(MangrovecoverLegend)
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeControl(PlasticwastedensityLegend)
    map.removeControl(TsunamiProjectionLegend)
    map.removeControl(legendmicroplastic)
    map.removeLayer(geoservertsunamiexposure)
    map.removeLayer(microplastic)
    map.removeLayer(geoserverCyclonePopulationexposure)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeControl(cyclone50yearrepreatLegend)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeLayer(videoOverlay)
    map.removeControl(cyclonemortalityriskLegend)
    map.removeControl(TsunamiExposureLegend)
    map.addControl(seasurfacetemperaturedayLegend)
});
//An event listner for the  propability of SeaSurfaceTemperaturemonthlynight  layer
document.getElementById('SSTMonthlyNight').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(plasticwaste)
    map.removeControl(legendplastic)
    map.removeControl(infoplastic)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeControl(legendmissmanaged1)
    map.removeControl(infomissmanaged1)
    map.removeLayer(missmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeControl(gibssalinityMonthlyLegend)
    map.removeLayer(geoservergibssalinityMonthly)
    map.removeLayer(geoservergibssalinityDaily)
    map.removeControl(gibssealevelriseanomaliesLegend)
    map.removeLayer(geoservergibssealevelriseanomalies)
    map.removeLayer(coastalfloodprojection100)
    map.removeControl(sealevelrisecmessLegend)
    map.removeLayer(geoservergibsseasurfacetemprature)
    map.removeControl(seasurfacetemperatureanomaliesLegend)
    map.removeLayer(geoservergibsseasurfacetempratureanomalies)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoservermangroveSandspit)
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeControl(PlasticwastedensityLegend)
    map.removeControl(TsunamiExposureLegend)
    map.removeLayer(geoserverCyclonePopulationexposure)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeControl(MangrovecoverLegend)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeLayer(videoOverlay)
    map.removeControl(legendmicroplastic)
    map.removeLayer(microplastic)
    map.removeControl(cyclone50yearrepreatLegend)
    map.addControl(seasurfacetemperaturedayLegend)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeControl(cyclonemortalityriskLegend)
    map.addLayer(geoservergibsseasurfacetempraturenight)
    
});
//An event listner for the  propability of Seasurfacetemperatureanomalies  layer
document.getElementById('SSTAnomalies').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(plasticwaste)
    map.removeControl(legendplastic)
    map.removeControl(infoplastic)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeControl(legendmissmanaged1)
    map.removeControl(infomissmanaged1)
    map.removeLayer(missmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeControl(gibssalinityMonthlyLegend)
    map.removeLayer(geoservergibssalinityMonthly)
    map.removeLayer(geoservergibssalinityDaily)
    map.removeControl(gibssealevelriseanomaliesLegend)
    map.removeLayer(geoservergibssealevelriseanomalies)
    map.removeLayer(coastalfloodprojection100)
    map.removeControl(sealevelrisecmessLegend)
    map.removeLayer(geoservergibsseasurfacetemprature)
    map.removeControl(seasurfacetemperaturedayLegend)
    map.removeLayer(geoservergibsseasurfacetempraturenight)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoservermangroveSandspit)
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeControl(PlasticwastedensityLegend)
    map.removeControl(TsunamiExposureLegend)
    map.removeControl(MangrovecoverLegend)
    map.removeControl(MangrovecoverLegend)
    map.removeLayer(geoserverCyclonePopulationexposure)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeLayer(videoOverlay)
    map.removeControl(cyclonemortalityriskLegend)
    map.removeLayer(microplastic)
    map.removeControl(legendmicroplastic)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeControl(cyclone50yearrepreatLegend)
    map.addControl(seasurfacetemperatureanomaliesLegend)
    map.addLayer(geoservergibsseasurfacetempratureanomalies)
    
});
//An event listner for the  propability of Mangrovecoverindus  layer
document.getElementById('IndusDelta').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    event.stopPropagation();
    map.setView([24.8607, 67.0011], 8);
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(plasticwaste)
    map.removeControl(legendplastic)
    map.removeControl(infoplastic)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeControl(legendmissmanaged1)
    map.removeControl(infomissmanaged1)
    map.removeLayer(missmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeControl(gibssalinityMonthlyLegend)
    map.removeLayer(geoservergibssalinityMonthly)
    map.removeLayer(geoservergibssalinityDaily)
    map.removeControl(gibssealevelriseanomaliesLegend)
    map.removeLayer(geoservergibssealevelriseanomalies)
    map.removeLayer(coastalfloodprojection100)
    map.removeControl(sealevelrisecmessLegend)
    map.removeLayer(geoservergibsseasurfacetemprature)
    map.removeControl(seasurfacetemperaturedayLegend)
    map.removeLayer(geoservergibsseasurfacetempraturenight)
    map.removeControl(seasurfacetemperatureanomaliesLegend)
    map.removeLayer(geoservergibsseasurfacetempratureanomalies)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoservermangroveSandspit)
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeLayer(geoserverCyclonePopulationexposure)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeControl(PlasticwastedensityLegend)
    map.removeControl(TsunamiExposureLegend)
    map.addLayer(geoservermangroveindusdelta)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeControl(cyclone50yearrepreatLegend)
    map.removeLayer(videoOverlay)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeControl(cyclonemortalityriskLegend)
    map.removeLayer(microplastic)
    map.removeControl(legendmicroplastic)
    map.addControl(MangrovecoverLegend)
    
});
//An event listner for the  propability of MangrovecoverJiwani  layer
document.getElementById('Jiwani').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    // Set the map view to the specified latitude, longitude, and zoom level
    map.setView([25.0538, 61.7707], 8);
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(plasticwaste)
    map.removeControl(legendplastic)
    map.removeControl(infoplastic)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeControl(legendmissmanaged1)
    map.removeControl(infomissmanaged1)
    map.removeLayer(missmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeControl(gibssalinityMonthlyLegend)
    map.removeLayer(geoservergibssalinityMonthly)
    map.removeLayer(geoservergibssalinityDaily)
    map.removeControl(gibssealevelriseanomaliesLegend)
    map.removeLayer(geoservergibssealevelriseanomalies)
    map.removeLayer(coastalfloodprojection100)
    map.removeControl(sealevelrisecmessLegend)
    map.removeLayer(geoservergibsseasurfacetemprature)
    map.removeControl(seasurfacetemperaturedayLegend)
    map.removeLayer(geoservergibsseasurfacetempraturenight)
    map.removeControl(seasurfacetemperatureanomaliesLegend)
    map.removeLayer(geoservergibsseasurfacetempratureanomalies)
    map.removeLayer(geoservermangroveindusdelta)
    map.addLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoservermangroveSandspit)
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeControl(PlasticwastedensityLegend)
    map.removeControl(TsunamiExposureLegend)
    map.removeLayer(geoserverCyclonePopulationexposure)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeLayer(videoOverlay)
    map.removeControl(cyclone50yearrepreatLegend)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeLayer(microplastic)
    map.removeControl(legendmicroplastic)
    map.removeControl(cyclonemortalityriskLegend)
    map.addControl(MangrovecoverLegend)
    
});
//An event listner for the  propability of MangrovecoverKalmatKhor  layer
document.getElementById('KalmatKhor').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    // Set the map view to the specified latitude, longitude, and zoom level
    map.setView([25.4211, 64.0769], 8);
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(plasticwaste)
    map.removeControl(legendplastic)
    map.removeControl(infoplastic)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeControl(legendmissmanaged1)
    map.removeControl(infomissmanaged1)
    map.removeLayer(missmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeControl(gibssalinityMonthlyLegend)
    map.removeLayer(geoservergibssalinityMonthly)
    map.removeLayer(geoservergibssalinityDaily)
    map.removeControl(gibssealevelriseanomaliesLegend)
    map.removeLayer(geoservergibssealevelriseanomalies)
    map.removeLayer(coastalfloodprojection100)
    map.removeControl(sealevelrisecmessLegend)
    map.removeLayer(geoservergibsseasurfacetemprature)
    map.removeControl(seasurfacetemperaturedayLegend)
    map.removeLayer(geoservergibsseasurfacetempraturenight)
    map.removeControl(seasurfacetemperatureanomaliesLegend)
    map.removeLayer(geoservergibsseasurfacetempratureanomalies)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoservermangroveSandspit)
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeLayer(videoOverlay)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeControl(PlasticwastedensityLegend)
    map.removeControl(TsunamiExposureLegend)
    map.removeLayer(geoserverCyclonePopulationexposure)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeLayer(microplastic)
    map.removeControl(legendmicroplastic)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeControl(cyclonemortalityriskLegend)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeControl(cyclone50yearrepreatLegend)
    map.addLayer(geoservermangroveKalmatKhor)
    map.addControl(MangrovecoverLegend)
    
});
//An event listner for the  propability of MangrovecoverKalmatSonmianiKhor  layer
document.getElementById('SonmianiKhor').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    // Set the map view to the specified latitude, longitude, and zoom level
    map.setView([25.1667,  66.5000], 8);
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(plasticwaste)
    map.removeControl(legendplastic)
    map.removeControl(infoplastic)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeControl(legendmissmanaged1)
    map.removeControl(infomissmanaged1)
    map.removeLayer(missmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeControl(gibssalinityMonthlyLegend)
    map.removeLayer(geoservergibssalinityMonthly)
    map.removeLayer(geoservergibssalinityDaily)
    map.removeControl(gibssealevelriseanomaliesLegend)
    map.removeLayer(geoservergibssealevelriseanomalies)
    map.removeLayer(coastalfloodprojection100)
    map.removeControl(sealevelrisecmessLegend)
    map.removeLayer(geoservergibsseasurfacetemprature)
    map.removeControl(seasurfacetemperaturedayLegend)
    map.removeLayer(geoservergibsseasurfacetempraturenight)
    map.removeLayer(videoOverlay)
    map.removeControl(seasurfacetemperatureanomaliesLegend)
    map.removeLayer(geoservergibsseasurfacetempratureanomalies)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoservermangroveSandspit)
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeControl(PlasticwastedensityLegend)
    map.removeLayer(microplastic)
    map.removeControl(legendmicroplastic)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeControl(cyclonemortalityriskLegend)
    map.removeLayer(geoserverCyclonePopulationexposure)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeControl(TsunamiExposureLegend)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeControl(cyclone50yearrepreatLegend)
    map.addLayer(geoservermangroveSonmianiKhor)
    map.addControl(MangrovecoverLegend)
});
//An event listner for the  propability of MangrovecoverSandspit  layer
document.getElementById('SandSpit').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    // Set the map view to the specified latitude, longitude, and zoom level
    map.setView([24.8404, 66.9098], 8);
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(plasticwaste)
    map.removeControl(legendplastic)
    map.removeControl(infoplastic)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeControl(legendmissmanaged1)
    map.removeControl(infomissmanaged1)
    map.removeLayer(missmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeControl(gibssalinityMonthlyLegend)
    map.removeLayer(geoservergibssalinityMonthly)
    map.removeLayer(geoservergibssalinityDaily)
    map.removeControl(gibssealevelriseanomaliesLegend)
    map.removeLayer(geoservergibssealevelriseanomalies)
    map.removeLayer(coastalfloodprojection100)
    map.removeControl(sealevelrisecmessLegend)
    map.removeLayer(geoservergibsseasurfacetemprature)
    map.removeControl(seasurfacetemperaturedayLegend)
    map.removeLayer(geoservergibsseasurfacetempraturenight)
    map.removeControl(seasurfacetemperatureanomaliesLegend)
    map.removeLayer(geoservergibsseasurfacetempratureanomalies)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeLayer(videoOverlay)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeControl(PlasticwastedensityLegend)
    map.removeControl(TsunamiExposureLegend)
    map.removeLayer(microplastic)
    map.removeControl(legendmicroplastic)
    map.removeLayer(geoserverCyclonePopulationexposure)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeControl(cyclone50yearrepreatLegend)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeControl(cyclonemortalityriskLegend)
    map.addLayer(geoservermangroveSandspit)
    map.addControl(MangrovecoverLegend)
});
//An event listner for the  propability of TsunamiExposurepoppersqkm  layer
document.getElementById('TsunamiExposurepersqkm').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    // Set the map view to the specified latitude, longitude, and zoom level
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(plasticwaste)
    map.removeControl(legendplastic)
    map.removeControl(infoplastic)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeControl(legendmissmanaged1)
    map.removeControl(infomissmanaged1)
    map.removeLayer(missmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeControl(gibssalinityMonthlyLegend)
    map.removeLayer(geoservergibssalinityMonthly)
    map.removeLayer(geoservergibssalinityDaily)
    map.removeControl(gibssealevelriseanomaliesLegend)
    map.removeLayer(geoservergibssealevelriseanomalies)
    map.removeLayer(coastalfloodprojection100)
    map.removeControl(sealevelrisecmessLegend)
    map.removeLayer(geoservergibsseasurfacetemprature)
    map.removeControl(seasurfacetemperaturedayLegend)
    map.removeLayer(geoservergibsseasurfacetempraturenight)
    map.removeControl(seasurfacetemperatureanomaliesLegend)
    map.removeLayer(geoservergibsseasurfacetempratureanomalies)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoservermangroveSandspit)
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeControl(MangrovecoverLegend)
    map.removeLayer(geoserverCyclonePopulationexposure)
    map.removeLayer(microplastic)
    map.removeControl(legendmicroplastic)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeControl(PlasticwastedensityLegend)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeControl(cyclonemortalityriskLegend)
    map.removeLayer(videoOverlay)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeControl(cyclone50yearrepreatLegend)
    map.addLayer(geoservertsunamiexposure)
    map.addControl(TsunamiExposureLegend)
});
//An event listner for the  propability of TsunamiFrequency  layer
document.getElementById('TsunamiFrequency').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    // Set the map view to the specified latitude, longitude, and zoom level
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(plasticwaste)
    map.removeControl(legendplastic)
    map.removeControl(infoplastic)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeControl(legendmissmanaged1)
    map.removeControl(infomissmanaged1)
    map.removeLayer(missmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeControl(gibssalinityMonthlyLegend)
    map.removeLayer(geoservergibssalinityMonthly)
    map.removeLayer(geoservergibssalinityDaily)
    map.removeControl(gibssealevelriseanomaliesLegend)
    map.removeLayer(geoservergibssealevelriseanomalies)
    map.removeLayer(coastalfloodprojection100)
    map.removeControl(sealevelrisecmessLegend)
    map.removeLayer(geoservergibsseasurfacetemprature)
    map.removeControl(seasurfacetemperaturedayLegend)
    map.removeLayer(geoservergibsseasurfacetempraturenight)
    map.removeControl(seasurfacetemperatureanomaliesLegend)
    map.removeLayer(geoservergibsseasurfacetempratureanomalies)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoservermangroveSandspit)
    map.removeControl(MangrovecoverLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeControl(PlasticwastedensityLegend)
    map.removeLayer(microplastic)
    map.removeControl(legendmicroplastic)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeLayer(videoOverlay)
    map.removeControl(cyclonemortalityriskLegend)
    map.removeLayer(geoserverCyclonePopulationexposure)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeControl(cyclone50yearrepreatLegend)
    map.addLayer(geoservertsunamifrequency)
    map.addControl(TsunamiFrequencyLegend)
});

//An event listner for the  propability of Tsunamihazardprojection  layer
document.getElementById('TsunamiProjection100yearreturn').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    // Set the map view to the specified latitude, longitude, and zoom level
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(plasticwaste)
    map.removeControl(legendplastic)
    map.removeControl(infoplastic)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeControl(legendmissmanaged1)
    map.removeControl(infomissmanaged1)
    map.removeLayer(missmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeControl(gibssalinityMonthlyLegend)
    map.removeLayer(geoservergibssalinityMonthly)
    map.removeLayer(geoservergibssalinityDaily)
    map.removeControl(gibssealevelriseanomaliesLegend)
    map.removeLayer(geoservergibssealevelriseanomalies)
    map.removeLayer(coastalfloodprojection100)
    map.removeControl(sealevelrisecmessLegend)
    map.removeLayer(geoservergibsseasurfacetemprature)
    map.removeControl(seasurfacetemperaturedayLegend)
    map.removeLayer(geoservergibsseasurfacetempraturenight)
    map.removeControl(seasurfacetemperatureanomaliesLegend)
    map.removeLayer(geoservergibsseasurfacetempratureanomalies)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoservermangroveSandspit)
    map.removeControl(MangrovecoverLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeControl(PlasticwastedensityLegend)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeControl(cyclonemortalityriskLegend)
    map.removeLayer(videoOverlay)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeControl(cyclone50yearrepreatLegend)
    map.removeLayer(geoserverCyclonePopulationexposure)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeLayer(microplastic)
    map.removeControl(legendmicroplastic)
    map.addLayer(geoservertsunamiprojection100)
    map.addControl(TsunamiProjectionLegend)
    
});

//An event listner for the  propability of PlasticLitterDensity  layer
document.getElementById('PlasticLitterDensity').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    // Set the map view to the specified latitude, longitude, and zoom level
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(plasticwaste)
    map.removeControl(legendplastic)
    map.removeControl(infoplastic)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeControl(legendmissmanaged1)
    map.removeControl(infomissmanaged1)
    map.removeLayer(missmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeControl(gibssalinityMonthlyLegend)
    map.removeLayer(geoservergibssalinityMonthly)
    map.removeLayer(geoservergibssalinityDaily)
    map.removeControl(gibssealevelriseanomaliesLegend)
    map.removeLayer(geoservergibssealevelriseanomalies)
    map.removeLayer(coastalfloodprojection100)
    map.removeControl(sealevelrisecmessLegend)
    map.removeLayer(geoservergibsseasurfacetemprature)
    map.removeControl(seasurfacetemperaturedayLegend)
    map.removeLayer(geoservergibsseasurfacetempraturenight)
    map.removeControl(seasurfacetemperatureanomaliesLegend)
    map.removeLayer(geoservergibsseasurfacetempratureanomalies)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoservermangroveSandspit)
    map.removeControl(MangrovecoverLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeLayer(videoOverlay)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeControl(cyclonemortalityriskLegend)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeLayer(geoserverCyclonePopulationexposure)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeControl(cyclone50yearrepreatLegend)
    map.addLayer(geoservermicroplasticlitter)
    map.removeLayer(microplastic)
    map.removeControl(legendmicroplastic)
    map.addControl(PlasticwastedensityLegend)
});

//An event listner for the  Tropical Cyclones Mortality Risk  layer
document.getElementById('TropicalCyclonesMortalityRisk').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    // Set the map view to the specified latitude, longitude, and zoom level
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(plasticwaste)
    map.removeControl(legendplastic)
    map.removeControl(infoplastic)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeControl(legendmissmanaged1)
    map.removeControl(infomissmanaged1)
    map.removeLayer(missmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeControl(gibssalinityMonthlyLegend)
    map.removeLayer(geoservergibssalinityMonthly)
    map.removeLayer(geoservergibssalinityDaily)
    map.removeControl(gibssealevelriseanomaliesLegend)
    map.removeLayer(geoservergibssealevelriseanomalies)
    map.removeLayer(coastalfloodprojection100)
    map.removeControl(sealevelrisecmessLegend)
    map.removeLayer(geoservergibsseasurfacetemprature)
    map.removeControl(seasurfacetemperaturedayLegend)
    map.removeLayer(geoservergibsseasurfacetempraturenight)
    map.removeControl(seasurfacetemperatureanomaliesLegend)
    map.removeLayer(geoservergibsseasurfacetempratureanomalies)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoservermangroveSandspit)
    map.removeControl(MangrovecoverLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeControl(PlasticwastedensityLegend)
    map.addLayer(geoserverCyclonemortalityrisk)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeLayer(geoserverCyclonePopulationexposure)
    map.removeLayer(videoOverlay)
    map.removeLayer(microplastic)
    map.removeControl(legendmicroplastic)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeControl(cyclone50yearrepreatLegend)
    map.addControl(cyclonemortalityriskLegend)
});

//An event listner for the  propability of Tropical Cyclone 50 year Period Return  layer
document.getElementById('TropicalCyclone50yearPeriodReturn').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    // Set the map view to the specified latitude, longitude, and zoom level
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(plasticwaste)
    map.removeControl(legendplastic)
    map.removeControl(infoplastic)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeControl(legendmissmanaged1)
    map.removeControl(infomissmanaged1)
    map.removeLayer(missmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeControl(gibssalinityMonthlyLegend)
    map.removeLayer(geoservergibssalinityMonthly)
    map.removeLayer(geoservergibssalinityDaily)
    map.removeControl(gibssealevelriseanomaliesLegend)
    map.removeLayer(geoservergibssealevelriseanomalies)
    map.removeLayer(coastalfloodprojection100)
    map.removeControl(sealevelrisecmessLegend)
    map.removeLayer(geoservergibsseasurfacetemprature)
    map.removeControl(seasurfacetemperaturedayLegend)
    map.removeLayer(geoservergibsseasurfacetempraturenight)
    map.removeControl(seasurfacetemperatureanomaliesLegend)
    map.removeLayer(geoservergibsseasurfacetempratureanomalies)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoservermangroveSandspit)
    map.removeControl(MangrovecoverLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeControl(PlasticwastedensityLegend)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeControl(cyclonemortalityriskLegend)
    map.addLayer(geoserverTropicalCyclone50)
    map.removeLayer(geoserverCyclonePopulationexposure)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeLayer(videoOverlay)
    map.removeLayer(microplastic)
    map.removeControl(legendmicroplastic)
    map.addControl(cyclone50yearrepreatLegend)
});

//An event listner for the  propability of Tropical Cyclone 50 year Period Return  layer
document.getElementById('TropicalCyclonePopulationexposureperyear').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    // Set the map view to the specified latitude, longitude, and zoom level
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(plasticwaste)
    map.removeControl(legendplastic)
    map.removeControl(infoplastic)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeControl(legendmissmanaged1)
    map.removeControl(infomissmanaged1)
    map.removeLayer(missmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeControl(gibssalinityMonthlyLegend)
    map.removeLayer(geoservergibssalinityMonthly)
    map.removeLayer(geoservergibssalinityDaily)
    map.removeControl(gibssealevelriseanomaliesLegend)
    map.removeLayer(geoservergibssealevelriseanomalies)
    map.removeLayer(coastalfloodprojection100)
    map.removeControl(sealevelrisecmessLegend)
    map.removeLayer(geoservergibsseasurfacetemprature)
    map.removeControl(seasurfacetemperaturedayLegend)
    map.removeLayer(geoservergibsseasurfacetempraturenight)
    map.removeControl(seasurfacetemperatureanomaliesLegend)
    map.removeLayer(geoservergibsseasurfacetempratureanomalies)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoservermangroveSandspit)
    map.removeControl(MangrovecoverLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeControl(PlasticwastedensityLegend)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeControl(cyclonemortalityriskLegend)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeControl(cyclone50yearrepreatLegend)
    map.addLayer(geoserverCyclonePopulationexposure)
    map.removeLayer(videoOverlay)
    map.removeLayer(microplastic)
    map.removeControl(legendmicroplastic)
    map.addControl(CyclonesPopulationExposureLegend)
});


//An event listner for the  propability of Marine Micro Plastic Concentration (2022-2024)   layer
document.getElementById('MarineMicroPlasticConcentration').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    // Set the map view to the specified latitude, longitude, and zoom level
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(plasticwaste)
    map.removeControl(legendplastic)
    map.removeControl(infoplastic)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeControl(legendmissmanaged1)
    map.removeControl(infomissmanaged1)
    map.removeLayer(missmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeControl(gibssalinityMonthlyLegend)
    map.removeLayer(geoservergibssalinityMonthly)
    map.removeLayer(geoservergibssalinityDaily)
    map.removeControl(gibssealevelriseanomaliesLegend)
    map.removeLayer(geoservergibssealevelriseanomalies)
    map.removeLayer(coastalfloodprojection100)
    map.removeControl(sealevelrisecmessLegend)
    map.removeLayer(geoservergibsseasurfacetemprature)
    map.removeControl(seasurfacetemperaturedayLegend)
    map.removeLayer(geoservergibsseasurfacetempraturenight)
    map.removeControl(seasurfacetemperatureanomaliesLegend)
    map.removeLayer(geoservergibsseasurfacetempratureanomalies)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoservermangroveSandspit)
    map.removeControl(MangrovecoverLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeControl(PlasticwastedensityLegend)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeControl(cyclonemortalityriskLegend)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeControl(cyclone50yearrepreatLegend)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeLayer(videoOverlay)
    map.addLayer(microplastic)
    map.addControl(legendmicroplastic)
});


//An event listner for the  Scenario Based Sea Level Rise  layer
document.getElementById('ScenarioBasedSeaLevelRise').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
    event.stopPropagation();
    map.setView([24.8404, 66.9098], 10);
    // Set the map view to the specified latitude, longitude, and zoom level
    map.removeLayer(onemLayer)
    map.removeLayer(twomLayer)
    map.removeLayer(fivemLayer)
    map.removeLayer(tenmLayer)
    map.removeLayer(plasticwaste)
    map.removeControl(legendplastic)
    map.removeControl(infoplastic)
    map.removeLayer(missmanaged);
    map.removeControl(infomissmanaged);
    map.removeControl(legendmissmanaged);
    map.removeControl(legendmissmanaged1)
    map.removeControl(infomissmanaged1)
    map.removeLayer(missmanaged1);
    map.removeLayer(propability)
    map.removeControl(infopropability)
    map.removeControl(legendpropability)
    // map.removeLayer(savi15raster)
    // map.removeControl(savi15rasterLegend)
    // map.removeLayer(savi23raster)
    // map.removeControl(savi23rasterLegend)
    // map.removeLayer(Reflectance15)
    // map.removeControl(reflectance15rasterLegend)
    // map.removeLayer(Reflectance23)
    // map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeControl(gibssalinityMonthlyLegend)
    map.removeLayer(geoservergibssalinityMonthly)
    map.removeLayer(geoservergibssalinityDaily)
    map.removeControl(gibssealevelriseanomaliesLegend)
    map.removeLayer(geoservergibssealevelriseanomalies)
    map.removeLayer(coastalfloodprojection100)
    map.removeControl(sealevelrisecmessLegend)
    map.removeLayer(geoservergibsseasurfacetemprature)
    map.removeControl(seasurfacetemperaturedayLegend)
    map.removeLayer(geoservergibsseasurfacetempraturenight)
    map.removeControl(seasurfacetemperatureanomaliesLegend)
    map.removeLayer(geoservergibsseasurfacetempratureanomalies)
    map.removeLayer(geoservermangroveindusdelta)
    map.removeLayer(geoservermangroveJiwani)
    map.removeLayer(geoservermangroveKalmatKhor)
    map.removeLayer(geoservermangroveSonmianiKhor)
    map.removeLayer(geoservermangroveSandspit)
    map.removeControl(MangrovecoverLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservermicroplasticlitter)
    map.removeControl(PlasticwastedensityLegend)
    map.removeLayer(geoserverCyclonemortalityrisk)
    map.removeControl(cyclonemortalityriskLegend)
    map.removeLayer(geoserverTropicalCyclone50)
    map.removeControl(cyclone50yearrepreatLegend)
    map.removeControl(CyclonesPopulationExposureLegend)
    map.removeLayer(microplastic)
    map.removeControl(legendmicroplastic)
    map.addLayer(videoOverlay)
    
});
