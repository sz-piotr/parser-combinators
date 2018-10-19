import { Parser } from '../types'
import { sequenceOf } from './sequenceOf'
import { map } from './map';

export function skipLeft<A, B> (a: Parser<A>, b: Parser<B>): Parser<B> {
  return map(sequenceOf(a, b), ([, x]) => x)
}
