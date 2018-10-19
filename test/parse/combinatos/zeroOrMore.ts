import 'mocha'
import { expect } from 'chai'

import { Right, Left } from '../../../src/functional'
import { Input, zeroOrMore, sequenceOf, tag } from '../../../src/parse'

describe('zeroOrMore', () => {
  it('succeeds even if does not match initially', () => {
    const parser = zeroOrMore(tag('A'))
    const input = new Input('x')
    const result = parser(input)

    expect(result).to.deep.equal(new Right({
      value: [],
      expected: ['A'],
      input: input
    }))
  })

  it('matches until possible', () => {
    const parser = zeroOrMore(tag('A'))
    const input = new Input('AAAB')
    const result = parser(input)

    expect(result).to.deep.equal(new Right({
      value: ['A', 'A', 'A'],
      expected: ['A'],
      input: input.advance(3)
    }))
  })

  it('dissalows backtracking', () => {
    const parser = zeroOrMore(
      sequenceOf(tag('a'), tag('c'))
    )
    const input = new Input('acax')
    const result = parser(input)

    expect(result).to.deep.equal(new Left({
      expected: ['c'],
      input: input.advance(3)
    }))
  })
})
