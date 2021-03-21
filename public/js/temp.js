let tempK;
let temp;
let humidity;
let message = document.getElementById("text")

document.getElementById('location-button').onclick = function() {

    myFunction()

};


function myFunction() {
    navigator.geolocation.getCurrentPosition(function(position) {
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=3a2fc6349c49adf4a7014689fa9db856`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                tempK = data.main.temp
                temp = tempK - 273.15
                humidity = data.main.humidity
                console.log(temp)
                console.log(humidity)
                if (humidity > 90) {
                    message.textContent = "It might rain today";
                } else if (humidity > 80) {
                    message.textContent = "Less chance of rain today";
                } else if (temp > 30) {
                    message.textContent = "It won't rain today and will remain Sunny";
                } else {
                    message.textContent = "It won't rain today"
                }
            })
    })

}