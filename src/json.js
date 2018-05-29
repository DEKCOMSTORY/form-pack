import isJSON from 'is-json';

function jsonFormPack(json) {
  if (!isJSON(json, true)) {
    throw new Error('The input is not array or not JSON structure.');
  }

  return Object.keys(json).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(json[k])}`).join('&');
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = jsonFormPack;
  exports.default = jsonFormPack;
} else {
  window.jsonFormPack = jsonFormPack;
}
