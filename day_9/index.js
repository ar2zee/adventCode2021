import { readTxt } from "../utils/index.js";


const data = readTxt('index.txt')
const parseData = data.map(row => [...row].map(x => parseInt(x)))

function part1(points) {
  const flatData = points.map(row => [...row].map(x => parseInt(x)))
  const adjacentLocation = []
  for (let rowIndex = 0; rowIndex < flatData.length; rowIndex++) {
    const row = flatData[rowIndex];

    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const digit = row[colIndex];

      adjacentLocation.push([
        digit,
        row[colIndex - 1],
        row[colIndex + 1],
        flatData[rowIndex + 1]?.[colIndex],
        flatData[rowIndex - 1]?.[colIndex]
      ])
    }

  }
  return adjacentLocation
    .map(row => row.filter(x => {
      return x !== undefined
    }))
    .filter(row => {
      return Math.min(...row) === row[0] && new Set(row).size !== 1
    })
    .map(row => row[0] + 1)
    .reduce((acc, curr) => acc += curr, 0)
}

// 558 CHECK
// console.log(part1(data))


// PART 2
const getAdjacents = (graph, { row, col }) => ({
  bottom: graph[row + 1]?.[col] ?? Number.MAX_SAFE_INTEGER,
  top: graph[row - 1]?.[col] ?? Number.MAX_SAFE_INTEGER,
  left: graph[row]?.[col - 1] ?? Number.MAX_SAFE_INTEGER,
  right: graph[row]?.[col + 1] ?? Number.MAX_SAFE_INTEGER
})

function bfs(graph, basins = new Set(), { row, col }) {
  let currentNode = graph[row]?.[col]
  let { bottom, top, left, right } = getAdjacents(graph, { row, col })

  basins.add(`${row}-${col}`)
  if (currentNode < left && left !== 9) {
    col !== 0 && bfs(graph, basins, { row: row, col: col - 1 })
  }
  if (currentNode < right && right !== 9) {
    col !== graph[row].length - 1 && bfs(graph, basins, { row: row, col: col + 1 })
  }
  if (currentNode < bottom && bottom !== 9) {
    row !== graph.length - 1 && bfs(graph, basins, { row: row + 1, col })
  }
  if (currentNode < top && top !== 9) {
    row !== 0 && bfs(graph, basins, { row: row - 1, col })
  }

  return basins
}

function part2(inputData) {
  let basinsMap = {}

  for (let rowIndex = 0; rowIndex < inputData.length; rowIndex++) {
    const row = inputData[rowIndex];

    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const digit = row[colIndex];
      let { bottom, top, left, right } = getAdjacents(inputData, { row: rowIndex, col: colIndex })

      if (digit < bottom && digit < top && digit < right && digit < left) {
        basinsMap[`${rowIndex}-${colIndex}`] = bfs(inputData, new Set(), { row: rowIndex, col: colIndex })
      }
    }
  }

  return Object.values(basinsMap).sort((a, b) => b.size - a.size).slice(0, 3)
    .reduce((acc, curr) => {
      acc *= curr.size
      return acc
    }, 1)
}

// 882942 CHECK
console.log(part2(parseData))
