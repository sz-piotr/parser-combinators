import 'mocha'
import { expect } from 'chai'

import { Input } from '../../../src/parse/types'
import { Right, Left } from '../../../src/functional'
import { sequenceOf, tag } from '../../../src/parse/combinators'

describe('sequenceOf', () => {
  it('succeeds when all arguments succeed sequentially', () => {
    const parser = sequenceOf(tag('AAA'), tag('BBB'))
    const input = new Input('AAABBB')
    const result = parser(input)

    expect(result).to.deep.equal(new Right({
      value: ['AAA', 'BBB'],
      input: input.advance('AAABBB'.length)
    }))
  })

  it('fails if any argument fails', () => {
    const parser = sequenceOf(tag('AAA'), tag('BBB'))
    const input = new Input('AAACCC')
    const result = parser(input)

    expect(result).to.deep.equal(new Left({
      expected: ['BBB'],
      input: input.advance('AAA'.length)
    }))
  })
})
