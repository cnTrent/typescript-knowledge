// 泛型约束成立的条件有三种场景
// 第一种：两个函数类型的泛型约束，条件成立的前提是，函数参数个数少的约束参数个数多的且参数类型相同且函数返回值类型一致
// 第二种： 联合类型的泛型约束，成立的条件是前一个联合类型是后一个联合类型的子类型或者两个联合类型相同
// 第三种：类或者对象类型，成立的前提是对象类型多的约束对象类型少的

// 例子：函数类型的约束
type ExtendsFun1 = (val: string) => string
type ExtendsFun2 = (val: string, data: number) => string
type test = ExtendsFun1 extends ExtendsFun2 ? 'true' : 'false' // type test = "true"
type test1 = ExtendsFun2 extends ExtendsFun1 ? 'true' : 'false' // type test1 = "false"


// 例子：联合类型的约束
type UniteType1 = 'string' | 'number' // 这种写法是一个值类型 跟直接写 string | number 是有区别的
type UniteType2 = 'string' | 'number' | 'symbol'
type ExtendsUnite = UniteType1 extends UniteType2 ? 'true' : 'false' // type ExtendsUnite = "true"  UniteType1 是 UniteType2的子类型
type ExtendsUnite1 = UniteType2 extends UniteType1 ? 'true' : 'false' // type ExtendsUnite1 = "false" UniteType2 不是 UniteType1的子类型

// 例子：类或者对象类型【类有两种表示：一种可以当成对象变量，即构造函数的对象变量，一种当成一种对象类型】
type TestType = {
  name: string;
  age: number
}
interface TestType1 {
  phone: number;
  age: number
  name: string;
}
type ExtendsObject = TestType extends TestType1 ? 'true' : 'false' // type ExtendsObject = "false" 
type ExtendsObject1 = TestType1 extends TestType ? 'true' : 'false' // type ExtendsObject1 = "true"




export {}