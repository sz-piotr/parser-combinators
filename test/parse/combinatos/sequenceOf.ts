import 'mocha'
import { expect } from 'chai'

import { Right, Left } from '../../../src/functional'
import { Input, sequenceOf, tag, optional } from '../../../src/parse'

describe('sequenceOf', () => {
  it('succeeds when all arguments succeed sequentially', () => {
    const parser = sequenceOf(tag('AAA'), tag('BBB'))
    const input = new Input('AAABBB')
    const result = parser(input)

    expect(result).to.deep.equal(new Right({
      value: ['AAA', 'BBB'],
      expected: undefined,
      input: input.advance('AAABBB'.length)
    }))
  })

  it('fails if any argument fails', () => {
    const parser = sequenceOf(tag('AAA'), tag('BBB'))
    const input = new Input('AAACCC')
    const result = parser(input)

    expect(result).to.deep.equal(new Left({
      expected: ['BBB'],
      input: input.advance('AAA'.length)
    }))
  })

  it('fails with accurate expectations', () => {
    const parser = sequenceOf(optional(tag('a')), tag('b'))
    const input = new Input('x')
    const result = parser(input)

    expect(result).to.deep.equal(new Left({
      expected: ['a', 'b'],
      input: input
    }))
  })

  it('fails with accurate expectations when consumed input', () => {
    const parser = sequenceOf(
      optional(tag('a')),
      sequenceOf(tag('b'), tag('c'))
    )
    const input = new Input('b')
    const result = parser(input)

    expect(result).to.deep.equal(new Left({
      expected: ['c'],
      input: input.advance(1)
    }))
  })
})
