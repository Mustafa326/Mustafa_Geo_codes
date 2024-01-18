// Declaration of variables containing latitude and longitude
var myLat = 0;
var myLong = 0;
var lathome = 33.738045;
var longhome = 73.084488;
var zoom = 2;
coordinates = [lathome, longhome]

// Assigning maximum and minimum magnitude
var min_E_Mag = 0;
var max_E_Mag = 7;

// Scale factor
var ScaleFactor = 10;

// Creation of a map variable
var map = L.map('Map', { zoomControl: false, fullscreenControl: true, fullscreenControlOptions: { position: 'topleft' } }).setView([myLat, myLong], zoom);

// Map tile layer
var osm = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 2
}).addTo(map);

// Home button on the map
var zoomHome = L.Control.zoomHome({ homeZoom: 4 }).addTo(map);
//changing the zoom home coordinates to the desired cordinates
zoomHome.setHomeCoordinates(coordinates)

// Function to calculate the size of the SVG accordingly to the parameters(earthquake magnitude) in the usgs url
function iconsbymagnitude(f) {
    var calculatedSize = (Math.sqrt(((f.properties.mag) * 100) / Math.PI) * 3);

    // Create svg earthquake icons
    return L.icon({
        iconUrl: 'earthquake.svg',
        iconSize: [calculatedSize, calculatedSize]
    });
}

