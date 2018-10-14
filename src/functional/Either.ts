export interface Either<L, R> {
  map<R2> (fn: (value: R) => R2): Either<L, R2>
  flatMap<R2> (fn: (value: R) => Either<L, R2>): Either<L, R2>
  isRight (): this is Right<R>
  isLeft (): this is Left<L>
  toString(): string
}

export class Right<R> implements Either<any, R> {
  private constructor (public right: R) {}
  static of<R> (right: R) {
    return new Right(right)
  }

  map<R2> (fn: (value: R) => R2): Either<any, R2> {
    return Right.of(fn(this.right))
  }

  flatMap<L, R2> (fn: (value: R) => Either<L, R2>): Either<L, R2> {
    return Right.of(fn(this.right)).right
  }

  isRight () {
    return true
  }

  isLeft () {
    return false
  }

  toString() {
    return `Right(${this.right})`
  }
}

export class Left<L> implements Either<L, any> {
  private constructor (public left: L) {}
  static of<L> (left: L) {
    return new Left(left)
  }

  map<R> (): Either<L, R> {
    return this
  }

  flatMap<R> (): Either<L, R> {
    return this
  }

  isRight () {
    return false
  }

  isLeft () {
    return true
  }

  toString() {
    return `Left(${this.left})`
  }
}

export const Either = {
  Right,
  Left,
  map<L, R, R2> (fn: (value: R) => R2) {
    return function (either: Either<L, R>) {
      return either.map(fn)
    }
  },
  flatMap<L, R, R2> (fn: (value: R) => Either<L, R2>) {
    return function (either: Either<L, R>) {
      return either.flatMap(fn)
    }
  }
}
