import { Right } from '../../functional'
import { Parser, Input } from '../types'

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
    for (const parser of parsers) {
      const result = parser(input)
      if (!result.isRight()) {
        return result
      } else {
        results.push(result.right.value)
        input = result.right.input
      }
    }
    return new Right({ value: results, input })
  }
}
