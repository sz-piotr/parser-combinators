import 'mocha'
import { expect } from 'chai'

import { Right, Left } from '../../../src/functional'
import { Input, withBounds, tag } from '../../../src/parsing'

describe('withBounds', () => {
  it('succeeds with bounded value', () => {
    const parser = withBounds(tag('xyz'))
    const input = new Input('...xyz...').advance(3)
    const result = parser(input)

    expect(result).to.deep.equal(new Right({
      value: {
        value: 'xyz',
        start: 3,
        end: 6
      },
      expected: undefined,
      input: input.advance('xyz'.length)
    }))
  })

  it('fails when argument fails', () => {
    const parser = withBounds(tag('xyz'))
    const input = new Input('abc')
    const result = parser(input)

    expect(result).to.deep.equal(new Left({
      expected: ['xyz'],
      input: input
    }))
  })
})
