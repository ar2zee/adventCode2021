import { readTxt } from "../utils/index.js";


const data = readTxt('index.txt').map(row => row.split('').map(x => +x))

function buildAdjacentOctopus({ row, col, input }) {
  return [
    ...(input[row]?.[col - 1] ? [`${row}-${col - 1}`] : []),
    ...(input[row]?.[col + 1] ? [`${row}-${col + 1}`] : []),
    ...(input[row - 1]?.[col] ? [`${row - 1}-${col}`] : []),
    ...(input[row + 1]?.[col] ? [`${row + 1}-${col}`] : []),
    ...(input[row + 1]?.[col + 1] ? [`${row + 1}-${col + 1}`] : []),
    ...(input[row + 1]?.[col - 1] ? [`${row + 1}-${col - 1}`] : []),
    ...(input[row - 1]?.[col + 1] ? [`${row - 1}-${col + 1}`] : []),
    ...(input[row - 1]?.[col - 1] ? [`${row - 1}-${col - 1}`] : []),
  ]
}

function buildOctopusMap(input) {
  const graph = {}

  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      const val = input[row][col];
      graph[`${row}-${col}`] = { val, adjacentOctopus: buildAdjacentOctopus({ row, col, input }) }
    }
  }

  return graph
}

function flashOctopus(octopusMap) {
  Object.keys(octopusMap).forEach((key) => {
    const currentVal = octopusMap[key]['val']
    const newValue = currentVal + 1 > 9 ? 0 : currentVal + 1

    octopusMap[key] = { ...octopusMap[key], val: newValue, }
  })

  const flashedOctopus = Object.keys(octopusMap).filter(key => octopusMap[key]['val'] === 0)
  let flashCounter = flashedOctopus.length

  while (flashedOctopus.length) {
    const key = flashedOctopus.shift()

    for (let i = 0; i < octopusMap[key]['adjacentOctopus'].length; i++) {
      const adjacentKey = octopusMap[key]['adjacentOctopus'][i]
      const currentVal = octopusMap[adjacentKey]['val']
      const newFlashOctopus = currentVal + 1 > 9 || currentVal === 0
      const newValue = newFlashOctopus ? 0 : currentVal + 1

      octopusMap[adjacentKey] = { ...octopusMap[adjacentKey], val: newValue }

      if (currentVal + 1 > 9) {
        flashedOctopus.push(adjacentKey)
        flashCounter += 1
      }
    }
  }

  return { octopusMap, flashCounter }
}

function part1() {
  let octopusMap = buildOctopusMap(data)
  let localCounter = 0

  for (let step = 0; step < 100; step++) {
    const { octopusMap: newOctopusMap, flashCounter } = flashOctopus(octopusMap, step)
    octopusMap = newOctopusMap
    localCounter += flashCounter
  }

  return localCounter
}
// 1723
// console.log(part1())

function part2() {
  let octopusMap = buildOctopusMap(data)
  let localCounter = 0
  let step = 0

  while (localCounter !== 100) {
    const { octopusMap: newOctopusMap, flashCounter } = flashOctopus(octopusMap, step)
    octopusMap = newOctopusMap
    localCounter = flashCounter
    step++
  }

  return step
}
// 327
console.log(part2())
