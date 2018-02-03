'use strict'

// This function got inspire from https://github.com/riverside/form-serialize
function findElement(form, options) {
  const data = [];
  const str = [];

  for (let i = 0; i < form.elements.length; i += 1) {
    const currentKey = form.elements[i][options.attr]
    const currentVal = encodeURIComponent(form.elements[i].value)

    if (options.skipDisable && form.elements[i].disabled) break;
    if (currentKey === '') continue;

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
          [currentKey]: currentVal
        })
        str.push([currentKey] + '=' + currentVal)
        break;
      case 'checkbox':
      case 'radio':
        if (form.elements[i].checked) {
          data.push({
            [currentKey]: currentVal
          })
          str.push([currentKey] + '=' + currentVal)
        }
        break;
      case 'file':
        break;
      }
      break;
    case 'TEXTAREA':
      data.push({
        [currentKey]: currentVal
      })
      str.push([currentKey] + '=' + currentVal)
      break;
    case 'SELECT':
      switch (form.elements[i].type) {
      case 'select-one':
        data.push({
          [currentKey]: currentVal
        })
        str.push([currentKey] + '=' + currentVal)
        break;
      case 'select-multiple':
        const optionEl = []
        for (let j = 0; j < form.elements[i].options.length; j += 1) {
          const currentOps = encodeURIComponent(form.elements[i].options[j].value)
          if (form.elements[i].options[j].selected) {
            optionEl.push(currentOps)
            str.push(currentOps)
          }
        }
        data.push({
          [currentKey]: optionEl
        })
        break;
      }
      break;
    case 'BUTTON':
      switch (form.elements[i].type) {
      case 'reset':
      case 'submit':
      case 'button':
        data.push({
          [currentKey]: currentVal
        })
        str.push([currentKey] + '=' + currentVal)
        break;
      }
      break;
    }
  }

  return {
    json: data,
    urlencoded: str.join('&')
  }
}

// Main function
function formPack(form, options = {}) {
  const defaultOptions = {
    attr: 'name',
    skipDisable: false,
  }

  // Apply user customize options
  options = Object.assign({}, defaultOptions, options)

  if (!form || form.nodeName !== 'FORM') throw new Error('<form> element not found.');
  const data = findElement(form, options);

  if (!options.urlencoded) {
    const json = {}
    data.json.forEach(x => Object.assign(json, x))

    return json;
  } else {
    return data.urlencoded
  }
}

module.exports = formPack
export default formPack
