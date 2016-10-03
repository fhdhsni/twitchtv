const sinon = require("sinon");
const ajax = require("../src/js/xhr.js");

describe("xhr.js", () => {
  let xhr;
  let requests;

  beforeEach(() => {
    global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = (rq) => {
      requests.push(rq);
    };
  });
  afterEach(() => {
    xhr.restore();
  });
  it("Should call the callback users.length number of times with correct argument.", () => {
    const users = ["foo", "bar"];
    const cb = {};
    cb.addToPage = sinon.spy();

    ajax(users, cb);
    requests[0].respond(200, { "Content-Type": "text/json" }, "fooRequest");
    requests[1].respond(200, { "Content-Type": "text/json" }, "barRequest");
    sinon.assert.calledTwice(cb.addToPage);
    sinon.assert.calledWith(cb.addToPage, null, "fooRequest", "foo");
    sinon.assert.calledWith(cb.addToPage, null, "barRequest", "bar");
  });
  it("Should call the callback with provided error when response status isn't 200", () => {
    const users = ["foo", "bar"];
    const cb = {};
    cb.addToPage = sinon.spy();

    ajax(users, cb);
    requests[0].respond(404, { "Content-Type": "text/json" }, "fooError");
    requests[1].respond(404, { "Content-Type": "text/json" }, "barError");
    sinon.assert.calledTwice(cb.addToPage);
    sinon.assert.calledWith(cb.addToPage, "fooError");
    sinon.assert.calledWith(cb.addToPage, "barError");
  })
});
