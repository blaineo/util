/*globals MTVNPlayer test asyncTest expect equal ok start deepEqual*/
test("form factors", function() {
    var ffId = "0:1",
        inputMap = {
            "0": {
                name: "zero",
                defaultValue:["zeroDefault","zeroDefault2"],
                value: ["one", "two"]
            },
            "10":{
                name:"ten",
                defaultValue:"10default",
                value:["10one","10two","10three"]
            },
            "something" : {
                name:"somethingElse",
                value: ["weird"]
            }
        },
        util = MTVNPlayer.require("mtvn-util"),
        result = util.mapFormFactorID("0:0", inputMap);
    equal(result.zero, "one", "0:0");
    result = util.mapFormFactorID("0:1", inputMap);
    equal(result.zero, "two", "0:1");
    // test default
    result = util.mapFormFactorID("1:0", inputMap);
    equal(result.ten, "10default", "default");
    //
    result = util.mapFormFactorID("10:0", inputMap);
    equal(result.zero.toString(), inputMap["0"].defaultValue.toString(), "default");
    //
    result = util.mapFormFactorID("10:0,1", inputMap);
    equal(result.ten.toString(), ["10one","10two"].toString(), "10:0,1");
    //
    result = util.mapFormFactorID("10:2,1", inputMap);
    equal(result.ten.toString(), ["10three","10two"].toString(), "10:2,1");
    // 
    result = util.mapFormFactorID("something:0", inputMap);
    equal(result.somethingElse, "weird", "something:0");
});