// 1. export & import { a } from ...
// 2. export default & import a from ...
// 3. export 和 import 可以多个，export default 只有一个

// 4. export 能直接导出变量表达式，export default 不行
export const a = '100'
// export default const m = '100'    不可以这样

export const fun = function() {
  console.log('miao')
}

function duck() {
  console.log('ga')
}

export {
  duck
}

const m = 200
export default m
