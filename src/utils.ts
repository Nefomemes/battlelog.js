/**
 * Utilities function to help things out.
 *
 * @module utils
 */

/**
 * Get the article of a noun
 *
 * @param str - The word to be checked
 * @param plural
 */
export function getArticle(str: string, plural?: boolean) {
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
 * @param data - The options object data.
 * @param rules - The rules used to manage the options.
 */
export type validateOptionsOptions = {
  alias?: object,
  defaults?: object,
  required?: Array<string>,
  types?: any,
  convertTo?: any,
  blacklist?: Array<any> /* TODO */
};

export function validateOptions(data: object, rules: validateOptionsOptions) {
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

  if (rules.types) {
    for (let [prop, value] of Object.entries(rules.types)) {
      var isTrue: boolean;
      if (value === "array") {
        isTrue = Array.isArray(data[prop]);
      } else if (typeof value === "string") {
        isTrue = typeof data[prop] === value;
      } else if (typeof value === "function") {
        isTrue = data[prop] instanceof value;
      } else  if(Array.isArray(value)){
            if (!value.includes(data[prop]))
              throw Error(
                `Option ${prop} is required to be ${(() => {
                  var lastOne = value.pop();
    
                  return `${value
                    .map((i) => `'${i}'`)
                    .join(", ")}, or '${lastOne}'`;
                })()}`
              );
          } else {
        throw Error(
          `Rule typeof.${prop} is required to be a string or a class. While it is ${getArticle(
            typeof value
          )} ${typeof value}`
        );
      }
      if (!isTrue)
        throw Error(
          `Option '${prop}' is required to be ${getArticle(
            <string>value
          )} ${value} while it is actually a ${
            data[prop].constructor
          } (${typeof data[prop]}).`
        );
    }
  }

  

  return data;
}
/**
 * Rules for utils.structureData().
 * 
 * @param blacklist - An array filled with properties
 *     that should be ignored
 * @param setBoolean - An array filled with properties
 *     that should be set to true if they are truthy or false if they are falsy.
 * @param rules.alias] - An object that rules which properties should
 *     be renamed and what should they be renamed to. Other rules will use this
 * alias to refer the property
 * @param rules.onlyAssignIfTruthy - An array filled 
 */
export type StructureDataOptions = {
  blacklist?: Array<string>,
  setBoolean?: Array<string>,
  alias?: object,
  whitelist?: Array<string>,
  onlyAssignIfTruthy?: Array<string>
};
/**
 * Populate an object with a raw data object. Does not currently support
 * recursion.
 *
 * @param {object} cls - The class/object to populate
 * @param {object} data - The data whose properties will be used to populate the
 *     class instance
 * @returns {object} - The class/objectbject.
 */
export function structureData(cls, data, rules: StructureDataOptions = {}) {
  if (!data) return;
  if (!cls) throw Error("Target object is not provided.");

  validateOptions(rules, {
    types: {
      blacklist: "array",
      setBoolean: "array",
      alias: "object",
      onlyAssignIfTruthy: "array",
      whitelist: "array",
    },
    defaults: {
      blacklist: [],
      setBoolean: [],
      alias: {},
      onlyAssignIfTruthy: [],
      whitelist: [],
    },
  });

  for (let [name, value] of Object.entries(data)) {
    var alias;

    if (rules.alias[name]) {
      alias = rules.alias[name];
    }
    if (
      !rules.whitelist.length ||
      rules.whitelist.includes(name) ||
      rules.whitelist.includes(alias)
    ) {
      if (
        !(
          rules.onlyAssignIfTruthy.includes(name) ||
          rules.onlyAssignIfTruthy.includes(alias)
        ) ||
        value
      ) {
        if (!rules.blacklist.includes(name)) {
          if (!rules.setBoolean.includes(name)) {
            cls[alias || name] = value;
          } else {
            cls[alias || name] = value ? true : false;
          }
        }
      }
    }
  }

  return cls;
}

