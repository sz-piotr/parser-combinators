import 'mocha'
import { expect } from 'chai'

import { Right, Left } from '../../../src/functional'
import { Input, endOfInput } from '../../../src/parsing'

describe('endOfInput', () => {
  it('succeeds if the input ends', () => {
    const input = new Input('')
    const result = endOfInput(input)

    expect(result).to.deep.equal(new Right({
      value: undefined,
      input: input.advance(1)
    }))
  })

  it('fails if the input does not end', () => {
    const input = new Input('x')
    const result = endOfInput(input)

    expect(result).to.deep.equal(new Left({
      expected: ['end of input'],
      input: input
    }))
  })
})
