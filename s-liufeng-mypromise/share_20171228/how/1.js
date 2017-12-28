let p = new Promise((res, rej) => {
    setTimeout(() => {
        res(1)
    }, 3e3)
})
    .then(r => r + 1)
    .then(r => r + 2)
    .then(r => console.log(r))
    .catch(e => {
        console.log(e)
    });