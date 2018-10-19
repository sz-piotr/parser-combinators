import { Right, Left } from '../../functional'
import { Parser, Input, ParseError } from '../types'

export function sequenceOf<A, B> (a: Parser<A>, b: Parser<B>): Parser<[A, B]>
export function sequenceOf<A, B, C> (a: Parser<A>, b: Parser<B>, c: Parser<C>): Parser<[A, B, C]>
export function sequenceOf<A, B, C, D> (a: Parser<A>, b: Parser<B>, c: Parser<C>, d: Parser<D>): Parser<[A, B, C, D]>
export function sequenceOf<A, B, C, D, E> (a: Parser<A>, b: Parser<B>, c: Parser<C>, d: Parser<D>, e: Parser<E>): Parser<[A, B, C, D, E]>
export function sequenceOf<A, B, C, D, E, F> (a: Parser<A>, b: Parser<B>, c: Parser<C>, d: Parser<D>, e: Parser<E>, f: Parser<F>): Parser<[A, B, C, D, E, F]>
export function sequenceOf<T> (...parsers: Parser<T>[]): Parser<T[]>
export function sequenceOf (...parsers: Parser<any>[]): Parser<any[]>

export function sequenceOf (...parsers: Parser<any>[]): Parser<any[]> {
  return function (input: Input) {
    const results = []
    const expected = []

    for (const parser of parsers) {
      const result = parser(input)
      if (!result.isRight()) {
        return new Left({
          expected: expected.concat((result as Left<ParseError>).left.expected),
          input: (result as Left<ParseError>).left.input
        })
      } else {
        if (result.right.expected) {
          expected.push(...result.right.expected)
        } else if (expected.length) {
          expected.length = 0
        }
        results.push(result.right.value)
        input = result.right.input
      }
    }

    return new Right({
      value: results,
      expected: expected.length ? expected : undefined,
      input
    })
  }
}
