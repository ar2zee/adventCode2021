import { readTxt } from "../utils/index.js";


const data = readTxt('index.txt').join(',').split(',');

function part1() {
  const sortedData = data.sort((a, b) => a - b)
  const middle = sortedData[Math.floor(sortedData.length / 2)];

  let fuelSpend = 0;

  for (let i = 0; i < data.length; i++) {
    let position = +data[i];

    while (position != middle) {
      +data[i] > +middle ? position-- : position++
      fuelSpend++
    }
  }

  return fuelSpend
}

// 427021 X (too high)
// 349357 CHECK
// console.log(part1())

function part2() {
  const [min, max] = [Math.min(...data), Math.max(...data)];

  let minValue = Number.MAX_SAFE_INTEGER

  for (let position = min; position < max; position++) {
    const newArray = data
      .map(val => Math.abs(val - position))
      .map(val => {
        return val * (val + 1) / 2
      })
    const pValue = newArray.reduce((acc, curr) => acc += curr, 0)

    if (pValue < minValue)
      minValue = pValue
  }

  return minValue
}

// 18506 X (too low)
// 96708215 X (too high)
// 96753334 X (too high)
// 96898519 X (too HIGH)
// 96708205 CHECK
console.log(part2())

