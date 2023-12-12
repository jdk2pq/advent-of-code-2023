import { read } from 'promise-path'
import { arrToNumberArr, reportGenerator, sortNumbers } from '../../util.ts'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)

const report = reportGenerator(__filename)

export async function run(day: string) {
  const input = (await read(`solutions/${day}/input.txt`, 'utf8')).trim()

  const testInput = 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\n' +
    'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\n' +
    'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\n' +
    'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\n' +
    'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'
  const testInputAsArray = testInput.split('\n')

  const inputAsArray = input.split('\n')

  await solveForFirstStar(testInput, testInputAsArray, true, true)
  await solveForFirstStar(input, inputAsArray, false, false)
  await solveForSecondStar(testInput, testInputAsArray, true, true)
  await solveForSecondStar(input, inputAsArray, false, false)
}

async function solveForFirstStar(
  input: string,
  inputAsArray: Array<any>,
  test: boolean,
  debug: boolean
) {
  console.time('part 1')

  const red = 12
  const green = 13
  const blue = 14
  const solution = inputAsArray.reduce((acc, line) => {
    const gameNumber = Number(line.split(": ")[0].replace('Game', ''))
    const grabs = line.split(": ")[1].split('; ')
    let valid = true
    for (let i = 0; i < grabs.length; i++) {
      const grab = grabs[i];
      const cubes = grab.split(', ')
      for (let j = 0; j < cubes.length; j++) {
        const cube = cubes[j]
        const [num, kind] = cube.split(' ')
        if (debug) {
          console.log({ gameNumber, grabs, grab, num, kind, cube})
        }
        if (kind === 'blue') {
          valid = Number(num) <= blue
        } else if (kind === 'red') {
          valid = Number(num) <= red
        } else if (kind === 'green') {
          valid = Number(num) <= green
        }
        if (!valid) {
          break;
        }
      }
      if (!valid) {
        break;
      }
    }
    if (valid) {
      if (debug) {
        console.log({ valid, acc, gameNumber, line })
      }
      acc += gameNumber;
    }
    return acc
  }, 0)
  report(`Solution 1${test ? ' (for test input)' : ''}:`, solution)
  console.timeEnd('part 1')
}

async function solveForSecondStar(
  input: string,
  inputAsArray: Array<any>,
  test: boolean,
  debug: boolean
) {
  console.time('part 2')
  const solution = inputAsArray.reduce((acc, line) => {
    const grabs = line.split(": ")[1].split('; ')
    let minRed = 0;
    let minBlue = 0;
    let minGreen = 0;
    for (let i = 0; i < grabs.length; i++) {
      const grab = grabs[i];
      const cubes = grab.split(', ')
      for (let j = 0; j < cubes.length; j++) {
        const cube = cubes[j]
        const [num, kind] = cube.split(' ')
        const numAsNumber = Number(num)

        if (debug) {
          console.log({ num, kind, cube, minBlue, minRed, minGreen })
        }

        if (kind === 'blue' && numAsNumber > minBlue) {
          minBlue = Number(numAsNumber);
        } else if (kind === 'red' && numAsNumber > minRed) {
          minRed = numAsNumber;
        } else if (kind === 'green' && numAsNumber > minGreen) {
          minGreen = numAsNumber
        }
      }
    }
    acc += (minRed * minBlue * minGreen);
    if (debug) {
      console.log({ minRed, minBlue, minGreen, line, power: minRed * minBlue * minGreen})
    }
    return acc
  }, 0)
  report(`Solution 2${test ? ' (for test input)' : ''}:`, solution)
  console.timeEnd('part 2')
}
