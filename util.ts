import path from 'path'
import { read, write, position } from 'promise-path'
import { fileURLToPath } from 'url'
import { LOG_NAME } from './constants.ts'
const __filename = fileURLToPath(import.meta.url)

const fromHere = position(path.dirname(__filename))
export const reportGenerator = (filename: string) => async (
  ...messages: string[]
) =>
  console.log(
    `[${LOG_NAME} / ${filename
      .split(path.sep)
      .pop()
      ?.split('.ts')
      .shift()}]`,
    ...messages
  )

export const replaceInFile = async (
  filename: string,
  search: string | RegExp,
  replace: string
): Promise<any> => {
  const haystack: string = await read(filename, 'utf8')
  const ashes: string = haystack.replace(search, replace)
  return write(filename, ashes, 'utf8')
}

export const arrToNumberArr = (arr: Array<string>): Array<number> => {
  return arr.map(Number)
}

export const sortNumbers = (arr: Array<number>): Array<number> => {
  return arr.sort((a, b) => a - b)
}

export const log = (statement: any, debug: boolean): void => {
  if (debug) {
    console.log(statement)
  }
}
