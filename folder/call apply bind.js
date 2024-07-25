//call
Function.prototype.$call = function (newObj, ...args) {
    //判断newObj
    newObj = (newObj == undefined || newObj == null) ? window : Object(newObj);
    let fn = this;
    newObj.fn = fn;
    let res = newObj.fn(...args);
    delete newObj.fn;
    return res;
}