import { read } from 'promise-path'
import { arrToNumberArr, reportGenerator, sortNumbers } from '../../util.ts'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)

const report = reportGenerator(__filename)

export async function run(day: string) {
  const input = (await read(`solutions/${day}/input.txt`, 'utf8')).trim()

  const testInput = 'Time:      7  15   30\n' +
    'Distance:  9  40  200\n'
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
  const times = inputAsArray[0].split(' ').slice(1).filter((val) => val).map(Number)
  const distances = inputAsArray[1].split(' ').slice(1).filter((val) => val).map(Number)

  const solution = times.reduce((acc, time, idx) => {
    let hold = 1;
    let beats = 0;
    while (hold < time) {
      const remainingTime = time - hold
      if (remainingTime * hold > distances[idx]) {
        beats++;
      }
      hold++;
    }
    acc *= beats;
    return acc
  }, 1)

  console.log({ times, distances })
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
  const time = Number(inputAsArray[0].replaceAll(' ', '').split(':')[1])
  const distance = Number(inputAsArray[1].replaceAll(' ', '').split(':')[1])

  let hold = 1;
  let beats = 0;
  while (hold < time) {
    const remainingTime = time - hold
    if (remainingTime * hold > distance) {
      beats++;
    }
    hold++;
  }

  // lol i am surprised the above worked without having to significantly change things

  console.log({ time, distance })
  report(`Solution 2${test ? ' (for test input)' : ''}:`, beats.toString())
  console.timeEnd('part 2')
}
