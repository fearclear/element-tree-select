import clone from 'clone'
/**
 * 数组拉平
 * @param {array} array
 * @param {string} children 字段名
 */
export interface Collection {
  [key: string]: any[];
}
export function treeToArray (
  array: any[],
  children = 'children'
) {
  const data = clone(array)
  let result: any[] = []
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

export function isArrayString (data?: any): data is any[] {
  return data instanceof Array
}
