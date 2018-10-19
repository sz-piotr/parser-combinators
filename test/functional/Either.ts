import 'mocha'
import { expect } from 'chai'

import { Either, Right, Left } from '../../src/functional'

describe('Either', () => {
  it('Right.map changes value', () => {
    expect(new Right(1).map(x => x + 1))
      .to.deep.equal(new Right(2))
  })

  it('Left.map changes nothing', () => {
    const left: Either<any, any> = new Left(1)
    expect(left.map(x => x + 1))
      .to.deep.equal(left)
  })

  it('Right.flatMap unpacks value', () => {
    expect(new Right(1).flatMap(x => new Left(x + 1)))
      .to.deep.equal(new Left(2))
  })

  it('Left.flatMap changes nothing', () => {
    const left: Either<any, any> = new Left(1)
    expect(left.flatMap(x => new Right(x + 1)))
      .to.deep.equal(left)
  })
})
