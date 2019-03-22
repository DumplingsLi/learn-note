# 1.实现一个 promise, 支持以下调用方式
p = myPromise (resolve, reject) ->
  setTimeout ->
    resolve 'my promise'
  , 100

p.then ->
  console.log 'foo'
.then ->
  console.log 'bar'
  error function
.catch ->
  console.log error

# 2.实现一个 promise.all, 支持以下调用方式
p1 = new Promise (resolve, reject) ->
  console.log 'p1 start'
  setTimeout ->
    console.log 'p1'
    resolve 'p1 result'
  , 1500

p2 = new Promise (resolve, reject) ->
  console.log 'p2 start'
  setTimeout ->
    console.log 'p2'
    resolve 'p2 result'
  , 300

p3 = new Promise (resolve, reject) ->
  console.log 'p3 start'
  setTimeout ->
    console.log 'p3'
    resolve 'p3 result'
  , 1000


promiseAll [p1, p2, p3]
.then (result) ->
  # 输出 ['p1 result', 'p2 result', 'p3 result']
  console.log result


# 3.实现一个 promise.pool, 支持通过参数指定允许同时执行的 promise 数量
promise.pool [p1, p2, p3], 2
.then (result) ->
  # 输出 ['p1 result', 'p2 result', 'p3 result']
  console.log result
