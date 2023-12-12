import { read } from 'promise-path'
import { arrToNumberArr, reportGenerator, sortNumbers } from '../../util.ts'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const report = reportGenerator(__filename)

export async function run(day: string) {
  const input = (await read(`solutions/${day}/input.txt`, 'utf8')).trim()

  const testInput = '1abc2\n' +
    'pqr3stu8vwx\n' +
    'a1b2c3d4e5f\n' +
    'treb7uchet'
  const testInputAsArray = testInput.split('\n')

  const testInput2 = 'two1nine\n' +
      'eightwothree\n' +
      'abcone2threexyz\n' +
      'xtwone3four\n' +
      '4nineeightseven2\n' +
      'zoneight234\n' +
      '7pqrstsixteen'
  const testInput2AsArray = testInput2.split('\n')

  const inputAsArray = input.split('\n')

  await solveForFirstStar(testInput, testInputAsArray, true, true)
  await solveForFirstStar(input, inputAsArray, false, true)
  await solveForSecondStar(testInput2, testInput2AsArray, true, true)
  await solveForSecondStar(input, inputAsArray, false, true)
}

async function solveForFirstStar(
  input: string,
  inputAsArray: Array<any>,
  test: boolean,
  debug: boolean
) {
  console.time('part 1')
  const solution = inputAsArray.reduce((acc, line) => {
    const numbers = line.match(/\d/g);
    const first = numbers[0]
    const last = numbers[numbers.length - 1]
    const value = Number(`${first}${last}`)
    if (debug) {
      console.log({ first, last, value })
    }
    return acc + value
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
    const numbersSearch = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    const filteredSearch = numbersSearch.filter((num) => line.includes(num)).flatMap((num) => [...line.matchAll(new RegExp(num, 'gi'))].map(a => a.index).map(index => [index, num])).sort(([aIdx, a], [bIdx, b]) => aIdx - bIdx)
    let first = filteredSearch[0][1]
    let last = filteredSearch[filteredSearch.length - 1][1]

    function numberStringToNumber(number: string) {
      switch(number) {
        case 'one':
          return 1
        case 'two':
          return 2
        case 'three':
          return 3
        case 'four':
          return 4
        case 'five':
          return 5
        case 'six':
          return 6
        case 'seven':
          return 7
        case 'eight':
          return 8
        case 'nine':
          return 9
        default:
          return number
      }
    }
    const value = Number(`${numberStringToNumber(first)}${numberStringToNumber(last)}`)
    if (debug) {
      console.log({ line, first, last, value })
    }
    return acc + value
  }, 0)
  report(`Solution 2${test ? ' (for test input)' : ''}:`, solution)
  console.timeEnd('part 2')
}
