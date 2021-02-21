const { Soldier } = require("./soldier");
const { BattlelogMap } = require("./blmap");

/**
 * Manages a user's soldiers.
 *
 * @class
 */
class SoldiersManager {
  cache = new BattlelogMap();
  /**
   *
   * @param {User} user - The user that owns this SoldiersManager instance.
   * @param {Array} [data] -  Raw array data of the user's soldiers.
   */
  constructor(user, data) {
    this.user = user;
  }
  /**
   * Add
   *
   * @param data
   * @param fetch
   */
  structureData(data, fetch) {
    for (let soldier of data) {
      this.cache.structureData(
        soldier.persona.personaId,
        new Soldier(this.user, data, fetch),
        fetch
      );
    }

    return this;
  }

  async fetch() {
    var res = await this.user.axios.get(
      `/user/overviewBoxStats/${this.user.userId}`
    );

    this.structureData(res.data.soldiersBox, true);

    return this;
  }
}

module.exports.SoldiersManager = SoldiersManager;
