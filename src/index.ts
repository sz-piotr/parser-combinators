import { Either, Left, Right } from './functional'

export interface AST {}
export interface TransformedAST {}

export function parse (source: string): Either<string, AST> {
  // return new Left('parse :: Unimplemented')
  return new Right(123)
}

export function transform (ast: AST): Either<string, TransformedAST> {
  // return new Left('transform :: Unimplemented')
  return new Right(123)
}

export function generate (ast: TransformedAST): number {
  return 1
}

export const compile = function (source: string) {
  const result = parse(source)
    .flatMap(transform)
    .map(generate)
  console.log(result)
}
