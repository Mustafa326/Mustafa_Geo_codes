// Create the map
const map = L.map('map').setView([30.3753, 69.3451], 5.5); // Initial location and zoom level

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

// Add the Mapbox tile layer to the baseMaps object

// Add the Mapbox tile layer to the map
mapboxTileLayer.addTo(map).bringToBack();

// Create an object to hold the different map layers
const baseMaps = {
    "Esri World Imagery": esriWorldImagery,
    "Mapbox Satellite Streets": mapboxTileLayer,
    "Cartodb Positron": cartodb
};
//Add tiles and zoom buttons

// Move zoom buttons to the top right and 10 lines below the top
map.zoomControl.setPosition('topright'); // Move zoom control to the top right corner
map.zoomControl.getContainer().style.marginTop = '3em'; // Adjust the margin-top for the zoom buttons
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
//Geoserver layers through the use of L.tilelayers for the costal portal rasters-------------------------------------------------------------
var geoserver15 = L.tileLayer.wms("http://172.18.1.4:8080/geoserver/NDMA-costal-rasters/wms", { layers: 'savi15', format: 'image/png', transparent: true, srs: 'EPSG:3857' }) //.addTo(map)
geoserver15.setOpacity(1.0)
var savi15raster = L.layerGroup([geoserver15])
var geoserver23 = L.tileLayer.wms("http://172.18.1.4:8080/geoserver/NDMA-costal-rasters/wms", { layers: 'savi23', format: 'image/png', transparent: true, srs: 'EPSG:3857' }) //.addTo(map)
geoserver23.setOpacity(1.0)
var savi23raster = L.layerGroup([geoserver23])
var geoserverRef15 = L.tileLayer.wms("http://172.18.1.4:8080/geoserver/NDMA-costal-rasters/wms", { layers: 'reflectance15', format: 'image/png', transparent: true, srs: 'EPSG:3857' }) //.addTo(map)
geoserverRef15.setOpacity(1.0)
var Reflectance15 = L.layerGroup([geoserverRef15])

var geoserverRef23 = L.tileLayer.wms("http://172.18.1.4:8080/geoserver/NDMA-costal-rasters/wms", { layers: 'reflectance23', format: 'image/png', transparent: true, srs: 'EPSG:3857' }) //.addTo(map)
geoserverRef23.setOpacity(1.0)
var Reflectance23 = L.layerGroup([geoserverRef23])

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
    "Savi15": savi15raster,
    "Savi23": savi23raster,
    "Reflectance15": Reflectance15,
    "Reflectance23": Reflectance23,
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
// creating legend for Savi Raster 
var savi15rasterLegend = L.control({ position: 'bottomright' });

savi15rasterLegend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'savi15raster'), // Using legendplastic class for styling
        colorMapEntries = [
            { color: "#30123b", label: "-0.4556" },
            { color: "#4686fb", label: "-0.2414" },
            { color: "#1be5b5", label: "-0.0271" },
            { color: "#a4fc3c", label: "0.1872" },
            { color: "#fbb938", label: "0.4015" },
            { color: "#e3440a", label: "0.6158" },
            { color: "#7a0403", label: "0.8301" }
        ];

    // Add label for SAVI raster image legend
    div.innerHTML += '<h4>SAVI Raster Image 2015</h4>';

    // Loop through color map entries and generate a label with a colored square for each entry
    for (var i = 0; i < colorMapEntries.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colorMapEntries[i].color + '"></i> ' +
            colorMapEntries[i].label + (colorMapEntries[i + 1] ? '&ndash;' + colorMapEntries[i + 1].label + '<br>' : '+');
    }

    return div;
};
// creating a legend for savi23 raster
var savi23rasterLegend = L.control({ position: 'bottomright' });
savi23rasterLegend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'savi23raster'), // Using legendplastic class for styling
    colorMapEntries = [
        { color: "#30123b", label: "-0.33" },
        { color: "#4686fb", label: "-0.14" },
        { color: "#1be5b5", label: "0.05" },
        { color: "#a4fc3c", label: "0.24" },
        { color: "#fbb938", label: "0.42" },
        { color: "#e3440a", label: "0.61" },
        { color: "#7a0403", label: "0.80" }
    ];

    // Add label for SAVI raster image legend
    div.innerHTML += '<h4>SAVI Raster Image 2023</h4>';

    // Loop through color map entries and generate a label with a colored square for each entry
    for (var i = 0; i < colorMapEntries.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colorMapEntries[i].color + '"></i> ' +
            colorMapEntries[i].label + (colorMapEntries[i + 1] ? '&ndash;' + colorMapEntries[i + 1].label + '<br>' : '+');
    }

    return div;
};

// creating a legend for reflectance15 raster
var reflectance15rasterLegend = L.control({ position: 'bottomright' });
reflectance15rasterLegend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'reflectance15raster'), // Using legendplastic class for styling
    colorMapEntries = [
        { color: "#30123b", label: "1" },
        { color: "#4686fb", label: "2" },
        { color: "#1be5b5", label: "3" },
        { color: "#a4fc3c", label: "4" },
        { color: "#fbb938", label: "4" },
        { color: "#e3440a", label: "5" },
        { color: "#7a0403", label: "6" }
    ];

    // Add label for SAVI raster image legend
    div.innerHTML += '<h4>Reflectance Raster 2015</h4>';

    // Loop through color map entries and generate a label with a colored square for each entry
    for (var i = 0; i < colorMapEntries.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colorMapEntries[i].color + '"></i> ' +
            colorMapEntries[i].label + (colorMapEntries[i + 1] ? '&ndash;' + colorMapEntries[i + 1].label + '<br>' : '+');
    }

    return div;
};

