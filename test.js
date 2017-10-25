const libs = require('./index');

const testArr = ['45', '46', 'CB', '00', '00', '37', '07', '00', 'E0', '07', '05', '08', '09', '36', '32'];

console.log(libs.gen2BytesCrcLittleEndian(testArr));
