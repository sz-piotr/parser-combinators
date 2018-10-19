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

    const advanced = input.advance(3)

    expect(input.location).to.equal(0)
    expect(advanced.location).to.equal(3)
  })

  it('advance works like addition', () => {
    const input = new Input('source')

    const a = input.advance(3)
    const b = input.advance(1).advance(2)

    expect(a).to.deep.equal(b)
  })
})
