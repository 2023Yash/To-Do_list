const errorDisplay = document.getElementById("error-tool-tip");
const olLength = document.getElementById("task-num");
const counter = localStorage.getItem("counter");
const input = document.getElementById("input");
const list = document.getElementById("list");
const time = document.getElementById("time");
let newCounter;
let taskData;
let olItem;

localStorage.getItem("counter") !== null ? "" : localStorage.setItem("counter", 0);

for (var index = 0; index < 100; index++) {
  if (localStorage.getItem(`task_${index}`) !== null) {
    if (localStorage.getItem(`task_${index}`).slice(-3) != "cut") {
      list.innerHTML += localStorage.getItem(`task_${index}`);
    } else {
      list.innerHTML += localStorage.getItem(`task_${index}`).slice(0, -3);
      document.getElementById(`task_${index}`).classList.add("cut")
    }
    olLength.textContent = list.children.length;
  }
}

function remove(whatToRemove) {
  localStorage.removeItem(whatToRemove);
  olLength.textContent = Number(olLength.textContent) - 1;
}

function toDisplay(Whattoshow) {
  errorDisplay.textContent = Whattoshow;
  errorDisplay.style.opacity = 1;
  setTimeout(() => {
    errorDisplay.style.opacity = 0;
  }, 3000);
}

function showError() {
  if (input.value == "") {
    toDisplay("Please fill the input.");
  } else if (time.value == "") {
    toDisplay("Please fill the time.");
  } else if (new Date().getHours().toString() > parseInt(time.value.slice(0, 2))) {
    toDisplay("time's value can't be more than or equat to current time.");
  } else {
    toDisplay("error in input!");
  }
}

function toList() {
  if (input.value == "" || time.value == "" || new Date().getHours().toString() > parseInt(time.value.slice(0, 2))) {
    showError();
  } else {
    newCounter = parseInt(localStorage.getItem("counter")) + 1;
    olItem = 
    `<li>
      <b id="task_${newCounter}" onclick='this.classList.toggle("cut");change("task_${newCounter}")'>
        <i class="fa fa-pencil" style="font-size:24px"></i>
        ${input.value}
      </b>
      <span onclick="remove('task_${newCounter}');this.parentElement.remove()">X</span>
      <span>${time.value}</span>
    </li>`;
    list.innerHTML += olItem;
    localStorage.setItem(`task_${newCounter}`, olItem);
    localStorage.setItem("counter", newCounter);
    olLength.textContent = list.children.length;
    input.value = null;
    time.value = null;
  }
}

document.addEventListener("keydown", event => {
  if (event.key == "Enter") {
    toList();
  }
});

function change(whichItemToChange) {
  let changer = localStorage.getItem(whichItemToChange);
  if (changer.slice(-3) != "cut") {
    localStorage.setItem(whichItemToChange, changer + "cut");
  } else {
    localStorage.setItem(whichItemToChange, changer.slice(0, -3));
  }
}