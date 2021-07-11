import { Platoon } from "./platoon";
import * as utils from "../utils";
import { Soldier } from "./soldier";

import type { GameClient } from "./gameclient";
import type { GravatarDefaultAvatarType } from "../types/gravatarda";
import * as querystring from "querystring";
/**
 * Represents the userinfo property of a user's profile
 */
export interface UserInfo {
  /**
   * @prop {string} twitchUsername - The user's Twitch username.
   * @prop {number} privacyFeedAndgameActivity - 
   * @prop {string} userId - The user's ID
   * @prop {string} presentation - The user's presentation
   * @prop {boolean} allowFriendRequests - Whether the user allow friend requests
   * @prop {boolean} gravatarHidden - Whether the user choose not to display his/her avatar.
   * @prop {boolean} privacyShowFriends - Whether the user hides his/her friends.
   * @prop {number} lastLogin - Last time the user logged in.
   * 
   */
  twitchUsername: string;
  privacyFeedAndGameActivity: number;
  userId: string /*
     introSectionBitmask: 48,
      feedHidden: false,
      pushSettings: -1,
      showDetails: false,
      forumSignature: null,
      locality: null,
      location: null,
      icon: 0,*/;
  presentation: string;
  /*profileBlocked: 0,*/
  allowFriendRequests: boolean;
  showFriendsUI: boolean;
  gravatarHidden: boolean;
  /*   presencePrivacy: 0,*/
  presentationHidden: boolean;
  loginCounter: number;
  privacyShowFriends: number;
  forumSignatureHidden: boolean;
  name: string;
  age: number;
  /*birthdate: null,*/
  feedActive: boolean;
  lastLogin: number /*,
      privacyDetails: 2*/;
};

export interface UserPresence {
    /**
     * @prop {string} userId - The user's ID.
     * @prop {string} updatedAt - The last time the presence have been updated.
     * @prop {number} presenceStates - Whether the user is online or not. If online it's 1, if invisible or offline then 0. 
     */
    userId: string;
    updatedAt: number;
    presenceStates: number; // 0 or 1

}
export interface UserObject {
  /**
   * @prop {string} username - The user's username.
   * @prop {string} userId - The user's ID.
   * @prop {UserPresence} presence - The user's presence status.
   * @prop {string} gravatarMd5 - The user's gravatar Md5 hash.
   */
  username: string;
  userId: string;
  gravatarMd5: string;
  presence: UserPresence;
}
/**
 * Represents a User Profile. Contains (almost) everything you would see in a Battlelog profile page.
 * 
 * @class
 */
export interface UserProfile {
  /**
  * 
  * @prop {Array<Platoon>} platoons - The platoons the user is a part of.
  * @prop {UserObject} user - The user of this profile. 
  * @prop {Array<Soldier>} soldiers - Soldiers the user have.
  */
   user: UserObject;
   platoons: Array<Platoon>;
   friends: Array<User>;
   soldiers: Array<Soldier>;
};
/**
 * Represents a Battlelog user.
 *
 * @class
 * @param  client - The client used to access this user.
 * @param {object} data - Raw object data of the user.
 */
export class User implements UserProfile {
  // @ts-expect-error
  user: UserObject = {};
  // @ts-expect-error
  userinfo: UserInfo = {};
  client!: GameClient;
  platoons: Array<Platoon> = [];
  platoonFans: Array<Platoon> = [];
  friends: Array<User> = [];
  soldiers: Array<Soldier> = [];
  
  /**
   * Creates a new User instance.
   *
   * @class
   * @param client - The client for this user.
   * @param data - The user's data.
   */
  constructor(client: GameClient, data: string | User) {
    this.client = client;

    /**
     * @property {GameClient} client - The client used to access this user.
     */

    if (typeof data === "object") {
      this.structureData(data);
    } else if (typeof data == "string") {
      this.user.username = data;
    }
  }
  /**
   * Fetch the user in Battlelog and refresh his data with the raw data
   * Battlelog gave.
   *
   * @returns the User instance
   */
  async fetch(): Promise<User> {
    const res = await this.client.axios.get(`/user/${this.user.username}`);

    const profile = res.data.context.profileCommon;

    this.structureData(profile);

    this.soldiers = res.data.context.soldiersBox;

    return this;
  }
  /**
   * Structure the class using the data provided.
   *
   * @param  data - The data used to structure the class
   * @returns the User
   */
  structureData(data): User {
    if (!data) return this;
    utils.structureData(this, data, {
      blacklist: ["tenFriends", "platoons", "platoonFans"],
    });

    /**
     *
     */

    if (data.tenFriends && data.tenFriends.length) {
      this.friends = data.tenFriends.map((i) => new User(this.client, i));
    }

    if (data.soldiersBox) {
      for (let soldier of <Array<Soldier>>data.soldiersBox) {
        let soldierInnit = this.soldiers[soldier.persona.personaId];
        if (soldierInnit) {
          soldierInnit.structureData(soldier);
        } else {
          this.soldiers[soldier.persona.personaId] = new Soldier(this, soldier);
        }
      }
    }
    return this;
  }
  /**
   * Get the URL string of the user's avatar.
   *
   * @function
   * @param  options - Options used
   * @returns URL string for the user's avatar.
   */
  displayAvatarURL(
    options: {
      d?: GravatarDefaultAvatarType;
      s?: number;
      r?: "g" | "pg";
      f?: boolean | string;
      e?: "png" | "jpg";
    } = {}
  ): string {
    utils.validateOptions(options, {
      defaults: { d: "retro", r: "g", e: "png" },
    });

    if (options.s && options.s > 2048)
      throw Error("Option 'size' is required to be less than 2048.");
    if (options.s && options.s < 1)
      throw Error("Option 'size' is required to be more than 1.");
    // @ts-ignore
    if (options.r === "r")
      throw Error(
        "To prevent abuse of this library. Avatars that are rated 'r' or 'x' is not permitted."
      );
    // @ts-ignore
    if (options.r === "x") throw Error("Ok coomer");

    if (!["g", "pg"].includes(options.r))
      throw Error("Rating must be either 'g' or 'pg'");
    if (
      !(options.d.startsWith("http://") || options.d.startsWith("https://")) &&
      ![
        "404",
        "mp",
        "identicon",
        "monsterid",
        "wavatar",
        "retro",
        "robohash",
        "blank",
      ].includes(options.d)
    )
      throw Error(
        "Option 'default' did not provide a valid default profile picture"
      );

    if (typeof options.f === "boolean") options.f = options.f ? "y" : "n";

    return `https://www.gravatar.com/avatar/${this.user.gravatarMd5}.${
      options.e
    }?${(() => {
      delete options.e;
      return querystring.stringify(options);
    })()}`;
  } // This module is declared with using 'export =', and can only be used with a default import when using the 'allowSyntheticDefaultImports' flag.

  async fetchSoldiers(): Promise<Array<Soldier>> {
    var res = await this.client.axios.get(
      `/user/overviewBoxStats/${this.user.userId}`
    );

    return this.soldiers;
  }
}
