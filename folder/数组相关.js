//数组的扁平化
function flattedArray(arr) {
    let result = [];
    arr.forEach(item => {
        if(Array.isArray(item)) {
            result = result.concat(flattedArray(item));
        }
        else {
            result.push(item);
        }
    });
    return result;
}
const nestedArray = [1, [2, [3, 4], 5], 6];
console.log(flattedArray(nestedArray));