import 'mocha'
import { expect } from 'chai'

import { Input } from '../../../src/parse'

describe('Input', () => {
  it('wraps a string source', () => {
    const input = new Input('source')

    expect(input.source).to.equal('source')
  })

  it('allows to get the source values', () => {
    const input = new Input('source')

    expect(input.get()).to.equal('s')
    expect(input.get(1)).to.equal('o')
    expect(input.get(5)).to.equal('e')
    expect(input.get(6)).to.equal(undefined)
  })

  it('can advance immutably', () => {
    const input = new Input('source')

    expect(input.location).to.deep.equal({
      character: 0,
      line: 0,
      column: 0
    })

    const advanced = input.advance(3)

    expect(advanced.location).to.deep.equal({
      character: 3,
      line: 0,
      column: 3
    })
  })

  it('advance works like addition', () => {
    const input = new Input('source')

    const a = input.advance(3)
    const b = input.advance(1).advance(2)

    expect(a).to.deep.equal(b)
  })

  it('can advance through lines separated by LF', () => {
    const input = new Input('aaa\nbbb')

    expect(input.advance(5).location).to.deep.equal({
      character: 5,
      line: 1,
      column: 1
    })
  })

  it('can advance through lines separated by CR', () => {
    const input = new Input('aaa\rbbb')

    expect(input.advance(5).location).to.deep.equal({
      character: 5,
      line: 1,
      column: 1
    })
  })

  it('can advance through lines separated by CRLF', () => {
    const input = new Input('aaa\r\nbbb')

    expect(input.advance(6).location).to.deep.equal({
      character: 6,
      line: 1,
      column: 1
    })
  })

  it('can advance multiple lines', () => {
    const input = new Input('aaa\n\r\n\n\r\n\r\nbbb')

    expect(input.advance(12).location).to.deep.equal({
      character: 12,
      line: 5,
      column: 1
    })
  })
})
