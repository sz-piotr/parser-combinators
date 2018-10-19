import 'mocha'
import { expect } from 'chai'

import { Right, Left } from '../../../src/functional'
import { Input, withExpected, tag } from '../../../src/parsing'

describe('map', () => {
  it('succeeds when argument succeeds', () => {
    const parser = withExpected(tag('123'), 'magic number')
    const input = new Input('123')
    const result = parser(input)

    expect(result).to.deep.equal(new Right({
      value: '123',
      input: input.advance('123'.length)
    }))
  })

  it('fails with specified string as expected', () => {
    const parser = withExpected(tag('123'), 'magic number')
    const input = new Input('456')
    const result = parser(input)

    expect(result).to.deep.equal(new Left({
      expected: ['magic number'],
      input: input
    }))
  })

  it('fails with specified array as expected', () => {
    const parser = withExpected(tag('123'), ['a', 'b'])
    const input = new Input('456')
    const result = parser(input)

    expect(result).to.deep.equal(new Left({
      expected: ['a', 'b'],
      input: input
    }))
  })
})
