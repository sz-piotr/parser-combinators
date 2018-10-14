export interface ComposeSignature {
  <A>(): (x: A) => A
  <A, B>(b: (x: A) => B): (x: A) => B
  <A, B, C>(c: (x: B) => C, b: (x: A) => B): (x: A) => C
  <A, B, C, D>(d: (x: C) => D, c: (x: B) => C, b: (x: A) => B): (x: A) => D
  <A, B, C, D, E>(e: (x: D) => E, d: (x: C) => D, c: (x: B) => C, b: (x: A) => B): (x: A) => E
  <A, B, C, D, E, F>(f: (x: E) => F, e: (x: D) => E, d: (x: C) => D, c: (x: B) => C, b: (x: A) => B): (x: A) => F
  (...fns: Function[]): (x: any) => any
}

export const compose: ComposeSignature = (...fns: Function[]) => (x: any) =>
  fns.reduceRight((y, f) => f(y), x)
