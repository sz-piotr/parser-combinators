import { Right, Left } from '../../functional'
import { Parser, Input, ParseError } from '../types'
import { zeroOrMore } from './zeroOrMore'

export function oneOrMore<T> (parser: Parser<T>): Parser<T[]> {
  const zeroParser = zeroOrMore(parser)
  return function parse (input: Input) {
    return zeroParser(input).flatMap(result => result.value.length > 0
      ? new Right(result)
      : new Left({ expected: result.expected!, input })
    )
  }
}
