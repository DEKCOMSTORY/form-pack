// const { jsonFormPack, toFormData } = require('./json.js');
// This function got inspire from https://github.com/riverside/form-serialize
function findElement(form, options) {
  const data = [];
  const str = [];

  for (let i = 0; i < form.elements.length; i += 1) {
    const currentKey = form.elements[i][options.attr];
    const currentVal = encodeURIComponent(form.elements[i].value);

    if (options.skipDisabled && form.elements[i].disabled) break;
    if (currentKey !== '') {
      switch (form.elements[i].nodeName) {
        case 'INPUT':
          switch (form.elements[i].type) {
            case 'text':
            case 'hidden':
            case 'password':
            case 'button':
            case 'reset':
            case 'submit':
            case 'color':
            case 'date':
            case 'datetime-local':
            case 'email':
            case 'month':
            case 'number':
            case 'range':
            case 'search':
            case 'tel':
            case 'time':
            case 'url':
            case 'week':
              data.push({
                [currentKey]: currentVal,
              });
              str.push(`${[currentKey]}=${currentVal}`);
              break;
            case 'checkbox':
            case 'radio':
              if (form.elements[i].checked) {
                data.push({
                  [currentKey]: currentVal,
                });
                str.push(`${[currentKey]}=${currentVal}`);
              }
              break;
            case 'multitext':
              data.push({
                [currentKey]: currentVal,
              });
              str.push(`${[currentKey]}=${currentVal}`);
              break;
            case 'file':
              break;
            // no default
          }
          break;
        case 'TEXTAREA':
          data.push({
            [currentKey]: currentVal,
          });
          str.push(`${[currentKey]}=${currentVal}`);
          break;
        case 'SELECT':
          switch (form.elements[i].type) {
            case 'select-one':
              data.push({
                [currentKey]: currentVal,
              });
              str.push(`${[currentKey]}=${currentVal}`);
              break;
            case 'select-multiple': { // blocked for const optionEl to visible in this block only
              const optionEl = [];
              for (let j = 0; j < form.elements[i].options.length; j += 1) {
                const currentOps = encodeURIComponent(form.elements[i].options[j].value);
                if (form.elements[i].options[j].selected) {
                  optionEl.push(currentOps);
                  str.push(currentOps);
                }
              }
              data.push({
                [currentKey]: optionEl,
              });
              break;
            }
            // no default
          }
          break;
        case 'BUTTON':
          switch (form.elements[i].type) {
            case 'reset':
            case 'submit':
            case 'button':
              data.push({
                [currentKey]: currentVal,
              });
              str.push(`${[currentKey]}=${currentVal}`);
              break;
            // no default
          }
          break;
        // no default
      }
    }
  }

  return {
    json: data,
    urlencoded: str.join('&'),
  };
}

// Main function
function formPack(form, options = {}) {
  const defaultOptions = {
    attr: 'name',
    skipDisabled: false,
  };

  // Apply user customize options
  const customizedOption = Object.assign({}, defaultOptions, options);

  if (!form || form.nodeName !== 'FORM') throw new Error('<form> element not found.');
  const data = findElement(form, customizedOption);

  if (!customizedOption.urlencoded) {
    const json = {};
    data.json.forEach((el) => {
      let pack = [];
      const key = Object.keys(el)[0];
      if (Object.hasOwnProperty.call(json, key)) {
        if (Array.isArray(json[key])) {
          pack = pack.concat(json[key]);
        } else {
          pack.push(json[key]);
        }
        pack.push(el[key]);
        Object.assign(json, { [key]: pack });
      } else {
        Object.assign(json, el);
      }
    });

    return json;
  }
  return data.urlencoded;
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  // exports.toFormData = toFormData;
  // exports.jsonFormPack = jsonFormPack;
  exports.formPack = formPack;
  module.exports = formPack;
  exports.default = formPack;
} else {
  window.formPack = formPack;
  // window.jsonFormPack = jsonFormPack;
  // window.jsonFormPack.toFormData = toFormData;
}
