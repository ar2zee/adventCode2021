import { readTxt } from "../utils/index.js";


const data = readTxt('index.txt');

function part2() {
  const { horizontal, depth } = data.reduce((acc, val) => {
    const [direction, amount] = val.split(' ');

    if (direction === 'forward') {
      acc.horizontal += +amount
      acc.depth += (acc.aim * +amount) // aim multiplied by X.
    }
    if (direction === 'up') {
      acc.aim -= +amount
    }
    if (direction === 'down') {
      acc.aim += +amount
    }
    return acc
  }, { depth: 0, horizontal: 0, aim: 0 })

  return horizontal * depth
}

console.log(part2())

function part1() {
  const { horizontal, depth } = data.reduce((acc, val) => {
    const [direction, amount] = val.split(' ');
    if (direction === 'forward') acc.horizontal += +amount
    if (direction === 'up') acc.depth -= +amount
    if (direction === 'down') acc.depth += +amount
    return acc
  }, { depth: 0, horizontal: 0 })

  return horizontal * depth
}

// console.log(part1())
