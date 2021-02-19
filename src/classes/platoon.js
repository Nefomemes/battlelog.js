const utils = require("../utils/utils");
/**
 * Represents a Platoon
 * 
 * @class
 */
class Platoon {


	#badgePathRaw;
	/**
	 * Creates a new Platoon instance.
	 * 
	 * @constructor
	 * @param {GameClient} client 
	 * @param {object} data 
	 */
	constructor(client, data){
	if(data){
	this.structureData(data);
	}
		}
	/**
	 * Structure the class using the data provided. 
   *
	 * @param {object} data - The data used to structure the class  
	 * @returns {User} the User
	 */
	structureData(data){
		utils.structureData(this, data, {blacklist: ['badgePath']});


		this.#badgePathRaw = data.badgePath;
		
	}
	/**
	 * 
	 * @param {object} [options]  
	 */
	getBadge(options = {}){

		if(!options.format) options.format = "png";

		if(!options.size) options.size = 128;

		if(typeof options.format !== 'string') throw Error("Option 'format' is required to be a string.");



		return this["#badgePathRaw"].split("[FORMAT]").join(options.format).split("[SIZE]").join(options.size);
	}
	
	async fetch(){
		const res = await this.client.axios.get(`/platoon/${this.id}/`);

		this.structureData(res.context.platoon);

		this.isFan = res.context.isFan;
	}
}

module.exports.Platoon = Platoon;