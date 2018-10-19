import { Parser, Input } from '../types'

export function map<T, U> (parser: Parser<T>, fn: (value: T) => U): Parser<U> {
  return function parse (input: Input) {
    return parser(input).map(result => ({
      value: fn(result.value),
      expected: result.expected,
      input: result.input
    }))
  }
}
