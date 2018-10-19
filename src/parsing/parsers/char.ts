import { Right, Left } from '../../functional'
import { Parser, Input } from '../types'

export function char (
  predicate: (char: string) => boolean,
  expected: string | string[]
): Parser<string> {
  const expectedValue = Array.isArray(expected) ? expected : [expected]

  return function parse (input: Input) {
    const value = input.get()
    if (value && predicate(value)) {
      return new Right({
        value,
        input: input.advance(1)
      })
    } else {
      return new Left({
        expected: expectedValue,
        input
      })
    }
  }
}
