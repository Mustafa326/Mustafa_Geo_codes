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

// Add the Mapbox tile layer to the baseMaps object

// Add the Mapbox tile layer to the map
mapboxTileLayer.addTo(map).bringToBack();

// Create an object to hold the different map layers
const baseMaps = {
    "Esri World Imagery": esriWorldImagery,
    "Mapbox Satellite Streets": mapboxTileLayer,
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
// using color fuction to generate style for geojason for missmanaged variable
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
//using color fuction to generate style for geojason for missmanaged_1 variable
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
    // creating the missmanaged_1 geojason keep in mind that plasticwaste is the variable in which the geojson data is stored in
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
});
// trying  geotiff via geoserver 
//Geoserver layers through the use of L.tilelayers


var geoserver15 = L.tileLayer.wms("http://localhost:8081/geoserver/NDMA_Rasters/wms", { layers: 'savi15', format: 'image/png', transparent: true, srs: 'EPSG:3857' }) //.addTo(map)
geoserver15.setOpacity(1.0)
var savi15raster = L.layerGroup([geoserver15])
var geoserver23 = L.tileLayer.wms("http://localhost:8081/geoserver/NDMA_Rasters/wms", { layers: 'savi23', format: 'image/png', transparent: true, srs: 'EPSG:3857' }) //.addTo(map)
geoserver23.setOpacity(1.0)
var savi23raster = L.layerGroup([geoserver23])
var geoserverRef15 = L.tileLayer.wms("http://localhost:8081/geoserver/NDMA_Rasters/wms", { layers: 'reflectance15', format: 'image/png', transparent: true, srs: 'EPSG:3857' }) //.addTo(map)
geoserverRef15.setOpacity(1.0)
var Reflectance15 = L.layerGroup([geoserverRef15])

var geoserverRef23 = L.tileLayer.wms("http://localhost:8081/geoserver/NDMA_Rasters/wms", { layers: 'reflectance23', format: 'image/png', transparent: true, srs: 'EPSG:3857' }) //.addTo(map)
geoserverRef23.setOpacity(1.0)
var Reflectance23 = L.layerGroup([geoserverRef23])

var plasticwaste = L.layerGroup([plastic_wastegeojsondata]);
var missmanaged = L.layerGroup([missmanagedgeojsondata]);
var missmanaged1 = L.layerGroup([missmanagedgeojsondata1]);
var propability = L.layerGroup([propabilitygeojsondata]);
//creating overlays
var overlayMaps = {
    "District": district,
    "Savi15": savi15raster,
    "Savi23": savi23raster,
    "Reflectance15": Reflectance15,
    "Reflectance23": Reflectance23,

};
L.control.layers(baseMaps, overlayMaps, { position: 'topright', }).addTo(map);
// function to highlight features for the plastic waste layer
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

// Get the Mangroves button element
const mangrovesButton = Array.from(document.querySelectorAll('.nav-button')).find(button => button.textContent.trim() === 'Mangroves');

// Add a click event listener to the Mangroves button
document.addEventListener('DOMContentLoaded', function() {
    // Get the Mangroves button element
    const mangrovesButton = Array.from(document.querySelectorAll('.nav-button')).find(button => button.textContent.trim() === 'Mangroves');

    // Add a click event listener to the Mangroves button
    mangrovesButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default behavior of the anchor tag

        // Remove existing content from the main container
        const mainContainer = document.getElementById('main-container');
        mainContainer.innerHTML = '';
        //document.getElementById('map').innerHTML = '';

        // Create and append the iframe for Mangroves
        var iframe1mangroves = document.createElement('iframe');
        iframe1mangroves.src = "https://www.globalmangrovewatch.org/country/PAK?bounds=[[55.458311544522985,22.010396573549514],[70.73443829913438,28.55903485079685]]&active=[%22mangrove_net_change%22,%22mangrove_habitat_extent%22]'";
        iframe1mangroves.style.display = 'block';
        iframe1mangroves.style.width = '175%';
        iframe1mangroves.style.height = 'calc(100vh - 60px)'; // Adjust height to leave space for the navbar
        mainContainer.appendChild(iframe1mangroves);
    });
});

