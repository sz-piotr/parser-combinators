import { Parser, Input } from '../types'
import { Left } from '../../functional'

type LateParser<T> = Parser<T> & {
  implement(implementation: Parser<T>): void
}

export function late<T> (): LateParser<T> {
  let parser: Parser<T> | null = null
  function parse (input: Input) {
    return parser!(input)
  }
  parse.implement = function(implementation: Parser<T>) {
    parser = implementation
  }
  return parse
}
