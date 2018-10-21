import { Right, Either, Left } from '../../functional'
import { Parser, Input, ParseError, ParseSuccess } from '../types'

export interface ExpressionTree<T, U> {
  left: T | ExpressionTree<T, U>
  operator: U
  right: T | ExpressionTree<T, U>
}

export interface Operator<T> {
  value: T
  precedence: number
  leftAssociative: boolean
}

export function binaryExpression<T, U> (
  operandParser: Parser<T>,
  operatorParser: Parser<Operator<U>>
): Parser<ExpressionTree<T, U>> {
  return function parse (input: Input) {
    return parseComponents(input, operandParser, operatorParser).map(result => {
      const operators: Operator<U>[] = result.value.operators
      const operands: (T | ExpressionTree<T, U>)[] = result.value.operands

      while (operators.length > 0) {
        for (let i = 0; i < operators.length; i++) {
          if (hasHigherPrecedence(operators[i], operators[i + 1])) {
            operands.splice(i, 2, {
              left: operands[i],
              operator: operators[i].value,
              right: operands[i + 1]
            })
            operators.splice(i, 1)
            break
          }
        }
      }

      return {
        value: operands[0] as ExpressionTree<T, U>,
        expected: result.expected,
        input: result.input
      }
    })
  }
}


function parseComponents<T, U> (
  input: Input,
  operandParser: Parser<T>,
  operatorParser: Parser<Operator<U>>
): Either<ParseError, ParseSuccess<{
  operators: Operator<U>[],
  operands: T[]
}>> {
  const operators: Operator<U>[] = []
  const operands: T[] = []

  let expectOperand = false
  let foundOneOperator = false
  while (true) {
    expectOperand = !expectOperand
    if (expectOperand) {
      const result = operandParser(input)
      if (result.isRight()) {
        operands.push(result.right.value)
        input = result.right.input
      } else {
        return result as Left<ParseError>
      }
    } else {
      const result = operatorParser(input)
      if (result.isRight()) {
        foundOneOperator = true
        operators.push(result.right.value)
        input = result.right.input
      } else if (
        foundOneOperator &&
        (result as Left<ParseError>).left.input === input
      ) {
        return new Right({
          value: { operators, operands },
          expected: (result as Left<ParseError>).left.expected,
          input: input
        })
      } else {
        return result as Left<ParseError>
      }
    }
  }
}

function hasHigherPrecedence<T> (a: Operator<T>, b?: Operator<T>) {
  if (!b) {
    return true
  } else if (a.precedence === b.precedence) {
    return a.leftAssociative
  } else {
    return a.precedence > b.precedence
  }
}
