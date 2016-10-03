module.exports = function (user) {
  const ul = document.getElementsByClassName("result")[0];
  const li = document.createElement("li");
  const img = document.createElement("img"); // for user image
  const a = document.createElement("a");     // for display_name to be a link
  const offline = document.createElement("span"); // for online/offline

  img.setAttribute("src", "https://dl.dropboxusercontent.com/u/59014401/1475440307_FAQ.svg");
  a.textContent = user;
  a.setAttribute("href", `https://www.twitch.tv/${user}`);
  offline.textContent = "offline";
  offline.classList.add("offline");

  li.appendChild(img);
  li.appendChild(a);
  li.appendChild(offline);
  ul.appendChild(li);
};
