import { readTxt } from "../utils/index.js";


const data = readTxt('index.txt');

// const part1 = (input) => {
//   const gamma = [];
//   const epsilon = [];

//   const threshold = input.length / 2;
//   for (let i = 0; i < input[0].length; i++) {
//     const ones = input.reduce((acc, line) => acc + (line[i] === '1' ? 1 : 0), 0);
//     console.log(ones, threshold)
//     const isGammaOne = ones > threshold;
//     gamma.push(isGammaOne ? '1' : '0');
//     epsilon.push(isGammaOne ? '0' : '1');
//   }

//   return parseInt(gamma.join(''), 2) * parseInt(epsilon.join(''), 2);
// };


// 3895776
function part1() {
  let obj = {}

  function findBitNumber(obj, mostBit) {
    return parseInt(Object.values(obj).reduce((acc, val) => {
      const zero = val.filter(v => v === '0')
      const one = val.filter(v => v === '1')
      return acc += mostBit ? Number(zero.length > one.length) : Number(zero.length < one.length)
    }, ''), 2)
  }

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      obj = { ...obj, [j]: [...(obj[j] || []), data[i][j]] }
    }
  }

  return findBitNumber(obj, true) * findBitNumber(obj, false)
}
// console.log(part1())

function part2() {
  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  function clearArr({ arr, match, position, row, char, length }) {
    arr = arr.filter(val => {
      return val[position] === match
    })
    row = 0
    char += 1
    length = arr.length
    return { arr, row, char, length }
  }

  function findNumberInList(array, isLookingForOnes) {
    let row = 0, char = 0, arr = array, length = array.length;
    let obj = { '0': 0, '1': 0 }
    while (length > 1) {
      if (arr[row][char] === '0') obj['0']++
      if (arr[row][char] === '1') obj['1']++

      row++
      if (row >= length) {
        let max = isLookingForOnes ? Math.max(obj['0'], obj['1']) : Math.min(obj['0'], obj['1'])
        let bitToKeep = obj['0'] === obj['1'] ? '1' : getKeyByValue(obj, max)
        if (!isLookingForOnes) {
          bitToKeep = obj['0'] === obj['1'] ? '0' : getKeyByValue(obj, max)
        }
        obj = { '0': 0, '1': 0 }
        const { arr: newArr, row: newRow, char: newChar, length: newLegth } = clearArr({ arr, match: bitToKeep, position: char, row, char })

        arr = newArr
        row = newRow
        char = newChar
        length = newLegth
      }
    }
    return parseInt(arr.join(''), 2)
  }

  return findNumberInList(data, true) * findNumberInList(data, false)
}

// 7928162 :CHECK:
console.log('b:', part2())
