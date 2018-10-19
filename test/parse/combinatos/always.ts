import 'mocha'
import { expect } from 'chai'

import { Right } from '../../../src/functional'
import { Input, always } from '../../../src/parse'

describe('always', () => {
  it('always succeeds with provided value', () => {
    const parser = always(42)
    const input = new Input('anything')
    const result = parser(input)

    expect(result).to.deep.equal(new Right({
      value: 42,
      input
    }))
  })
})
