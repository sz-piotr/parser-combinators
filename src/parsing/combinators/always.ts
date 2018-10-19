import { Right } from '../../functional'
import { Parser, Input } from '../types'

export function always<T> (value: T): Parser<T> {
  return function parse (input: Input) {
    return new Right({
      value,
      input
    })
  }
}
