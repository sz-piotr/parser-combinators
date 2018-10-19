import 'mocha'
import { expect } from 'chai'

import { Right, Left } from '../../../src/functional'
import { Input, sequenceOf, newline } from '../../../src/parsing'

describe('newline', () => {
  it('succeeds with LF', () => {
    const input = new Input('\n')
    const result = newline(input)

    expect(result).to.deep.equal(new Right({
      value: '\n',
      input: input.advance(1)
    }))
  })

  it('succeeds with CR', () => {
    const input = new Input('\r')
    const result = newline(input)

    expect(result).to.deep.equal(new Right({
      value: '\r',
      input: input.advance(1)
    }))
  })

  it('succeeds with CRLF', () => {
    const input = new Input('\r\n')
    const result = newline(input)

    expect(result).to.deep.equal(new Right({
      value: '\r\n',
      input: input.advance(2)
    }))
  })

  it('succeeds with many newlines', () => {
    const parser = sequenceOf(newline, newline, newline)
    const input = new Input('\r\n\n\n')
    const result = parser(input)

    expect(result).to.deep.equal(new Right({
      value: ['\r\n', '\n', '\n'],
      expected: undefined,
      input: input.advance(4)
    }))
  })

  it('fails on non newline', () => {
    const input = new Input('abc')
    const result = newline(input)

    expect(result).to.deep.equal(new Left({
      expected: ['newline'],
      input: input
    }))
  })
})
