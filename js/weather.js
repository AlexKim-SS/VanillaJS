const APIKEY = "9f658b3c5ecbb85ed62675e604e40d40"

function onGeoSuccess(pos) {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        document.querySelector("#weather span:first-child").innerText = `${data.weather[0].main}  ${data.main.temp}℃`;
        document.querySelector("#weather span:last-child").innerText = `@${data.name}`;
    })
    .catch(console.error);
}
function onGeoFail() {
    console.log('Get position Error!!!')
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoFail);


function getURL(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`
}



