import 'mocha'
import { expect } from 'chai'

import { Right, Left } from '../../../src/functional'
import { Input, between, tag } from '../../../src/parsing'

describe('between', () => {
  it('succeeds returning only middle value', () => {
    const parser = between(tag('('), tag('A'), tag(')'))
    const input = new Input('(A)')
    const result = parser(input)

    expect(result).to.deep.equal(new Right({
      value: 'A',
      expected: undefined,
      input: input.advance('(A)'.length)
    }))
  })

  it('fails if left fails', () => {
    const parser = between(tag('('), tag('A'), tag(')'))
    const input = new Input('x')
    const result = parser(input)

    expect(result).to.deep.equal(new Left({
      expected: ['('],
      input: input
    }))
  })

  it('fails if right fails', () => {
    const parser = between(tag('('), tag('A'), tag(')'))
    const input = new Input('(Ax')
    const result = parser(input)

    expect(result).to.deep.equal(new Left({
      expected: [')'],
      input: input.advance('(A'.length)
    }))
  })

  it('fails if middle fails', () => {
    const parser = between(tag('('), tag('A'), tag(')'))
    const input = new Input('(x)')
    const result = parser(input)

    expect(result).to.deep.equal(new Left({
      expected: ['A'],
      input: input.advance('('.length)
    }))
  })
})
