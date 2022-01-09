// Exclude<T, U>: 顾名思义就是排除的意思，即如果约束条件成立的话，则不返回，约束条件不成立的话则返回T
type Exclude<T, U> = T extends U ? never : T // 就是跟Extract相反，Extract符合返回，Exclude符合不返回，不符合返回

interface customer {
  name: string;
  age: number;
  phone: number
}
interface order {
  id: number;
  name: string;
  age: number
}
// keyof: 获取接口类型或者对象类型，或者类三种的属性名的联合类型
// 获取出 customer 里面order没有的属性key【Exclude使用场景，一般都是或者某一个接口类型上没有的属性】
type NotCustomer = Exclude<keyof customer, keyof order> // type NotCustomer = "phone"

export {}