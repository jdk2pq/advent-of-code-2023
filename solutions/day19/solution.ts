import { read } from 'promise-path'
import { reportGenerator } from '../../util.ts'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const report = reportGenerator(__filename)

export async function run(day: string) {
  const input = (await read(`solutions/${day}/input.txt`, 'utf8')).trim()

  const testInput = 'px{a<2006:qkq,m>2090:A,rfg}\n' +
    'pv{a>1716:R,A}\n' +
    'lnx{m>1548:A,A}\n' +
    'rfg{s<537:gd,x>2440:R,A}\n' +
    'qs{s>3448:A,lnx}\n' +
    'qkq{x<1416:A,crn}\n' +
    'crn{x>2662:A,R}\n' +
    'in{s<1351:px,qqz}\n' +
    'qqz{s>2770:qs,m<1801:hdj,R}\n' +
    'gd{a>3333:R,R}\n' +
    'hdj{m>838:A,pv}\n' +
    '\n' +
    '{x=787,m=2655,a=1222,s=2876}\n' +
    '{x=1679,m=44,a=2067,s=496}\n' +
    '{x=2036,m=264,a=79,s=2244}\n' +
    '{x=2461,m=1339,a=466,s=291}\n' +
    '{x=2127,m=1623,a=2188,s=1013}'
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
  const [workflows, ratings] = input.split('\n\n')

  const workflowsAsMap = workflows.split('\n').reduce((acc, workflow) => {
    const [name, beginningOfWorkflow] = workflow.split('{')
    acc[name] = beginningOfWorkflow.replace('}', '').split(',')
    return acc;
  }, {})
  if (debug) {
    console.log({ workflowsAsMap })
  }

  const solution = ratings.split('\n').reduce((acc, rating) => {
    const values = rating.split(',')
    const [x, m, a, s] = values.map((val) => Number(val.split('=')[1].replace('}', '')));
    const parts = {
      x,
      m,
      a,
      s
    }
    let curr: string = 'in';
    while (!(curr === 'A' || curr === 'R')) {
      const tests = workflowsAsMap[curr];
      if (debug) {
        console.log({ curr, tests })
      }
      for (let test of tests) {
        if (debug) {
          console.log({ test })
        }
        if (test.includes(':')) {
          const [comparison, goto] = test.split(':')
          if (debug) {
            console.log({ comparison, goto })
          }
          if (comparison.includes('>')) {
            const [part, num] = comparison.split('>')
            if (parts[part] > Number(num)) {
              curr = goto;
              break;
            }
          } else if (comparison.includes('<')) {
            const [part, num] = comparison.split('<')
            if (parts[part] < Number(num)) {
              curr = goto;
              break;
            }
          }
        } else {
          curr = test;
        }
      }
    }
    if (curr === 'A') {
      acc += (x + m + a + s)
    }
    return acc;
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
