// citySearch = $('city-search').on('click',function (event)

var apiKey = "8ddb894288e98c698578a2a957dbf1d5";
// var lat = "";
// var long = "";
var limit = 1;
// var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}}&appid=${apiKey}`;

// console.log("test log");
// fetch(requestUrl).then(function (response) {
//     console.log(response);
//     return response.json();
// });

var button = $(".button");
var citySearch = $("#city-search");

button.on("click", function (event) {
    event.preventDefault();
    var cityName = citySearch[0].value;
    console.log(cityName);

    if (cityName === "") {
        alert("Please input valid city");
        return;
    }
    var geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${apiKey}`;

    fetch(geocodeUrl)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            lat = data.lat;
            lon = data.lon;
            console.log(lat);
            console.log(lon);
        });
});
