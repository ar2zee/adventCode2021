import fs from 'fs';

export function readTxt(path = 'index.txt', separator = '\n') {
  try {
    const data = fs.readFileSync(path, 'utf8');
    return transformToNumber(data.trim().split(separator))
  } catch (e) {
    console.log('Error:', e.stack);
  }
}

function transformToNumber(input) {
  return input.map(val => {
    if (!isNaN(val)) return +val
    return val
  })
}
