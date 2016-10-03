console.log("Hi There!");
const ajax = require("./xhr.js");
const addToPage = require("./addToPage.js");
const searchInput = document.getElementById("search");
const users = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas",
];

ajax(users, addToPage);
searchInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    e.stopImmediatePropagation();
    document.getElementsByClassName("result")[0].innerHTML = "";
    const query = searchInput.value;

    if (query !== "") {
      ajax([query], addToPage);
    } else {
      ajax(users, addToPage);
    }
  }
});

document.getElementsByTagName("body")[0].addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    document.getElementsByClassName("result")[0].innerHTML = "";
    ajax(users, addToPage);
  }
});
