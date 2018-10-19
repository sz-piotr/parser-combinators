import { Left } from '../../functional'
import { Parser, Input, ParseError } from '../types'

export function skipLeft<A, B> (a: Parser<A>, b: Parser<B>): Parser<B> {
  return function (input: Input) {
    const aResult = a(input)
    return !aResult.isRight()
      ? aResult as Left<ParseError>
      : b(aResult.right.input)
  }
}
