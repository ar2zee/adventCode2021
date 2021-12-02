import { readTxt } from "../utils/index.js";


const data = readTxt('index.txt');

// 1446
function part1() {
  let counter = 0;

  for (let index = 0; index < data.length; index++) {
    const element = data[index];

    if (element < data[index + 1]) {
      counter += 1
    }

  }

  return counter;
}
// console.log(part1())

function part2() {
  let counter = 0;
  let newArr = [];


  for (let index = 0; index < data.length; index++) {
    const first = data[index];
    const second = data[index + 1]
    const third = data[index + 2]
    if (!second || !third) break
    const sum1 = first + second + third
    newArr.push(sum1)

  }

  for (let index = 0; index < newArr.length; index++) {
    const element = newArr[index];
    if (element < newArr[index + 1]) {
      counter += 1
    }
  }
  return counter
}

// console.log(part2());
