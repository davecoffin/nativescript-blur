var Blur = require("nativescript-blur").Blur;
var blur = new Blur();

describe("greet function", function() {
    it("exists", function() {
        expect(blur.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(blur.greet()).toEqual("Hello, NS");
    });
});