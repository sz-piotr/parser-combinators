export function trace<T> (label: string) {
  return (value: T) => {
    console.log(`${ label }: ${ value }`)
    return value
  }
}
