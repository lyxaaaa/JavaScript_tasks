// 对字符串进行字符去重
function duplicateRemoval(inputStr) {
    let len = inputStr.length;
    if(len < 2) return inputStr;
    let inputArr = inputStr.split('');
    let map = {};
    for(let i = 0; i < len; i++) {
        if(!map[inputArr[i]]) map[inputArr[i]] = 1;
        else {
            for(let j = i + 1; j < len; j++) {
                inputArr[j - 1] = inputArr[j];
            }
            len--;
            i--;
        }
    }
    let result = [];
    for(let i = 0; i < len; i++) result.push(inputArr[i]);
    inputStr = result.join('');
    return inputStr;
}