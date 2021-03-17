const axios = require("axios");
const defaultHeader = require("../assets/json/headers.json");
<<<<<<< HEAD
<<<<<<< HEAD
const { UsersManager } = require("./usersmanager");
=======
const { UsersManager }  = require("./um");
>>>>>>> e91eafa168cb93a426fd3c315c94e892461f29d8

class GameClient {
	
	type = "GameClient";
	
	constructor(client, game = 'bf3', options = {}) {
		if (!client) throw Error("The 'client' parameter is required. ");

		if (typeof options !== 'object')
			throw Error("Parameter 'options' is required to be an object. ");

		
		if (typeof game !== 'string')
			throw Error("Parameter 'game' is required to be a string.");
		game = game.toLowerCase();

		if (!['bf3', 'bf4', 'mohw', 'bfh'].includes(game))
			throw Error('The game is not available in Battlelog.');

		this.game = game;
		
		this.client = client;
		
		if(!options.axios) options.axios = {};
				
		this.axios = axios.create({
			baseURL: `https://battlelog.battlefield.com/${this.game}`,
		
  ...options.axios,
  headers: { ...(options.axios.headers || {}), ...defaultHeader },
   
			
			
		})
	}


	users = new UsersManager(this);
}

<<<<<<< HEAD
module.exports.GameClient = GameClient;
=======
module.exports.GameClient = GameClient;
>>>>>>> e91eafa168cb93a426fd3c315c94e892461f29d8
=======

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
   * @param {GameType} game - The game of this GameClient.
   * @param {options} [options] - The options used for this instance.
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

    Object.defineProperty(this, "client", { value: client, enumerable: false });

    if (!options.axios) options.axios = {};

    var axios = axios.create({
      baseURL: `https://battlelog.battlefield.com/${this.game}`,

      ...options.axios,
      headers: { ...(options.axios.headers || {}), ...defaultHeader },
    });

    Object.defineProperty(this, "axios", { value: axios, enumerable: false });
  }

  users = new UsersManager(this);
}

module.exports.GameClient = GameClient;
>>>>>>> 6fd1b11e6854fc741831a2859af99e04412fc7fb
