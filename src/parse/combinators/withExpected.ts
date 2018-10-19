import { Right, Left } from '../../functional'
import { Parser, Input, ParseSuccess } from '../types'

export function withExpected<T> (parser: Parser<T>, value: string | string[]): Parser<T> {
  const expected = Array.isArray(value) ? value : [value]
  return function parse (input: Input) {
    const result = parser(input)
    if (result.isLeft()) {
      return new Left({
        expected,
        input: result.left.input
      })
    } else {
      return result as Right<ParseSuccess<T>>
    }
  }
}
