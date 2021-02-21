
/**
 * Manages a user's soldiers.
 * 
 * @class
 */
class SoldiersManager {

    cache = new Map();
    /**
     * 
     * @param {User} user - The user that owns this SoldiersManager instance.
     * @param {array} [data] -  Raw array data of the user's soldiers.
     */
	constructor(user, data){
        this.user = user;

    }
    /**
     * Add 
     */
    structureData(data, fetch){
    	for(let soldier of data){
    	var existingSoldier =	this.cache.get(soldier.persona.personaId)
    		if(existingSoldier){
    			soldier.structureData(soldier, true)
    		} else {
        new Soldier(this.user, soldier, fetch );
    	}
    }
    	
    	return this;
    }

   async fetch(){
        var res = await this.user.axios.get('/user/overviewBoxStats/3307924356088947575`);
        
        this.structureData(res.data.soldiersBox, true);
        
        return this;
    }
}

module.exports.SoldiersManager = SoldiersManager;