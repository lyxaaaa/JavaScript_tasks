class Person {
    constructor() {
        this._age = 10;
    }
    set age(newAge) {
        this._age = newAge;
    }
    get age() {
        return this._age
    }
}
let person = new Person();
person.age = 12;
console.log(person._age);
console.log(person.age);


async function foo() {
    let result = await Promise.resolve(1);
    console.log(result);

    if(result == 1) console.log('A');
    else console.log('B');

    console.log("C");
}
foo();
console.log("D")