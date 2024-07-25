//深拷贝
function deepclone(object) {
    if(typeof object === 'object' && object !== null) {
        let result = Array.isArray(object) ? [] : {};
        for(let key in object) {
            if(object.hasOwnProperty(key)) result[key] = typeof object[key] === 'object' ? deepclone(object[key]) : object[key];
        }
        return result;
    }
    return object;
}

//复杂版深克隆：基于简单版的基础上，还考虑了内置对象比如 Date、RegExp 等对象和函数以及解决了循环引用的问题。
const isObject = (target) => (typeof target === "object" || typeof target === "function") && target !== null;
function deepClone(target, map = new WeakMap()) {
    if (map.get(target)) {
        return target;
    }
    // 获取当前值的构造函数：获取它的类型
    let constructor = target.constructor;
    // 检测当前对象target是否与正则、日期格式对象匹配
    if (/^(RegExp|Date)$/i.test(constructor.name)) {
        // 创建一个新的特殊对象(正则类/日期类)的实例
        return new constructor(target);  
    }
    if (isObject(target)) {
        map.set(target, true);  // 为循环引用的对象做标记
        const cloneTarget = Array.isArray(target) ? [] : {};
        for (let prop in target) {
            if (target.hasOwnProperty(prop)) {
                cloneTarget[prop] = deepClone(target[prop], map);
            }
        }
        return cloneTarget;
    } else {
        return target;
    }
}

//函数柯里化
function currying(fn) {
    let judge = (...args) => {
        if(args.length == fn.length) fn(...args);
        else return (...a) => judge(...args, ...a);
    }
    return judge;
}


let per1 = {
    name: 'lily',
    nums: [1,2,3,4],
    city: {
        location: 'shenzhen',
        country: 'chinese'
    }
}

let per2 = {...per1}
per2.city.location = 'shanghai'

console.log('per1', per1)
console.log('per2', per2)

let per3 = deepclone(per1)
per3.city.location = 'nanchang'
console.log(per1,per3)


//手写防抖节流
//防抖：在高频触发时，只执行最后一次
function debounce() {
    let timer = null;
    if(timer !== null) clearTimeout(timer);
    timer = setTimeout(() => {
        connsole.log('debounce')
    }, 1000)
}

//节流：在高频触发时，只执行第一次
function throttle() {
    let timer = null;
    if(timer !== null) return;
    timer = setTimeout(() => {
        console.log('throttle');
        timer = null;
    }, 1000);
}

//promise
function getHeigher() {
    return new Promise(function(resolve, reject) {
        let num = Math.random();
        if(num > 0.5) resolve('success '+ num)
        else reject('failed'+ num)
    })
}
getHeigher()
    .then((res) => {console.log(res)}, (res) => {console.log(res)})
    .catch((res) => {console.log(res)})


//给对象加上iterator迭代器
let banji = {
    name: 'classroom',
    students: [
        'lily',
        'jackson',
        'david',
        'mark'
    ],
    [Symbol.iterator]() {
        let index = 0;
        let _this = this;
        return {
            next: function() {
                if(index < _this.students.length) {
                    return {value: _this.students[index++], done: false}
                }
                else return {value: undefined, done: true}
            }
        }
    }
}

for(let value of banji){
    console.log(value)
}

//生成器generator
function* testGenerator() {
    yield '111';
    yield '222';
    yield '333';
}
let generatorObj = testGenerator();
console.log(generatorObj.next()) //{value: '111', done: false}
console.log(generatorObj.next()) //{value: '222', done: false}
console.log(generatorObj.next()) //{value: '333', done: false}
console.log(generatorObj.next()) //{value: undefined , done: true}
//也可以对next方法传入参数，该参数作为上一个yield的执行结果

//回调地狱
setTimeout(() => {
    console.log(111)
    setTimeout(() => {
        console.log(222)
        setTimeout(() => {
            console.log(333)
        }, 3000);
    }, 2000);
}, 1000);

//promise封装初次尝试
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(111)
    }, 1000);
})
p.then(() => {
    setTimeout(() => {
        console.log(222)
    }, 2000);
}, (error) => {console.log(error)})
.then(() => {
    setTimeout(() => {
        console.log(333)
    }, 3000);
}, (error) => {console.log(error)})

//对上述代码进一步封装(promise)
function delay(value, time) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(value)
            resolve()
        }, time);
    })
}
delay(111, 1000)
    .then(() => {delay(222, 2000)})
    .then(() => {delay(333, 3000)})
    .catch((error) => {console.error(error)})

