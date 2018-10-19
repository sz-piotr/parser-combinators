import { Right, Left } from '../../functional'
import { Parser, Input, ParseSuccess } from '../types'

export function named<T> (
  parser: Parser<T>,
  name: string | string[]
): Parser<T> {
  const expected = Array.isArray(name) ? name : [name]

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
