// 寻找第n个质数
function findNPrime(n) {
    if(n < 1) return -1;
    let res = 1;
    while(n) {
        res++;
        if(isPrime(res)) n--;
    }
    return res;
}

// 判断是否为质数
function isPrime(num) {
    if(num < 2) return false;
    if (num === 2 || num === 3) return true;
    if(num % 2 === 0 || num % 3 === 0) return false;
    for(let i = 5; i * i <= num; i += 6) {
        if(num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

console.log(findNPrime(10)); // 29