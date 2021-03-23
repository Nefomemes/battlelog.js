(async function () {
  var bl;

  if (process.env.BLJS_DEV) {
    bl = require("./dist/bundle.dev.js");
  } else {
    bl = require("./dist/bundle.prod.min.js");
  }
  var client = bl();

  var bf3 = client.game("bf4");

  var user = await bf3.users.fetch("JackFrags");

  await user.soldiers.fetch();
  console.log(user.soldiers.cache);
})();
