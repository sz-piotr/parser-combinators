import { Right, Left } from '../../functional'
import { Input, Parser } from '../types'

const expected = ['end of input']
export const endOfInput: Parser<undefined> = (input: Input) =>
  input.get() === undefined
    ? new Right({ value: undefined, input })
    : new Left({ expected, input })
