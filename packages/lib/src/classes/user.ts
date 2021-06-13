import { Platoon } from "./platoon";
import * as utils from "../utils";
import { Soldier } from "./soldier";
import type { UserInfoType } from "../types/userinfo";
import type { GameClient } from "./gameclient";
import type { UserPropType } from "../types/userprop";
import type { GravatarDefaultAvatarType } from "../types/gravatarda";
import * as querystring from  "querystring";
/**
 * Represents a Battlelog user.
 *
 * @class
 * @param  client - The client used to access this user.
 * @param {object} data - Raw object data of the user.
 */
export class User {
  // @ts-ignore
  user: UserPropType = {};

  // @ts-ignore
  userinfo: UserInfoType = {};
 client: GameClient;
 gravatarMd5: string;

  /**
   * The platoon the user is a part of. Please do not confuse this with
   * User#platoon
   *
   * @property
   */
  platoons: Array<Platoon> = [];

  /**
   * 
   */
  /**
   * The platoons the user is a fan of.
   *
   */

  platoonFans: Array<Platoon> = [];

  /**
   * The user's friend list. Only have 10 of all of the user's friends though.
   *
   * @property {BattlelogMap<User>}
   */
  friends: Array<User> = [];

  /**
   * @typedef {(User|string|object)} UserResolvable - Something that can be
   * parsed into a User instance. Could be a User instance, the username of the
   * user, or a raw data object of the user.
   *
   */

  /**
   * The soldiers of this user.
   */
  soldiers: {
    [personaId: string]: Soldier
  } = { };
 


  /**
   * Creates a new User instance.
   *
   * @class
   * @param client - The client for this user.
   * @param data - The user's data.
   */
  constructor(client: GameClient, data: string | User) {
    Object.defineProperty(this, "client", { value: client, enumerable: false });

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
  async fetch() : Promise<User> {
    const res = await this.client.axios.get(`/user/${this.user.username}`);

    const profile = res.data.context.profileCommon;
    if(!profile) console.warn("This is weird but we can not find profileCommon in the context object")
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
  structureData(data) : User {
	  
  	if(!data) return this;
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
      for(let soldier of <Array<Soldier>>data.soldiersBox){
        let soldierInnit = this.soldiers[soldier.persona.personaId];
       if(soldierInnit){
        soldierInnit.structureData(soldier);
       } else {
        this.soldiers[soldier.persona.personaId] = new Soldier(this, soldier);
       } 
      };
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
  displayAvatarURL(options: {
    d?: GravatarDefaultAvatarType,
    s?: number,
    r?: "g" | "pg",
    f?: boolean | string,
    e?:  "png" | "jpg"
  } = {}) : string {
    utils.validateOptions(options, {
      defaults: { d: "retro", r: "g", e: "png" }
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
      !(
        options.d.startsWith("http://") ||
        options.d.startsWith("https://")
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
      ].includes(options.d)
    )
      throw Error(
        "Option 'default' did not provide a valid default profile picture"
      );
    

    if(typeof options.f === "boolean") options.f = options.f ? "y" : "n";

   

    return `https://www.gravatar.com/avatar/${this.user.gravatarMd5}.${
      options.e
    }?${(() => { delete options.e; return querystring.stringify(options) })()}`;
  } // This module is declared with using 'export =', and can only be used with a default import when using the 'allowSyntheticDefaultImports' flag.

  async fetchSoldiers() :  Promise<{
    [personaId: string]: Soldier
  }> {
    var res = await this.client.axios.get(
      `/user/overviewBoxStats/${this.user.userId}`
    );
   
  return this.soldiers;
  }
}

