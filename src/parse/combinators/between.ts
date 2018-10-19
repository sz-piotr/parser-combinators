import { Parser } from '../types'
import { skipLeft } from './skipLeft';
import { skipRight } from './skipRight';

export function between<A, B, C> (
  a: Parser<A>,
  b: Parser<B>,
  c: Parser<C>
): Parser<B> {
  return skipLeft(a, skipRight(b, c))
}
