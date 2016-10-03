const sinon = require("sinon");
const renderDOM = require("../src/js/addToPage.js");

describe("addToPage.js", () => {
  it("calls internal helper functions with provided data when user is online", sinon.test(() => {
    const data = "{ \"stream\": true }";
    const parsedData = JSON.parse(data);
    const info = {
      url: "url",
      logo: "logo",
      status: "status",
      name: "DisplayName",
    };

    sinon.stub(renderDOM, "findURL").returns(info.url);
    sinon.stub(renderDOM, "findLogo").returns(info.logo);
    sinon.stub(renderDOM, "findStatus").returns(info.status);
    sinon.stub(renderDOM, "findName").returns(info.name);
    sinon.stub(renderDOM, "addOnlineUser");

    renderDOM.addToPage(null, data, null);

    sinon.assert.calledOnce(renderDOM.findURL);
    sinon.assert.calledWith(renderDOM.findURL, parsedData);

    sinon.assert.calledOnce(renderDOM.findLogo);
    sinon.assert.calledWith(renderDOM.findLogo, parsedData);

    sinon.assert.calledOnce(renderDOM.findStatus);
    sinon.assert.calledWith(renderDOM.findStatus, parsedData);

    sinon.assert.calledOnce(renderDOM.findName);
    sinon.assert.calledWith(renderDOM.findName, parsedData);

    sinon.assert.calledOnce(renderDOM.addOnlineUser);
    sinon.assert.calledWith(renderDOM.addOnlineUser, info);
  }));
  it("should call addUserDoesntExist(JSON.parse(error)) when user doesnt exist", sinon.test(() => {
    const error = "{ \"error\": true }";

    sinon.stub(renderDOM, "addUserDoesntExist");
    renderDOM.addToPage(error, null, null);
    sinon.assert.calledOnce(renderDOM.addUserDoesntExist);
    sinon.assert.calledWith(renderDOM.addUserDoesntExist, JSON.parse(error));
  }));
  it("should call addOfflineUser(user) when user is offline", sinon.test(() => {
    const user = "Farhad";

    sinon.stub(renderDOM, "addOfflineUser");
    renderDOM.addToPage(null, "{ \"stream\": null }", user);
    sinon.assert.calledOnce(renderDOM.addOfflineUser);
    sinon.assert.calledWith(renderDOM.addOfflineUser, user);
  }));
});
