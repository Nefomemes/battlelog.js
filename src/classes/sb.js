const utils = require("../utils/utils");
const { Server } = require("./server")
<<<<<<< HEAD
class ServerBrowser {
	cache = new Map();
=======
const { BattlelogMap } = require("./blmap");
/**
 * Represents Battlelog server browser/
 * 
 * @class
 */
class ServerBrowser {
	/**
	 * 
	 */
	cache = new BattlelogMap();
>>>>>>> 6fd1b11e6854fc741831a2859af99e04412fc7fb

	constructor(client, data){
		this.client = client;
		
<<<<<<< HEAD
<<<<<<< HEAD
		structureData(data);
=======
this.structureData(data);
>>>>>>> e91eafa168cb93a426fd3c315c94e892461f29d8
		
=======

	
this.structureData(data);
	
>>>>>>> 6fd1b11e6854fc741831a2859af99e04412fc7fb
	}



	async fetch(){
		const res = await this.client.axios.get('/servers');

		this.structureData(res.data.context.servers);

		for(let server of res.data.context.servers){
			new Server(this.client, server);
		}
	}
<<<<<<< HEAD
<<<<<<< HEAD
}
=======
}
>>>>>>> e91eafa168cb93a426fd3c315c94e892461f29d8
=======


}
>>>>>>> 6fd1b11e6854fc741831a2859af99e04412fc7fb
