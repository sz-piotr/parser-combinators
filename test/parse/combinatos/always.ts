import 'mocha'
import { expect } from 'chai'

import { Input } from '../../../src/parse/types'
import { Right } from '../../../src/functional'
import { always } from '../../../src/parse/combinators'


describe('always', () => {
  it('always succeeds with provided value', () => {
    const parser = always(42)
    const input = new Input('anything')
    const result = parser(input)

    expect(result).to.deep.equal(Right.of({
      value: 42,
      input
    }))
  })
})
