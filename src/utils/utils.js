
/**
 * Utilities function to help things out.
 *
 * @module utils
 */

/**
 * Get the article of a noun
 *
 * @param {string} str
 * @param {boolean} plural
 */
function getArticle(str, plural) {
  if (!str) throw Error("Expected parameter 'str'. Found no parameters.");

  if (typeof str !== "string")
    throw Error(
      `Expected parameter 'str' to be a string. While it is actually ${getArticle(
        typeof str
      )} ${typeof str}.`
    );
  if (plural && plural === true) return "some";
  if (["a", "i", "u", "e", "o"].includes(str[0])) return "an";
  return "a";
}

/**
 * Manages options. Does not support recursion yet.
 *
 * @function
 * @param {object} data - The options object data.
 * @param {object} rules - The rules used to manage the options.
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
      if (!data[required])
        throw Error(
          `Option '${required}' is required. While it's not provided.`
        );
    }
  }

  if (rules.typeof) {
    for (let [prop, value] of Object.entries(rules.typeof)) {
      let type = Array.isArray(data[prop]) ? "array" : typeof data[prop];
      if (type !== value)
        throw Error(
          `Option '${prop}' is required to be ${getArticle(
            value
          )} ${value} while it is actually ${getArticle(type)} ${type}.`
        );
    }
  }

  if (rules.requiredToBe) {
    for (let [prop, value] of Object.entries(rules.requiredToBe)) {
      if (value && value.length) {
        if (!value.includes(data[prop]))
          throw Error(
            `Option ${prop} is required to be ${(() => {
              var lastOne = value.pop();

              return `${value
                .map((i) => `'${i}'`)
                .join(", ")}, or '${lastOne}'`;
            })()}`
          );
      }
    }
  }

  return data;
}

/**
 * Populate an object with a raw data object. Does not currently support
 * recursion.
 *
 * @param {object} cls - The class/object to populate
 * @param {object} data - The data whose properties will be used to populate the
 *     class / object.
 * @param {object} [rules] - An object filled with how things should be done.
 * @param {Array} [rules.blacklist] - An array filled with properties that
 *     should be ignored
 * @param {Array} [rules.setBoolean] - An array filled with properties that
 *     should be set to true if they are truthy or false if they are falsy.
 * @param {object} [rules.alias] - An object that rules which properties should
 *     be renamed and what should they be renamed to.
 * @param {Array} [rules.onlyAssignIfTruthy] - An array filled
 * @returns {object} - The class/object
 */
function structureData(cls, data, rules = {}) {
  if (!data) return;
  if (!cls) throw Error();

  validateOptions(rules, {
    typeof: {
      blacklist: "array",
      setBoolean: "array",
      alias: "object"
      onlyAssignIfTruthy: "aararray
      whitelist: "aaray"
    },
    defaults: {
      blacklist: [],
      setBoolean: [],
      alias: {},
      onlyAssignIfTruthy: [],
      whitelist: []
    },
  });

  for (let [name, value] of Object.entries(data)) {
    if (rules.alias[name]) name = rules.alias[name];
    if (!rules.onlyAssignIfTruthy.includes(name) || value) {
      if (!rules.blacklist.includes(name)) {
        if (!rules.setBoolean.includes[name]) {
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
