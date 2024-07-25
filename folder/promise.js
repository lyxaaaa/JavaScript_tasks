/*要手写实现Promise.all，我们需要以下步骤：

创建一个新的Promise对象，并返回它。
遍历传入的可迭代对象（通常是数组），对每个元素执行以下操作：
如果元素不是Promise对象，则使用Promise.resolve将其转换为Promise对象。
对每个Promise对象，等待其状态变为fulfilled，并收集解决的值。
如果所有Promise对象都成功解决，则使用resolve将所有收集到的解决值作为数组传递给新创建的Promise对象。
如果任何一个Promise对象被拒绝，则使用reject将该拒绝原因传递给新创建的Promise对象。*/
function WrappedPromiseAll(iteratorThing) {
    return new Promise((resolve, reject) => {
        let results = [];
        let mes = Array.from(iteratorThing);
        let completedCount = 0;

        if(mes.length === 0) {
            resolve(results);
            return;
        }

        mes.forEach((element, index) => {
            Promise.resolve(element)
                .then(res => {
                    results[index] = res;
                    completedCount++;
                    if(completedCount == mes.length) resolve(results);
                })
                .catch(error => reject(error));

        });
    })
}

//利用promise，实现隔1s输出1，隔2s输出2....直到10s输出10
function fn_sleep(delay) {
    return new Promise(resolve => {
        let timer = setTimeout(() => {
            console.log(delay);
            clearTimeout(timer);
            resolve();
        }, delay*1000);
    })
}

async function fn_log_wait(count) {
    for(let i = 1; i <= count; i++) await fn_sleep(i);
}
fn_log_wait(10);


function myPromiseAll(promises) {
    return new Promise((resolve, reject) => {
        
        let promisesArr = Array.from(promises);
        let promiseCompleted = 0;
        let promiseCount = promisesArr.length();
        let results = [];
        if(promisesArr.length === 0) {
            resolve(results);
            return;
        }
        
        promisesArr.map(itemPromise => {
            itemPromise = Promise.resolve(itemPromise).then(res => {
                promiseCompleted++;
                results.push(res);
                if(promiseCompleted === promiseCount) resolve(results);
            })
            .catch(error => reject(error));
        })
    })
}

