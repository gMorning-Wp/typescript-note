//类的基本实现
class Dog{
  constructor(name:string){//为构造函数的参数添加了类型注解  返回值是其本身
    this.name = name; //为成员属性进行初始化
  }
  name:string //为成员属性添加了类型注解
  age?:number
  run(){} // 返回值是void
}
//! 1.在此我们需要注意，无论是js还是ts 类的成员属性都是实例属性，而不是原型属性，类的成员方法都是原型方法。
//! 2.与es中不同的是成员属性必须具有初始值或者在构造函数中被初始化 上面的this.name = name即为初始化。
//! 3.针对于第二点我们也可以将成员属性设置为可选属性。这样就不需要赋初始值或者在构造函数中进行初始化。 上面的age属性
console.log(Dog.prototype) //会只有run方法和constructor

let dog = new Dog('wangwang');
console.log(dog);

//类的继承
// 定义一个dog的子类
class Husky extends Dog{
  constructor(name:string,color:string){
    //派生类的构造函数必须含有super调用
    super(name) // 就代表父类的实例， 父类中有一个参数name，子类中一定也要有
    this.color = color; //this一定要在super调用之后再调用
  }
  color:string  //也需要在构造函数中初始化

}
//类的成员修饰符  这是ts对js的类的扩展
class Cat{
  constructor(name:string){//为构造函数的参数添加了类型注解  返回值是其本身
    this.name = name; //为成员属性进行初始化
  }
  public name:string //为成员属性添加了类型注解
  private pri(){}
  protected pro(){}
  readonly legs:number = 4;
  run(){} // 返回值是void
  static food:string ='bones'
}
let cat  = new Cat('miaomiao');
// cat.pri()  //私有成员不能在实例中调用
// cat.pro()  //受保护成员不能在实例中被调用
console.log(Cat.food); //类的静态成员只能通过类名来调用
// cat.food //静态成员不能通过子类来调用
class Husky2 extends Cat{
  constructor(name:string,public color:string){
    //派生类的构造函数必须含有super调用
    super(name) // 就代表父类的实例， 父类中有一个参数name，子类中一定也要有
    this.color = color; //this一定要在super调用之后再调用
    // this.pri() //私有成员不能在子类中调用
    this.pro() //受保护成员是可以在子类中被调用的
    
  }
  
  // color:string  //也需要在构造函数中初始化
}
console.log(Husky2.food) // static 静态成员 是可以被子类来调用的

// * 1 public   公有成员  类的所有属性默认是public 含义：对所有成员都是可见的 当然我们可以显式的声明
// * 2  private 私有成员  只能被类的本身被调用，而不能被类的实例来调用，也不能被子类调用
    // * 可以为构造函数加上private 私有成员属性，private  constructor这个作用就是这个类既不能被实例化也不能被继承
// * 3 protected 受保护成员 只能在自身类或者子类中访问，而不能在类的实例中访问。
    // * 构造函数也能加上protected 受保护属性。 这个作用就是这个类只能被继承而不能被实例化，相当于声明了一个基类
// * 4 readOnly  只读属性 含义：这个属性是不能被更改的。 同样只读属性同成员属性一样，都需要被初始化。


// 除了类的成员可以添加修饰符外，构造函数的参数也可以添加修饰符。 其作用就是将参数自动变为了实例的属性，这样我们就能够省略在类中的定义了 如上面的color属性

// * 5 static 类的静态成员 只能通过类名来调用，不能通过子类来调用
