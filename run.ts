import { copyTemplate } from './copy-template.ts'

const solutionId = process.argv[2];
import fs from "fs";

const runSolution = (day) =>
  import(`./solutions/${solutionId}/solution.ts`).then((module) => module.run(day));

const copyCodeTemplate = async () => {
  try {
    await copyTemplate();
    await runSolution(solutionId);
  } catch (ex: any) {
    console.error(
      `Unable to run solution for '${solutionId}': ${ex}`,
      ex.stack
    );
  }
};

const start = async () => {
  try {
    if (fs.existsSync(`./solutions/${solutionId}/solution.ts`)) {
      await runSolution(solutionId);
    } else {
      await copyCodeTemplate();
    }
  } catch (ex) {
    if (!solutionId) {
      console.error(
        "No solution ID provided; please re-run with an argument, e.g.: npm start day1, or: node run day1"
      );
    } else {
      await copyCodeTemplate();
    }
  }
};

start();
