let p1 = () => new Promise(resolve => setTimeout(resolve, 100, 'p1'));
let p2 = () => new Promise(resolve => setTimeout(resolve, 100, 'p2'));


p1()
    .then(() => {
        return p2();
    })
    .then(r => console.log('log1', r));


p1()
    .then(() => {
        p2();
    })
    .then(r => console.log('log2', r));


p1()
    .then(p2())
    .then(r => console.log('log3', r));


p1()
    .then(p2)
    .then(r => console.log('log4', r));


// 思考以上代码打印结果, 然后呢, why, 解释说明（文字、代码）

