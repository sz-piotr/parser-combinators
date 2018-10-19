import { Parser, Input } from '../types'

export type Bounded<T> = {
  value: T,
  start: number,
  end: number
}
export function withBounds<T> (parser: Parser<T>): Parser<Bounded<T>> {
  return function parse (input: Input) {
    return parser(input).map(result => ({
      value: {
        value: result.value,
        start: input.location,
        end: result.input.location
      },
      expected: result.expected,
      input: result.input
    }))
  }
}
