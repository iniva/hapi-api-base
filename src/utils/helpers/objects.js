/**
 * @function hasOwnProperty
 * @description Utility to avoid unintended behaviours
 *
 * @param {Object} obj
 * @param {String} key
 *
 * @returns {Boolean}
 */
export const hasOwnProperty = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

/**
 * @function clean
 * @description Cleans an object from invalid values
 *
 * @param {Object} rawObject
 *
 * @returns {Object}
 */
export const clean = (rawObject, customGuard) => {
  const defaultGuard = (object, key) => (
    object[key] !== null && object[key] !== false && object[key] !== undefined
  );
  const guard = customGuard || defaultGuard;
  const newObj = Object.keys(rawObject).reduce((obj, key) => {
    if (guard(rawObject, key)) {
      obj[key] = rawObject[key];
    }

    return obj;
  }, {});

  return newObj;
};
