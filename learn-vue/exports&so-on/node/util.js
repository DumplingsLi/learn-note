var a = 100
// 1. node遵循CommonJS规范
// 2. CommonJS定义的模块分为: 模块标识(module)、模块定义(exports) 、模块引用(require)

// 3. node执行一个文件时，给这个文件生成一个exports和module对象
console.log("exports: " + exports)
console.log("module.exports: " + module.exports)

// 4. exports = module.exports = {} 指向同一块内存区域
exports.a = 200
console.log("exports: " + exports.a)
console.log("module.exports: " + module.exports.a)

// 5. require 与 module.exports 对应，exports只是引用
exports.a = 300
exports = ""

// module.exports.a = a
console.log(a)
console.log("exports: " + exports.a)
console.log("module.exports: " + module.exports.a)

// 所以尽量使用module.exports导出，require导入
