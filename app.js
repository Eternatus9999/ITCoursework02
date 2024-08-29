const http = new XMLHttpRequest();
let result;
let condition = true;

findLocation();

document.getElementById("map").innerHTML = `<div id="googleMap" style="width:100%;height:800px;"></div>`;

function load(location){
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=55cbecffb4094cebb0445017242708&q=${location}&days=5`).then(res=>res.json()).then(data=>{
        for (let i = 0; i < 5; i++) {
            document.getElementById(`img${i+1}`).innerHTML= `<p>${data.forecast.forecastday[i].date}</p><img src="${data.forecast.forecastday[i].day.condition.icon}" class="rounded mx-auto d-block" alt="Hello" ><p id="maintext">${data.forecast.forecastday[i].day.avgtemp_c}</p><p>${data.forecast.forecastday[i].day.condition.text}</p>`;
        }
        document.getElementById("wind").innerHTML = `<h1>Wind</h1><br><p id="maintext">Wind_mph : ${data.current.wind_mph}</p><p id="maintext">Direction : ${data.current.wind_dir}</p>`;
        document.getElementById("main").innerHTML = `<br><br><h1>${data.location.name}</h1><br><br><p id="maintext">${data.location.region}</p><p id="maintext">${data.location.country}</p>`;
        document.getElementById("img").innerHTML = `<p id="maintext">${data.current.last_updated}</p><img src="${data.current.condition.icon}" class="rounded mx-auto d-block" alt="Hello" ><p id="maintext">${data.current.temp_c}</p><p id="maintext">${data.current.condition.text}</p>`;
        myMap(data.location.lat,data.location.lon);
    })
}

function clickBtn(){
    load(document.getElementById("location-input").value);
}

function findLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            const bdcAPI = `https://api-bdc.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
            getAPI(bdcAPI)
            
        },(err)=>{
            alert(err.message)
            load("Colombo");
            
        })
    }else{
        load("Panadura");
    }
}

function getAPI(bdcAPI){
    http.open("GET",bdcAPI)
    http.send()
    http.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            result = JSON.parse(this.responseText);
            myMap(result);
            load(result.localityInfo.administrative[2].name);
        }
    }
}

function myMap(location) {
    var mapProp= {
      center:new google.maps.LatLng(location.latitude , location.longitude),
      zoom:13,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}

function myMap(latitude,longitude) {
    var mapProp= {
      center:new google.maps.LatLng(latitude , longitude),
      zoom:13,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}