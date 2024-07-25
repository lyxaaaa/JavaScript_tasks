console.log('start');

setTimeout(() => {
    console.log('timeout')
}, 0);

Promise.resolve().then(() => {
    console.log('promise 1');
}).then(() => console.log('promise 2'));

console.log('end');

function currying(fn, ...args) {
    return function(...args1) {
        let params = [...args, ...args1];
        if(fn.length === params.length) return currying(fn)
        else return 
    }
}

function add(a) {
    return function (b) {
        return function (c) {
            return a+b+c;
        }
    }
}

add(1)(2)(3);