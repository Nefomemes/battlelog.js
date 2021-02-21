
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

const { User } = require("./user");
const { BattlelogMap } = require("./blmap");
class UsersManager {
  constructor(client) {
    this.client = client;
  }

  fetch(...params) {
    return new User(this.client, ...params).fetch();
  }

  cache = new BattlelogMap();
}

module.exports.UsersManager = UsersManager;
