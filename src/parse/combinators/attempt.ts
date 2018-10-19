import { Parser, Input } from '../types'
import { Left } from '../../functional'

export function attempt<T> (parser: Parser<T>): Parser<T> {
  return function (input: Input) {
    const result = parser(input)
    return result.isLeft()
      ? new Left({
        input: input,
        expected: result.left.input === input
          ? result.left.expected
          : []
      })
      : result
  }
}
