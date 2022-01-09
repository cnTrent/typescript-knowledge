// 【infer】:表示在extends条件语句中以占位符出现的用来修饰数据类型的关键字，被修饰的数据类型等到使用时才能被推断出来【主要是出现在函数类型上的，用在获取函数类型的返回值类型或者参数类型上出来使用】
// infer出现的位置
//【infer出现在条件语句的extends语句的函数类型的参数类型上】
//【infer出现在条件语句extends语句的函数类型的返回值类型上】
// 【会出现在类型的泛型具体化类型上】

// 学会这个之前，必须了解一个知识点就是泛型约束成立的条件
// 泛型约束成立的条件有三种场景
// 第一种：两个函数类型的泛型约束，条件成立的前提是，函数参数个数少的约束参数个数多的且参数类型相同且函数返回值类型一致
// 第二种： 联合类型的泛型约束，成立的条件是前一个联合类型是后一个联合类型的子类型或者两个联合类型相同
// 第三种：类或者对象类型，成立的前提是对象类型多的约束对象类型少的
// 以上可以查看【以上可以查看泛型约束成立的条件】


// 例子：出现在泛型约束条件extends语句的函数类型的参数类型上
type inferType<T> = T extends (params: infer P) => any ? P : T // 意思是传入的函数类型T满足泛型约束条件(params: infer P) => any 则条件成立 [infer P,infer是一个占位符，条件成立的时候取出函数类型的参数类型出来把它给到P]，即获取出传入的T中啊函数的参数的类型处理啊就是P类型
interface fun { // 使用接口写法写函数类型
  (params: number): boolean
}
type fun1 = (params: string) => number // 使用type写法写同一个函数类型
let aa: inferType<fun> // 传入的类型跟extends后的语句成立，则P的类型就是泛型参数的函数类型的参数类型 let aa: number
let aa1: inferType<fun1> // 传入的类型跟extends后的语句成立，则P的类型就是泛型参数的函数类型的参数类型 let aa1: string
let bb: inferType<boolean> // 换入的类型跟extends后的语句不成立，则直接返回传入的泛型参数类型 let bb: boolean

//例子 infer出现在条件语句extends语句的函数类型的返回值类型上
type inferTypeOne<T> = T extends (params: any) => infer P ? P : T
let ss:inferTypeOne<string> // 传入的泛型参数是一个string，inferTypeOne泛型约束条件不成立，则直接返回传入的泛型参数类型string
let ss1:inferTypeOne<fun> // 条件成立直接获取函数类型的返回值类型，infer是用来占位符出现的用来修饰数据类型的关键字，被修饰的数据类型等到使用时才能被推断出来 // let ss1: boolean
let ss2:inferTypeOne<fun1> // 条件成立直接获取函数类型的返回值类型，infer是用来占位符出现的用来修饰数据类型的关键字，被修饰的数据类型等到使用时才能被推断出来 // let ss1: number

// 例子：infer可以获取函数类型的参数类型和返回值类型的场景上
type inferTypeThree<T> = T extends (params: infer U) => infer P ? P | U : T // 出现在函数的参数类型跟返回值类型的位置联合使用
let test:inferTypeThree<string> // let test: string
let test1:inferTypeThree<fun> // 因为泛型约束条件成立，则取出函数参数类型跟返回值类型 let test1: number | boolean

type TestType = {
  name: string;
  age: number
}
interface TestType1 {
  phone: number;
  age: number
}
interface TestFun {
  (params: TestType): TestType1
}
type inferTypeFive<T> = T extends (params: infer U) => infer P ? P & U : T // 出现在函数的参数类型跟返回值类型的位置联合使用
let test2:inferTypeThree<string> // let test: string
let test3:inferTypeFive<TestFun> // let test3: TestType1 & TestType
let ii:TestType1&TestType

//例子：会出现在类型的泛型具体化类型上【即只需要extend后的语句更泛型类型一致即可使用infer获取泛型参数类型出来使用，它只管传递过来的泛型参数类型，不管泛型接口里面的一些对象类型】
interface test<T> {}
let person = {
  name: 'fang',
  age: 99
}
type inferTest<T> = T extends test<infer P> ? P : T
let r:inferTest<string> // let r: string
let t:inferTest<test<typeof person>> //let t: {name: string; age: number}
let u: inferTest<test<number>> // let u: number {就是infer只需要获取泛型接口泛参数类型出来，有点类型于函数类型取infer的逻辑}

// 【使用场景，一般在需要获取函数类型的返回值类型或者函数类型的参数类型时或者获取泛型具体化类型上的类型，可以使用infer获取】
// 泛型可以出现在函数，类，接口，type上
// 【真实应用场景】
// 获取构造函数的参数类型
type constructorType = new (...args: any) => any // 函数类型使用new操作符，表示一种通用的构造函数类型
type constructorParamsType<T extends constructorType> = T extends new (...args: infer P) => any ? P : never // 通过infer获取构造函数的参数类型

class TestParams {
  constructor(public name: string) {
  }
}
let aaaaa:constructorParamsType<typeof TestParams> // let aaaaa: [name: string]，获取出来的是一个元组类型

// 使用工厂函数+infer获取构造函数的参数类型进行校验
type Constructor<T> = new (...args: any) => T // 这种泛型构造函数类型，可以获取一个类的返回值类型
type ClassType = Constructor<TestParams>

function createInstance<T, U extends constructorType>(constructor: Constructor<T>, ...args: constructorParamsType<U>) {
  return new constructor(args)
}
createInstance<TestParams, typeof TestParams>(TestParams, 9) // 类型“number”的参数不能赋给类型“string”的参数。ts(2345)
createInstance<TestParams, typeof TestParams>(TestParams, '9')

export {}