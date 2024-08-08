/* 
Cat需要继承Animal,需要实现5种继承方式，分别是:
1、原型继承，思路:将父类的实例作为子类的原型
2、构造继承，思路:使用父类的构造器来增强了类实例
3、实例继承，思路:为父类实例添加新特性，作为子类实例返回
4、组合继承（结合原型链继承和借用构造函数继承组合起来实现的继承)思路:通过父类构造，继承父类的属性并保留传参，然后通过将父类实例作为子类原型，实现函数复用
5、寄生组合继承（结合原型链继承和构造函数继承的方法同时自己创建一个对象,并且让这个对象的原型指向父类构造函数的prototype.实现寄生组合继承)
*/

//原型继承
function Animal(name) {
    this.name = name || 'Animal';
    this.sleep = function() {
        console.log(this.name + '正在睡觉！');
    }
}
Animal.prototype.eat = function(food) {
    console.log(this.name + '正在吃：' + food);
}
function Cat() {}
Cat.prototype = new Animal();

// 构造原型
function Animal(name) {
    this.name = name || 'Animal';
    this.sleep = function() {
        console.log(this.name + '正在睡觉！');
    }
}
Animal.prototype.eat = function(food) {
    console.log(this.name + '正在吃：' + food);
}
function Cat(name) {
    Animal.call(this, name);
}

// 实例继承
function Animal(name) {
    this.name = name || 'Animal';
    this.sleep = function() {
        console.log(this.name + '正在睡觉！');
    }
}
Animal.prototype.eat = function(food) {
    console.log(this.name + '正在吃：' + food);
}
let obj = new Animal();
obj.sayHello = function(name) {
    console.log(`Hello , my name is ${name}`);
}
function Cat() {}
Cat.prototype = obj;

// 组合继承
function Animal(name) {
    this.name = name || 'Animal';
    this.sleep = function() {
        console.log(this.name + '正在睡觉！');
    }
}
Animal.prototype.eat = function(food) {
    console.log(this.name + '正在吃：' + food);
}
function Cat(name) {
    Animal.call(this, name);
}
Cat.prototype = new Animal();

// 寄生组合继承
function Animal(name) {
    this.name = name || 'Animal';
    this.sleep = function() {
        console.log(this.name + '正在睡觉！');
    }
}
Animal.prototype.eat = function(food) {
    console.log(this.name + '正在吃：' + food);
}
let obj = {};
obj.prototype = Animal.prototype;
function Cat(name) {
    Animal.call(this, name);
}
Cat.prototype = obj;