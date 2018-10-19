import 'mocha'
import { expect } from 'chai'

import { Right, Left } from '../../../src/functional'
import { Input, skipRight, tag } from '../../../src/parse'

describe('skipRight', () => {
  it('succeeds returning only left value', () => {
    const parser = skipRight(tag('AAA'), tag('BBB'))
    const input = new Input('AAABBB')
    const result = parser(input)

    expect(result).to.deep.equal(new Right({
      value: 'AAA',
      expected: undefined,
      input: input.advance('AAABBB'.length)
    }))
  })

  it('fails if left fails', () => {
    const parser = skipRight(tag('AAA'), tag('BBB'))
    const input = new Input('x')
    const result = parser(input)

    expect(result).to.deep.equal(new Left({
      expected: ['AAA'],
      input: input
    }))
  })

  it('fails if right fails', () => {
    const parser = skipRight(tag('AAA'), tag('BBB'))
    const input = new Input('AAACCC')
    const result = parser(input)

    expect(result).to.deep.equal(new Left({
      expected: ['BBB'],
      input: input.advance('AAA'.length)
    }))
  })
})
