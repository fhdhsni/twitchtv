exports.addOnlineUser = require("./addOnlineUser.js");
exports.addOfflineUser = require("./addOfflineUser.js");
exports.addUserDoesntExist = require("./userDoesntExist.js");

exports.findURL = function findURL(data) {
  return data.stream.channel.url;
};

exports.findLogo = function findLogo(data) {
  return data.stream.channel.logo;
};

exports.findStatus = function findStatus(data) {
  return data.stream.channel.status;
};

exports.findName = function findName(data) {
  return data.stream.channel.display_name;
};

exports.addToPage = function addToPage(error, data, user) {
  // data is string not JSON
  if (error) {
    this.addUserDoesntExist(JSON.parse(error));
  } else {
    const parsedData = JSON.parse(data);
    const info = {};

    if (parsedData.stream) {
      info.url = this.findURL(parsedData);
      info.logo = this.findLogo(parsedData);
      info.status = this.findStatus(parsedData);
      info.name = this.findName(parsedData);

      this.addOnlineUser(info);
    } else {
      this.addOfflineUser(user);
    }
  }
};
