import { readTxt } from "../utils/index.js";

const data = readTxt('index.txt').join(',').split(',');

// 80 days
function part1() {
  const fishes = [...data];
  let length = fishes.length
  for (let day = 0; day < 80; day++) {
    length = fishes.length

    for (let i = 0; i < length; i++) {
      let fish = fishes[i];
      fishes[i] = fish - 1;
      if (fishes[i] < 0) {
        fishes.push(8)
        fishes[i] = 6
      }
    }
  }
  return fishes.length
}
// 345793 CHECK
// console.log(part1())


function part2() {
  let fishes = [...data].reduce((acc, curr) => {
    acc[+curr] = acc[+curr] + 1 || 1
    return acc
  }, {});

  for (let day = 0; day < 256; day++) {
    fishes = Object.entries(fishes).reduce((acc, [key, value]) => {
      if (key == 0) {
        acc[6] = value
        acc[8] = value
      } else {
        acc[key - 1] ? (acc[key - 1] += value) : acc[key - 1] = value
      }
      return acc
    }, {})
  }

  return Object.values(fishes).reduce((acc, curr) => acc += curr, 0)
}

// 1288490188800 X (too low)
// 2576980377600 X (too high)
// 1572643095893 CHECK
console.log(part2())
