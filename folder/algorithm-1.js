//算法:一个数组里有一堆数字，拼接得到一个最大的数字
function getMaxNumber(arr) {
    //先转成字符数组
    let arrString = arr.map(String);
    //降序排列
    arrString.sort((a, b) => (b+a) - (a+b));
    //若最大的为0，则返回0
    if(arrString[0] === '0') return 0;
    return Number(arrString.join(''));
}
console.log(getMaxNumber([3, 30, 34, 5, 9]))


//注意： 对于sort函数，返回正数，则交换；返回负数，不交换；返回0，相等
let strNums = [3, 30, 34, 5, 9]
strNums = strNums.map(String)
strNums.sort((a, b) => (b + a) - (a + b));
console.log(strNums) //[ '9', '5', '34', '3', '30' ]


//合并区间
var merge = function(intervals) {
    //按照起始位置升序排列
    intervals.sort((a, b) => a[0] - b[0]);
    let result = [intervals[0]];
    for(let i = 0; i < intervals.length; i++) {
        let interval = intervals[i];
        if(interval[0] <= result[result.length - 1][1]) {
            result[result.length - 1][1] = Math.max(interval[1], result[result.length - 1][1]);
        }
        else {
            result.push(interval);
        }
    }
    return result;
};