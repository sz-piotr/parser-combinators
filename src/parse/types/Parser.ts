import { Either } from '../../functional'
import { Input } from './Input'

export type ParseError = {
  expected: string[]
  input: Input
}

export type ParseSuccess<T> = {
  value: T
  input: Input
}

export type Parser<T> = (input: Input) => Either<ParseError, ParseSuccess<T>>
