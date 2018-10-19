import { Parser, Input, ParseError, ParseSuccess } from '../types'
import { Either, Left } from '../../functional';

export function anyOf<A> (a: Parser<A>): Parser<A>
export function anyOf<A, B> (a: Parser<A>, b: Parser<B>): Parser<A | B>
export function anyOf<A, B, C> (a: Parser<A>, b: Parser<B>, c: Parser<C>): Parser<A | B | C>
export function anyOf<A, B, C, D> (a: Parser<A>, b: Parser<B>, c: Parser<C>, d: Parser<D>): Parser<A | B | C | D>
export function anyOf<A, B, C, D, E> (a: Parser<A>, b: Parser<B>, c: Parser<C>, d: Parser<D>, e: Parser<E>): Parser<A | B | C | D | E>
export function anyOf<A, B, C, D, E, F> (a: Parser<A>, b: Parser<B>, c: Parser<C>, d: Parser<D>, e: Parser<E>, f: Parser<F>): Parser<A | B | C | D | E | F>
export function anyOf (...parsers: Parser<any>[]): Parser<any>
export function anyOf (...parsers: Parser<any>[]): Parser<any> {
  if (parsers.length === 0) {
    throw new Error('anyOf expects at least one argument')
  } else if (parsers.length === 1) {
    return parsers[0]
  } else {
    return function (input: Input) {
      const expected = []
      for (const parser of parsers) {
        const result = parser(input)
        if (!result.isLeft() || (result.left.input !== input)) {
          return result
        } else {
          expected.push(...result.left.expected)
        }
      }
      return Left.of({ expected, input })
    }

  }
}
