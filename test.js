const bljs = require("./src/index");

test("BattlelogMap.structureData(key, value, options)", () => {
    let map = new bljs.BattlelogMap(); 

    map.structureData("key", "value")

    expect(Array.from(map)).toStrictEqual([["key", "value"]]);

})