// creating a legend for reflectance23 raster
var reflectance23rasterLegend = L.control({ position: 'bottomright' });
reflectance23rasterLegend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'reflectance23raster'), // Using legendplastic class for styling
    colorMapEntries = [
        { color: "#30123b", label: "1" },
        { color: "#4686fb", label: "2" },
        { color: "#1be5b5", label: "3" },
        { color: "#a4fc3c", label: "4" },
        { color: "#fbb938", label: "4" },
        { color: "#e3440a", label: "5" },
        { color: "#7a0403", label: "6" }
    ];

    // Add label for SAVI raster image legend
    div.innerHTML += '<h4>Reflectance Raster 2023</h4>';

    // Loop through color map entries and generate a label with a colored square for each entry
    for (var i = 0; i < colorMapEntries.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colorMapEntries[i].color + '"></i> ' +
            colorMapEntries[i].label + (colorMapEntries[i + 1] ? '&ndash;' + colorMapEntries[i + 1].label + '<br>' : '+');
    }

    return div;
};

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
        legendText = 'Coastal Flood Projection 100 years';

    // Add label for GIBS Salinity Monthly layer legend
    div.innerHTML += '<h4>' + legendText + '</h4>';

    // Include any legend details specific to GIBS Salinity Monthly layer
    // You may use image tag for PNG or other suitable method
    div.innerHTML += '<img src="https://www.geonode-gfdrrlab.org/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=hazard%3Ass_muis_rp0100m&style=MUIS_SS" alt="Legend for GIBS Salinity Monthly">';

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
document.addEventListener('DOMContentLoaded', function() {
    // Get the Mangroves button element
    const AcidificationButton = Array.from(document.querySelectorAll('.nav-button')).find(button => button.textContent.trim() === 'EEZ Marine Surveillance');

    // Add a click event listener to the Mangroves button
    AcidificationButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default behavior of the anchor tag

        // Remove existing content from the main container
        const mainContainer2 = document.getElementById('main-container');
        mainContainer2.innerHTML = '';
        //document.getElementById('map').innerHTML = '';

        // Create and append the iframe for Mangroves
        var iframefishing = document.createElement('iframe');
        iframefishing.src = "https://globalfishingwatch.org/map/index?latitude=22.067957416742075&longitude=63.65159782519663&zoom=5.602048799804306&start=2023-11-09T00%3A00%3A00.000Z&end=2024-02-09T00%3A00%3A00.000Z&dvIn[0][id]=rfmo-1707988537257&dvIn[0][dvId]=tuna-rfmo-areas&dvIn[0][cfg][clr]=%238E24A9&dvIn[1][id]=~0&dvIn[1][cfg][vis]=false&dvIn[2][id]=oxygen-1707988387199&dvIn[2][dvId]=~1&dvIn[2][cfg][clr]=%2300EEFF&dvIn[2][cfg][colorRamp]=sky&dvIn[2][cfg][breaks][0]=198.942&dvIn[2][cfg][breaks][1]=200.582&dvIn[2][cfg][breaks][2]=201.764&dvIn[2][cfg][breaks][3]=203.313&dvIn[2][cfg][breaks][4]=204.673&dvIn[2][cfg][breaks][5]=205.797&dvIn[2][cfg][breaks][6]=206.639&dvIn[2][cfg][breaks][7]=207.473&dvIn[2][cfg][breaks][8]=209.044&dvIn[2][cfg][breaks][9]=209.054&dvIn[2][cfg][vis]=true&dvIn[2][dsC][0][pms][0][id]=type&dvIn[2][dsC][0][pms][0][val]=~2&dvIn[2][dsC][0][ept]=~3&dvIn[2][dsC][0][dsId]=public-global-oxygen%3Av20231213&dvIn[3][id]=ph-1707988372551&dvIn[3][dvId]=~1&dvIn[3][cfg][clr]=%239CA4FF&dvIn[3][cfg][colorRamp]=lilac&dvIn[3][cfg][intervals][0]=MONTH&dvIn[3][cfg][vis]=true&dvIn[3][cfg][breaks][0]=7.94&dvIn[3][cfg][breaks][1]=7.963&dvIn[3][cfg][breaks][2]=7.98&dvIn[3][cfg][breaks][3]=7.99&dvIn[3][cfg][breaks][4]=8&dvIn[3][cfg][breaks][5]=8.01&dvIn[3][cfg][breaks][6]=8.023&dvIn[3][cfg][breaks][7]=8.037&dvIn[3][cfg][breaks][8]=8.05&dvIn[3][cfg][breaks][9]=8.06&dvIn[3][dsC][0][pms][0][id]=type&dvIn[3][dsC][0][pms][0][val]=~2&dvIn[3][dsC][0][ept]=~3&dvIn[3][dsC][0][dsId]=public-global-ph%3Av20231213&dvIn[4][id]=phosphate-1707987943337&dvIn[4][dvId]=~1&dvIn[4][cfg][clr]=%23FFAA0D&dvIn[4][cfg][colorRamp]=orange&dvIn[4][cfg][vis]=true&dvIn[4][cfg][breaks][0]=0.171&dvIn[4][cfg][breaks][1]=0.22&dvIn[4][cfg][breaks][2]=0.258&dvIn[4][cfg][breaks][3]=0.297&dvIn[4][cfg][breaks][4]=0.327&dvIn[4][cfg][breaks][5]=0.351&dvIn[4][cfg][breaks][6]=0.375&dvIn[4][cfg][breaks][7]=0.402&dvIn[4][cfg][breaks][8]=0.435&dvIn[4][cfg][breaks][9]=0.445&dvIn[4][dsC][0][pms][0][id]=type&dvIn[4][dsC][0][pms][0][val]=~2&dvIn[4][dsC][0][ept]=~3&dvIn[4][dsC][0][dsId]=public-global-phosphate%3Av20231213&dvIn[5][id]=mangroves-1707987936195&dvIn[5][dvId]=gfw-environmental-layer&dvIn[5][cfg][clr]=%23A6FF59&dvIn[5][cfg][vis]=true&dvIn[5][dsC][0][ept]=context-tiles&dvIn[5][dsC][0][dsId]=public-mangroves&dvIn[6][id]=nitrate-1707987931553&dvIn[6][dvId]=~1&dvIn[6][cfg][clr]=%23FF6854&dvIn[6][cfg][colorRamp]=red&dvIn[6][cfg][vis]=true&dvIn[6][cfg][breaks][0]=0.01&dvIn[6][cfg][breaks][1]=0.051&dvIn[6][cfg][breaks][2]=0.108&dvIn[6][cfg][breaks][3]=0.167&dvIn[6][cfg][breaks][4]=0.223&dvIn[6][cfg][breaks][5]=0.283&dvIn[6][cfg][breaks][6]=0.365&dvIn[6][cfg][breaks][7]=0.458&dvIn[6][cfg][breaks][8]=0.543&dvIn[6][cfg][breaks][9]=0.553&dvIn[6][dsC][0][pms][0][id]=type&dvIn[6][dsC][0][pms][0][val]=~2&dvIn[6][dsC][0][ept]=~3&dvIn[6][dsC][0][dsId]=public-global-nitrate%3Av20231213&dvIn[7][id]=vessel-ba069b7b9-9148-2ea6-49c9-2b46893ef3a3&dvIn[7][dvId]=fishing-map-vessel-track&dvIn[7][cfg][track]=public-global-all-tracks%3Av20231026&dvIn[7][cfg][info]=public-global-vessel-identity%3Av20231026&dvIn[7][cfg][events][0]=public-global-fishing-events%3Av20231026&dvIn[7][cfg][events][1]=public-global-port-visits-c2-events%3Av20231026&dvIn[7][cfg][events][2]=public-global-encounters-events%3Av20231026&dvIn[7][cfg][events][3]=public-global-loitering-events%3Av20231026&dvIn[7][cfg][events][4]=public-global-gaps-events%3Av20231026&dvIn[7][cfg][clr]=%23F95E5E&dvIn[8][id]=~4&dvIn[8][cfg][vis]=true&dvIn[9][id]=~5&dvIn[9][cfg][vis]=false&dvIn[9][cfg][clr]=%23AD1457&dvIn[9][cfg][colorRamp]=jazzberry-jam&dvIn[10][id]=sar&dvIn[10][cfg][vis]=false&dvIn[11][id]=viirs&dvIn[11][cfg][vis]=false&dvIn[12][id]=~6&dvIn[12][cfg][vis]=true&dvIn[12][cfg][filters][flag][0]=PAK&dvIn[12][cfg][filters][vessel_type][0]=fishing&dvIn[13][id]=~7&dvIn[13][cfg][vis]=true&dvIn[14][id]=~8&dvIn[14][cfg][vis]=true&dvIn[15][id]=~9&dvIn[15][cfg][vis]=false&dvIn[16][id]=~10&dvIn[16][cfg][vis]=true&dvIn[16][cfg][breaks][0]=1&dvIn[16][cfg][breaks][1]=526.02&dvIn[16][cfg][breaks][2]=1308.85&dvIn[16][cfg][breaks][3]=1859.58&dvIn[16][cfg][breaks][4]=2382.49&dvIn[16][cfg][breaks][5]=2864.74&dvIn[16][cfg][breaks][6]=3211.38&dvIn[16][cfg][breaks][7]=3453.01&dvIn[16][cfg][breaks][8]=3691.81&dvIn[16][cfg][breaks][9]=3691.82&dvIn[17][id]=vms&dvIn[17][deleted]=true&timebarVisualisation=vessel&dvInOr[0]=basemap&dvInOr[1]=~8&dvInOr[2]=vms&dvInOr[3]=~6&dvInOr[4]=viirs&dvInOr[5]=sar&dvInOr[6]=~9&dvInOr[7]=~0&dvInOr[8]=~10&dvInOr[9]=~5&dvInOr[10]=~7&dvInOr[11]=context-layer-mpa&dvInOr[12]=context-layer-protectedseas&dvInOr[13]=context-layer-rfmo&dvInOr[14]=context-layer-high-seas&dvInOr[15]=fixed-sar-infrastructure&dvInOr[16]=~4&sO=advanced&lTD=&fTD=&timebarSelectedEnvId=~10&tk[0]=context-layer-graticules&tk[1]=heatmap-environmental-layer&tk[2]=heatmap&tk[3]=4wings-tiles&tk[4]=basemap-labels&tk[5]=context-layer-fao-areas&tk[6]=presence&tk[7]=context-layer-eez&tk[8]=fishing-ais&tk[9]=encounter-events&tk[10]=bathymetry-workspace";
        iframefishing.style.display = 'block';
        iframefishing.style.width = '175%';
        iframefishing.style.height = 'calc(100vh - 60px)'; // Adjust height to leave space for the navbar
        mainContainer2.appendChild(iframefishing);
    });
});
document.getElementById('plasticWasteToggle').addEventListener('click', function(event) {
    // Prevent the default behavior
    event.preventDefault();

    // Toggle the 'active' class on click
    this.classList.toggle('active');

    // Toggle the visibility of the plastic waste buttons
    var plasticWasteButtons = document.getElementById('plasticWasteDropdown');
    plasticWasteButtons.style.display = (plasticWasteButtons.style.display === 'none' || plasticWasteButtons.style.display === '') ? 'flex' : 'none';

    // Adjust the positions of seawater rise and sea water intrusion
    var seawaterRiseToggle = document.getElementById('seawaterRiseToggle');
    var seaWaterIntrusionToggle = document.getElementById('seaWaterIntrusionToggle');

    // Check if the elements exist before accessing their styles
    if (seawaterRiseToggle && seaWaterIntrusionToggle) {
        if (plasticWasteButtons.style.display === 'flex') {
            // If PlasticWaste buttons are visible, add a class to move seawater rise and sea water intrusion down
            // seawaterRiseToggle.classList.add('moved-down');
            seaWaterIntrusionToggle.classList.add('moved-down');
        } else {
            // If PlasticWaste buttons are hidden, remove the class to move seawater rise and sea water intrusion back to their original positions
            // seawaterRiseToggle.classList.remove('moved-down');
            seaWaterIntrusionToggle.classList.remove('moved-down');
        }
    }

    // Remove existing content from the main container and restore the map
    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = '';

    // Restore the map container styles
    //const mapContainer = document.getElementById('map');
    //mapContainer.style.zIndex = '0'; // Set the z-index to 0 or the appropriate value

    // Optionally, you may want to add other styles to reset the map container appearance
    // mapContainer.style.width = '100%';
    // mapContainer.style.height = '100vh';
});

