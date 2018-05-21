'use strict';

const os = require('os');
console.log(os.endianness());

let buf1 = new Buffer('hello world');
console.log(buf1);
buf1[1] = 0x66;
console.log(buf1);
console.log(buf1.toString());
console.log(buf1.readUInt32LE(4));
console.log(buf1[5].toString(16));
