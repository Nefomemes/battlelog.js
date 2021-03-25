const { User } = require("./user");
const { BattlelogMap } = require("./blmap");
class UsersManager {
  constructor(client) {
    Object.defineProperty(this, "client", { value: client, enumerable: false });
    console.log(client);
  }

  async fetch(...params) {
let user = await new  User(this.client, ...params).fetch();

this.cache.structureData(user.userId, user);
    return user;
    
  }

  cache = new BattlelogMap();
}

module.exports.UsersManager = UsersManager;
