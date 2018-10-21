import { Input } from '../parsing'
import { parser } from './parser'

export function parse (source: string) {
  return parser(new Input(source))
}
