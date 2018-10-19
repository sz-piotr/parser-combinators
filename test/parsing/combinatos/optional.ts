import 'mocha'
import { expect } from 'chai'

import { Right, Left } from '../../../src/functional'
import { Input, optional, tag, sequenceOf } from '../../../src/parsing'

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

  it('succeeds if argument fails without consuming input', () => {
    const parser = optional(tag('a'))
    const input = new Input('b')
    const result = parser(input)

    expect(result).to.deep.equal(new Right({
      value: undefined,
      expected: ['a'],
      input: input
    }))
  })

  it('dissalows backtracking', () => {
    const parser = optional(
      sequenceOf(tag('a'), tag('c'))
    )
    const input = new Input('ax')
    const result = parser(input)

    expect(result).to.deep.equal(new Left({
      expected: ['c'],
      input: input.advance(1)
    }))
  })
})
