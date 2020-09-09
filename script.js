var myInput = document.querySelector("#myInput");

var btnClick = document.querySelector("#btn");

var myText = document.querySelector("#text");

btnClick.addEventListener("click", function() {

    myText.textContent = myInput.value;

});