module.exports = function addOnlineUser(info) {
  const ul = document.getElementsByClassName("result")[0];
  const li = document.createElement("li");
  const img = document.createElement("img"); // for user image
  const a = document.createElement("a");     // for display_name to be a link
  const online = document.createElement("span"); // for online/offline
  const status = document.createElement("span"); // for status

  img.setAttribute("alt", `${info.name} profile picture`);
  img.setAttribute("src", `${info.logo}`);
  a.setAttribute("href", `${info.url}`);
  a.textContent = info.name;
  status.textContent = info.status;
  status.classList.add("status");
  online.textContent = "online";
  online.classList.add("online");

  li.appendChild(img);
  li.appendChild(a);
  li.appendChild(status);
  li.appendChild(online);
  ul.appendChild(li);
};
