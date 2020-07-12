import clone from 'clone'
/**
 * 数组拉平
 * @param {array} array
 * @param {string} children 字段名
 */
export interface Collection {
  [key: string]: Collection[]
}
export function treeToArray(
  array: Collection[],
  children = 'children'
) {
  const data = clone(array)
  let result: Collection[] = []
  data.forEach(item => {
    if (!item[children]) {
      result.push(item)
    } else {
      const child = item[children]
      delete item[children]
      result.push(item)
      result = result.concat([], treeToArray(child))
    }
  })
  return result
}
