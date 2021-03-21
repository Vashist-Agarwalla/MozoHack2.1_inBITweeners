let button = document.getElementById("plant");

button.onclick = function() {
    alert("Are you sure?")
}


document.getElementById('plant').onclick = function() {
    myFunction()
};

function myFunction() {
    alert('This action cannot be undone')
    window.location = "/newgrow";
}