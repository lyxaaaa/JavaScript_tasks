/*
实现一个 HardMan:
HardMan(“jack”) 输出:
I am jack

HardMan(“jack”).rest(10).learn(“computer”) 输出
I am jack
//等待10秒
Start learning after 10 seconds
Learning computer

HardMan(“jack”).restFirst(5).learn(“chinese”) 输出
//等待5秒
Start learning after 5 seconds
I am jack
Learning chinese
*/
class _Hardman {
    constructor(name) {
        //用数组来模拟队列,数组中的元素都是函数
        this.tasks = [];
        setTimeout(() => this.next());
        this.tasks.push(() => {
            console.log(`I am ${name}`);
            this.next();
        })
    }

    next() {
        //从队列里面推出一个任务
        let task = this.tasks.shift();
        //如果存在这个函数，则执行
        task && task();
    }

    //将等待xx秒和打印等待后的信息 拆分为两个函数
    wait(delay) {
        console.log(`//等待${delay}秒`)
        this.next();
    }

    waitPrint(delay) {
        setTimeout(() => {
            console.log(`Start learning after ${delay} seconds`);
        }, delay * 1000);
        this.next();
    }

    rest(delay) {
        // wait waitPrint
        this.tasks.push(this.wait(delay));
        this.tasks.push(this.waitPrint(delay));
        return this;
    }

    restFirst(delay) {
        //最早执行的任务  我们可以使用unshift，移动到队列的开头
        this.tasks.unshift(this.wait(delay));
        this.tasks.unshift(this.waitPrint(delay));
        return this;
    }

    learn(stuff) {
        console.log(`Learning ${stuff}`);
        this.next();
        return this;
    }
}

let HardMan = function (name) {
    return new _Hardman(name)
};

HardMan("jack").rest(10).learn("computer");
HardMan("jack").restFirst(5).learn("chinese");
