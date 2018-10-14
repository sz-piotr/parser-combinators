import 'mocha'
import { expect } from 'chai'

import { Input } from '../../../src/parse/types'
import { Right, Left } from '../../../src/functional'
import { tag } from '../../../src/parse/combinators'

describe('tag', () => {
  it('consumes the characters of input if it matches', () => {
    const parser = tag('xyz')
    const input = new Input('xyzabc')
    const result = Right.of('xyz')

    expect(parser(input)).to.deep.equal(result)
    expect(input.remaining()).to.equal('abc')
  })

  it('errors when it does not match', () => {
    const parser = tag('xyz')
    const input = new Input('abc')

    expect(parser(input)).to.deep.equal(Left.of({
      expected: 'xyz',
      source: 'abc',
      character: 0,
      line: 0,
      column: 0
    }))
    expect(input.remaining()).to.equal('abc')
  })
})
