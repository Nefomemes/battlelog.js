const utils = require("../utils/utils");
/**
 * Represents a Battlelog soldier.
 * 
 * @class
 */

 class Soldier {

	/**
	 * Creates a new Soldier instance
	 *  
	 * @constructor
	 * @param {User} user - The user of this soldier.
	 * @param {object} [data] - The raw data object to be used to populate the instance.
	 */

	constructor(user, data, fetch){
		this.user = user;
		this.structureData(data, fetch)
		
		
	}
	/**
	 * Populate an object with a raw data object. 
	 * 
	 * @param {object} data - The raw data 
	 * @param {boolean} [fetch] - Whether the raw data is from a fetch function.
	 * @returns {Soldier} - The soldier
	 */
	structureData(data, fetch){
		var rules =  {
			
		}
		if(!fetch) {

		}
		
		utils.structureData(this, data, rules);
		
		this.user.soldiers.cache.set(this.persona.personaId, this);


	return this;
	}
	
	async fetch(){
		const res = await this.user.axios.get();
	}

}  