var city = "";
city = "";
var dates = [];
var conditions = [];
var temps = [];
var humidities = [];
var windSpeed = "";
var uvIndexes = "";
var days = ["#current", "#dayOne", "#dayTwo", "#dayThree", "#dayFour", "#dayFive"];
var dayInfo = ["#currentInfo", "#dayOneInfo", "dayTwoInfo", "dayThreeInfo", "#dayFourInfo", "#dayFiveInfo"];
var dayConditions = ["#dayCurrentCondition", "#dayOneCondition", "#dayTwoCondition", "#dayThreeCondition", "#dayFourCondition", "#dayFiveCondition"];

// Search


$("#searchButton").click(function () {
    city = $("#searchField").val();
    var searchItem = $("<li>").text($("#searchField").val());
    searchItem.attr("class", "pastCity");
    $("#searchHistory").append(searchItem);


    // for (i = 0; i = 5; i++) {
    // $(dayConditions[i]).removeAttr("src");
    // 
    // }
    $("#dayOneInfo").empty();

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=d49028843b605243d56571f4a6b28da2",
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            for (i = 0; i < 40;) {
                var date = response.list[i].dt_txt;
                console.log(date);
                date = new Date(date);
                date = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
                console.log(date);
                dates.push(date);

                var tempK = response.list[i].main.temp;
                var tempF = Math.round(tempK * (9 / 5) - 459.67);
                console.log(tempF);
                temps.push(tempF);

                var humidity = response.list[i].main.humidity + "%";
                console.log(humidity);
                humidities.push(humidity);

                var condition = response.list[i].weather[0].main;
                console.log(condition);
                conditions.push(condition);


                if (i < 32) {
                    i = i + 8;
                }
                else {
                    i = i + 7;
                }

console.log(conditions);

            }

        });

    var check = setInterval(function () {
        if (dates.length == 6 || conditions.length == 6 || temps.length == 6 || humidities.length == 6) {
            // console.log(conditions[2]);
            // console.log(dayConditions);
            console.log(days[i]);


            for (i = 1; i < 6; i++) {
                if (conditions[i] == "Rain") {
                    console.log(conditions[i]);

                    $(dayConditions[i]).attr("src", "images/rain.png");
                }
                else if (conditions[i] == "Snow") {
                    $(dayConditions[i]).attr("src", "images/snow.png");
                }
                else if (conditions[i] == "Clear") {
                    $(dayConditions[i]).attr("src", "images/clear.png");
                }
                else if (conditions[i] == "Clouds") {
                    $(dayConditions[i]).attr("src", "images/clouds.png");
                }
                else {
                    $(dayConditions[i]).attr("src", "images/extreme.png");
                }


                // days[i].empty();
                // $("#infoOne").text(temps[i]);
            
                var info1 = $("<li>").text(temps[i]);
                $("#dayOneInfo").append(info1);
// $(days[i]).append(info1);
                
                
                // $(days[i]).append(dates[i]);

                // var info2 = $("<li>").text("Temperature: " + temps[i]);
                // $(days[i]).text(info2);
                // // $(days[i]).append(temps[i]);

                // var info3 = $("<li>").text("Humidity: " + humidities[i]);
                // $(days[i]).text(info3);
                // // $(days[i]).append(humidities[i]);
                

            }
            
            clearInterval(check);
        }
    })
    dates = [];
                conditions = [];
                temps = [];
                humidities = [];
})


$(document).on("click", ".pastCity", function(){
    console.log("Hey")
})

