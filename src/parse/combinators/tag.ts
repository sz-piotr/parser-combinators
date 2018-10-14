import { Either, Right, Left } from '../../functional'
import { Parser, ParseError, Input } from '../types'

export function tag (value: string): Parser<string> {
  return function parse (input: Input): Either<ParseError, string> {
    if (input.startsWith(value)) {
      input.next(value.length)
      return Right.of(value)
    } else {
      return Left.of(input.error(value))
    }
  }
}
