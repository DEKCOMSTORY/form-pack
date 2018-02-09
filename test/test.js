const chai = require('chai')
const expect = chai.expect

const { JSDOM } = require('jsdom')

const formPack = require('../dist/form-pack.min')

describe('Form Pack testing...', function() {
  it('expect get data and return as JSON', function() {
    const { window } = new JSDOM(`
      <form>
        <input name="firstname" type="text" value="Tommy"/>
        <input name="lastname" type="text" value="Stark"/>
      </form>
    `)

    const output = formPack(window.document.querySelector('form'))

    expect(output).to.be.a('object')
    expect(Object.keys(output)).length(2)

    expect(output).to.deep.equal({
      firstname: 'Tommy',
      lastname: 'Stark',
    })
  })
  it('expect get data and return as URL encoded', function() {
    const { window } = new JSDOM(`
      <form>
        <input name="firstname" type="text" value="Tommy"/>
        <input name="lastname" type="text" value="Stark"/>
      </form>
    `)

    const output = formPack(window.document.querySelector('form'), { urlencoded: true })

    expect(output).to.be.a('string')

    expect(output).to.equal('firstname=Tommy&lastname=Stark')
  })
  it('expect get data correct form from multitext type', function() {
    const { window } = new JSDOM(`
      <form>
        <input name="choice" type="multitext" value="Tommy"/>
        <input name="choice" type="multitext" value="Stark"/>
      </form>
    `)

    const output = formPack(window.document.querySelector('form'))

    expect(output).to.be.a('object')

    expect(output).to.deep.equal({
      choice: ['Tommy', 'Stark'],
    })
  })
})
