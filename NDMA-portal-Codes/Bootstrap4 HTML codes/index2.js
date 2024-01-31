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

map.addControl(new mapboxgl.ScaleControl());

map.on("style.load", () => {
  map.setFog({});
  map.addSource("mapbox-dem", {
    type: "raster-dem",
    url: "mapbox://styles/mapbox/dark-v11",
    tileSize: 512,
    maxzoom: 20,
  });

  map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });

  // Add your WMS source and layer here, inside the style.load event
  map.addSource("wms-frequency_raster", {
    type: "raster",
    tiles: [
      "http://localhost:8080/geoserver/Abdullah_shah/wms?service=WMS&version=1.1.0&request=GetMap&layers=Abdullah_shah:savi23&bbox={bbox-epsg-3857}&width=768&height=558&srs=EPSG:3857&styles=&format=image/png&transparent=true",
    ],
    tileSize: 256,
  });

  map.addLayer({
    id: "wms-layer",
    type: "raster",
    source: "wms-frequency_raster",
    paint: { "raster-opacity": 1 },
    minzoom: 0,
    visibility: "visible",
  });

  // After adding the source and layer, you can initiate the flyTo
  setTimeout(() => {
    map.flyTo({ center: targetCoordinate, zoom: 3, speed: 0.6 });
  }, 1000);
});
