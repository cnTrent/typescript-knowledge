// Ts的高级类型Extract:顾名思义就是提取的意思，作用就是传入两个泛型参数满足约束条件，则返回第一个泛型，不满足则不返回never
type Extract<T, U> = T extends U ? T : never

export {}