// Preventing the default behavior and stopping event propagation for the PlasticWasteDropdown
document.getElementById('plasticWasteDropdown').addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
});
// creating an ad event listner for the plastic debris tab
// Add a click event listener to the EEZ Marine Surveillance 
document.addEventListener('DOMContentLoaded', function() {
    // Get the Mangroves button element
    const AcidificationButton = Array.from(document.querySelectorAll('.nav-button')).find(button => button.textContent.trim() === 'Plastic Debris Detection');

    // Add a click event listener to the Mangroves button
    AcidificationButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default behavior of the anchor tag

        // Remove existing content from the main container
        const mainContainer = document.getElementById('main-container');
        mainContainer.innerHTML = '';
        //document.getElementById('map').innerHTML = '';
        // Create and append the iframe for Mangroves
        var iframedebris = document.createElement('iframe');
        iframedebris.src = "https://browser.dataspace.copernicus.eu/?zoom=14&lat=24.79527&lng=66.95154&themeId=DEFAULT-THEME&visualizationUrl=https%3A%2F%2Fsh.dataspace.copernicus.eu%2Fogc%2Fwms%2F274a990e-7090-4676-8f7d-f1867e8474a7&evalscripturl=https%3A%2F%2Fcustom-scripts.sentinel-hub.com%2Fcustom-scripts%2Fsentinel-2%2Focean_plastic_detector%2Fscript.js&datasetId=S2_L1C_CDAS&fromTime=2018-08-29T00%3A00%3A00.000Z&toTime=2018-09-29T23%3A59%3A59.999Z&demSource3D=%22MAPZEN%22&cloudCoverage=30&dateMode=TIME%20RANGE#custom-script";
        iframedebris.style.display = 'block';
        iframedebris.style.width = '175%';
        iframedebris.style.height = 'calc(100vh - 60px)'; // Adjust height to leave space for the navbar
        mainContainer.appendChild(iframedebris);
    });
});
// creating a toggle functionality for sea surface temperature 

