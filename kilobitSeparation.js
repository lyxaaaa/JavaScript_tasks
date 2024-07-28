// 千位分隔符

// 1. toLocaleString
let num1 = 3141592627.3125;
let formattedNum1 = num1.toLocaleString('en-US');
console.log('kiolbit Separation:', formattedNum1); // 3,141,592,627.313

// 2. 正则表达式
function methodTwo(num) {
    // 判断正负
    let isNegative = num < 0;
    const parts = num.toString().split('.');
    if(isNegative) parts[0] = Math.abs(parts[0]).toString();
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let result = parts.join('.');
    if(isNegative) {
        result = '-' + result;
    }
    return result;
}
console.log('kiolbit Separation:', methodTwo(num1)); // 3,141,592,627.3125

// 3. 纯逻辑
function methodThird(num) {
    // 判断正负
    let isNegative = num < 0;
    let [intPart, demicalPart] = num.toString().split('.');
    if(isNegative) intPart = Math.abs(intPart).toString();

    let processedArr = [];
    // 整数逆序，逢三次加，
    // ps:数组 -> 字符串 用join，字符串 -> 数组 用split
    intPart = intPart.split('').reverse().join('');
    for(let i = 0; i < intPart.length; i++) {
        processedArr.push(intPart[i]);
        if((i + 1) % 3 === 0 && (i + 1) !== intPart.length) processedArr.push(',');
    }
    intPart = processedArr.reverse().join('');
    if(isNegative) intPart = '-' + intPart;
    let result;
    if(demicalPart !== undefined) result = `${intPart}.${demicalPart}`;
    else result = intPart;
    return result;
}
console.log('kiolbit Separation:', methodThird(num1)); // 3,141,592,627.3125