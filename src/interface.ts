//* 用interface关键字定义了一个名为List的接口。此接口包括俩个成员 id和number id为number类型，name是string类型。

// * 例子1
interface List {
  id: number;
  name: string;
}

interface Result {
  data: List[]; //此接口成员的类型为List数组。
}
function render(result: Result) {
  result.data.forEach((val) => {
    console.log(val.id, val.name);
    // if (val.age) {
    //   console.log(val.age);
    // }
  });
}
let result = {
  data: [
    { id: 1, name: "a" },
    { id: 2, name: "b" },
    //在实际开发中，后端数据总是会发过来很多多余的字段。会发现ts并不会报错。
    //这是因为ts采用鸭式辨型法，一个比较形象的说法是。一只鸟，如果叫起来像鸭子、游起来像鸭子。那么我们就可以认为这只鸟是一只鸭子。
    { id: 3, name: "c", sex: "male" }, //鸭式辨型法 ts只要传入的对象满足接口的必要条件。那么就是被允许的。但是下面例子2中函数中传入字面量对象的话。
  ],
};
render(result);

// * 例子2
// render({
//   data: [
//     { id: 1, name: "a" },
//     { id: 2, name: "b" },
//     {id:3,name:'c',sex:'male'} //ts就会对额外的字段进行类型检查
//   ],
// });
//当然我们可以绕过这个类型检查 ：
// 1.就是上面的方法。 将对象字面量赋值给一个变量。方法再调用这个变量
// 2.第二种方式就是使用类型断言（有下面俩种方式，但是）
// 1）第二种断言方法
render({
  data: [
    { id: 1, name: "a" },
    { id: 2, name: "b" },
    { id: 3, name: "c", sex: "male" }, //ts就会对额外的字段进行类型检查
  ],
} as Result); //类型断言的意思就是我们要明确的告诉编译器知道这个对象的类型就是Result类型。
// 2）第二种断言方法 ，不推荐。会和react中语法产生歧义。
render(<Result>{
  data: [
    { id: 1, name: "a" },
    { id: 2, name: "b" },
    { id: 3, name: "c", sex: "male" }, //ts就会对额外的字段进行类型检查
  ],
});
// 3.第三种方式是使用一个字符串索引签名
// interface List {
//   id: number;
//   name: string;
//   [x:string]:any  //这就是一个字符串索引签名。他的含义是用任意的字符串去索引List会得到任意的结果。 这样List就支持多个属性了。
// }

//* 接口成员的一些属性
// interface List {
//   readonly id: number; //只读属性
//   name: string;
//   age?:number //可选属性 。表示这个属性可有可无。这样render函数的逻辑判断中就不会报错了。
// }
// ------------------------- 以上接口类型的属性的个数都是固定的。当你不确定一个接口中有多少属性时，就可以使用可索引类型的接口。--------------------

// * 可索引类型的接口
// 可索引类型的接口可以用数字来索引，也可以用字符串来索引

// * 1)定义一个用数字来索引的接口

interface StringArray {
  [index: number]: string; //[index:number]这也叫做签名。 这就是一个数字类型签名 含义就是：任意一个数字去索引接口StringArray 就会得到一个字符串string
}
// 比如 这就相当于声明来一个字符串类型的数组。(是符合这个StringArray接口的)
let chars: StringArray = ["A", "B"];
let chars2: StringArray = {
  "2": "dd",
  3: "ee",
};
// * 2)定义一个用字符串来索引的接口

interface Names {
  [x: string]: string; //含义：用任意的字符串去索引Names就会得到一个字符串string
  // y:number; //上面声明过后我们就不能声明一个number类型的成员了
  // ! 另外俩种索引签名是可以混用的。比如我们在Names中再增加一个数字索引签名
  [z: number]: string; // !当混用时，要注意的是。数字索引类型的返回值类型必须是字符串索引类型的返回值的子集，这是因为js会进行类型转换，将number转成string。这样保证了类型的兼容性。
}
//如果像让字符串索引签名和数字索引签名都存在。数字索引标签的返回值是字符串索引标签的返回值的子集
interface Names2 {
  [x: string]: any;
  // y:number;
  [z: number]: number;
}

//* 函数类型接口

//* 1. 变量定义函数

let dd: (x: number, y: number) => number;  //实现方式 dd= (a, b) => a + b;
//* 2. 接口定义函数