//用生成器函数对回掉地狱优化
function one() {
    setTimeout(() => {
        console.log(111)
        generatorObjTwo.next()
    }, 1000);
}
function two() {
    setTimeout(() => {
        console.log(222)
        generatorObjTwo.next()
    }, 2000);
}
function three() {
    setTimeout(() => {
        console.log(333)
        generatorObjTwo.next()
    }, 3000);
}
function* generatorTwo() {
    yield one();
    yield two();
    yield three();
}
let generatorObjTwo = generatorTwo()
generatorObjTwo.next()

//依次读取三个文件内容(回调地狱) 注意参数名不要重复
const fs = require('fs');
const { resolve } = require('path');
const { start } = require('repl');
fs.readFile('./1.txt', (error, data1) => {
    fs.readFile('./2.txt', (error, data2) => {
        false.readFile('./3.txt', (error, data3) => {
            let result = data1 + data2 + data3;
            console.log(result)
        })
    })
})
//promise改进
let p = new Promise((resolve, reject) => {
    fs.readFile('./1.txt', (error, data) => {
        resolve(data)
    })
})
p.then((value) => {
    fs.readFile('./2.txt', (error, data) => {
        resolve([value, data])
    })
}).then((value) => {
    fs.readFile('./3.txt', (error, data) => {
        data.push(value)
        console.log(data)
    })
})

//集合set
let arr1 = [1,2,5,4,3,3,1,2];
let arr2 = [4,5,6,6,6];

//去重
let arrSet1 = [...new Set(arr1)]
//交集
arrSet1.filter(item => new Set(arr2).has(item))
//差集
arrSet1.filter(item => !(new Set(arr2).has(item)))
//并集
let arrAll = [...arr1, arr2]
arrAll = [...new Set(arrAll)]

//es6 的 class
// price is not a function
class Phone {
    get price() {
        console.log('get price')
    }
    set price(value) {
        console.log('set price to ', value)
    }
}
let phone = new Phone()
console.log(phone.price)
phone.price = 'free'

//闭包：内层函数 + 引用外层函数的变量，可以实现数据的私有化(可访问，不可修改)
function count() {
    let i = 0;
    return function diaoyong() {
        i++;
        console.log('该内层函数执行次数：', i);
    }
}
let res = count();
res();

//bind实现要复杂一点  因为他考虑的情况比较多 还要涉及到参数合并(类似函数柯里化)
Function.prototype.myBind = function (context, ...args) {
    if (!context || context === null) {
      context = window;
    }
    // 创造唯一的key值  作为我们构造的context内部方法名
    let fn = Symbol();
    context[fn] = this;
    let _this = this;
    //  bind情况要复杂一点
    const result = function (...innerArgs) {
      // 第一种情况 :若是将 bind 绑定之后的函数当作构造函数，通过 new 操作符使用，则不绑定传入的 this，而是将 this 指向实例化出来的对象
      // 此时由于new操作符作用  this指向result实例对象  而result又继承自传入的_this 根据原型链知识可得出以下结论
      // this.__proto__ === result.prototype   //this instanceof result =>true
      // this.__proto__.__proto__ === result.prototype.__proto__ === _this.prototype; //this instanceof _this =>true
      if (this instanceof _this === true) {
        // 此时this指向指向result的实例  这时候不需要改变this指向
        this[fn] = _this;
        this[fn](...[...args, ...innerArgs]); //这里使用es6的方法让bind支持参数合并
        delete this[fn];
      } else {
        // 如果只是作为普通函数调用  那就很简单了 直接改变this指向为传入的context
        context[fn](...[...args, ...innerArgs]);
        delete context[fn];
      }
    };
    // 如果绑定的是构造函数 那么需要继承构造函数原型属性和方法
    // 实现继承的方式: 使用Object.create
    result.prototype = Object.create(this.prototype);
    return result;
  };


Function.prototype.bindWay = function () {
    let args = [...arguments];
    let self = args.shift();
    let _this = this;
    return function () {
        _this.apply(self, args.concat(...arguments));
    }
}

Function.prototype.callWay = function (self, ...args) {
    let self = self || window;
    let symbolKey = Symbol();
    self[symbolKey] = this;
    const result = self[symbolKey](self, ...args);
    delete self[symbolKey];
    return result;
}
