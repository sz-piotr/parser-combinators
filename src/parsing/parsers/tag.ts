import { Right, Left } from '../../functional'
import { Parser, Input } from '../types'

export function tag (value: string): Parser<string> {
  return function parse (input: Input) {
    if (startsWith(input, value)) {
      return new Right({
        value,
        input: input.advance(value.length)
      })
    } else {
      return new Left({ expected: [value], input })
    }
  }
}

function startsWith (input: Input, value: string): boolean {
  for (let i = 0; i < value.length; i++) {
    if (input.get(i) !== value[i]) {
      return false
    }
  }
  return true
}
