import { readTxt } from "../utils/index.js";


const data = readTxt('index.txt');

function buildBoards() {
  let increment = 0;
  return data.filter(Boolean).reduce((acc, row, i) => {
    acc = { ...acc, [increment]: [...(acc[increment] || []), row.split(' ').filter(Boolean)] }

    if (i !== 0 && (i + 1) % 5 === 0) {
      increment += 1
    }

    return acc
  }, {})
}

function calculateResult(board, lastNum) {
  return board.flat().filter(Boolean).reduce((acc, curr) => {
    acc += +curr
    return acc
  }, 0) * lastNum
}

function checkForWin(board, lastNum) {
  let counter = 0
  let row = 0, column = 0

  while (row < 5) {
    if (new Set(board[row]).size === 1) {
      return calculateResult(board, lastNum)
    }
    row++
  }

  row = 0
  while (column < 5) {
    if (board[row][column] === null) {
      counter++
    }

    if (counter === 5) {
      return calculateResult(board, lastNum)
    }

    row++
    if (row === 5) {
      column++
      row = 0
      counter = 0
    }
  }

}

function part1() {
  const numbers = data.splice(0, 1).join('').split(',')
  let boards = buildBoards()
  for (let i = 0; i < numbers.length; i++) {
    const luckyNumber = numbers[i];


    for (const key in boards) {
      boards[key] = boards[key].map(rows => {
        return rows.map(val => {
          if (val === luckyNumber) return null
          return val
        })
      })
      const winningBoard = checkForWin(boards[key], luckyNumber)

      if (winningBoard) {
        return winningBoard

      }
    }
  }
}

function part2() {
  const numbers = data.splice(0, 1).join('').split(',')
  let boards = buildBoards()
  for (let i = 0; i < numbers.length; i++) {
    const luckyNumber = numbers[i];


    for (const key in boards) {
      boards[key] = boards[key].map(rows => {
        return rows.map(val => {
          if (val === luckyNumber) return null
          return val
        })
      })
      const winningBoard = checkForWin(boards[key], luckyNumber)

      if (winningBoard) {
        delete boards[key]
      }
      if (Object.keys(boards).length === 1) {
        return winningBoard
      }
    }
  }
}

// part 1
// 17400 X
// 35784 X
// 47273 X
// 49860 CHECK
// console.log(part1())

// part 2
// 32825 reverse numbers order X
// 16356 last board left X
// 9159 X
// delete all keys from object until 1 left
// 24628 CHECK
console.log(part2())