document.getElementById('seasurfacetemperatureToggle').addEventListener('click', function(event) {
    // Prevent the default behavior
    event.preventDefault();

    // Toggle the 'active' class on click
    this.classList.toggle('active');

    // Toggle the visibility of the plastic waste buttons
    var seasurfacetemperatureButtons = document.getElementById('seasurfacetemperatureDropdown');
    seasurfacetemperatureButtons.style.display = (seasurfacetemperatureButtons.style.display === 'none' || seasurfacetemperatureButtons.style.display === '') ? 'flex' : 'none';

    // Adjust the positions of seawater rise and sea water intrusion
    var seawaterRiseToggle = document.getElementById('seawaterRiseToggle');
    var seaWaterIntrusionToggle = document.getElementById('seaWaterIntrusionToggle');

    // Check if the elements exist before accessing their styles
    if (seawaterRiseToggle && seaWaterIntrusionToggle && plasticWasteToggle) {
        if (seasurfacetemperatureButtons.style.display === 'flex') {
            // If PlasticWaste buttons are visible, add a class to move seawater rise and sea water intrusion down
            // seawaterRiseToggle.classList.add('moved-down');
            Globalfishing.classList.add('moved-down');
        } else {
            // If PlasticWaste buttons are hidden, remove the class to move seawater rise and sea water intrusion back to their original positions
            // seawaterRiseToggle.classList.remove('moved-down');
            Globalfishing.classList.remove('moved-down');
        }
    }

    // Remove existing content from the main container and restore the map
    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = '';

    // Restore the map container styles
    //const mapContainer = document.getElementById('map');
    //mapContainer.style.zIndex = '0'; // Set the z-index to 0 or the appropriate value

    // Optionally, you may want to add other styles to reset the map container appearance
    // mapContainer.style.width = '100%';
    // mapContainer.style.height = '100vh';
});

