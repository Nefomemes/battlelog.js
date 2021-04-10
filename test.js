const bljs = require("./dist/bundle.dev");

test("BattlelogMap.structureData(key, value, options)", () => {
    let map = new bljs.BattlelogMap(); 

    map.structureData("key", "value")

    expect(Array.from(map)).toBe([["key", "value"]]);

})