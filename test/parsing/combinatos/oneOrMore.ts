import 'mocha'
import { expect } from 'chai'

import { Right, Left } from '../../../src/functional'
import { Input, oneOrMore, tag } from '../../../src/parsing'

describe('oneOrMore', () => {
  it('fails if does not match initially', () => {
    const parser = oneOrMore(tag('A'))
    const input = new Input('x')
    const result = parser(input)

    expect(result).to.deep.equal(new Left({
      expected: ['A'],
      input: input
    }))
  })

  it('matches once', () => {
    const parser = oneOrMore(tag('A'))
    const input = new Input('AB')
    const result = parser(input)

    expect(result).to.deep.equal(new Right({
      value: ['A'],
      expected: ['A'],
      input: input.advance(1)
    }))
  })

  it('matches until possible', () => {
    const parser = oneOrMore(tag('A'))
    const input = new Input('AAAB')
    const result = parser(input)

    expect(result).to.deep.equal(new Right({
      value: ['A', 'A', 'A'],
      expected: ['A'],
      input: input.advance(3)
    }))
  })
})
