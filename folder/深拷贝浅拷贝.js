//深拷贝函数
function deepClone(obj) {
    //递归退出条件
    if(obj !== 'object' || obj === null) return obj;
    let result = Array.isArray(obj) ? [] : {};
    for(let key in obj) {
        if(Object.prototype.hasOwnProperty(key)) {
            result[key] = deepClone(obj[key]);
        }
        else result[key] = obj[key];
    }
    return result;
}