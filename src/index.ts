import { Either, Left, Right } from "./functional";

export interface AST {}
export interface TransformedAST {}

export function parse (source: string): Either<string, AST> {
  // return Left.of('parse :: Unimplemented')
  return Right.of(123)
}

export function transform (ast: AST): Either<string, TransformedAST> {
  // return Left.of('transform :: Unimplemented')
  return Right.of(123)
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
