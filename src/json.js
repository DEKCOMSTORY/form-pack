import isJSON from 'is-json';
import FormData from 'form-data';

function jsonFormPack(json) {
  if (!isJSON(json, true)) {
    throw new Error('The input is not array or not JSON structure.');
  }

  return Object.keys(json).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(json[k])}`).join('&');
}

function toFormData(json) {
  if (!isJSON(json, true)) {
    throw new Error('The input is not array or not JSON structure.');
  }

  const form = new FormData();
  Object.keys(json).forEach(key => form.append(key, json[key]));
  return form;
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports.toFormData = toFormData;
  module.exports.jsonFormPack = jsonFormPack;
  module.exports = { jsonFormPack, toFormData };
  exports.default = jsonFormPack;
} else {
  window.jsonFormPack = jsonFormPack;
  window.jsonFormPack.toFormData = toFormData;
}
