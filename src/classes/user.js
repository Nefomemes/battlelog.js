const { Platoon } = require("./platoon");
const utils = require("../utils/utils");
const { stringify } = require("querystring");
/**
 * Represents a Battlelog user.
 * 
 * @class
 * @param {GameClient} client - The client used to access this user.
 * @param {object} data - Raw object data of the user. 
 */
class User {

	#gravatar;
	
	#client;

	constructor (client, data){
		
	this.client = client;	
	if(typeof data === "object"){
	this.structureData(data);
	} else if(typeof data == "string"){
		this.name  = data;
	}
	}
/**
 * Fetch the user in Battlelog and refresh his data with the raw data Battlelog gave.
 *
 * @async 
 * @returns {User} the User
 */
	async fetch(){
			const res = await this.client.axios.get(`/user/${this.name}`);

			const profile = res.data.context.profileCommon;
			this.structureData(profile);
this.soldiers = res.data.context.soldiersBox;
this.activities = res.data.context.activityStream;
	return this;
	}
	/**
	 * Structure the class using the data provided. 
	 *
	 * @param {object} data - The data used to structure the class  
	 * @returns {User} the User
	 */
	structureData(data){
		
		utils.structureData(this, data, {blacklist: ["user", "tenFriends", "platoons", "platoonFans"]});
		if(data.user){
		utils.structureData(this, data.user, {blacklist: ["gravatarMd5"]});

		this.#gravatar = data.user.gravatarMd5;

		}


		if(data.tenFriends){
			this.friends = data.tenFriends.map((i) => new User(this.client, i));
		}

		if(data.platoons){
			this.platoons = data.platoons.map((i) => new Platoon(this.client, i));

		}
		
		if(data.platoonFans){
			this.platoonFans = data.platoonFans.map((i) => new Platoon(this.client, i));
		}

		if(this.club){
			this.club = new Platoon(this.client, data.club);
		}
		
		this.client.users.cache.set(this.userId,this);
	}

	/**
	 * Get the URL string of the user's avatar.
	 *
	 * @function
	 * @param {object} options - Options used 
	 * @returns {string} URL string for the user's avatar.
	 */
	displayAvatarURL(options = {}){

		utils.validateOptions( options, {alias: {size: 's', rating: 'r', 'default': 'd', extension: 'e'}, defaults: {'default': 'retro'}});

		if(options.size && options.size > 2048) throw Error("Option 'size' is required to be less than 2048.");
		if(options.size && options.size < 1) throw Error("Option 'size' is required to be more than 1.");
		if(options.rating === "r") throw Error("To prevent abuse of this library. Avatars that are rated 'r' or 'x' is not permitted.");
		
		if(options.rating === "x") throw Error("Ok coomer");
		
		if(!['g', 'pg'].includes(options.rating)) throw Error("");
		if(!(options.default.startsWith("http://") || options.default.startsWith("https://")) && !['404', 'mp', 'identicon', 'monsterid', 'wavatar', 'retro', 'robohash', 'blank'].includes(options.default)) throw Error("Option 'default' did not provide a valid default profile picture");
		let params = {r: options.rating, d: options.default, s: options.size };

		if(options.forceDefault) params.f = 'y';
		return `https://www.gravatar.com/avatar/${this.#gravatar}.${options.extension}?${stringify(params)}`;


		
		
	}

}

 

module.exports.User = User;
