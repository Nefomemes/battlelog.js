import utils from "../utils/utils";
import User from "./user";

/**
 * Represents a server.
 *
 * @class
 */
class Server {


   guid: /^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/i;
  /**
   * Creates a new Server instance.
   *
   * @param {GameClient} client
   * @param {object} data
   */
  constructor(client, data) {
    this.client = client;
    this.structureData(data);
  }
  /**
   * Fetch the server and populate the server's stats again.
   *
   * @function
   * @returns {Server} - The server
   */
  async fetch() {
    const res = await this.client.axios.get(`/servers/show/pc/${this.guid}`);
    this.structureData(res.data.context.server);
    this.players = res.data.context.players.map(
      (i) => new User(this.client, i)
    );

    return this;
  }

  structureData(data) {
	/**
	 * @property ""
	 */
    utils.structureData(this, data, {
      blacklist: ["settings"],
      setBoolean: ["punkbuster", "fairfight", "hasPassword", "ranked"],
    });
   

    utils.structureData(this.settings, data.settings, {
      alias: {
        vhud: "displayHUD",
        vffi: "friendlyFire",
        vtkk: "teamKillsBeforeKicked",
        vbdm: "bulletDamageModifier",
        vmin: "showMinimap",
        vkca: "showKillcam",
      },
      setBoolean: ["displayHUD", "friendlyFire", "showMinimap", "showKillcam"],
    });

    return this;
  }

  /**
   * The settings configured for a server.
   * 
   * @typedef ServerSettings
   * @property {boolean} displayHUD - Whether HUD is displayed
   * @property {Number} teamKillsBeforeKicked - How many friendly fire kills before a player is kicked out from the server
   * @property {boolean} showMinimap - Whether minimap is displayed
   * @property {boolean} friendlyFire - Whether players can do friendly fire.
   * @property {Number} bulletDamageModifier - This property basically tunes the TTK.
   */

  /**
   * 
   * @property settings - The settings configured for the server.
   * @property settings.vhud - Whether HUD is displayed
   * @property settings.vkca - Whether killcam is displayed
   * @property settings.vbdm - Bullet damage bulletDamageModifier
   * @property settings.vtkk - How many friendly fire kills tolerated before a player is kicked out from the server
   */
  settings: {
  vhud: boolean,
  vffi: boolean,
  vtkk: number,
  vbdm: number,
  vmin: boolean,
  vkca: boolean
  };

};