// creating a toggle for mangroove watch
document.getElementById('MangrovecoverToggle').addEventListener('click', function (event) {
    event.preventDefault();

    this.classList.toggle('active');

    var MangrovecoverButtons = document.getElementById('MangrovecoverDropdown');
    MangrovecoverButtons.style.display = (MangrovecoverButtons.style.display === 'none' || MangrovecoverButtons.style.display === '') ? 'flex' : 'none';

    var seawaterRiseToggle = document.getElementById('seawaterRiseToggle');
    var seaWaterIntrusionToggle = document.getElementById('seaWaterIntrusionToggle');

    if (seawaterRiseToggle && seaWaterIntrusionToggle && plasticWasteToggle) {
        if (MangrovecoverButtons.style.display === 'flex') {
            seasurfacetemperatureToggle.classList.add('moved-down');
        } else {
            seasurfacetemperatureToggle.classList.remove('moved-down');
        }
    }

    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = '';
});

// creating an event togler for tsunami layer

// creating a toggle for mangroove watch
document.getElementById('TsunamiToggle').addEventListener('click', function (event) {
    event.preventDefault();

    this.classList.toggle('active');

    var TsunamiButtons = document.getElementById('TsunamiDropdown');
    TsunamiButtons.style.display = (TsunamiButtons.style.display === 'none' || TsunamiButtons.style.display === '') ? 'flex' : 'none';

    var seawaterRiseToggle = document.getElementById('seawaterRiseToggle');
    var seaWaterIntrusionToggle = document.getElementById('seaWaterIntrusionToggle');
    var navFooter = document.getElementById('nav-footer');
    // Toggle the 'moved-down' class on the nav-footer
    if (seawaterRiseToggle && seaWaterIntrusionToggle && plasticWasteToggle) {
        if (TsunamiButtons.style.display === 'flex') {
            navFooter.classList.add('moved-down');
        } else {
            navFooter.classList.remove('moved-down');
        }
    }
    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = '';
});

document.getElementById('MangrovecoverWatch').addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation(); // Stop the event from propagating to the parent

    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = '';

    var iframe1mangroves = document.createElement('iframe');
    iframe1mangroves.src = "https://www.globalmangrovewatch.org/country/PAK?bounds=[[55.458311544522985,22.010396573549514],[70.73443829913438,28.55903485079685]]&active=[%22mangrove_net_change%22,%22mangrove_habitat_extent%22]'";
    iframe1mangroves.style.display = 'block';
    iframe1mangroves.style.width = '175%';
    iframe1mangroves.style.height = 'calc(100vh - 60px)'; // Adjust height to leave space for the navbar
    mainContainer.appendChild(iframe1mangroves);
});

// Preventing the default behavior and stopping event propagation for the PlasticWasteDropdown
document.getElementById('seasurfacetemperatureDropdown').addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
});
// sea water intrusion
document.getElementById('seaWaterIntrusionToggle').addEventListener('click', function(event) {
    // Prevent the default behavior
    event.preventDefault();
    // Remove existing content from the main container and restore the map
    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = '';

    // Toggle the 'active' class on click
    this.classList.toggle('active');

    // Toggle the visibility of the dropdown menu
    var dropdown = document.getElementById('seaWaterIntrusionDropdown');
    dropdown.style.display = (dropdown.style.display === 'none' || dropdown.style.display === '') ? 'flex' : 'none';
});

