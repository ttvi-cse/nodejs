const buf1 = Buffer.alloc(10);
const buf2 = Buffer.alloc(10, 1);
const buf = Buffer.from("hello world', 'ascii');
console.log(buf.toString('hex'));
console.log(buf.toString('base64'));
// Buffers and TypedArray
const arr = new Uint16Array(2);
arr[0] = 5000;
arr[1] = 4000;

// conpies the contents of `arr`
const buf1 = Buffer.from(arr);
// shares memory with `arr`
const buf2 = Buffer.from(arr.buffer);

console.log(buf1);
console.log(buf2);
arr[1] = 6000;
console.log(buf1);
