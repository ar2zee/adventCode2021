import fs from 'fs';

export function readTxt(path = 'index.txt', separator = '\n') {
  try {
    const data = fs.readFileSync(path, 'utf8');
    return data.trim().split(separator)
  } catch (e) {
    console.log('Error:', e.stack);
  }
}


