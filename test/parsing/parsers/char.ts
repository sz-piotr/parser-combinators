import 'mocha'
import { expect } from 'chai'

import { Right, Left } from '../../../src/functional'
import { Input, char } from '../../../src/parsing'

describe('char', () => {
  it('succeeds if the specified predicate is true', () => {
    const parser = char(x => 'abc'.includes(x), 'message')
    const input = new Input('a')
    const result = parser(input)

    expect(result).to.deep.equal(new Right({
      value: 'a',
      input: input.advance(1)
    }))
  })

  it('fails with specified string as expected', () => {
    const parser = char(x => 'abc'.includes(x), 'message')
    const input = new Input('x')
    const result = parser(input)

    expect(result).to.deep.equal(new Left({
      expected: ['message'],
      input: input
    }))
  })

  it('fails with specified array as expected', () => {
    const parser = char(x => 'abc'.includes(x), ['a', 'b', 'c'])
    const input = new Input('x')
    const result = parser(input)

    expect(result).to.deep.equal(new Left({
      expected: ['a', 'b', 'c'],
      input: input
    }))
  })
})
