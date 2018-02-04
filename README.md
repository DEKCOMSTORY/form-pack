# form-pack [![Build Status](https://travis-ci.org/DEKCOMSTORY/form-pack.svg?branch=master)](https://travis-ci.org/DEKCOMSTORY/form-pack) [![npm](https://img.shields.io/npm/v/npm.svg)]() [![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)]()
The tiny vanilla javascript library for serialize form-data to JSON or URL encoded.

Opensource โดยคนไทย จากเพจ [DEKCOMSTORY](https://facebook.com/dekcomstorypage)

## Installation
Form-pack is available on [npm](https://www.npmjs.com/)

`
$ yarn add form-pack
`

`
$ npm install --save form-pack
`

and [bower](https://bower.io/)

`
$ bower install --save form-pack
`

## Usage
Form-pack served the easy usage.

Form-pack available to customize output type both on `JSON` and `urlencoded`

```javascript
formPack(formDOM, options)
// return as JSON by default
```

### Option Attributes
|Name|default|Description|
|-|:-|-:|
| urlencoded  | `false` | To let form-pack return data as urlencoded |
| attr  | `"name"` | Determine an attributes for reference input elements |
| skipDisabled  | `false` | Exclude an input element that has `disabled` attribute |

You can find out more usage on [Examples](#Examples) section.


### Examples

```html
<form id="contact-form">
  <input type="text" name="firstname" value="Jirachai"/>
  <input type="email" name="email" value="jirachai.c@outlook.com"/>
</form>
```

#### Get data as JSON

```javascript
import formPack from 'form-pack'

const form = document.getElementById('form')

const result = formPack(form)

// { "firstname": "Jirachai", "email": "jirachai.c@outlook.com" }
```

#### Get data as urlencoded

```javascript
import formPack from 'form-pack'

const form = document.getElementById('form')

const result = formPack(form, { urlencoded: true })

// firstname=Jirachai&email=jirachai.c@outlook.com
```


## License
Form-pack is [MIT licensed](https://github.com/DEKCOMSTORY/form-pack/blob/master/LICENSE).
