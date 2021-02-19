const utils = require("../utils/utils");
const { Server } = require("./server")

/**
 * Represents Battlelog server browser/
 * 
 * @class
 */
class ServerBrowser {
	/**
	 * 
	 */
	cache = new Map();

	constructor(client, data){
		this.client = client;
		

	
this.structureData(data);
	
	}



	async fetch(){
		const res = await this.client.axios.get('/servers');

		this.structureData(res.data.context.servers);

		for(let server of res.data.context.servers){
			new Server(this.client, server);
		}
	}


}
