const { Platoon } = require("./platoon");
const utils = require("../utils/utils");
const { stringify } = require("querystring");
const { SoldiersManager } = require("./soldiersmanager");
const { Soldier } = require("./soldier");
const { BattlelogMap } = require("./blmap");
/**
 * Represents a Battlelog user.
 *
 * @class
 * @param {GameClient} client - The client used to access this user.
 * @param {object} data - Raw object data of the user.
 */
class User {
  /**
   * The user's email hash.
   *
   * @property {string}
   *
   */
  gravatarEmailHash;

  /**
   * The platoon the user is a part of. Please do not confuse this with
   * User#platoon
   *
   * @property {Map<Platoon>}
   */
  platoons = new BattlelogMap();

  /**
   * The platoons the user is a fan of.
   *
   * @property {Map<Platoon>}
   */

  platoonFans = new BattlelogMap();

  /**
   * The user's friemd ;ist. Only have 10 of all of the user's friends though.
   *
   * @property {BattlelogMap<User>}
   */
  friends = new BattlelogMap();

  /**
   * The platoon of the user. This is different than User#platoons as that
   * property is only available if the game supports joining multiple platoons.
   *
   * @property {Platoon}
   */

  platoon;

  /**
   * @typedef {(User|string|object)} UserResolvable - Something that can be
   * parsed into a User instance. Could be a User instance, the username of the
   * user, or a raw data object of the user.
   *
   */

  /**
   * The soldiers of this user/
   *
   * @property {SoldiersManager}
   */
  soldiers = new SoldiersManager(this, []);

  /**
   * Creates a new User instance.
   *
   * @class
   * @param {Client} - The client for this user.
   * @param client
   * @param {UserResolvable} [data] - The user's data.
   */
  constructor(client, data) {
    this.client = client;
    /**
     * @property {GameClient} client - The client used to access this user.
     */
    if (typeof data === "object") {
      this.structureData(data);
    } else if (typeof data == "string") {
      this.name = data;
    }
  }
  /**
   * Fetch the user in Battlelog and refresh his data with the raw data
   * Battlelog gave.
   *
   * @async
   * @returns {User} the User
   */
  async fetch() {
    const res = await this.client.axios.get(`/user/${this.name}`);

    const profile = res.data.context.profileCommon;
    this.structureData(profile);
    res.data.context.soldiersBox;
    this.activities = res.data.context.activityStream;
    return this;
  }
  /**
   * Structure the class using the data provided.
   *
   * @param {object} data - The data used to structure the class
   * @returns {User} the User
   */
  structureData(data) {
    utils.structureData(this, data, {
      blacklist: ["user", "tenFriends", "platoons", "platoonFans"],
    });
    /**
     *
     */
    if (data.user) {
      utils.structureData(this, data.user, { blacklist: ["gravatarMd5"] });

      if (data.user.gravatarMd5) {
        this.gravatarEmailHash = data.user.gravatarMd5;
      }
    }

    if (data.tenFriends && data.tenFriends.length) {
      this.friends = data.tenFriends.map((i) => new User(this.client, i));
    }

    if (data.platoons) {
      this.platoons = data.platoons.map((i) => new Platoon(this.client, i));
    }

    if (data.platoonFans) {
      this.platoonFans = data.platoonFans.map(
        (i) => new Platoon(this.client, i)
      );
    }

    if (data.club) {
      this.platoon = new Platoon(this.client, data.club);
    }

    if (data.soldiersBox) {
      this.soldiers.structureData(data.soldiersBox);
    }  

    this.client.users.cache.set(this.userId, this);
  }

  /**
   * Get the URL string of the user's avatar.
   *
   * @function
   * @param {object} options - Options used
   * @returns {string} URL string for the user's avatar.
   */
  displayAvatarURL(options = {}) {
    utils.validateOptions(options, {
      alias: { size: "s", rating: "r", default: "d", extension: "e" },
      defaults: { default: "retro" },
    });

    if (options.size && options.size > 2048)
      throw Error("Option 'size' is required to be less than 2048.");
    if (options.size && options.size < 1)
      throw Error("Option 'size' is required to be more than 1.");
    if (options.rating === "r")
      throw Error(
        "To prevent abuse of this library. Avatars that are rated 'r' or 'x' is not permitted."
      );

    if (options.rating === "x") throw Error("Ok coomer");

    if (!["g", "pg"].includes(options.rating)) throw Error("");
    if (
      !(
        options.default.startsWith("http://") ||
        options.default.startsWith("https://")
      ) &&
      ![
        "404",
        "mp",
        "identicon",
        "monsterid",
        "wavatar",
        "retro",
        "robohash",
        "blank",
      ].includes(options.default)
    )
      throw Error(
        "Option 'default' did not provide a valid default profile picture"
      );
    let params = { r: options.rating, d: options.default, s: options.size };

    if (options.forceDefault) params.f = "y";
    return `https://www.gravatar.com/avatar/${this.gravatarEmailHash}.${
      options.extension
    }?${stringify(params)}`;
  }
}

module.exports.User = User;
