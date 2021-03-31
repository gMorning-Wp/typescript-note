//原始类型
const bool: boolean = true;
let num: number = 2;
let str: string = "abc";

//数组
let arr1: number[] = [1, 2, 3];
let arr2: (number | string)[] = [1, 2, 3, "ddd"];
let arr3: Array<number> = [1, 2, 3];
let arr4: Array<number | string> = ["ddd", 3, 4, 5, "e4e"];

//元组 更加严格的数组，每一位的类型和数组的位数都定义好了
let tuple1: [string];
// tuple1[0]='dddd';

let tuple2: [number, string, string] = [1, "s", "dd"];
tuple2[0] = 2;

//元组越界问题,tuple由于本身类型和位数都定好了。按道理是不允许使用push 方法的。但是当前是可以通过push方法推入数据，但是访问不到，此问题称之为元组越界 。允许 push 应该是一个TypeScript 的一个缺陷
tuple2.push("ddd"); //越界了
//函数
// let add1 =(x,y)=>x+y; //报错的原因要求我们来对参数做类型注解
let add2 = (x: any, y: any) => x + y; //这样就可以了

let add3 = (x: number, y: number) => x + y; //这样ts会进行类型推断来得到返回值的类型也是number

//对象
// let obj: object // 表示非原始类型(非string/boolean/number/symbol/null/undefined)
// let obj: Object // TypeScript定义的标准JavaScript Object接口(按ctr可查看)
// let obj: {} // 表示一个空对象类型
let obj1: object = { x: 1, y: 2 };

let obj: object = { x: 1, y: 2 }; //当前只是简单的定义obj是一个object类型的对象。并没有定义其具有哪些属性。正确的是我们应该定义其属性和类型
let obj2: { x: number; y: number } = { x: 1, y: 2 };
obj2["x"] = 2; //不会报错 这种方式绕过了类型检查，算是一种hack，还是建议为object指定明确的属性和类型。
// obj.x =2; //会报错

//Symbol 类型 ，表示定一个确定的类型
let s1: symbol = Symbol();
let s2 = Symbol();
console.log(s1 == s2); //俩者是不相等的

//undefinded ,null ,在js中我们可以通过void 0来快速获得undefined 这是因为undefined在js中不是保留字，其是可以任意被赋值的
// 可以为一个变量赋值为undefined和null ,但是一旦被赋值为undefined和null 就不能被赋值其他类型了 ，只能赋值为他本身。
let un: undefined = undefined;
let nu: null = null;
//其他类型的变量也是不能被赋值为null和undefined 。但是在ts的官方文档中 null 和undefined是任何类型的子类型，如果我们想这么做的话， 就可以将tsconfig.json中strictNullCheck设置为false；

//如果依旧想strictNullCheck为true的话 我们可以使用联合类型来解决上面的问题
let num1: number | null | undefined = 2;


//void 类型 表示没有任何返回值的类型
let noReturn = ()=>{};

//any 不指定一个变量的类型就是any类型，和js没有了区别，我们可以任意给他赋值 。如果不是特殊情况，我们不建议将变量设置为any类型，那样我们就失去了ts的意义
let x
x =1;
x =[];
x =()=>{};

//never 永远不会有返回值的类型 
// 1 函数抛出异常
let error = ()=>{
  throw new Error('error');
}
//2 死循环
let endless =()=>{
  while(true){}
}



