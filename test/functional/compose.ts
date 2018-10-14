import 'mocha'
import { expect } from 'chai'
import { compose } from '../../src/functional/compose'

describe('compose', () => {
  it('composes functions', () => {
    const fn = compose(
      (x: number) => x + 1,
      (x: number) => x * 2
    )

    expect(fn(2)).to.equal(5)
  })

  it('works with no arguments', () => {
    const fn = compose()

    expect(fn(1)).to.equal(1)
  })

  it('works with a single function', () => {
    const fn = compose((x: number) => x + 1)

    expect(fn(1)).to.equal(2)
  })
})
