import 'mocha'
import { expect } from 'chai'

import { Input } from '../../../src/parse/types'
import { Right, Left } from '../../../src/functional'
import { tag } from '../../../src/parse/combinators'

describe('tag', () => {
  it('consumes the characters of input if it succeeds', () => {
    const parser = tag('xyz')
    const input = new Input('xyzabc')
    const result = parser(input)

    expect(result).to.deep.equal(Right.of({
      value: 'xyz',
      input: input.advance('xyz'.length)
    }))
  })

  it('fails when it does not match', () => {
    const parser = tag('xyz')
    const input = new Input('abc')
    const result = parser(input)

    expect(result).to.deep.equal(Left.of({
      expected: ['xyz'],
      input: input
    }))
  })
})
