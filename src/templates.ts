import { TEMPLATES_DIR } from "./constants.ts";
import { readFile } from "./utils.ts";


export interface Template {
  subject: string;
  body: string;
}

export const getTemplates = async (): Promise<Template[]> => {
  try {
    const templates = await readFile(TEMPLATES_DIR);
    return JSON.parse(templates);
  } catch (error) {
    console.error(`Error in getTemplates: ${error || error.message}`);
    return [];
  }
};
