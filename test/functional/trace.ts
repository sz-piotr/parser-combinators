import 'mocha'
import { expect } from 'chai'

import { trace } from '../../src/functional'

describe('trace', () => {
  it('logs its arguments to console', () => {
    const [message] = captureConsole(() => {
      trace('x')(1)
    })
    expect(message).to.equal('x: 1')
  })

  it('returns its argument', () => {
    let result
    captureConsole(() => {
      result = trace('x')(1)
    })

    expect(result).to.equal(1)
  })
})

function captureConsole (fn: Function) {
  const log = console.log
  let messages: string[] = []
  console.log = (x: any) => messages.push('' + x)
  fn()
  console.log = log
  return messages
}
