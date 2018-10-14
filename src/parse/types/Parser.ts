import { Either } from '../../functional'
import { ParseError } from './ParseError'
import { Input } from './Input'

export type Parser<T> = (input: Input) => Either<ParseError, T>
