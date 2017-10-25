// Test cases: 
// 8 => '08'
// 128 => '80'
const intTo1ByteHex = function(number) {
  if (number >= (1 << 8)) return null;
  const toRet = Buffer.allocUnsafe(1);
  toRet.writeUInt8(number);
  return toRet.toString('hex');
};
module.exports.intTo1ByteHex = intTo1ByteHex;

// Test cases: 
// 128 => ['80', '00']
// 255 => ['ff', '00']
const intTo2BytesHexLittleEndian = function(number) {
  if (number >= (1 << 16)) return null;
  const toRet = Buffer.allocUnsafe(2);
  toRet.writeUInt16LE(number);
  return [intTo1ByteHex(toRet.readUInt8(0)), intTo1ByteHex(toRet.readUInt8(1))];
};
module.exports.intTo2BytesHexLittleEndian = intTo2BytesHexLittleEndian;

const intTo2BytesHexBigEndian = function(number) {
  if (number >= (1 << 16)) return null;
  const toRet = Buffer.allocUnsafe(2);
  toRet.writeUInt16BE(number);
  return [intTo1ByteHex(toRet.readUInt8(0)), intTo1ByteHex(toRet.readUInt8(1))];
};
module.exports.intTo2BytesHexLittleEndian = intTo2BytesHexLittleEndian;

// Test cases: 
// ['45', '46', 'CB', '00', '00', '37', '07', '00', 'E0', '07', '05', '08', '09', '36', '32'] => ['66', 'FB']
function updateCrc16(oldValue, currentUInt8) {
  let iteratedValue = (oldValue ^ currentUInt8);
  for (let i = 0; i < 8; i++) {
    if (iteratedValue & 1) {
      iteratedValue = (iteratedValue >> 1) ^ 0xa001;
    } else {
      iteratedValue = (iteratedValue >> 1);
    }
  }
  return iteratedValue;
}

module.exports.gen2BytesCrcLittleEndian = function(arrUint8) {
  let len = arrUint8.length;
  let iteratedValue = 0xffff;
  for (let k in arrUint8) {
    const currentUInt8 = parseInt(arrUint8[k], 16);
    iteratedValue = updateCrc16(iteratedValue, currentUInt8);
  }
  return intTo2BytesHexLittleEndian(iteratedValue);
};
