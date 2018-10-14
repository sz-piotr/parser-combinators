export type ParseError = {
  expected: string
  source: string
  character: number
  line: number
  column: number
}
