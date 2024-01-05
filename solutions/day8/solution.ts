import { read } from 'promise-path'
import { arrToNumberArr, reportGenerator, sortNumbers } from '../../util.ts'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)

const report = reportGenerator(__filename)

export async function run(day: string) {
  const input = (await read(`solutions/${day}/input.txt`, 'utf8')).trim()

  const testInput = 'RL\n' +
    '\n' +
    'AAA = (BBB, CCC)\n' +
    'BBB = (DDD, EEE)\n' +
    'CCC = (ZZZ, GGG)\n' +
    'DDD = (DDD, DDD)\n' +
    'EEE = (EEE, EEE)\n' +
    'GGG = (GGG, GGG)\n' +
    'ZZZ = (ZZZ, ZZZ)'
  const testInputAsArray = testInput.split('\n')

  const testInput2 = 'LLR\n' +
    '\n' +
    'AAA = (BBB, BBB)\n' +
    'BBB = (AAA, ZZZ)\n' +
    'ZZZ = (ZZZ, ZZZ)'
  const testInputAsArray2 = testInput2.split('\n')

  const testInput3 = 'LR\n' +
    '\n' +
    '11A = (11B, XXX)\n' +
    '11B = (XXX, 11Z)\n' +
    '11Z = (11B, XXX)\n' +
    '22A = (22B, XXX)\n' +
    '22B = (22C, 22C)\n' +
    '22C = (22Z, 22Z)\n' +
    '22Z = (22B, 22B)\n' +
    'XXX = (XXX, XXX)'
  const testInputAsArray3 = testInput3.split('\n')

  const inputAsArray = input.split('\n')

  await solveForFirstStar(testInput, testInputAsArray, true, true)
  await solveForFirstStar(testInput2, testInputAsArray2, true, true)
  await solveForFirstStar(input, inputAsArray, false, false)
  await solveForSecondStar(testInput3, testInputAsArray3, true, true)
  await solveForSecondStar(input, inputAsArray, false, false)
}

async function solveForFirstStar(
  input: string,
  inputAsArray: Array<any>,
  test: boolean,
  debug: boolean
) {
  console.time('part 1')
  const steps = inputAsArray[0].split('')
  const nodes = inputAsArray.slice(2).reduce((acc, line) => {
    const [ key, leftAndRight ] = line.split(' = ')
    const [ left, right ] = leftAndRight.replace('(', '').replace(')', '').split(', ')
    if (debug) {
      console.log({ key, leftAndRight, left, right })
    }
    acc[key] = {left, right}
    return acc;
  }, {})
  let currentNodeKey = 'AAA'
  let totalSteps = 0;
  if (debug) {
    console.log({ nodes, steps })
  }
  while (currentNodeKey !== 'ZZZ') {
    steps.forEach((direction) => {
      if (currentNodeKey !== 'ZZZ') {
        if (direction === 'R') {
          currentNodeKey = nodes[currentNodeKey].right;
        } else {
          currentNodeKey = nodes[currentNodeKey].left;
        }
        totalSteps++;
      }
    })
  }
  const solution = totalSteps.toString()
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
  const steps = inputAsArray[0].split('')
  const nodes = inputAsArray.slice(2).reduce((acc, line) => {
    const [ key, leftAndRight ] = line.split(' = ')
    const [ left, right ] = leftAndRight.replace('(', '').replace(')', '').split(', ')
    if (debug) {
      console.log({ key, leftAndRight, left, right })
    }
    acc[key] = {left, right}
    return acc;
  }, {})
  let totalSteps = 0;
  if (debug) {
    console.log({ nodes, steps })
  }
  const endingInANodes = Object.keys(nodes).filter(node => node.endsWith('A'));

  while (!endingInANodes.every(node => node.endsWith('Z'))) {
    steps.forEach((direction) => {
      if (!endingInANodes.every(node => node.endsWith('Z'))) {
        if (direction === 'R') {
          endingInANodes.forEach((node, idx) => {
            endingInANodes[idx] = nodes[node].right;
          })
        } else {
          endingInANodes.forEach((node, idx) => {
            endingInANodes[idx] = nodes[node].left;
          })
        }
        totalSteps++;
      }
    })
  }
  const solution = totalSteps.toString()
  report(`Solution 2${test ? ' (for test input)' : ''}:`, solution)
  console.timeEnd('part 2')
}
