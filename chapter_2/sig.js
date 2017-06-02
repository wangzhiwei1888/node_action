// 对 POSIX 信号添加一个监听器
process.stdin.resume();
process.on('SIGHUP', () => {
    console.log('Reloading configuration...');
});
console.log('PID:', process.pid);