module.exports = function(e) {
  const ul = document.getElementsByClassName("result")[0];
  const li = document.createElement("li");
  const span = document.createElement("span");

  span.textContent = e.message;
  span.classList.add("existence");
  li.appendChild(span);
  ul.appendChild(li);
};
