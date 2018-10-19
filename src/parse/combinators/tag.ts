import { Right, Left } from '../../functional'
import { Parser, Input } from '../types'

export function tag (value: string): Parser<string> {
  return function parse (input: Input) {
    if (input.startsWith(value)) {
      return new Right({
        value,
        input: input.advance(value.length)
      })
    } else {
      return new Left({ expected: [value], input })
    }
  }
}
