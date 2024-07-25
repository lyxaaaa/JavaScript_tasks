//防抖：在高频触发事件中，只看最后一次
function debounce(fn, delay) {
    let timer = null;
    return function() {
        let context = this;
        let args = arguments;
        if(timer) clearTimeout(timer);           
        timer = setTimeout(() => {
            fn.call(context, args);
        }, delay);  
    }
}

//节流：在高频触发事件中，只看第一次
function throttle(fn, delay) {
    let timer = null;
    return function() {
        let context = this;
        let args = arguments;
        if(!timer) {
            timer = setTimeout(() => {
                fn.call(context, args);
                timer = null;
            }, delay);
        }
    }
}