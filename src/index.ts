import { compose } from "./compose";

export type AST = {}
export type TransformedAST = {}

export function parse (source: string): AST {
  return {}
}

export function transform (ast: AST): TransformedAST {
  return {}
}

export function generate (ast: TransformedAST): string {
  return ''
}

export const compile = compose(
  generate,
  transform,
  parse
)