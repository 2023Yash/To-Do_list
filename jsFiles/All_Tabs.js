const btns = document.getElementById("btn");
const year = document.getElementById("year");
localStorage.getItem("liOrDa") !== null ? "" : localStorage.setItem("liOrDa", 0);
document.querySelector("body").style.opacity = 1;

year.textContent = new Date().getFullYear();

if (localStorage.getItem("liOrDa") == 0) {
  document.querySelector("body").classList.add("light");
}

function liOrDa() {
  if (localStorage.getItem("liOrDa") == 1) {
    document.querySelector("body").classList.add("light");
    localStorage.setItem("liOrDa", 0);
  } else {
    document.querySelector("body").classList.remove("light");
    localStorage.setItem("liOrDa", 1);
  }
}

function responsiveFunction() {
  if (btns.style.display == "none") {
    btns.style.display = "flex";
  } else {
    btns.style.display = "none";
  }
}