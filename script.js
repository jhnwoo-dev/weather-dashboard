// citySearch = $('city-search').on('click',function (event)

var apiKey = "8ddb894288e98c698578a2a957dbf1d5";
var lat = "";
var long = "";
var requestUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}";

console.log("test log");
fetch(requestUrl).then(function (response) {
    console.log(response);
    return response.json();
});
