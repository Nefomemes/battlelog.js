
const { BattlelogClient } = require("./classes/blclient");
module.exports = (...params) => {
  return new BattlelogClient(...params);
};
