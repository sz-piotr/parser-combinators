import {
  Parser,
  char,
  named,
  oneOrMore,
  map,
  withBounds
} from '../../parsing'

export type Number = {
  type: 'Number'
  value: string
  start: number
  end: number
}

const digits = '0123456789'
const digit = char(c => digits.includes(c), 'digit')

export const number = map(
  withBounds(named(oneOrMore(digit), 'number')),
  ({ value, start, end }) => (<Number>{
    type: 'Number',
    value: value.join(''),
    start,
    end
  })
)
