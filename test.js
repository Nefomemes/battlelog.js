<<<<<<< HEAD
const bljs = require("./src/index");
const CacheMap = require("./src/classes/cachemap");
let battlelog = bljs();

let bf3 = battlelog.game("bf3");


test("CacheMap.structureData(key, value, options)", () => {
    let map = new CacheMap(); 

    map.structureData("key", "value")

=======
<<<<<<< HEAD
(async function () {
  var bl;

  if (process.env.BLJS_RAW) {
    bl = require("./src/index.js");
  } else if (process.env.BLJS_DEV) {
    bl = require("./dist/bundle.dev.js");
  } else {
    bl = require("./dist/bundle.prod.min.js");
  }
  var client = bl();
=======
const bljs = require("./src/index");

let battlelog = bljs();

	let bf3 = battlelog.game("bf3");


test("BattlelogMap.structureData(key, value, op+tions)", () => {
    let map = new bljs.BattlelogMap(); 
>>>>>>> fbb3344ecf738e1aed7a266ea92a2ea454bad1d1

  var bf3 = client.game("bf3");

<<<<<<< HEAD
  var user = await bf3.users.fetch("DANNYonPC");

  console.log(user);
  
  await user.soldiers.fetch();
  console.log(user.soldiers.cache);
})();
=======
>>>>>>> dev
    expect(Array.from(map)).toStrictEqual([["key", "value"]]);

})

<<<<<<< HEAD
   

test("Fetch my Battlelog profile and recycle it's User instance", async () => {
	
	
	let user = await bf3.fetchUser("Nefomemes");
=======
test("Fetch Danny's profile and recycle it's User instance", async () => {
	
	
	let user = await bf3.fetchUser("DANNYonPC");
>>>>>>> dev
	
	let recycledUser = new bljs.User(bf3, user);
	
	expect(recycledUser).toStrictEqual(user);
})

test("Fetch servers and recycle one of them.", async () => {
	let server = Array.from(await bf3.fetchServers())[0][1]
	
	console.log(server);
	let recycledServer = new bljs.Server(bf3, server);

	expect(recycledServer).toStrictEqual(server);
})
<<<<<<< HEAD
=======
>>>>>>> fbb3344ecf738e1aed7a266ea92a2ea454bad1d1
>>>>>>> dev
