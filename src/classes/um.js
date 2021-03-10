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
