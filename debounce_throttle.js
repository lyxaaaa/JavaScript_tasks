// 核心区别：防抖指事件被触发后，等待一段时间再执行；节流指事件被多次触发后，只执行第一次。

// 防抖 debounce
// 防抖: n 秒后再执行该事件，若在 n 秒内被重复触发，则重新计时
function debounce(func, delay) {
    let timer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    }
}

const debouncedFunc = debounce(name => console.log(`my name is ${name}`), 1000);
debouncedFunc('harper'); 
debouncedFunc('alex'); 
debouncedFunc('jordan'); // 生效

// 节流 throttle
// 节流: n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效
function throttle(func, delay) {
    let inThrottle;
    return function() {
        const context = this;
        const args = arguments;
        if(!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, delay);
        }
    }
}

const throttledFunc = throttle(name => console.log(`${name}, it's ${new Date()}`), 2000);
throttledFunc('harper'); // 生效
throttledFunc('alex'); 
throttledFunc('jordan'); 