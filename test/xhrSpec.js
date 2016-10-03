const assert = require("chai").assert;
const sinon = require("sinon");
const ajax = require("../src/js/xhr.js");

describe("xhr.js", () => {
  let xhr;
  let requests;

  beforeEach(() => {
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
    const spy = sinon.spy();

    ajax(users, spy);
    requests[0].respond(200, { "Content-Type": "text/json" }, "fooRequest");
    requests[1].respond(200, { "Content-Type": "text/json" }, "barRequest");
    sinon.assert.calledTwice(spy);
    sinon.assert.calledWith(spy, null, "fooRequest", "foo");
    sinon.assert.calledWith(spy, null, "barRequest", "bar");
  });
  it("Should call the callback with provided error when response status isn't 200", () => {
    const users = ["foo", "bar"];
    const spy = sinon.spy();

    ajax(users, spy);
    requests[0].respond(404, { "Content-Type": "text/json" }, "fooError");
    requests[1].respond(404, { "Content-Type": "text/json" }, "barError");
    sinon.assert.calledTwice(spy);
    sinon.assert.calledWith(spy, "fooError");
    sinon.assert.calledWith(spy, "barError");
  })
});
