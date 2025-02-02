document.getElementById("switch").addEventListener("click", function(){
    document.body.classList.toggle("green-theme");

    if (document.body.classList.contains("green-theme")) {
        this.textContent = "Purple";
        this.style.backgroundColor = "#a541c9";
        this.style.color = "antiquewhite";
    } else {
        this.textContent = "Green"
        this.style.backgroundColor = "#02ca5e"
        this.style.color = "antiquewhite"
    }
})