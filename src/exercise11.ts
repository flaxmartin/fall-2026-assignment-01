import * as fs from "node:fs/promises";

export async function logStatusToFile(
  filePath: string,
  statusMessage: string,
): Promise<void> {
  const timestamp = new Date().toISOString();

  const message = `${timestamp} - ${statusMessage}`;

  await fs.writeFile(filePath, message, "utf-8");
}
