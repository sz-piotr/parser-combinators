import {
  late,
  sequenceOf,
  tag,
  anyOf,
  attempt,
  map,
  withBounds
} from '../../parsing'
import { number, Number } from './number'

export type BinaryExpression = {
  type: 'BinaryExpression'
  left: BinaryExpression | Number
  right: BinaryExpression | Number
  operator: string
  start: number
  end: number
}

export const binaryExpression = late<BinaryExpression>()

const implementation = map(
  withBounds(sequenceOf(
    number,
    tag('+'),
    anyOf(attempt(binaryExpression), number)
  )),
  ({ value, start, end }) => (<BinaryExpression>{
    type: 'BinaryExpression',
    left: value[0],
    right: value[2],
    operator: value[1],
    start,
    end
  })
)

binaryExpression.implement(implementation)
