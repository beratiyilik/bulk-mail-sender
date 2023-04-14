import fs from "fs/promises";
import path from "path";
import { Template } from "./templates.ts";

export const delay = async (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const readDirectory = async (directory: string): Promise<any[]> => {
  const files = await fs.readdir(directory);
  const result = [];

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      result.push(...(await readDirectory(filePath)));
    } else {
      const content = await fs.readFile(filePath);
      result.push({
        name: file,
        content,
        buffer: Buffer.from(content),
      });
    }
  }

  return result;
};

export const readFile = async (path: string): Promise<string> =>
  fs.readFile(path, "utf-8");

export const getRandomTemplate = (templates: Template[]): Template => {
  const randomIndex = Math.floor(Math.random() * templates.length);
  return templates[randomIndex];
};

export const scheduleEmails = (sendFunction: any, delay: number): any =>
  setInterval(sendFunction, delay);
