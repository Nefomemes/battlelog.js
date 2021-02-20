const { User } = require("./classes/user");
const { Platoon } = require("./classes/platoon");
const { GameClient } = require("./classes/gameclient");
const { BattlelogClient } = require("./classes/blclient");
const { UsersManager } = require("./classes/um");
const { Soldier } = require("./classes/soldier");
const { ServerBrowser } = require("./classes/sb");
const { FriendsManager } = require("./classes/friendsmanager");
const { Server } = require("./classes/server");
const utils = require("./utils/utils");
module.exports = (...params) => {
	return new BattlelogClient(...params);
};

module.exports.BattlelogClient = BattlelogClient;
module.exports.GameClient = GameClient;
module.exports.Platoon = Platoon;
module.exports.User = User;
module.exports.UsersManager = UsersManager;
module.exports.utils = utils;
module.exports.FriendsManager = FriendsManager;
