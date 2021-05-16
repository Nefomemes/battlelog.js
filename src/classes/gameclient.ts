import axios from "axios";
import defaultHeader from "../assets/json/headers.json";
import { CacheMap } from "./cachemap";
import { User } from "./user";
import { Server } from "./server";
import type { SupportedGames } from '../types/games';
import type { AxiosRequestConfig } from 'axios';
import { Platoon } from './platoon';
import type { BattlelogClient } from './blclient';
 
/**
 *  Represents that /:game/ part. The main brain of everything.
 *
 * @class
 */
export class GameClient {
	game: SupportedGames;
	/**
	 * Creates a new GameClient instance.
	 *
	 * @class
	 * @param client - The client of this instance.
	 * @param  game - The game of this GameClient.
	 * @param  [options] - The options used for this instance.
	 */
	constructor(client: BattlelogClient, game: SupportedGames = "bf3", options: {
		axios?: AxiosRequestConfig
	} = {}) {
		if (!client) throw Error("The 'client' parameter is required. ");

		if (typeof options !== "object")
			throw Error("Parameter 'options' is required to be an object. ");

		if (typeof game !== "string")
			throw Error("Parameter 'game' is required to be a string.");
		game = <SupportedGames>game.toLowerCase();

		if (!["bf3", "bf4", "mohw", "bfh"].includes(game))
			throw Error("The game is not available in Battlelog.");

		this.game = game;
		/**
		 *  @property {GameType} game - The game
		 */

		Object.defineProperty(this, "client", { value: client, enumerable: false });

		if (!options.axios) options.axios = {};

		let instance = axios.create({
		

			...options.axios,
			baseURL: `https://battlelog.battlefield.com/${this.game}`,
			headers: { ...(options.axios.headers || {}), ...defaultHeader },
		});

		Object.defineProperty(this, "axios", {
			value: instance,
			enumerable: false,
		});
	}

	users = new CacheMap();
	servers = new CacheMap();
	platoons = new CacheMap();

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