document.addEventListener('DOMContentLoaded', function() {
    // Get the Scenario Based Sea Level Rise button element
    const seaLevelRiseButton = Array.from(document.querySelectorAll('.nav-button')).find(button => button.id === 'scenariosealevelriseanomalies');

    // Add a click event listener to the Scenario Based Sea Level Rise button
    seaLevelRiseButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default behavior of the anchor tag

        // Remove existing content from the main container
        const mainContainer = document.getElementById('main-container');
        mainContainer.innerHTML = '';

        // Create and append the video element for Scenario Based Sea Level Rise
        var videoElement = document.createElement('video');
        videoElement.id = 'okVideo';
        videoElement.autoplay = true;
        videoElement.loop = true;
        videoElement.muted = true;

        // Add video source
        var sourceElement = document.createElement('source');
        sourceElement.src = 'sea_level_rise_flood_inundation.mp4';
        sourceElement.type = 'video/mp4';

        // Append source to video element
        videoElement.appendChild(sourceElement);

        // Apply styling to the video element
        videoElement.style.width = '100%';  // Adjust the width as needed
        videoElement.style.height = '100%'; // Adjust the height as needed
        videoElement.style.objectFit = 'cover'; // Maintain aspect ratio and cover the container
        videoElement.style.marginTop = '120px'; // Maintain aspect ratio and cover the container

        // Display video element in the main container
        mainContainer.appendChild(videoElement);
    });
});
//test cases
/*
document.addEventListener('DOMContentLoaded', function() {
    // Get the saved state from localStorage
    const seaWaterIntrusionToggleState = localStorage.getItem('seaWaterIntrusionToggleState');
    const seaWaterIntrusionToggle = document.getElementById('seaWaterIntrusionToggle');
    const seaWaterIntrusionDropdown = document.getElementById('seaWaterIntrusionDropdown');

    // Set the initial state based on the saved state
    if (seaWaterIntrusionToggleState === 'active') {
        seaWaterIntrusionToggle.classList.add('active');
        seaWaterIntrusionDropdown.style.display = 'flex';
    }

    // Add a click event listener to the Sea Water Intrusion toggle
    seaWaterIntrusionToggle.addEventListener('click', function(event) {
        // Prevent the default behavior
        event.preventDefault();

        // Toggle the 'active' class on click
        seaWaterIntrusionToggle.classList.toggle('active');

        // Toggle the visibility of the dropdown menu
        seaWaterIntrusionDropdown.style.display = seaWaterIntrusionToggle.classList.contains('active') ? 'flex' : 'none';

        // Save the state to localStorage
        const newState = seaWaterIntrusionToggle.classList.contains('active') ? 'active' : 'inactive';
        localStorage.setItem('seaWaterIntrusionToggleState', newState);
    });

    // Add a click event listener to close the dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (
            event.target !== seaWaterIntrusionToggle &&
            event.target.closest('.sub-buttons') !== seaWaterIntrusionDropdown
        ) {
            seaWaterIntrusionToggle.classList.remove('active');
            seaWaterIntrusionDropdown.style.display = 'none';

            // Save the state to localStorage
            localStorage.setItem('seaWaterIntrusionToggleState', 'inactive');
        }
    });
});
*/

document.addEventListener('DOMContentLoaded', function() {
    const aboutButton = Array.from(document.querySelectorAll('.nav-button')).find(button => button.textContent.trim() === 'About');

    aboutButton.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.reload();
    });
});

document.getElementById('seawaterRiseToggle').addEventListener('click', function(event) {
    // Prevent the default behavior
    event.preventDefault();
    // Remove existing content from the main container and restore the map
    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = '';

    // Toggle the 'active' class on click
    this.classList.toggle('active');

    // Toggle the visibility of the dropdown menu
    var dropdown = document.getElementById('seawaterRiseDropdown');
    dropdown.style.display = (dropdown.style.display === 'none' || dropdown.style.display === '') ? 'flex' : 'none';
});

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

// Handle button click event
// button trigiering event for onemeter layer
document.getElementById('onemeter').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(savi23raster)
    map.removeControl(savi23rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
    map.removeLayer(Reflectance23)
    map.removeControl(reflectance23rasterLegend)
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
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    onemLayer.addTo(map);
});
// button trigiering event for twometer layer
document.getElementById('twometer').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(savi23raster)
    map.removeControl(savi23rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
    map.removeLayer(Reflectance23)
    map.removeControl(reflectance23rasterLegend)
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
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    twomLayer.addTo(map);
});
// button trigiering event for fivemeter layer
document.getElementById('fivemeter').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(savi23raster)
    map.removeControl(savi23rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
    map.removeLayer(Reflectance23)
    map.removeControl(reflectance23rasterLegend)
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
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    map.removeControl(MangrovecoverLegend)
    fivemLayer.addTo(map);
    //geoserver15.addTo(map);
});
// button trigiering event for tenmeter layer
document.getElementById('tenmeter').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(savi23raster)
    map.removeControl(savi23rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
    map.removeLayer(Reflectance23)
    map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeControl(legendLandcover)
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
    map.removeControl(TsunamiExposureLegend)
    map.removeLayer(landcover)
    tenmLayer.addTo(map);
});
//to add the plastic waste button
document.getElementById('plasticwaste').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(savi23raster)
    map.removeControl(savi23rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
    map.removeLayer(Reflectance23)
    map.removeControl(reflectance23rasterLegend)
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
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    map.addControl(infoplastic)
    map.addControl(legendplastic)
    map.addLayer(plasticwaste);
});
// to add Mismanaged button
document.getElementById('MissmanagedPW').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(savi23raster)
    map.removeControl(savi23rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
    map.removeLayer(Reflectance23)
    map.removeControl(reflectance23rasterLegend)
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
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    map.addControl(infomissmanaged)
    map.addControl(legendmissmanaged)
    map.addLayer(missmanaged);

});
// for missmanaged layer ocean
document.getElementById('MissmanagedPWocean').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(savi23raster)
    map.removeControl(savi23rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
    map.removeLayer(Reflectance23)
    map.removeControl(reflectance23rasterLegend)
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
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    map.addControl(infomissmanaged1)
    map.addControl(legendmissmanaged1)
    map.addLayer(missmanaged1);
});
//propability of plastic
document.getElementById('PropabilityOFPlastic(ocean)').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(savi23raster)
    map.removeControl(savi23rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
    map.removeLayer(Reflectance23)
    map.removeControl(reflectance23rasterLegend)
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
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    map.addLayer(propability)
    map.addControl(infopropability)
    map.addControl(legendpropability)
});
document.getElementById('PropabilityOFPlastic(ocean)').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(savi23raster)
    map.removeControl(savi23rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
    map.removeLayer(Reflectance23)
    map.removeControl(reflectance23rasterLegend)
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
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    map.addLayer(propability)
    map.addControl(infopropability)
    map.addControl(legendpropability)
});
document.getElementById('Savi15raster').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
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
    map.removeLayer(savi23raster)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
    map.removeLayer(Reflectance23)
    map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeControl(savi23rasterLegend)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
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
    map.removeControl(TsunamiExposureLegend)
    map.addLayer(savi15raster)
    map.addControl(savi15rasterLegend)
    
});

