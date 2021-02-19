
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
    
    structureData(data){
        for(let soldier of data){
            this.cache.set(soldier.persona.personaId, new Soldier())
        }
    }

    fetch(){
        return this.user.fetch();
    }
}

module.exports.SoldiersManager = SoldiersManager;