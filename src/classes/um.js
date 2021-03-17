<<<<<<< HEAD
const { User } = require("./user.js");

class UsersManager {
	constructor(client){
		this.client = client;
	}

	fetch(...params){
		return new User(this.client, ...params).fetch();
	}

	cache = new Map()
}

module.exports.UsersManager = UsersManager;
=======
const { User } = require("./user");
const { BattlelogMap } = require("./blmap");
class UsersManager {
  constructor(client) {
    Object.defineProperty(this, "client", { value: client, enumerable: false });
  }

  fetch(...params) {
    return new User(this.client, ...params).fetch();
  }

  cache = new BattlelogMap();
}

module.exports.UsersManager = UsersManager;
>>>>>>> 6fd1b11e6854fc741831a2859af99e04412fc7fb
