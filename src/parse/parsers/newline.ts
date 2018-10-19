import { Right, Left } from '../../functional'
import { Input, Parser } from '../types'

const expected = ['newline']
export const newline: Parser<string> = (input: Input) => {
  const char = input.get()
  if (char === '\n') {
    return new Right({ value: char, input: input.advance(1) })
  } else if (char === '\r') {
    if (input.get(1) === '\n') {
      return new Right({ value: '\r\n', input: input.advance(2) })
    } else {
      return new Right({ value: char, input: input.advance(1) })
    }
  } else {
    return new Left({ expected, input })
  }
}
