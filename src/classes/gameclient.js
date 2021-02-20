const axios = require("axios");
const defaultHeader = require("../assets/json/headers.json");

const { UsersManager } = require("./um");

/**
 *  Represents that /:game/ part. The main brain of everything.
 *
 * @class
 */
class GameClient {
  type = "GameClient";
  /**
   * Creates a new GameClient instance.
   *
   * @class
   * @param {BattlelogClient} client - The client of this instance.
   * @param game
   * @param options
   * @param {GameType}
   */
  constructor(client, game = "bf3", options = {}) {
    if (!client) throw Error("The 'client' parameter is required. ");

    if (typeof options !== "object")
      throw Error("Parameter 'options' is required to be an object. ");

    if (typeof game !== "string")
      throw Error("Parameter 'game' is required to be a string.");
    game = game.toLowerCase();

    if (!["bf3", "bf4", "mohw", "bfh"].includes(game))
      throw Error("The game is not available in Battlelog.");

    /**
     * @typedef {('bf3'|'bf4'|'bfh'|'mohw')} GameType
     */

    this.game = game;
    /**
     *  @property {GameType} game - The game
     */
    this.client = client;

    if (!options.axios) options.axios = {};

    this.axios = axios.create({
      baseURL: `https://battlelog.battlefield.com/${this.game}`,

      ...options.axios,
      headers: { ...(options.axios.headers || {}), ...defaultHeader },
    });
  }

  users = new UsersManager(this);
}

module.exports.GameClient = GameClient;
