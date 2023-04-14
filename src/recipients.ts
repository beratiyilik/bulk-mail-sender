import { readFile } from "./utils.ts";
import { RECIPIENTS_DIR } from "./constants.ts";

export interface Recipient {
  name: string;
  email: string;
}

export const getRecipients = async (): Promise<Recipient[]> => {
  try {
    const recipients = await readFile(RECIPIENTS_DIR)
    return JSON.parse(recipients);
  } catch (error) {
    console.error(`Error in getRecipients: ${error || error.message}`);
    return [];
  }
};
