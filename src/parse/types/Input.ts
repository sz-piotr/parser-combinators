export class Input {
  public readonly location: number
  public readonly source: string

  constructor (source: string, location = 0) {
    this.source = source
    this.location = location
  }

  get (n = 0): string | undefined {
    return this.source[this.location + n]
  }

  advance (n = 1): Input {
    return new Input(
      this.source,
      Math.min(this.source.length, this.location + n)
    )
  }
}
