import { Right, Left } from '../../functional'
import { Parser, Input, ParseSuccess } from '../types'

export function withExpected<T> (
  parser: Parser<T>,
  expected: string | string[]
): Parser<T> {
  const expectedValue = Array.isArray(expected) ? expected : [expected]

  return function parse (input: Input) {
    const result = parser(input)
    if (result.isLeft()) {
      return new Left({
        expected: expectedValue,
        input: result.left.input
      })
    } else {
      return result as Right<ParseSuccess<T>>
    }
  }
}
