import * as utils from "../utils";
import { User } from "./user";
import type { PersonaType } from "../types/persona";
/**
 * Represents a Battlelog soldier.
 *
 * @class
 */

export class Soldier {
  /**
   * The user of this soldier.
   *
   * @property {User}
   */
  user: User;

  persona: PersonaType;
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
    this.structureData(data, fetch);
    Object.defineProperties(this, {
      user: { value: user, enumerable: false },
      client: { value: user.client, enumerable: false },
    });
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
