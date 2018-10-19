import { Parser } from '../types'
import { sequenceOf } from './sequenceOf'
import { map } from './map';

export function between<A, B, C> (
  a: Parser<A>,
  b: Parser<B>,
  c: Parser<C>
): Parser<B> {
  return map(sequenceOf(a, b, c), ([, x,]) => x)
}
