
function getArticle(str, plural) {
	if (!str) throw Error("Expected parameter 'str'. Found no parameters.");

	if (typeof str !== "string") throw Error(`Expected parameter 'str' to be a string. While it is actually ${getArticle(typeof str)} ${typeof str}.`);
	if (plural && plural === true) return 'some';
	if ('aiueo'.includes(str[0])) return 'an';
	return 'a';
}




/**
 * Manages 
 */
function validateOptions(data, rules) {


	if (rules.alias) {
		for (let [name, value] of Object.entries(rules.alias)) {
			if (typeof data[name] === "undefined") data[name] = data[value];
		}
	}

	if (rules.defaults) {
		for (let [name, value] of Object.entries(rules.defaults)) {
			if (typeof data[name] === "undefined") data[name] = value;
		}
	}

	if (rules.required && rules.required.length) {
		for (let required of rules.required) {
			if (!data[required]) throw Error(`Option '${required}' is required. While it's not provided.`);
		}
	}

	if (rules.typeof) {
		for (let [prop, value] of Object.entries(rules.typeof)) {
			if (typeof data[prop] !== value) throw Error(`Option '${prop} is required to be ${getArticle(value)} while it is a ${typeof data[prop]}.`);
		}
	}



	return data;

}

/**
* Populate an object with a raw data object. Does not currently support recursion.
* 
* @param {object} cls - The class/object to populate
* @param {object} data - The data whose properties will be used to populate the class / object.
* @param {object} [options] - An object filled with how things should be done.
* @param {array} [options.blacklist] - An array filled with properties that should be ignored
* @param {array} [options.setBoolean] - An array filled with properties that should be set to true if they are truthy or false if they are falsy.
* @param {object} [options.alias] - An object that rules which properties should be renamed and what should they be renamed to.
* @param {array} [options.onlyAssignIfTruthy] - An array filled 
* @returns {object} - The class/object
*/
function structureData(cls, data, options = {}) {
	if (!data) return;
	if (!cls) throw Error();

	validateOptions(options, {
		typeof: {
			"blacklist": "array",
			"setBoolean":"array",
			"alias":"object",
			"onlyAssignIfTruthy":"array"
		},
		defaults: {
			"blacklist":[],
			"setBoolean": [],
			"alias": {},
			"onlyAssignIfTruthy":[]
		}
	})





	for (let [name, value] of Object.entries(data)) {
		if(options.alias[name]) name = options.alias[name];
		if (!options.onlyAssignIfTruthy.includes(name) || value){
			if (!options.blacklist.includes(name)) {
				if (!options.setBoolean) {
					cls[name] = value;
				} else {
					cls[name] = value ? true : false;
				}
			}
		}
	}

	return cls;
}

module.exports.getArticle = getArticle;
module.exports.structureData = structureData;
module.exports.validateOptions = validateOptions;
