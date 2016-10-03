const addOnlineUser = require("./addOnlineUser.js");
const addOfflineUser = require("./addOfflineUser.js");
const addUserDoesntExist = require("./userDoesntExist.js");

function findURL(data) {
  return data.stream.channel.url;
}

function findLogo(data) {
  return data.stream.channel.logo;
}

function findStatus(data) {
  return data.stream.channel.status;
}

function findName(data) {
  return data.stream.channel.display_name;
}

module.exports = function (error, data, user) { // data is string not JSON
  if (error) {
    addUserDoesntExist(JSON.parse(error));
  } else {
    const parsedData = JSON.parse(data);
    const info = {};

    if (parsedData.stream) {
      info.url = findURL(parsedData);
      info.logo = findLogo(parsedData);
      info.status = findStatus(parsedData);
      info.name = findName(parsedData);

      addOnlineUser(info);
    } else {
      addOfflineUser(user);
    }
  }
};
