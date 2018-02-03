'use strict'

// This function got inspire from https://github.com/riverside/form-serialize
function findElement(form, options) {
  const data = [];
  const str = [];

  for (let i = 0; i < form.elements.length; i += 1) {
    if (options.ignoreDisable && form.elements[i].disabled) break;
    if (form.elements[i][options.findAttr] === '') continue;

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
          [form.elements[i][options.findAttr]]: encodeURIComponent(form.elements[i].value)
        })
        str.push([form.elements[i][options.findAttr]] + '=' + encodeURIComponent(form.elements[i].value))
        break;
      case 'checkbox':
      case 'radio':
        if (form.elements[i].checked) {
          data.push({
            [form.elements[i][options.findAttr]]: encodeURIComponent(form.elements[i].value)
          })
          str.push([form.elements[i][options.findAttr]] + '=' + encodeURIComponent(form.elements[i].value))
        }
        break;
      case 'file':
        break;
      }
      break;
    case 'TEXTAREA':
      data.push({
        [form.elements[i][options.findAttr]]: encodeURIComponent(form.elements[i].value)
      })
      str.push([form.elements[i][options.findAttr]] + '=' + encodeURIComponent(form.elements[i].value))
      break;
    case 'SELECT':
      switch (form.elements[i].type) {
      case 'select-one':
        data.push({
          [form.elements[i][options.findAttr]]: encodeURIComponent(form.elements[i].value)
        })
        str.push([form.elements[i][options.findAttr]] + '=' + encodeURIComponent(form.elements[i].value))
        break;
      case 'select-multiple':
        const optionEl = []
        for (let j = 0; j < form.elements[i].options.length; j += 1) {
          if (form.elements[i].options[j].selected) {
            optionEl.push(encodeURIComponent(form.elements[i].options[j].value))
            str.push([form.elements[i][options.findAttr]] + '=' + encodeURIComponent(form.elements[i].options[j].value))
          }
        }
        data.push({
          [form.elements[i][options.findAttr]]: optionEl
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
          [form.elements[i][options.findAttr]]: encodeURIComponent(form.elements[i].value)
        })
        str.push([form.elements[i][options.findAttr]] + '=' + encodeURIComponent(form.elements[i].value))
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
    findAttr: 'name',
    ignoreDisable: false,
  }

  // Apply user customize options
  options = Object.assign({}, defaultOptions, options)

  if (!form || form.nodeName !== 'FORM') throw new Error('<form> element not found.');
  const data = findElement(form, options);

  if (!options.urlencoded) {
    const json = Object.assign({}, ...data.json);

    return json;
  } else {
    return data.urlencoded
  }
}

module.exports = formPack
export default formPack
