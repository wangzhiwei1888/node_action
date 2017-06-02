setImmediate(() => {console.log('setImmediate')}); //2
setInterval(() => {console.log('setInterval')},16);//3
setTimeout(() => {console.log('setTimeout')},16);  //4
process.nextTick(() => {console.log('nextTick')}); //1



setImmediate(() => {console.log('setImmediate')}); //4
setInterval(() => {console.log('setInterval')},0); //2
setTimeout(() => {console.log('setTimeout')},0);   //3
process.nextTick(() => {console.log('nextTick')}); //1