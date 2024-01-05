import { read } from 'promise-path'
import { arrToNumberArr, reportGenerator, sortNumbers } from '../../util.ts'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)

const report = reportGenerator(__filename)

export async function run(day: string) {
  const input = (await read(`solutions/${day}/input.txt`, 'utf8')).trim()

  const testInput = 'rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7'
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
  const solution = input.split(',').reduce((acc, string) => {
    const stringSplit = string.split('')
    return acc + stringSplit.reduce((acc2, char) => {
      const ascii = char.charCodeAt(0);
      acc2 += ascii
      acc2 *= 17
      acc2 = acc2 % 256
      return acc2;
    }, 0)
  }, 0)
  report(`Solution 1${test ? ' (for test input)' : ''}:`, solution.toString())
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
