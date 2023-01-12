//Variables for the API calls
var lat = "";
var lon = "";
var limit = 1;
var apiKey = "8ddb894288e98c698578a2a957dbf1d5";
//Variable to grab the date
var currentDate = dayjs().format("MMM-DD, YYYY");
//Variables for buttons
var searchBtn = $("#searchBtn");
var citySearch = $("#city-search");
//Variables for the user selected city
var searchCity = $("#searched-city");
var searchTemp = $("#temp");
var searchWind = $("#wind");
var searchHumidity = $("#humidity");

//Setting event listener for search button
searchBtn.on("click", function (event) {
    event.preventDefault();

    //Grab the text of the city name searched
    var cityName = citySearch[0].value;
    //To prevent users from inputting nothing
    if (cityName === "") {
        alert("Please input something.");
        return;
    }

    //Seting variables for utilizing the geocoder API and forecast API
    var geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${apiKey}`;

    fetch(geocodeUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //Setting variables to the grabbed data
            lat = data[0].lat;
            lon = data[0].lon;

            var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;
            fetch(weatherUrl)
                .then(function (response2) {
                    return response2.json();
                })
                .then(function (data2) {
                    console.log(data2);
                    var userCity = data2.name;
                    var userSearchCity = document.createElement("h2");
                    userSearchCity.textContent = userCity + " " + currentDate;
                    searchCity.append(userSearchCity);

                    var userIcon = data2.weather[0].icon;
                    var userWeatherIcon = document.createElement("img");
                    userWeatherIcon.setAttribute(
                        "src",
                        "http://openweathermap.org/img/w/" + userIcon + ".png"
                    );
                    searchCity.append(userWeatherIcon);

                    var userTemp = data2.main.temp;
                    var userReturnedTemp = document.createElement("p");
                    userReturnedTemp.textContent =
                        "Temperature: " + userTemp + "\u00B0";
                    searchTemp.append(userReturnedTemp);

                    var userWind = data2.wind.speed;
                    var userReturnedWind = document.createElement("p");
                    userReturnedWind.textContent = "Wind: " + userWind + " MPH";
                    searchWind.append(userReturnedWind);

                    var userHumidity = data2.main.humidity + "%";
                    var userReturnedHumidity = document.createElement("p");
                    userReturnedHumidity.textContent =
                        "Humidity: " + userHumidity;
                    searchHumidity.append(userReturnedHumidity);
                });

            var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

            fetch(forecastUrl)
                .then(function (response3) {
                    return response3.json();
                })
                .then(function (data3) {
                    //Grabbing the class for the forecast display
                    var forecastDays = document.querySelectorAll(".forecast");

                    var dayList = [0, 8, 16, 24, 32].map((i) => data3.list[i]);

                    //for loop to replace and display the data of 5 day forecast
                    for (let i = 0; i < dayList.length; i++) {
                        forecastDays[i].textContent = "";

                        var forecastDate = new Date();
                        forecastDate.setDate(forecastDate.getDate() + (i + 1));
                        forecastDate = forecastDate.toLocaleDateString("en-US");
                        var forecastDate5Day = document.createElement("h2");
                        forecastDate5Day.textContent = forecastDate;
                        forecastDays[i].append(forecastDate5Day);

                        var forecast5DayIcon = data3.list[0].weather[0].icon;
                        var forecastIcon = document.createElement("img");
                        forecastIcon.setAttribute(
                            "src",
                            "http://openweathermap.org/img/w/" +
                                forecast5DayIcon +
                                ".png"
                        );
                        forecastDays[i].append(forecastIcon);

                        var temp5Day = data3.list[0].main.temp;
                        var forecastTemp = document.createElement("p");
                        forecastTemp.textContent =
                            "Temperature: " + temp5Day + "\u00B0";
                        forecastDays[i].append(forecastTemp);

                        var wind5Day = data3.list[0].wind.speed;
                        var forecastWind = document.createElement("p");
                        forecastWind.textContent = "Wind: " + wind5Day + " MPH";
                        forecastDays[i].append(forecastWind);

                        var humidity5Day = data3.list[0].main.humidity;
                        var forecastHumidity = document.createElement("p");
                        forecastHumidity.textContent =
                            "Humidity: " + humidity5Day;
                        forecastDays[i].append(forecastHumidity);
                    }
                });
        });
});
