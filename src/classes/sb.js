const utils = require("../utils/utils");
const { Server } = require("./server")
const { BattlelogMap } = require("./blmap");
/**
 * Represents Battlelog server browser.
 * 
 * @class
 */
class ServerBrowser {
	/**
	 * Servers that have been cached by the instance.
	 */
	cache = new BattlelogMap();

	constructor(client, data) {
		Object.defineProperty(this, "client", { value: client, enumerable: false });




		if (data) {
			this.structureData(data);
		}
	}

	structureData(data) {

		if (Array.isArray(data)) {
			for (let server of data) {
				this.cache.structureData(server.id, new Server(this.client, server));
			}
		} else {
			this.cache.structureData(data.id, new Server(this.client, data));
		}
		return this;
	}
    /**
     * Fetchs all servers
     */
	async fetch() {
		const res = await this.client.axios.get('/servers');

		this.structureData(res.data.context.servers);

		return this;
	}


}
