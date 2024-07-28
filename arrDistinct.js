// 数组去重
// 1. set
function methodOne(arr) {
    return [...new Set(arr)];
}

// 2. filter
function methodTwo(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}

// 3. reduce
function methodThird(arr) {
    return arr.reduce((accumulator, currentItem) => {
        if(!accumulator.includes(currentItem)) accumulator.push(currentItem);
        return accumulator;
    }, []);
}


const array = [1, 2, 2, 3, 4, 4, 5];
console.log('original array:', array);
console.log('distincted array:', methodThird(array));