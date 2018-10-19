import 'mocha'
import { expect } from 'chai'

import { Input } from '../../../src/parse/types'
import { Right, Left } from '../../../src/functional'
import { map, tag } from '../../../src/parse/combinators'

describe('map', () => {
  it('succeeds with mapped value', () => {
    const parser = map(tag('xyz'), () => 123)
    const input = new Input('xyzabc')
    const result = parser(input)

    expect(result).to.deep.equal(new Right({
      value: 123,
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
