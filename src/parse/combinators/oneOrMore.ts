import { Right, Left } from '../../functional'
import { Parser, Input, ParseError } from '../types'

export function oneOrMore<T> (parser: Parser<T>): Parser<T[]> {
  return function parse (input: Input) {
    const results = []
    while (true) {
      const result = parser(input)
      if (result.isRight()) {
        results.push(result.right.value)
        input = result.right.input
      } else {
        return results.length > 0
          ? new Right({
            value: results,
            expected: (result as Left<ParseError>).left.expected,
            input
          })
          : result as Left<ParseError>
      }
    }
  }
}
