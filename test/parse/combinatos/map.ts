import 'mocha'
import { expect } from 'chai'

import { Right, Left } from '../../../src/functional'
import { Input, map, tag } from '../../../src/parse'

describe('map', () => {
  it('succeeds with mapped value', () => {
    const parser = map(tag('xyz'), () => 123)
    const input = new Input('xyzabc')
    const result = parser(input)

    expect(result).to.deep.equal(new Right({
      value: 123,
      expected: undefined,
      input: input.advance('xyz'.length)
    }))
  })

  it('fails when argument fails', () => {
    const parser = map(tag('xyz'), x => x)
    const input = new Input('abc')
    const result = parser(input)

    expect(result).to.deep.equal(new Left({
      expected: ['xyz'],
      input: input
    }))
  })
})
