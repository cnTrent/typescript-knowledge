// Ts的高级类型Extract:顾名思义就是提取的意思，作用就是传入两个泛型参数满足约束条件，则返回第一个泛型，不满足则不返回never
type Extract<T, U> = T extends U ? T : never

// Extract类型：要了解这个类型之前得先知道泛型约束extends成立的条件【查看infer文件夹上的泛型约束成立条件】
// 两个函数类型的泛型约束，条件成立的逻辑必须返回值相同，函数类型参数相同或者返回值相同函数参数少的约束函数参数多的才能成立【函数类型的约束】
type fun1 = (val: string, val1: number) => string
type fun2 = (val: string) => string
type extractFun = Extract<fun1, fun2> // type extractFun = never 【函数类型返回值相同，参数是多约束少条件不成立】
type extractFun1 = Extract<fun2, fun1> // type extractFun1 = (val: string) => string【函数类型返回值相同，参数是少约束多条件成立，返回fun2】

// 类或者对象类型泛型约束条件成立的逻辑是：T extends U => U 的类型上在T中都必须要有的即T类型要多于或者等于U上 【子类与父类or对象类型】
class parent {
  constructor(public name: string) {}
}
class child extends parent {
  constructor(public age: string, name: string) {
    super(name)
  }
}
type extract<T, U> = T extends U ? T : never

type test = extract<child, parent>  // type test = child
type test1 = extract<parent, child> // type test1 = never
// 泛型联合类型约束，在编译过程中会把前一个约束条件的联合类型按个拆出来跟后一个对比，条件成立则返回前一个类型【联合类型】
// Extract

// [综合使用场景]
// 在使用泛型约束的时候可以使用这个高级类型【有一个类型约束只能传递某一个类型就可以使用】
// 常规写法
type ExtractConventional<T extends string> = (val: T) => void // 直接在泛型参数上就进行约束

type ExtractFun<T> = (val: Extract<T, string>) => void // 函数类型的参数类型约束只能传递string类型【在函数参数上使用extract进行约束，不满足约束条件会返回never】
let extract: ExtractFun<string> = function(val) {} // extract => 函数的参数类型必须使用string，如果给其他类型，经过extract推导就是参数类型就是never
extract(99) // 没有给函数泛型传递参数，会进行根据函数参数类型的值当作值类型【值类型如果是数字给到number，约束条件是成立的，因为数字的值类型就是number的子类型】反向推到类型 类型“number”的参数不能赋给类型“string”的参数。ts(2345)

function teste<T>(val: Extract<T, string>) {}
teste<number>('99') // 类型“string”的参数不能赋给类型“never”的参数。ts(2345) [因为把number传递进去泛型参数类型，推导出来的函数类型就是never类型，传递进去的string不符合]
teste('99') // function teste<"99">(val: "99"): void // 相当于把值类型‘99’给进去做泛型参数T，'99' extends string 是成立的，因为字符串值就是string类型的子类型
teste<string>('99') // 这种是在编译期间根据传递进去的泛型参数为string类型，推导出来函数的参数类型为string类型


// 例子：两个联合类型受用extract时，会把泛型参数第一个的联合类型按个解构出来，跟第二个对比
type Unite1 = 'name' | 'age' | 'xxx'
type Unite2 = 'name' | 'age' | 'phone'
type People = Extract<Unite1, Unite2> // type People = "name" | "age"



export {}
