// These options control the camera position after animation
const start = {
    center: [66, 48],
    zoom: 5 ,
    pitch: 0,
    bearing: 0
};
const bbfPoint = {
    center: [79.20785, 45.0077],
    zoom: 14,
    bearing: 90,
    pitch: 75,
};

mapboxgl.accessToken = 'pk.eyJ1IjoicmFzc2Nyb20iLCJhIjoiY2wyNzlrcDY2MGk5cDNqcW5wZW9mZW5kciJ9.zdI6zJ4KbGx-V8mq1KoUCg';
const map = new mapboxgl.Map({
    container: 'map',
    // Replace YOUR_STYLE_URL with your style URL.
    style: 'mapbox://styles/rasscrom/clakuosq8000o15lg131x1p4b', 
    projection: 'globe',
    ...start,
});

map.on('click', (event) => {
    // If the user clicked on one of your markers, get its information.
    const features = map.queryRenderedFeatures(event.point, {
        layers: ['mapkz-tp'] // replace with your layer name
    });
    if (!features.length) {
        return;
    }
    const feature = features[0]

    // Code from the next step will go here.
    const popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
        `Name: <h3 style='font-size:1.2rem;color:green; margin-bottom:5px;'>${feature.properties.Name}</h3>
        <p>Description:<br> ${feature.properties['Short description']}</p>`
    ).addTo(map);
});

map.on('mouseenter', 'mapkz-tp', function () {
    map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'mapkz-tp', function () {
    map.getCanvas().style.cursor = '';
});

map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.ScaleControl());
map.addControl(new mapboxgl.FullscreenControl());

document.getElementById('buttons').addEventListener('click', (event) => {
    const language = event.target.id.substr('button-'.length);

    map.setLayoutProperty('country-label', 'text-field', [
        'get',
        `name_${language}`
    ]);
})



let isAtStart = true;

// FLY to 
const bbf = document.getElementById('bbf')
bbf.addEventListener('click', () => {

    map.flyTo({
        ...bbfPoint,
        duration: 11000,
        essential: true
    })
})
let lat;
let lng;
let bearing;
let pitch;
let zoom;
let i = 0;
let txt = 'Burhan-bulak Falls is the tallest waterfall in Kazakhstan. It is located in the Kora River gorge in the Jongar Alatau mountains. At an altitude of 2000 metres, the Falls are 168 metres long.';
let speed = 30;
function onMapClick(e) {
    lat = map.getCenter().lat;
    lng = map.getCenter().lng;
    bearing = map.getBearing();
    pitch = map.getPitch();
    zoom = map.getZoom();
    
    if ((12.5 <= zoom) && (74.5 <= pitch <= 75.5) && (bbfPoint.center[1] - 0.5 <= lat <= bbfPoint.center[1] + 0.5) && (bbfPoint.center[0] - 0.5 <= lng <= bbfPoint.center[0] + 0.5)) {
        document.getElementsByClassName('bbf')[0].style.visibility = 'visible';
        document.getElementsByClassName('bbf')[0].style.opacity = '1';
        document.getElementsByClassName('bbf')[1].style.visibility = 'visible';
        document.getElementsByClassName('bbf')[1].style.opacity = '1';
        typed.pause(500).go()
    } else {
        document.getElementsByClassName('bbf')[0].style.visibility = 'hidden'
        document.getElementsByClassName('bbf')[0].style.opacity = '0';
        document.getElementsByClassName('bbf')[1].style.visibility = 'hidden'
        document.getElementsByClassName('bbf')[1].style.opacity = '0';

    }
}
map.on('render', onMapClick);

let typed = new TypeIt("#spanBbf", {
    speed: 30,
    strings: [txt],
    cursorChar: "⭐",
    cursor: {
      autoPause: false,
      animation: {
        options: {
          duration: 1000,
          easing: "linear",
          direction: "alternate",
        },
        frames: [
          {
            transformOrigin: "0.575em 0.7em",
            transform: "rotate(0deg) scale(1)",
          },
          {
            transformOrigin: "0.575em 0.7em",
            transform: "rotate(360deg) scale(2.5)",
          },
        ],
      },
    },
  });