// Different svg icons for different hazards
function getEventIcon(f) {
    var eventType = f.properties.categories[0].id.toLowerCase();
    return L.icon({
        iconUrl: eventType + '.svg', // Assuming SVG icons are named based on event type
        iconSize: [32, 32], // Adjust the size as needed
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
}

// Function to get popup content for EONET events
function getPopupContent(properties) {
    var popupContent = `<b>${properties.title}</b><br>${new Date(properties.date).toUTCString()}`;

    // Check if magnitudeUnit and magnitudeValue exist, and add them to the popup content
    if (properties.magnitudeUnit && properties.magnitudeValue) {
        popupContent += `<br>Magnitude: <strong>${properties.magnitudeValue} ${properties.magnitudeUnit}</strong>`;
    }

    return popupContent;
}
// Create a function to generate a custom cluster icon for the nasa eonet
function createCustomClusterIcon(cluster) {
    var childCount = cluster.getChildCount();
    var size = 40;

    // Customize the SVG icon as needed
    var svgIcon = L.divIcon({
        html: `<div style="width: ${size}px; height: ${size}px;" class="custom-cluster-icon">
                  <img src="Natural_hazard.svg" alt="Cluster Icon" width="${size}" height="${size}">
                  <div class="cluster-count">${childCount}</div>
              </div>`,
        className: 'custom-cluster',
        iconSize: [size, size]
    });

    return svgIcon;
}
// Create a function to generate a custom cluster icon for the usgs earthquakes
function createCustomClusterIcon2(cluster) {
    var childCount = cluster.getChildCount();
    var size = 40;

    // Customize the SVG icon as needed
    var svgIcon = L.divIcon({
        html: `<div style="width: ${size}px; height: ${size}px;" class="custom-cluster-icon">
                  <img src="earthquake_cluster.svg" alt="Cluster Icon" width="${size}" height="${size}">
                  <div class="cluster-count">${childCount}</div>
              </div>`,
        className: 'custom-cluster',
        iconSize: [size, size]
    });

    return svgIcon;
}


// Using the leaflet realtime for update of usgs earthquake data
function createRealtimeLayer(url, container) {
    return L.realtime(url, {
        interval: 60 * 1000,
        getFeatureId: function(f) {
            return f.properties.url;
        },
        pointToLayer: function(f, latlng) {
            return L.marker(latlng, {
                icon: iconsbymagnitude(f)
            });
        },
        cache: true,
        container: container,
        onEachFeature(f, l) {
            l.on({
                mouseover: function(e) {
                    highlightFeature(e, l);
                },
                mouseout: function(e) {
                    resetHighlight(e, l);
                }
            });
            return l;
        }
    });
}

// Create feature group for different earthquake layers
var clusterGroup = L.markerClusterGroup({
    iconCreateFunction: createCustomClusterIcon2
}).addTo(map);
//clusterGroup = L.markerClusterGroup().addTo(map);
subgroup1 = L.featureGroup.subGroup(clusterGroup);
subgroup2 = L.featureGroup.subGroup(clusterGroup);
subgroup3 = L.featureGroup.subGroup(clusterGroup);
subgroup4 = L.featureGroup.subGroup(clusterGroup);

// Adding the URL API of USGS to leaflet realtime
realtimeallhour = createRealtimeLayer('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson', subgroup1);
realtimeallday = createRealtimeLayer('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson', subgroup2);
realtimeallweek = createRealtimeLayer('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson', subgroup3);
realtimeallmonth = createRealtimeLayer('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson', subgroup4);

// Function to add legend symbols based on event titles of the nasa eonet event layer fetched from api
function addLegendSymbols(eventTypes) {
    var legendContainer = document.querySelector('.legend');
    var symbolsContainer = legendContainer.querySelector('.symbolsContainer');

    // Function to check if 'NASA EONET Events' layer is selected
    function isEonetLayerSelected() {
        return map.hasLayer(eonetIconsClusterGroup);
    }

    // Function to update legend based on layer control selection
    function updateLegend() {
        // Select only the symbols related to 'NASA EONET Events' layer
        var eonetSymbols = symbolsContainer.querySelectorAll('.eonet-symbol');

        // Remove symbols related to 'NASA EONET Events' layer
        eonetSymbols.forEach(function(symbol) {
            symbol.remove();
        });

        // Check if 'NASA EONET Events' layer is selected before adding to the legend
        if (isEonetLayerSelected()) {
            // Add heading for other natural hazards if it doesn't exist
            if (!symbolsContainer.querySelector('.other-hazards-heading')) {
                var heading = document.createElement("h2");
                heading.className = "other-hazards-heading";
                heading.textContent = "Other Natural Hazards";
                symbolsContainer.appendChild(heading);
            }

            eventTypes.forEach(function(type) {
                var legendCircle = document.createElement("div");
                legendCircle.className = "legendCircle eonet-symbol"; // Add class for 'NASA EONET Events' layer
                legendCircle.innerHTML = "<img src=" + type.toLowerCase() + '.svg height=\'32\' width=\'32\'> ' +
                    "<span class='legendValue'><br>" + type + "</span>";

                symbolsContainer.appendChild(legendCircle);
            });
        }
    }



    // Listen for 'add' and 'remove' events on the 'NASA EONET Events' layer
    eonetIconsClusterGroup.on('add remove', function() {
        updateLegend();
    });

    // Initial legend setup
    updateLegend();
}
// New layer for NASA EONET API natural disasters
var eonetLayer;
var eonetIconsClusterGroup;

// Fetch EONET data using AJAX
$.ajax({
    url: 'https://eonet.gsfc.nasa.gov/api/v3/events/geojson',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
        if (data && Array.isArray(data.features)) {
            var eventTypes = new Set();

            eonetLayer = L.geoJSON(data, {
                pointToLayer: function(f, latlng) {
                    // Add event type to the set
                    eventTypes.add(f.properties.categories[0].id.toLowerCase());
                    return L.marker(latlng, {
                        icon: getEventIcon(f)
                    });
                },
                onEachFeature: function(feature, layer) {
                    layer.bindPopup(getPopupContent(feature.properties));

                    layer.on('popupopen', function() {
                        // Accessing additional properties such as magnitudeUnit and magnitudeValue
                        var magnitudeUnit = feature.properties.magnitudeUnit;
                        var magnitudeValue = feature.properties.magnitudeValue;
                        // You can also access other properties like title, date, etc.
                        var eventName = feature.properties.title;
                        var eventDate = feature.properties.date;

                        // Log the values to the console (you can modify this as needed)
                        console.log('Event Name:', eventName);
                        console.log('Event Date:', eventDate);
                        console.log('Magnitude Unit:', magnitudeUnit);
                        console.log('Magnitude Value:', magnitudeValue);
                    });
                }
            });

            // Create a marker cluster group for EONET icons
            eonetIconsClusterGroup = L.markerClusterGroup({
                    iconCreateFunction: createCustomClusterIcon
                }) //.addTo(map);

            // Add EONET layer to the marker cluster group
            eonetIconsClusterGroup.addLayer(eonetLayer);

            // Add EONET layer to the layer control (but initially don't add to the map)
            overlayMaps['NASA EONET Events'] = eonetIconsClusterGroup;
            layerControl.addOverlay(eonetIconsClusterGroup, 'NASA EONET Events');

            // Add legend for EONET layer
            addLegendSymbols(Array.from(eventTypes));
        } else {
            console.error('Invalid GeoJSON structure in EONET data:', data);
        }
    },
    error: function(error) {
        console.error('Error fetching EONET data:', error);
    }
});
// using the leaflet realtime rain pluggin
var rainviewer = L.control.rainviewer({
    position: 'bottomleft',
    nextButtonText: '>',
    playStopButtonText: 'Start/Stop',
    prevButtonText: '<',
    positionSliderLabelText: "Time:",
    opacitySliderLabelText: "Opacity:",
    animationInterval: 500,
    opacity: 0.5
}).addTo(map);
// Basemaps for layer control
var baseMaps = {
    "OpenStreetMap": osm,
};

var overlayMaps = {
    'Earthquakes in hours': realtimeallhour,
    'Earthquakes in days': realtimeallday,
    'Earthquakes in weeks': realtimeallweek,
    'Earthquakes in months': realtimeallmonth
};

// Layer control with initially collapsed state
var layerControl = L.control.layers(baseMaps, overlayMaps, { position: 'topleft', collapsed: true }).addTo(map);

// Legend for the SVG icon
var legend = L.control({ position: 'bottomright' });
legend.onAdd = function(map) {
    var legendContainer = L.DomUtil.create("div", "legend");
    var symbolsContainer = L.DomUtil.create("div", "symbolsContainer");
    var classes = [min_E_Mag, (max_E_Mag - min_E_Mag) / 2, max_E_Mag];
    var legendCircle;
    var lastRadius = 0;
    var currentRadius;
    var margin;

    L.DomEvent.addListener(legendContainer, 'mousedown', function(e) {
        L.DomEvent.stopPropagation(e);
    });

    $(legendContainer).append("<h2 id='legendTitle'>Earthquakes By magnitude</h2>");

    for (var i = 0; i <= classes.length - 1; i++) {
        legendCircle = L.DomUtil.create("div", "legendCircle");
        var area = classes[i] * ScaleFactor;
        currentRadius = Math.sqrt(area / Math.PI) * 7;

        var iconSize = currentRadius * 2;
        var margin = 6;

        $(legendCircle).attr("style", "width: " + iconSize + "px; height: " + iconSize + "px; margin-right: " + margin + "px");
        legendCircle.innerHTML += ("<img src=earthquake.svg height='" + iconSize + "' width='" + iconSize + "'>");
        $(legendCircle).append("<span class='legendValue'>" + '<br>' + classes[i] + "</span>");

        $(symbolsContainer).append(legendCircle);

        if (i < classes.length - 1) {
            $(symbolsContainer).append("<div style='width: " + margin + "px; display: inline-block;'></div>");
        }
    }

    $(legendContainer).append(symbolsContainer);
    return legendContainer;
};
legend.addTo(map);

var info = L.control();

info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function(props) {
    this._div.innerHTML = '<h4>Earthquake Information</h4>' + (props ?
        '<b>' + props.place + '</b><br />' +
        '<p>' + new Date(props.time) +
        '<br/>Magnitude: <strong>' + props.mag + '</strong></p>' +
        '<br/>Alert Message: <strong>' + props.alert + '</strong></p>' +
        '<br/>Tsunami occurrence: <strong>' + props.tsunami + '</strong></p>' +
        '<p><a href="' + props.url + '">More information</a></p>' :
        'Hover over an occurred earthquake');
};

function highlightFeature(e, layer) {
    var properties = layer.feature.properties;
    info.update(properties);
}

function resetHighlight(e, layer) {
    info.update();
}

info.addTo(map);

// trying to fetch corresponding layers 
/*
// load satellite layer 
// Function to load satellite layer for EONET events
function loadSatelliteLayer(feature, layer) {
    var sources = feature.properties.sources;

    if (Array.isArray(sources) && sources.length > 0) {
        var eventLayers = sources.map(source => source.id);

        // Loop through each event layer
        eventLayers.forEach(eventLayer => {
            $.ajax({
                url: `https://eonet.gsfc.nasa.gov/api/v3/layers/${eventLayer}`,
                type: 'GET',
                dataType: 'json',
                success: function(data) {
                    if (data && Array.isArray(data.categories)) {
                        // Find the layer with the specified name
                        var targetLayer = null;
                        data.categories.forEach(function(category) {
                            category.layers.forEach(function(apiLayer) {
                                if (apiLayer.name === eventLayer) {
                                    targetLayer = apiLayer;
                                }
                            });
                        });

                        // Check if the layer is found
                        if (targetLayer) {
                            // Access the layer properties and create a WMTS layer
                            var serviceUrl = targetLayer.serviceUrl;
                            var parameters = targetLayer.parameters;

                            if (serviceUrl && parameters && parameters.length > 0) {
                                // Create a new WMTS layer
                                var wmtsLayer = L.tileLayer.wms(serviceUrl, {
                                    layer: targetLayer.name,
                                    tilematrixSet: parameters[0].TILEMATRIXSET,
                                    format: parameters[0].FORMAT,
                                    attribution: 'NASA EONET'
                                });

                                // Add the WMTS layer to the map
                                wmtsLayer.addTo(map);
                            } else {
                                console.error('Invalid layer parameters:', targetLayer);
                            }
                        } else {
                            console.error('Layer not found in EONET Layers API:', eventLayer);
                        }
                    } else {
                        console.error('Invalid structure in EONET Layers API response:', data);
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Error fetching layers data from NASA EONET Layers API:', status, error);
                }
            });
        });
    } else {
        console.error('Invalid sources in EONET feature properties:', sources);
    }
}
// another method 
// Fetch EONET data using AJAX
$.ajax({
    url: 'https://eonet.gsfc.nasa.gov/api/v3/layers',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
        if (data && Array.isArray(data.categories)) {
            data.categories.forEach(function(category) {
                category.layers.forEach(function(layer) {
                    // Extract necessary information from the layer
                    var layerName = layer.name;
                    var serviceUrl = layer.serviceUrl;
                    var parameters = layer.parameters;

                    // Create a WMTS layer for each layer
                    if (parameters && parameters.length > 0 && layer.serviceTypeId === 'WMTS_1_0_0') {
                        var wmtsLayer = L.tileLayer.wms(serviceUrl, {
                            layer: layerName,
                            tilematrixSet: parameters[0].TILEMATRIXSET,
                            format: parameters[0].FORMAT,
                            attribution: 'NASA EONET'
                        });

                        // Add the WMTS layer to the map
                        wmtsLayer.addTo(map);
                    }
                });
            });
        } else {
            console.error('Invalid structure in EONET Layers API response:', data);
        }
    },
    error: function(error) {
        console.error('Error fetching EONET Layers API data:', error);
    }
});
*/