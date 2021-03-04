(async function() {
  const bl = require("./src/index.js");

  var client = bl();

  var bf3 = client.game("bf4");

  var user = await bf3.users.fetch("JackFrags");

  await user.soldiers.fetch();
  console.log(user.soldiers.cache);
})();
