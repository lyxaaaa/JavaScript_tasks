// 爬楼梯，求几种方法爬到楼顶（一次爬1 or 2台阶）
function climStairs(n) {
    // 爬n阶楼梯 = n - 1阶 + n - 2阶
    if(n === 1) return 1;
    if(n === 2) return 2;
    return climStairs(n - 1) + climStairs(n - 2);
}