// interface Add{
//   (x:number,y:number):number;
// }
//* 3. 类型别名定义函数  类型别名更为简洁 ，使用type关键字

type Add = (x: number, y: number) => number;

//* 👆 2,3只是对函数进行声明。我们还需要对其进行具体实现

let add: Add = (a, b) => a + b;

//* 混合接口  一个接口即可以定义为一个函数也可以像对象拥有属性和方法
interface Lib {
  (): void;
  version: string;
  dosomething(): void;
}

//* 👇实现一些上面的混合接口的定义

// let lib:Lib =()=>{};  //本身是一个函数
// lib.version = '1.0';
// lib.dosomething = () =>{};

//👆的情况会报错，此时我们就需要对其进行类型断言。 告诉赋值的函数 就是接口类型Lib👇

let lib: Lib = (() => {}) as Lib; //本身是一个函数
lib.version = "1.0";
lib.dosomething = () => {};

//👆的情况 lib只是一个全局的单例实现。 如果我们想创建多个时，就需要将其重新改写👇

function getLib() {
  let lib: Lib = (() => {}) as Lib; //本身是一个函数
  lib.version = "1.0";
  lib.dosomething = () => {};
  return lib;
}
let lib1 = getLib();
//这时候我们就可以使用其内部属性和方法了
console.log(lib1);
console.log(lib1.version);
console.log(lib1.dosomething());

//当然也可以多建
let lib2 = getLib();


// 👇提及四种函数声明的方式：

// function 声明方式
function add10(x:number,y:number){
  return x+y;
}

// 变量声明方式
let add11:(x:number,y:number)=>{};

// 类型别名声明方式
type add12 =(x:number,y:number)=>{};

//接口定义函数
interface add13{
    (x:number,y:number):number;
}

//* ts对于函数参数的要求

// 1. ts中对于形参和实惨需要一一对应  个数不能少。

// 2. 有些时候我们对于参数是可传可不传的。 这时候我们就用到了可选参数
function add5(x:number,y?:number){
  return y? x+y :x;
}
//这样y是可以不传的，
//! 注意可选参数必须位于必选参数之后,下面的就是错误的
// function add6(x:number,y?:number, z:number){
//   return y? x+y :x;
// }

//* 我们可以像es6一样为函数参数赋默认值
function add7(x:number,y= 0,z:number){}
//必选参数之前的参数调用时必须传上
add7(1,undefined,2);
//* 必选参数之后的参数默认值是可以不传的。
function add8(x:number,y= 0,z:number,q=1){}
add8(1,undefined,2);

//👆参数个数都是固定的，对于参数不固定时，我们可以使用剩余参数

function add9(x:number,...rest:number[]){
  return x + rest.reduce((pre,cur)=> pre+cur);
}
add9(1,2,3,4,5);

//*函数重载
//在静态类型语言中，比如java，c++ 都含有函数重载的概念。函数重载的含义是：如果俩个函数函数名相同，函数参数个数或类型不同则实现了一个函数重载。
//好处： 不需要为相似功能的函数，选用不同的函数名称，这样提高了函数的可读性。
//* 在ts中函数重载的定义有些不同。
//ts的函数重载要求我们定义一系列的函数名称相同的函数声明。
function add10a(...rest:number[]):number;
function add10a(...rest:string[]):string;
//然后ts要求我们在一个类型最宽泛的版本中实现这个重载。 下面有一个需求，当参数类型是number时返回参数之和，当参数类型为string时返回字符串的拼接。
//前两条声明是重载，目的是将参数类型约束为 number 或 string；最后的实现不是重载，要遵循前面的声明
function add10a(...rest:any[]):any{
  let first = rest[0];
  if(typeof first === 'string'){
    return rest.join('')
  }
  if(typeof first === 'number'){
    return rest.reduce((pre,cur)=>pre+cur);
  }
  if (typeof first === 'undefined') { //any类型时允许不传参数的
    throw new Error('No param')
}
}
console.log(add10a(1,2,3)); // 6
console.log(add10a('a','b','c'));


//!  ts编译器在处理重载的时候会查询一个重载的列表，也就是我们上面定义的列表，如果第一个匹配就使用这个函数定义，如果不匹配这继续匹配，所以我们要尽量将容易匹配的声明放在前面。