// 快速排序
const quickSort = function (arr) {
    let len = arr.length;
    if(len < 2) return arr;
    let index = Math.floor(len / 2);
    let pivot = arr.splice(index, 1)[0];
    let left = [];
    let right = [];
    for(let i = 0; i < len; i++) {
        if(arr[i] < pivot) left.push(arr[i]);
        if(arr[i] > pivot) right.push(arr[i]);
    }
    return quickSort(left).concat([pivot], quickSort(right));
}