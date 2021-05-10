const axios = require("axios");
const defaultHeader = require("../assets/json/headers.json");
const { BattlelogMap } = require("./blmap");
const { ForumClient } = require("./forumclient");
const { User } = require("./user");
const { Server } = require("./server");

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

		let instance = axios.create({
			baseURL: `https://battlelog.battlefield.com/${this.game}`,

			...options.axios,
			headers: { ...(options.axios.headers || {}), ...defaultHeader },
		});

		Object.defineProperty(this, "axios", {
			value: instance,
			enumerable: false,
		});
	}

	users = new BattlelogMap();
	servers = new BattlelogMap();
	forum = new ForumClient(this);
	platoons = new BattlelogMap();

	async fetchUser(...params) {
		let user = await new User(this, ...params).fetch();

		this.users.structureData(user.userId, user);
		return user;
	}

	async fetchPlatoon(...params) {
		let platoon = await new Platoon(this, ...params).fetch();

		this.platoons.structureData(platoon.id, platoon);
		return user;
	}

	async fetchServers() {
		let res = await this.axios.get("/servers");
		this.servers.structureData(null, res.data.context.servers, {
			callbackKey: (k, v) => v.guid,
			callbackValue: (k, v) => new Server(this, v)

		});

		return this.servers;
	}

	async fetchServer(...args) {
		let server = await new Server(this, ...args).fetch();
		this.servers.structureData(server.id, server);

		return server;
	}

}

module.exports.GameClient = GameClient;
