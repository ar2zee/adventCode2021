import { readTxt } from "../utils/index.js";


const data = readTxt('index.txt');

function buildData() {
  return data.map(coords => {
    const [start, end] = coords.split('->')
    const [x1, y1] = start.split(',')
    const [x2, y2] = end.split(',')
    return { x1: +x1, y1: +y1, x2: +x2, y2: +y2 }
  })
}


function part1() {
  const dataToUse = buildData().filter(({ x1, x2, y1, y2 }) => {
    return x1 === x2 || y1 === y2
  })
  const area = {}

  for (let i = 0; i < dataToUse.length; i++) {
    let { x1, x2, y1, y2 } = dataToUse[i];

    while (true) {
      if (x1 < x2) {
        area[`${x1}-${y1}`] = (area[`${x1}-${y1}`] + 1) || 1
        x1++
      }
      if (x1 > x2) {
        area[`${x1}-${y1}`] = (area[`${x1}-${y1}`] + 1) || 1
        x1--
      }
      if (y1 < y2) {
        area[`${x1}-${y1}`] = (area[`${x1}-${y1}`] + 1) || 1
        y1++
      }
      if (y1 > y2) {
        area[`${x1}-${y1}`] = (area[`${x1}-${y1}`] + 1) || 1
        y1--
      }

      if (`${x1}${y1}` === `${x2}${y2}`) {
        area[`${x1}-${y1}`] = (area[`${x1}-${y2}`] + 1) || 1
        break
      }
    }
  }

  return Object.values(area).filter(x => x > 1).length;
}
// 6511 X (too low)
// 6513 X (too low)
// 6548 CHECK
// console.log(part1())

function part2() {
  const dataToUse = buildData();
  const area = {}

  for (let i = 0; i < dataToUse.length; i++) {
    let { x1, x2, y1, y2 } = dataToUse[i];

    while (true) {
      if (x1 < x2 && y1 < y2) {
        area[`${x1}-${y1}`] = (area[`${x1}-${y1}`] + 1) || 1
        x1++
        y1++
      }
      else if (x1 > x2 && y1 < y2) {
        area[`${x1}-${y1}`] = (area[`${x1}-${y1}`] + 1) || 1
        x1--
        y1++
      }
      else if (x1 > x2 && y1 > y2) {
        area[`${x1}-${y1}`] = (area[`${x1}-${y1}`] + 1) || 1
        x1--
        y1--
      }
      else if (x1 < x2 && y1 > y2) {
        area[`${x1}-${y1}`] = (area[`${x1}-${y1}`] + 1) || 1
        x1++
        y1--
      }
      else if (x1 < x2) {
        area[`${x1}-${y1}`] = (area[`${x1}-${y1}`] + 1) || 1
        x1++
      } else if (x1 > x2) {
        area[`${x1}-${y1}`] = (area[`${x1}-${y1}`] + 1) || 1
        x1--
      } else if (y1 < y2) {
        area[`${x1}-${y1}`] = (area[`${x1}-${y1}`] + 1) || 1
        y1++
      } else if (y1 > y2) {
        area[`${x1}-${y1}`] = (area[`${x1}-${y1}`] + 1) || 1
        y1--
      }

      if (`${x1}${y1}` === `${x2}${y2}`) {
        area[`${x1}-${y2}`] = (area[`${x1}-${y2}`] + 1) || 1
        break
      }
    }
  }
  return Object.values(area).filter(x => x > 1).length;

}

// 31705 X (too high)
// 20878 X (too high)
// 19663 CHECK
console.log(part2())