document.getElementById('Savi23').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
    map.removeLayer(Reflectance23)
    map.removeControl(reflectance23rasterLegend)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
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
    map.removeControl(TsunamiExposureLegend)
    map.addLayer(savi23raster)
    map.addControl(savi23rasterLegend)
});

document.getElementById('Reflectance15').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(savi23raster)
    map.removeControl(savi23rasterLegend)
    map.removeLayer(SalinityIndex21)
    map.removeLayer(SalinityIndex21boundry)
    map.removeControl(SalinityIndex21rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeControl(reflectance23rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
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
    map.removeControl(TsunamiExposureLegend)
    map.addLayer(Reflectance15)
    map.addControl(reflectance15rasterLegend)
});

document.getElementById('Reflectance23').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(savi23raster)
    map.removeControl(savi23rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
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
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    map.addLayer(Reflectance23)
    map.addControl(reflectance23rasterLegend)
});

document.getElementById('SalinityIndex21').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(savi23raster)
    map.removeControl(savi23rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
    map.removeLayer(Reflectance23)
    map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeLayer(SalinityIndex21boundry)
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
    map.removeControl(TsunamiExposureLegend)
    map.removeControl(MangrovecoverLegend)
    map.addLayer(SalinityIndex21)
    map.addControl(SalinityIndex21rasterLegend)
    
});

document.getElementById('SalineWaterBoundry').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(savi23raster)
    map.removeControl(savi23rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
    map.removeLayer(Reflectance23)
    map.removeControl(reflectance23rasterLegend)
    map.removeLayer(SalinityIndex20)
    map.removeControl(SalinityIndex20rasterLegend)
    map.removeControl(legendLandcover)
    map.removeLayer(landcover)
    map.removeLayer(SalinityIndex21)
    map.removeControl(SalinityIndex21rasterLegend)
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
    map.removeControl(TsunamiExposureLegend)
    map.removeControl(MangrovecoverLegend)
    map.addLayer(SalinityIndex21boundry)
    
});

document.getElementById('SalinityIndex20').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(savi23raster)
    map.removeControl(savi23rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
    map.removeLayer(Reflectance23)
    map.removeControl(reflectance23rasterLegend)
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
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    map.addControl(SalinityIndex20rasterLegend)
    map.addLayer(SalinityIndex20)
});

document.getElementById('landcovermodisgibs').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(savi23raster)
    map.removeControl(savi23rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
    map.removeLayer(Reflectance23)
    map.removeControl(reflectance23rasterLegend)
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
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    map.removeControl(MangrovecoverLegend)
    map.addLayer(landcover)
});

document.getElementById('GIBSGlobalSalinityMonthly').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(savi23raster)
    map.removeControl(savi23rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
    map.removeLayer(Reflectance23)
    map.removeControl(reflectance23rasterLegend)
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
    map.removeLayer(geoservermangroveSandspit)
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    map.removeControl(MangrovecoverLegend)
    map.addLayer(geoservergibssalinityMonthly)
});

document.getElementById('GIBSGlobalSalinityDaily').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(savi23raster)
    map.removeControl(savi23rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
    map.removeLayer(Reflectance23)
    map.removeControl(reflectance23rasterLegend)
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
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    map.addLayer(geoservergibssalinityDaily)
});

