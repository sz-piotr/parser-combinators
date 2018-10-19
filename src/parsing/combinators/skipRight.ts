import { Parser } from '../types'
import { sequenceOf } from './sequenceOf'
import { map } from './map';

export function skipRight<A, B> (a: Parser<A>, b: Parser<B>): Parser<A> {
  return map(sequenceOf(a, b), ([x]) => x)
}
