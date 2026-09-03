import * as fs from "node:fs";

export type StudentGrades = {
  [subject: string]: number;
};

export type Gradebook = {
  [student: string]: StudentGrades;
};

export function calculateSubjectAverage(subject: string): number {
  const fileContents = fs.readFileSync("data/gradebook.json", "utf-8");

  const gradebook = JSON.parse(fileContents) as Gradebook;

  const grades = Object.values(gradebook)
    .filter((student) => student[subject] !== undefined)
    .map((student) => student[subject]);

  if (grades.length === 0) {
    return 0;
  }

  const total = grades.reduce((sum, grade) => sum + grade, 0);

  return total / grades.length;
}
