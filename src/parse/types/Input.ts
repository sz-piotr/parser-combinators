import { ParseError } from "./ParseError"

export class Input {
  private location = {
    character: 0,
    line: 0,
    column: 0
  }
  private stack: Input['location'][] = []
  private source: string

  constructor (source: string) {
    this.source = source
  }

  save () {
    this.stack.push({ ...this.location })
  }

  restore () {
    const location = this.stack.pop()
    if (location) {
      this.location = location
    } else {
      throw new Error('Calling input.restore without matching input.save!')
    }
  }

  get (n = 0): string | undefined {
    return this.source[this.location.character + n]
  }

  startsWith (value: string): boolean {
    for (let i = 0; i < value.length; i++) {
      if (this.get(i) !== value[i]) {
        return false
      }
    }
    return true
  }

  next (n = 1) {
    for (let i = 0; i < n; i++) {
      const char = this.get(i)
      this.location.column += 1
      if (char === '\n') {
        this.location.line += 1
        this.location.column = 0
      } else if (char === '\r') {
        if (this.get(i - 1) !== '\n') {
          this.location.line += 1
        }
        this.location.column = 0
      }
      this.location.character += 1
    }
  }

  error (expected: string): ParseError {
    return {
      expected,
      source: this.source,
      ...this.location
    }
  }

  remaining () {
    return this.source.substring(this.location.character)
  }
}
