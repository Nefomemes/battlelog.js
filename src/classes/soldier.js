const utils = require("../utils/utils");
/**
 * Represents a Battlelog soldier.
 *
 * @class
 */

class Soldier {

  /**
   * The user of this soldier.
   * 
   * @property {User}
   */
  user;

  /**
   * The statistics of this soldier.
   * 
   * @property {object}
   * @namespace
   */
  stats = {
    /**
     * How many coop missions have the soldier finished.
     * 
     * @type {number}
     * @memberof Soldier.stats
     */
    coopMissionsFinished: 0,

    /**
     * How many unlockable weapons have the soldier unlocked by playing coop missions.
     * 
     * @type {number}
     * @memberof Soldier.stats
     */
    coopUnlocks: 0,
    /**
     * The rank of the soldier.
     * 
     * @type {number}
     * @memberof Soldier.stats
     */
    rank: 0,
    /**
     * How many revives the soldier have done.
     * 
     * @type {number}
     * @memberof Soldier.stats
     */
    revives: 0,
    /**
     * How many kills the soldier have.
     * 
     * @type {number}
     * @memberof Soldier.stats
     */
    kills: 0,
    /**
     * How many matches the soldier have won.
     * 
     * @type {number}
     * @memberof Soldier.stats
     */
    wins: 0,
    /**
     * How many dogtags have the soldier collected. Usually when killing an enemy with a knife.
     * 
     * @type {number}
     * @memberof Soldier.stats
     */
    dogtagsCollected: 0,
    /**
     * How many kill assists the soldier have.
     * 
     * @type {number}
     * @memberof Soldier.stats
     */
    assists: 0,
    /**
     * How many repairs the soldier have done when using the engineer class.
     * 
     * @type {number}
     * @memberof Soldier.stats
     */
    repairs: 0,
    /**
     * How many times the soldiers have died.
     * 
     * @type {number}
     * @memberof Soldier.stats
     */
    deaths: 0,
    /**
     * The soldier's accuracy.
     *
     * @type {number}
     * @memberof Soldier.stats
     */
  };

  /**
   * Creates a new Soldier instance
   *
   * @class
   * @param {User} user - The user of this soldier.
   * @param {object} [data] - The raw data object to be used to populate the
   *     instance.
   */

  constructor(user, data, fetch) {
    this.user = user;
    this.structureData(data, fetch);
  }
  /**
   * Populate an object with a raw data object.
   *
   * @param {object} data - The raw data
   * @param {boolean} [fetch] - Whether the raw data is from a fetch function.
   * @returns {Soldier} - The soldier
   */
  structureData(data, fetch) {
    var rules = {};
    if (!fetch) {
      rules = {
        ...rules
      
    }
}
    utils.structureData(this, data, rules);
if(!this.persona){
console.log(this)
} else {
    this.user.soldiers.cache.set(this.persona.personaId, this)}
                             
    
    return this;
  }

  async fetch() {
    const res = await this.user.client.axios.get(`/overviewPopulateStats/${this.persona.personaId}/o/1/`);

    utils.structureData(this.stats, res.data.data.overviewStats, {
      alias: {
        "numWins":"wins",
        "numRounds":"matchesPlayed",
        "mcomDestroy":"mcomDestroyed",
        "killAssists":"assists"
      }
    });

    this.stats.coopMissionsFinished = res.data.data.coopLevelsTaken;
     

  }
}

module.exports.Soldier = Soldier;
