module.exports = function requester(users, cb) {
  users.forEach((user) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", `https://api.twitch.tv/kraken/streams/${user}`);
    xhr.setRequestHeader("Client-ID", "ghabxme08rzbv3esgcoqfsbwuo8yj89");
    xhr.addEventListener("load", () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        cb(null, xhr.responseText, user);
      } else {
        cb(xhr.responseText);
      }
    });
    xhr.send();
  });
};
