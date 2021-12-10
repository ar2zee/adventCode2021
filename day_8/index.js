import { readTxt } from "../utils/index.js";


// find  1, 4, 7, or 8 in output
const data = readTxt('index.txt').map(val => {
  return val.split('|')
});

function part1() {
  let counter = 0

  for (let i = 0; i < data.length; i++) {
    const [_input, output] = data[i];
    const words = output.split(' ');
    for (let j = 0; j < words.length; j++) {
      const word = words[j];
      const match = [...new Set([...word].filter(v => v && v !== ' '))]
      if (match.length === 2 || match.length === 4 || match.length === 3 || match.length === 7) {
        counter++
      }
    }
  }
  return counter
}

// 479 CHECK
// console.log(part1())

function checkForInt9_6_0(input, map) {
  const isNine = map[4] && map[7] && [...map[4], ...map[7]].every(char => input.includes(char))
  const isZero = map[7]?.every(char => input.includes(char)) && input.reduce((acc, cur) => {
    const match = map[4]?.includes(cur)
    if (match) acc += 1
    return acc
  }, 0) === 3

  if (isNine) {
    map[9] = input
  } else if (isZero) {
    map[0] = input
  } else {
    map[6] = input
  }
}

function checkForInt3_5_2(input, map) {
  const isThree = map[7]?.every(char => input.includes(char))
  const isFive = input.reduce((acc, cur) => {
    const match = map[4]?.includes(cur)
    if (match) acc += 1
    return acc
  }, 0) === 3
  const isTwo = input.reduce((acc, cur) => {
    const match = map[4]?.includes(cur)
    if (match) acc += 1
    return acc
  }, 0) === 2

  if (isThree) {
    map[3] = input
  } else if (isFive) {
    map[5] = input
  } else if (isTwo) {
    map[2] = input
  }
}


function decodeSignalToInt(words) {
  const map = {}
  let i = 0
  let counter = 0


  while (Object.keys(map).length !== 10) {
    let word = [...words[i]]

    if (word.length === 2) {
      map[1] = word
    }
    if (word.length === 4) {
      map[4] = word
    }
    if (word.length === 3) {
      map[7] = word
    }
    if (word.length === 7) {
      map[8] = word
    }
    if (word.length === 6) {
      const key = checkForInt9_6_0(word, map)
      key && (map[key] = word)
    }
    if (word.length === 5) {
      const key = checkForInt3_5_2(word, map)
      key && (map[key] = word)
    }

    i++
    counter++
    if (i > words.length - 1) {
      i = 0
    }
  }

  return map
}

function part2() {
  let counter = 0
  let int = ''
  let intMap = {}

  for (let i = 0; i < data.length; i++) {
    const [input, output] = data[i];
    const outputWords = output.split(' ').filter(Boolean);
    const InputWords = input.split(' ').filter(Boolean);
    intMap = decodeSignalToInt(InputWords)

    for (let j = 0; j < outputWords.length; j++) {
      const outputWord = [...outputWords[j]]
      const match = Object.values(intMap).find(arr => {
        return outputWord.every(char => outputWord.length === arr.length && arr.includes(char))
      })
      const key = Object.keys(intMap).find(key => intMap[key] === match)
      int += key
    }

    counter += +int
    int = ''
  }

  return counter
}

// 1041746 CHECK
console.log(part2())