document.getElementById('globalsealevelriseanomaly').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(savi23raster)
    map.removeControl(savi23rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
    map.removeLayer(Reflectance23)
    map.removeControl(reflectance23rasterLegend)
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
    map.removeControl(TsunamiExposureLegend)
    map.removeLayer(geoservergibsseasurfacetempratureanomalies)
    map.addLayer(geoservergibssealevelriseanomalies)
});
document.getElementById('coastalfloodprojection100').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(savi23raster)
    map.removeControl(savi23rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
    map.removeLayer(Reflectance23)
    map.removeControl(reflectance23rasterLegend)
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
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    map.addLayer(coastalfloodprojection100)
    map.addControl(sealevelrisecmessLegend)
});


document.getElementById('SeaSurfaceTemperaturemonthlyday').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(savi23raster)
    map.removeControl(savi23rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
    map.removeLayer(Reflectance23)
    map.removeControl(reflectance23rasterLegend)
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
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    map.addControl(seasurfacetemperaturedayLegend)
});

document.getElementById('SeaSurfaceTemperaturemonthlynight').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(savi23raster)
    map.removeControl(savi23rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
    map.removeLayer(Reflectance23)
    map.removeControl(reflectance23rasterLegend)
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
    map.removeControl(TsunamiExposureLegend)
    map.removeControl(MangrovecoverLegend)
    map.addControl(seasurfacetemperaturedayLegend)
    map.addLayer(geoservergibsseasurfacetempraturenight)
    
});

document.getElementById('Seasurfacetemperatureanomalies').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(savi23raster)
    map.removeControl(savi23rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
    map.removeLayer(Reflectance23)
    map.removeControl(reflectance23rasterLegend)
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
    map.removeControl(TsunamiExposureLegend)
    map.removeControl(MangrovecoverLegend)
    map.removeControl(MangrovecoverLegend)
    map.addControl(seasurfacetemperatureanomaliesLegend)
    map.addLayer(geoservergibsseasurfacetempratureanomalies)
    
});

document.getElementById('Mangrovecoverindus').addEventListener('click', function() {
    // Add the GeoJSON layer to the map
    event.preventDefault();
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(savi23raster)
    map.removeControl(savi23rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
    map.removeLayer(Reflectance23)
    map.removeControl(reflectance23rasterLegend)
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
    map.removeControl(TsunamiExposureLegend)
    map.addLayer(geoservermangroveindusdelta)
    map.addControl(MangrovecoverLegend)
    
});

document.getElementById('MangrovecoverJiwani').addEventListener('click', function() {
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(savi23raster)
    map.removeControl(savi23rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
    map.removeLayer(Reflectance23)
    map.removeControl(reflectance23rasterLegend)
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
    map.removeControl(TsunamiExposureLegend)
    map.addControl(MangrovecoverLegend)
    
});

document.getElementById('MangrovecoverKalmatKhor').addEventListener('click', function() {
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(savi23raster)
    map.removeControl(savi23rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
    map.removeLayer(Reflectance23)
    map.removeControl(reflectance23rasterLegend)
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
    map.removeControl(TsunamiExposureLegend)
    map.addLayer(geoservermangroveKalmatKhor)
    map.addControl(MangrovecoverLegend)
    
});

document.getElementById('MangrovecoverKalmatSonmianiKhor').addEventListener('click', function() {
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(savi23raster)
    map.removeControl(savi23rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
    map.removeLayer(Reflectance23)
    map.removeControl(reflectance23rasterLegend)
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
    map.removeLayer(geoservermangroveSandspit)
    map.removeLayer(geoservertsunamifrequency)
    map.removeControl(TsunamiFrequencyLegend)
    map.removeLayer(geoservertsunamiprojection100)
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    map.addLayer(geoservermangroveSonmianiKhor)
    map.addControl(MangrovecoverLegend)
});

document.getElementById('MangrovecoverSandspit').addEventListener('click', function() {
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(savi23raster)
    map.removeControl(savi23rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
    map.removeLayer(Reflectance23)
    map.removeControl(reflectance23rasterLegend)
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
    map.removeControl(TsunamiProjectionLegend)
    map.removeLayer(geoservertsunamiexposure)
    map.removeControl(TsunamiExposureLegend)
    map.addLayer(geoservermangroveSandspit)
    map.addControl(MangrovecoverLegend)
});

document.getElementById('TsunamiExposurepoppersqkm').addEventListener('click', function() {
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(savi23raster)
    map.removeControl(savi23rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
    map.removeLayer(Reflectance23)
    map.removeControl(reflectance23rasterLegend)
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
    map.addLayer(geoservertsunamiexposure)
    map.addControl(TsunamiExposureLegend)
});
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(savi23raster)
    map.removeControl(savi23rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
    map.removeLayer(Reflectance23)
    map.removeControl(reflectance23rasterLegend)
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
    map.addLayer(geoservertsunamifrequency)
    map.addControl(TsunamiFrequencyLegend)
});


document.getElementById('Tsunamihazardprojection').addEventListener('click', function() {
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
    map.removeLayer(savi15raster)
    map.removeControl(savi15rasterLegend)
    map.removeLayer(savi23raster)
    map.removeControl(savi23rasterLegend)
    map.removeLayer(Reflectance15)
    map.removeControl(reflectance15rasterLegend)
    map.removeLayer(Reflectance23)
    map.removeControl(reflectance23rasterLegend)
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
    map.addLayer(geoservertsunamiprojection100)
    map.addControl(TsunamiProjectionLegend)
    
});

