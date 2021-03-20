let tempK;
let temp;
let humidity;
let message = document.getElementsByClassName("text")
let mytry = document.querySelector("#try");

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

                mytry.textContent = "hi";
            })
    })

}