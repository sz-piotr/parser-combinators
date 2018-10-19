import { Parser, Input, ParseError } from '../types'
import { Left, Right } from '../../functional'

export function optional<T> (parser: Parser<T>): Parser<T | undefined> {
  return function (input: Input) {
    const result = parser(input)
    return result.isLeft()
      ? new Right({
        value: undefined,
        input: input,
        expected: result.left.expected
      })
      : result
  }
}
