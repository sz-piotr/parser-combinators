import 'mocha'
import { expect } from 'chai'

import { Right } from '../../../src/functional'
import { Input, optional, tag } from '../../../src/parse'

describe('optional', () => {
  it('succeeds if argument succeeds', () => {
    const parser = optional(tag('a'))
    const input = new Input('a')
    const result = parser(input)

    expect(result).to.deep.equal(new Right({
      value: 'a',
      input: input.advance(1)
    }))
  })

  it('succeeds if argument fails', () => {
    const parser = optional(tag('a'))
    const input = new Input('b')
    const result = parser(input)

    expect(result).to.deep.equal(new Right({
      value: undefined,
      expected: ['a'],
      input: input
    }))
  })
})
