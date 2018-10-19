import 'mocha'
import { expect } from 'chai'

import { Right, Left } from '../../../src/functional'
import { Input, skipLeft, tag, optional } from '../../../src/parsing'

describe('skipLeft', () => {
  it('succeeds returning only right value', () => {
    const parser = skipLeft(tag('AAA'), tag('BBB'))
    const input = new Input('AAABBB')
    const result = parser(input)

    expect(result).to.deep.equal(new Right({
      value: 'BBB',
      expected: undefined,
      input: input.advance('AAABBB'.length)
    }))
  })

  it('fails if left fails', () => {
    const parser = skipLeft(tag('AAA'), tag('BBB'))
    const input = new Input('x')
    const result = parser(input)

    expect(result).to.deep.equal(new Left({
      expected: ['AAA'],
      input: input
    }))
  })

  it('fails if right fails', () => {
    const parser = skipLeft(tag('AAA'), tag('BBB'))
    const input = new Input('AAAx')
    const result = parser(input)

    expect(result).to.deep.equal(new Left({
      expected: ['BBB'],
      input: input.advance('AAA'.length)
    }))
  })

  it('fails with accurate expectations', () => {
    const parser = skipLeft(optional(tag('AAA')), tag('BBB'))
    const input = new Input('x')
    const result = parser(input)

    expect(result).to.deep.equal(new Left({
      expected: ['AAA', 'BBB'],
      input: input
    }))
  })
})
