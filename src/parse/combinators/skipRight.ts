import { Parser, Input, ParseError } from '../types'
import { Left, Right } from '../../functional';

export function skipRight<A, B> (a: Parser<A>, b: Parser<B>): Parser<A> {
  return function (input: Input) {
    const aResult = a(input)
    if (!aResult.isRight()) {
      return aResult
    }
    const bResult = b(aResult.right.input)
    if (bResult.isRight()) {
      return new Right({
        value: aResult.right.value,
        input: bResult.right.input,
        expected: bResult.right.expected
      })
    } else {
      return bResult as Left<ParseError>
    }
  }
}
