<<<<<<< HEAD


class Soldier {
	constructor(user, data){
		this.user = user;
		
		
	}
	structureData(data){
		
	}
	
	async fetch(){
		const res = await this.user.client.axios.get(`overviewPopulateStats/280966984/bf3-us-assault/1`)

	}

}
=======
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
   * @typedef {object} SoldierStats
   * @property {number} coopMissionsFinished - How many coop missions have the
   * soldier finished
   * @property {number} coopUnlocks - How many unlockable weapons have the
   * soldier unlocked by playing coop missions
   * @property {number} rank - The soldier's rank
   * @property {number} revives - How many revives the soldier have done
   * @property {number} kills - How many kills the soldier have
   * @property {number} wins - How many matches the soldier have won
   * @property {number} dogtagsCollected - How many dogtags have the soldier
   * collected. Usually when killing an enemy with a knife
   * @property {number} assists - How many kill assists the soldier have
   * @property {number} repairs - How many repairs the soldier have done when
   * using the engineer class
   * @property {number} deaths - How many times the soldiers have died
   * @property {number} accuracy - The soldier's accuracy.
   */

  /**
   * The statistics of this soldier.
   *
   * @property {SoldierStats}
   */
  stats = {};

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
    var soldierRootStats = [
      "timePlayed",
      "kills",
      "deaths",
      "npStatus",
      "legendaryLevel",
      "rsNumWins",
      "rank",
      "numLosses",
      "numWins",
      "skill",
      "score",
      "rsNumLosses",
    ];
    if (!fetch) {
      rules = {
        blacklist: soldierRootStats,
      };
    }
    utils.structureData(this, data, rules);

    this.user.soldiers.cache.set(this.persona.personaId, this);
    utils.structureData(this.stats, data, {
      whitelist: soldierRootStats,
    });

    return this;
  }

  async fetch() {
    const res = await this.user.client.axios.get(
      `/overviewPopulateStats/${this.persona.personaId}/o/1/`
    );

    utils.structureData(this.stats, res.data.data.overviewStats, {
      alias: {
        numWins: "wins",
        numRounds: "matchesPlayed",
        mcomDestroy: "mcomDestroyed",
        killAssists: "assists",
        numLosses: "losses",
      },
    });

    this.stats.coopMissionsFinished = res.data.data.coopLevelsTaken;
    return this;
  }
}

module.exports.Soldier = Soldier;
>>>>>>> 6fd1b11e6854fc741831a2859af99e04412fc7fb
