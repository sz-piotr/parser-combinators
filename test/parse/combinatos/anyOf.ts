import 'mocha'
import { expect } from 'chai'

import { Input } from '../../../src/parse/types'
import { Right, Left } from '../../../src/functional'
import { anyOf, tag } from '../../../src/parse/combinators'

describe('anyOf', () => {
  it('throws when given 0 arguments', () => {
    expect(() => anyOf()).to.throw()
  })

  it('returns an only argument', () => {
    const parser = tag('xyz')
    expect(anyOf(parser)).to.equal(parser)
  })

  it('succeeds when first argument succedes', () => {
    const parser = anyOf(tag('AAA'), tag('BBB'))
    const input = new Input('AAA')
    const result = parser(input)

    expect(result).to.deep.equal(Right.of({
      value: 'AAA',
      input: input.advance('AAA'.length)
    }))
  })

  xit('fails when an argument fails and consumes input', () => {

  });

  it('succeeds when second argument succedes after first did not consume input', () => {
    const parser = anyOf(tag('AAA'), tag('BBB'))
    const input = new Input('BBB')
    const result = parser(input)

    expect(result).to.deep.equal(Right.of({
      value: 'BBB',
      input: input.advance('BBB'.length)
    }))
  })

  it('fails when no argument succeeds and none consumes', () => {
    const parser = anyOf(tag('AAA'), tag('BBB'))
    const input = new Input('xxx')
    const result = parser(input)

    expect(result).to.deep.equal(Left.of({
      expected: ['AAA', 'BBB'],
      input: input
    }))
  })
})
