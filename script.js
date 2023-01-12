// citySearch = $('city-search').on('click',function (event)

var apiKey = "8ddb894288e98c698578a2a957dbf1d5";
var lat = "";
var long = "";
var limit = 1;

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
            lat = data[0].lat;
            lon = data[0].lon;

            console.log(lat);
            console.log(lon);

            var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

            fetch(forecastUrl)
                .then(function (response2) {
                    console.log(response2);
                    return response2.json();
                })
                .then(function (data2) {
                    console.log(data2);
                    var forecastCity = data2.city.name;
                    console.log(forecastCity);

                    var dayList = [0, 8, 16, 24, 32].map((i) => data2.list[i]);
                    console.log(dayList);
                    for (let i = 0; i < dayList.length; i++) {}
                    var weather5Day = data2.list[0].weather[0].main;
                    console.log(weather5Day);
                    var temp5Day = data2.list[0].main.temp;
                    console.log(temp5Day);
                    var wind5Day = data2.list[0].wind.speed;
                    console.log(wind5Day);
                    var humidity5Day = data2.list[0].main.humidity;
                    console.log(humidity5Day);
                });
        });
});
