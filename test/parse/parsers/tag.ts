import 'mocha'
import { expect } from 'chai'

import { Right, Left } from '../../../src/functional'
import { Input, tag } from '../../../src/parse'

describe('tag', () => {
  it('consumes the characters of input if it succeeds', () => {
    const parser = tag('xyz')
    const input = new Input('xyzabc')
    const result = parser(input)

    expect(result).to.deep.equal(new Right({
      value: 'xyz',
      input: input.advance('xyz'.length)
    }))
  })

  it('fails when it does not match', () => {
    const parser = tag('xyz')
    const input = new Input('abc')
    const result = parser(input)

    expect(result).to.deep.equal(new Left({
      expected: ['xyz'],
      input: input
    }))
  })
})