// Add a click event listener to the Accidification button
document.addEventListener('DOMContentLoaded', function() {
    // Get the Mangroves button element
    const AcidificationButton = Array.from(document.querySelectorAll('.nav-button')).find(button => button.textContent.trim() === 'Costal Acidification');

    // Add a click event listener to the Mangroves button
    AcidificationButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default behavior of the anchor tag

        // Remove existing content from the main container
        const mainContainer2 = document.getElementById('main-container');
        mainContainer2.innerHTML = '';
        //document.getElementById('map').innerHTML = '';

        // Create and append the iframe for Mangroves
        var iframeAcidification = document.createElement('iframe');
        iframeAcidification.src = "https://acidification.oceandatalab.com/?date=2022-12-29T11:59:59&timespan=1d&extent=5963311.1727652_2472890.7638388_8311456.681359_3587036.8879684&center=7137383.9270621_3029963.8259036&zoom=7&products=3857_OceanCarbNN-drivers-sst_raster&selection=1&opacity=100&stackLevel=50.06";
        iframeAcidification.style.display = 'block';
        iframeAcidification.style.width = '175%';
        iframeAcidification.style.height = 'calc(100vh - 60px)'; // Adjust height to leave space for the navbar
        mainContainer2.appendChild(iframeAcidification);
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
// sea water intrusion
document.getElementById('seaWaterIntrusionToggle').addEventListener('click', function(event) {
    // Prevent the default behavior
    event.preventDefault();

    // Toggle the 'active' class on click
    this.classList.toggle('active');

    // Toggle the visibility of the dropdown menu
    var dropdown = document.getElementById('seaWaterIntrusionDropdown');
    dropdown.style.display = (dropdown.style.display === 'none' || dropdown.style.display === '') ? 'flex' : 'none';
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
    const landcoverButton = Array.from(document.querySelectorAll('.nav-button')).find(button => button.textContent.trim() === 'Landcover');

    landcoverButton.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.reload();
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const aboutButton = Array.from(document.querySelectorAll('.nav-button')).find(button => button.textContent.trim() === 'Landcover');

    aboutButton.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.reload();
    });
});

document.getElementById('seawaterRiseToggle').addEventListener('click', function(event) {
    // Prevent the default behavior
    event.preventDefault();

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
    map.removeLayer(savi23raster)
    map.removeLayer(Reflectance15)
    map.removeLayer(Reflectance23)
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
    map.removeLayer(savi23raster)
    map.removeLayer(Reflectance15)
    map.removeLayer(Reflectance23)
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
    map.removeLayer(savi23raster)
    map.removeLayer(Reflectance15)
    map.removeLayer(Reflectance23)
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
    map.removeLayer(savi23raster)
    map.removeLayer(Reflectance15)
    map.removeLayer(Reflectance23)
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
    map.removeLayer(savi23raster)
    map.removeLayer(Reflectance15)
    map.removeLayer(Reflectance23)
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
    map.removeLayer(savi23raster)
    map.removeLayer(Reflectance15)
    map.removeLayer(Reflectance23)
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
    map.removeLayer(savi23raster)
    map.removeLayer(Reflectance15)
    map.removeLayer(Reflectance23)
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
    map.removeLayer(savi23raster)
    map.removeLayer(Reflectance15)
    map.removeLayer(Reflectance23)
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
    map.removeLayer(savi23raster)
    map.removeLayer(Reflectance15)
    map.removeLayer(Reflectance23)
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
        //geoserver15.addTo(map)
    map.addLayer(savi15raster)
    map.removeLayer(savi23raster)
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
        //geoserver15.addTo(map)
    map.removeLayer(savi15raster)
    map.addLayer(savi23raster)
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
        //geoserver15.addTo(map)
    map.removeLayer(savi15raster)
    map.removeLayer(savi23raster)
    map.addLayer(Reflectance15)
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
        //geoserver15.addTo(map)
    map.removeLayer(savi15raster)
    map.removeLayer(savi23raster)
    map.removeLayer(Reflectance15)
    map.addLayer(Reflectance23)
});