import { Right, Left } from '../../functional'
import { Parser, Input, ParseError } from '../types'

export function map<T, U> (parser: Parser<T>, fn: (value: T) => U): Parser<U> {
  return function parse (input: Input) {
    const result = parser(input)
    if (result.isRight()) {
      return new Right({
        value: fn(result.right.value),
        input: result.right.input
      })
    } else {
      return result as Left<ParseError>
    }
  }
}
