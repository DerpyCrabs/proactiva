export function reorder<a>(
  oldArr: Array<a>,
  startIndex: number,
  endIndex: number
): Array<a> {
  let arr = oldArr.slice()
  const [removed] = arr.splice(startIndex, 1)
  arr.splice(endIndex, 0, removed)
  return arr
}
