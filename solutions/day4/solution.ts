import { read } from 'promise-path'
import { arrToNumberArr, reportGenerator, sortNumbers } from '../../util.ts'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)

const report = reportGenerator(__filename)

export async function run(day: string) {
  const input = (await read(`solutions/${day}/input.txt`, 'utf8')).trim()

  const testInput = 'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53\n' +
    'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19\n' +
    'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1\n' +
    'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83\n' +
    'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36\n' +
    'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11'
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
  const solution = inputAsArray.reduce((acc, line) => {
    const numbers = line.split(': ')[1];
    const [winningNumbers, yourNumbers] = numbers.split(' | ')
    const winningNumbersAsNumber = winningNumbers.split(' ').map(num => {
      if (num) {
        return Number(num.trim())
      }
    }).filter(num => num)
    if (debug) {
      console.log({ winningNumbersAsNumber })
    }
    const power = yourNumbers.split(' ').reduce((acc, num) => {
      if (num && winningNumbersAsNumber.includes(Number(num))) {
        if (debug) {
          console.log({ numbers, num, winningNumbersAsNumber })
        }
        acc += 1
      }
      return acc
    }, 0)

    if (debug) {
      console.log({ power })
    }
    if (power > 0) {
      acc += Math.pow(2, power - 1);
    }
    return acc;
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
  const solution = 'UNSOLVED'
  report(`Solution 2${test ? ' (for test input)' : ''}:`, solution)
  console.timeEnd('part 2')
}
