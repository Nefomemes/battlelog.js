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

	constructor(user, data){
		this.user = user;
		
		
	}
	/**
	 * Populate an object with a raw data object. 
	 * 
	 * @param {object} data - The raw data 
	 * @returns {Soldier} - The soldier
	 */
	structureData(data){
		utils.structureData(this, data, {
			"blacklist": ['kills', 'npStatus', 'rsNumWins', 'skill', 'score', 'dogtagsForPersona', 'numWins', 'numLosses']
		})


	return this;
	}
	
	async fetch(){
		const res = await this.user.client.axios.get(`/overviewPopulateStats/${this.user.userId}/`)

	}

}  