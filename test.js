const bljs = require("./src/index");

let battlelog = bljs();

	let bf3 = battlelog.game("bf3");


test("BattlelogMap.structureData(key, value, op+tions)", () => {
    let map = new bljs.BattlelogMap(); 

    map.structureData("key", "value")

    expect(Array.from(map)).toStrictEqual([["key", "value"]]);

})

test("Fetch Danny's profile and recycle it's User instance", async () => {
	
	
	let user = await bf3.fetchUser("DANNYonPC");
	
	let recycledUser = new bljs.User(bf3, user);
	
	expect(recycledUser).toStrictEqual(user);
})

test("Fetch servers and recycle one of them.", async () => {
	let server = Array.from(await bf3.fetchServers())[0][1]
	
	console.log(server);
	let recycledServer = new bljs.Server(bf3, server);

	expect(recycledServer).toStrictEqual(server);
})