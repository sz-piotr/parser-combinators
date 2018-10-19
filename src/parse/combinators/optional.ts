import { Parser, Input } from '../types'
import { Right } from '../../functional'

export function optional<T> (parser: Parser<T>): Parser<T | undefined> {
  return function (input: Input) {
    const result = parser(input)
    return result.isLeft() && result.left.input === input
      ? new Right({
        value: undefined,
        input: input,
        expected: result.left.expected
      })
      : result
  }
}
