import 'mocha'
import { expect } from 'chai'

import { Right, Left } from '../../../src/functional'
import { Input, attempt, tag, anyOf, sequenceOf, optional } from '../../../src/parsing'

describe('attempt', () => {
  it('succeeds when argument succedes', () => {
    const parser = attempt(tag('A'))
    const input = new Input('A')
    const result = parser(input)

    expect(result).to.deep.equal(new Right({
      value: 'A',
      input: input.advance(1)
    }))
  })

  it('fails when argument fails', () => {
    const parser = attempt(tag('A'))
    const input = new Input('x')
    const result = parser(input)

    expect(result).to.deep.equal(new Left({
      expected: ['A'],
      input: input
    }))
  })

  it('fails without consuming input', () => {
    const parser = attempt(sequenceOf(tag('A'), tag('B')))
    const input = new Input('Ax')
    const result = parser(input)

    expect(result).to.deep.equal(new Left({
      expected: [],
      input: input
    }))
  })
})
