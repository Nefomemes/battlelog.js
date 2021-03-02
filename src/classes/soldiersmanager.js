const {Soldier} = require("./soldier");
const {BattlelogMap} = require("./blmap");

/**
 * Manages a user's soldiers.
 *
 * @class
 */
class SoldiersManager {
  cache = new BattlelogMap();
  /**
   *
   * @class
   * @param {User} user - The user that owns this SoldiersManager instance.
   * @param {Array} [data] -  Raw array data of the user's soldiers.
   */
  constructor(user, data) {
    this.user = user;
    this.structureData(data);
  }
  /**
   * Add
   *
   * @function
   * @param {object} data - The data
   * @param {boolean} [fetch] - Whether the data is a result of
   *     SoldiersManager#fetch
   * @returns {SoldiersManager} this
   */
  structureData(data, fetch) {
    for (let soldier of data) {
      this.cache.structureData(soldier.persona.personaId,
                               new Soldier(this.user, soldier, fetch), fetch);
    }

    return this;
  }
  /**
   * Get all soldiers the user have.
   *
   * @function
   * @async
   * @returns {SoldiersManager} this
   */
  async fetch() {
    var res = await this.user.client.axios.get(
        `/user/overviewBoxStats/${this.user.userId}`);

    this.structureData(res.data.data.soldiersBox, true);

    return this;
  }
}

module.exports.SoldiersManager = SoldiersManager;
