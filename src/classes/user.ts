import { Platoon } from "./platoon";
import * as utils from "../utils";
import { Soldier } from "./soldier";
export type UserInfo = {
  twitchUsername: string
}
export type  DisplayAvatarUrlOptions = {
s?: number,
r?: 'g' | 'pg',
d?: 404 | '404' | 'mp' | 'wavatar' | 'blank' | 'robohash' | 'identicon' | 'retro' | 'monsterid', 
};
/**
 * Represents a Battlelog user.
 *
 * @class
 * @param  client - The client used to access this user.
 * @param {object} data - Raw object data of the user.
 */
export class User {
  /**
   * The platoon the user is a part of. Please do not confuse this with
   * User#platoon
   *
   * @property
   */
  platoons: Map<string, Platoon> = new Map();

  /**
   * The platoons the user is a fan of.
   *
   */

  platoonFans: Map<string, Platoon> = new Map();

  /**
   * The user's friend list. Only have 10 of all of the user's friends though.
   *
   * @property {BattlelogMap<User>}
   */
  friends = new Map();

  /**
   * @typedef {(User|string|object)} UserResolvable - Something that can be
   * parsed into a User instance. Could be a User instance, the username of the
   * user, or a raw data object of the user.
   *
   */

  /**
   * The soldiers of this user.
   */
  soldiers: Map<string, Soldier> = new Map();
  /*
  userinfo: {
      privacyFeedAndGameActivity: 2,
      twitchUsername: null,
      userId: '3307924356088947575',
      introSectionBitmask: 48,
      feedHidden: false,
      pushSettings: -1,
      showDetails: false,
      forumSignature: null,
      locality: null,
      location: null,
      icon: 0,
      presentation: '',
      profileBlocked: 0,
      allowFriendRequests: true,
      showFriendsUI: false,
      gravatarHidden: false,
      presencePrivacy: 0,
      presentationHidden: false,
      loginCounter: 140,
      privacyShowFriends: 2,
      forumSignatureHidden: false,
      name: null,
      age: null,
      birthdate: null,
      feedActive: false,
      lastLogin: 1614320260,
      privacyDetails: 2
    },
  */

  /**
   * Much more detailed properties of the user..
   *
   * @typedef UserInfo
   * @property {string} twitchUsername - The user's Twitch username
   * @property {number} lastLogin - The last time the user logged in to
   * Battlelog
   * @property {*} birthdate - Since when the user have played the game
   * "Outside"
   * @property {*} name - The user's username in the game "Outside"
   * @property {boolean} gravatarHidden - Whether the user's avatar is hidden
   * @property {string} presentation - The presentation of the user.
   */

  /**
   * Much more detailed properties of the user..
   *
   * @property {UserInfo}
   */
  userinfo = {};

  /**
   * Creates a new User instance.
   *
   * @class
   * @param {Client} - The client for this user.
   * @param client
   * @param {UserResolvable} [data] - The user's data.
   */
  constructor(client, data) {
    Object.defineProperty(this, "client", { value: client, enumerable: false });

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
    if(!profile) console.warn("This is weird but we can not find profileCommon in the context object")
    this.structureData(profile);
    this.soldiers.structureData(res.data.context.soldiersBox);

    return this;
  }
  /**
   * Structure the class using the data provided.
   *
   * @param {object} data - The data used to structure the class
   * @returns {User} the User
   */
  structureData(data) {
	  
  	if(!data) return this;
    utils.structureData(this, data, {
      blacklist: ["user", "tenFriends", "platoons", "platoonFans"],
    });

    /**
     *
     */

    utils.structureData(this, data.user);

    if (data.tenFriends && data.tenFriends.length) {
      this.friends = data.tenFriends.map((i) => new User(this.client, i));
    }

  
   

    if (data.soldiersBox) {
      this.soldiers.structureData(data.soldiersBox);
    }
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
      defaults: { default: "retro", rating: "g" },
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

    if (!["g", "pg"].includes(options.rating))
      throw Error("Rating must be either 'g' or 'pg'");
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

    const { stringify } = require("querystring");

    return `https://www.gravatar.com/avatar/${this.gravatarMd5}.${
      options.extension
    }?${stringify(params)}`;
  }

  async fetchSoldiers() {
    var res = await this.client.axios.get(
      `/user/overviewBoxStats/${this.user.userId}`
    );

  
  }
}

module.exports.User = User;
