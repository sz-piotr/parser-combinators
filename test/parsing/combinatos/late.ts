import 'mocha'
import { expect } from 'chai'

import { Right, Left } from '../../../src/functional'
import { Input, late, tag } from '../../../src/parsing'

describe('between', () => {
  it('throws if not implemented', () => {
    const parser = late()
    const input = new Input('x')

    expect(() => parser(input)).to.throw()
  })

  it('acts as proxy if implemented', () => {
    const parser = late<string>()
    parser.implement(tag('A'))
    const input = new Input('A')

    expect(parser(input)).to.deep.equal(tag('A')(input))
  })
})
