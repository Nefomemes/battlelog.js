<<<<<<< HEAD
(async function(){
	
const bl = require("./src/index.js");

var client = bl();

var bf3 = client.game('bf4');

var user = await bf3.users.fetch( "DANNYonPC");



console.log(user);
})()

=======
(async function () {
  const bl = require("./src/index.js");

  var client = bl();

  var bf3 = client.game("bf4");

  var user = await bf3.users.fetch("JackFrags");

  await user.soldiers.fetch();
  console.log(user.soldiers.cache);
})();
>>>>>>> 6fd1b11e6854fc741831a2859af99e04412fc7fb
