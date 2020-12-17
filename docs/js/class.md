# es6 的class

### 定义在constructor内的方法和constructor外的方法有什么区别

```javascript
/* A类，show方法写在constructor里面 */
class A{
  constructor(){
    this.show = function (){
      console.log( 'A show' )
    }
  }
}

const a = new A()
a.show() // => A show

/* B类，show方法写在constructor外面 */
class B{
  constructor(){
  }
  show(){
    console.log( 'B show' )
  }
}

const b = new B()
b.show()  // => B show
```

**一个是实例方法，一个是原型方法**。实例方法【写在 constructor 内部的方法】在使用new 关键字实例化的实话，new的内部实现上会改变this指向，所以**每个实例上的show方法肯定不一样，而原型上的方法是指向同一个引用**：

```javascript
const a1 = new A();
const a2 = new A();
console.log(a1.show === a2.show);// false

const b1 = new B();
const b2 = new B();
console.log(b1.show === b2.show);// true
```

换成 es5 就好理解了

```javascript
// 写在里面相当于：
function A(){
    this.show = function(){}
}

// 写在外面相当于：
function A(){...}
A.prototype.show = function(){}
```

