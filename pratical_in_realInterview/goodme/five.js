// 节流
const throttle = (fn, wait) => {
    let inThrottle;
    return function(...args) {
        if(inThrottle) return;
        let that = this;
        inThrottle = true;
        setTimeout(() => {
            fn.apply(that, args);
            inThrottle = false;
        }, wait);
    }
}