import 'mocha'
import { expect } from 'chai'

import { Right, Left } from '../../../src/functional'
import { Input, binaryExpression, tag, anyOf, map } from '../../../src/parsing'

const operatorPlus = map(tag('+'), value => ({
  value,
  precedence: 1,
  leftAssociative: true
}))

const operatorStar = map(tag('*'), value => ({
  value,
  precedence: 2,
  leftAssociative: true
}))

const operatorUp = map(tag('^'), value => ({
  value,
  precedence: 3,
  leftAssociative: false
}))


describe('binaryExpression', () => {
  it('succeeds for different operators', () => {
    const parser = binaryExpression(
      tag('x'),
      anyOf(
        operatorPlus,
        operatorStar,
        operatorUp
      )
    )
    const input = new Input('x^x^x+x*x')
    const result = parser(input)

    expect(result).to.deep.equal(new Right({
      value: {
        left: {
          left: 'x',
          operator: '^',
          right: {
            left: 'x',
            operator: '^',
            right: 'x'
          }
        },
        operator: '+',
        right: {
          left: 'x',
          operator: '*',
          right: 'x'
        }
      },
      input: input.advance(input.source.length),
      expected: ['+', '*', '^']
    }))
  })

  it('fails when operand is missing', () => {
    const parser = binaryExpression(
      tag('x'),
      operatorPlus
    )
    const input = new Input('x+')
    const result = parser(input)

    expect(result).to.deep.equal(new Left({
      expected: ['x'],
      input: input.advance(2)
    }))
  })

  it('fails when operator is missing', () => {
    const parser = binaryExpression(
      tag('x'),
      operatorPlus
    )
    const input = new Input('x')
    const result = parser(input)

    expect(result).to.deep.equal(new Left({
      expected: ['+'],
      input: input.advance(1)
    }))
  })
})
