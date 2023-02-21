mapboxgl.accessToken =
    'pk.eyJ1IjoicWlydW5qIiwiYSI6ImNsMnBpMnozNTAyY3YzZGxsYXVpMmljaXcifQ.pkhT0lAeNUTSzA73AwtBvA';
let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/qirunj/cldqzc0v5004d01r0e866ytuq', // style URL
    center: [-122.31833875069155,47.62139336325135], // starting position [lng, lat]
    zoom: 11, // starting zoom
});

map.on('load', () => { //simplifying the function statement: arrow with brackets to define a function

    map.addSource('basemap', {
        'type': 'raster',
        'tiles': [
            'assets/map1/{z}/{x}/{y}.png'
        ],
        'tileSize': 256,
        'attribution': 'Map tiles designed by Bo Zhao</a>'
    });
  
    map.addLayer({
        'id': 'basemap',
        'type': 'raster',
        'layout': {
            // 'visibility': 'none'
              // Uncomment the line above will hide this map layer at first.
              // This will be useful when you have multiple layers added to your map.
        },
        'source': 'basemap'
    });
  
    map.addSource('data', {
        'type': 'raster',
        'tiles': [
            'assets/map2/{z}/{x}/{y}.png'
        ],
        'tileSize': 256,
        'attribution': 'Map tiles designed by Bo Zhao</a>'
    });
  
    map.addLayer({
        'id': 'data',
        'type': 'raster',
        'layout': {
            // 'visibility': 'none'
              // Uncomment the line above will hide this map layer at first.
              // This will be useful when you have multiple layers added to your map.
        },
        'source': 'data'
    });

    map.addSource('thematicLayer', {
        'type': 'raster',
        'tiles': [
            'assets/map3/{z}/{x}/{y}.png'
        ],
        'tileSize': 256,
        'attribution': 'Map tiles designed by Bo Zhao</a>'
    });
  
    map.addLayer({
        'id': 'thematicLayer',
        'type': 'raster',
        'layout': {
            // 'visibility': 'none'
              // Uncomment the line above will hide this map layer at first.
              // This will be useful when you have multiple layers added to your map.
        },
        'source': 'thematicLayer'
    });

    map.addSource('mapDesign', {
        'type': 'raster',
        'tiles': [
            'assets/map4/{z}/{x}/{y}.png'
        ],
        'tileSize': 256,
        'attribution': 'Map tiles designed by Bo Zhao</a>'
    });
  
    map.addLayer({
        'id': 'mapDesign',
        'type': 'raster',
        'layout': {
            // 'visibility': 'none'
              // Uncomment the line above will hide this map layer at first.
              // This will be useful when you have multiple layers added to your map.
        },
        'source': 'mapDesign'
    });
  });

// After the last frame rendered before the map enters an "idle" state.
map.on('idle', () => {
    // If these two layers were not added to the map, abort
    if (!map.getLayer('basemap') || !map.getLayer('data') || !map.getLayer('thematicLayer') || !map.getLayer('mapDesign')) {
        return;
    }

    // Enumerate ids of the layers.
    const toggleableLayerIds = ['base', 'data', 'thematicLayer', 'mapDesign'];

    // Set up the corresponding toggle button for each layer.
    for (const id of toggleableLayerIds) {
        // Skip layers that already have a button set up.
        if (document.getElementById(id)) {
            continue;
        }

        // Create a link.
        const link = document.createElement('a');
        link.id = id;
        link.href = '#';
        link.textContent = id;
        link.className = 'inactive';

        // Show or hide layer when the toggle is clicked.
        link.onclick = function (e) {
            const clickedLayer = this.textContent;
            // preventDefault() tells the user agent that if the event does not get explicitly handled, 
            // its default action should not be taken as it normally would be.
            e.preventDefault();
            // The stopPropagation() method prevents further propagation of the current event in the capturing 
            // and bubbling phases. It does not, however, prevent any default behaviors from occurring; 
            // for instance, clicks on links are still processed. If you want to stop those behaviors, 
            // see the preventDefault() method.
            e.stopPropagation();

            const visibility = map.getLayoutProperty(
                clickedLayer,
                'visibility'
            );

            // Toggle layer visibility by changing the layout object's visibility property.
            // if it is currently visible, after the clicking, it will be turned off.
            if (visibility === 'visible') {
                map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                this.className = '';
            } else { //otherise, it will be turned on.
                this.className = 'active';
                map.setLayoutProperty(
                    clickedLayer,
                    'visibility',
                    'visible'
                );
            }
        };

        // in the menu place holder, insert the layer links.
        const layers = document.getElementById('menu');
        layers.appendChild(link);
    }
});