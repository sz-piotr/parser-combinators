type Location = Readonly<{
  character: number,
  line: number,
  column: number
}>

const zeroLocation = {
  character: 0,
  line: 0,
  column: 0
}

export class Input {
  public readonly location: Location
  public readonly source: string

  constructor (source: string, location = zeroLocation) {
    this.source = source
    this.location = location
  }

  get (n = 0): string | undefined {
    return this.source[this.location.character + n]
  }

  advance (n = 1): Input {
    const location = { ...this.location }

    for (let i = 0; i < n; i++) {
      const char = this.get(i)

      location.column += 1
      location.character += 1

      if (char === '\n') {
        location.column = 0
        if (this.get(i - 1) !== '\r') {
          location.line += 1
        }
      } else if (char === '\r') {
        location.column = 0
        location.line += 1
      }
    }

    return new Input(this.source, location)
  }
}
