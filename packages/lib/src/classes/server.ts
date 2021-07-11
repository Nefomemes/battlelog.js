import * as utils from "../utils";
import { User } from "./user";
import type { GameClient } from "./gameclient";
/**
 * Represents a server.
 *
 * @class
 */
export class Server {
  /**
   * The server unique GUID identifier
   */
  guid: string;

  players: {
    [userId: string]: User;
  };

  /**
   * The GameClient of this server.
   */
  client: GameClient;

  /**
   * Creates a new Server instance.
   *
   * @param client
   * @param data
   */
  constructor(client: GameClient, data: Server | string) {
    Object.defineProperty(this, "client", { value: client, enumerable: false });
    if (typeof data === "string") {
      this.guid = data;
    } else {
      this.structureData(data);
    }
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
   * @property settings - The settings configured for the server.
   * @property settings.vhud - Whether HUD is displayed
   * @property settings.vkca - Whether killcam is displayed
   * @property settings.vbdm - Bullet damage bulletDamageModifier
   * @property settings.vtkk - How many friendly fire kills tolerated before a player is kicked out from the server
   */
  settings: {
    vhud?: boolean;
    vffi?: boolean;
    vtkk?: number;
    vbdm?: number;
    vmin?: boolean;
    vkca?: boolean;
  } = {};
}
