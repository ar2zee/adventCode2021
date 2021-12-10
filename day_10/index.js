import { readTxt } from "../utils/index.js";


const data = readTxt('index.txt');

const scoreMap = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

const openings = ['(', '{', '<', '[']
const closings = [')', '}', '>', ']']

function part1() {
  const illigalChar = []
  let stack = [];

  for (let i = 0; i < data.length; i++) {
    const line = data[i];

    for (let j = 0; j < line.length; j++) {
      const char = line[j];

      if (openings.includes(char)) {
        stack.push(char)
        continue
      }

      if (closings.includes(char)) {
        const item = stack.pop()
        const itemIndex = openings.findIndex(val => val === item);
        if (itemIndex !== closings.findIndex(val => val === char)) {
          illigalChar.push(char)
          stack = []
          break
        }
      }
    }
  }

  return illigalChar.map(char => scoreMap[char]).reduce((acc, curr) => acc += curr, 0)
}
console.log(part1())

const scoreMapAutoComplete = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}

function part2() {
  const completeLines = []
  let stack = [];

  for (let i = 0; i < data.length; i++) {
    const line = data[i];

    for (let j = 0; j < line.length; j++) {
      const char = line[j];

      if (openings.includes(char)) {
        stack.push(char)
        continue
      }

      if (closings.includes(char)) {
        const item = stack.pop()
        const openItemIndex = openings.findIndex(val => val === item);
        const closedItemIndex = closings.findIndex(val => val === char)
        if (openItemIndex !== closedItemIndex) {
          stack = []
          break
        }
      }

    }
    if (stack.length > 0) {
      const compleStack = stack.map(x => {
        const openItemIndex = openings.findIndex(val => val === x);
        const closedItem = closings[openItemIndex]
        return closedItem
      }).reverse()
      completeLines.push(compleStack)
      stack = []
    }
  }


  const sortedArray = completeLines
    .reduce((acc, curr) => {
      acc.push(curr.reduce((sum, char) => {
        sum = sum * 5 + scoreMapAutoComplete[char]
        return sum
      }, 0))
      return acc
    }, []).sort((a, b) => a - b)

  return sortedArray[Math.floor(sortedArray.length / 2)];
}


console.log(part2())
