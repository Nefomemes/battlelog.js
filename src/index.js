const { User } = require("./classes/user");
const { Platoon } = require("./classes/platoon");
const { GameClient } = require("./classes/gameclient");
const { BattlelogClient } = require("./classes/blclient");
const { Soldier } = require("./classes/soldier");
const { Server } = require("./classes/server");
const { BattlelogMap } = require("./classes/blmap");
const utils = require("./utils/utils");
module.exports = (...params) => {
  return new BattlelogClient(...params);
};

module.exports.BattlelogClient = BattlelogClient;
module.exports.GameClient = GameClient;
module.exports.Platoon = Platoon;
module.exports.User = User;
module.exports.Server = Server;
module.exports.utils = utils;
module.exports.BattlelogMap = BattlelogMap;