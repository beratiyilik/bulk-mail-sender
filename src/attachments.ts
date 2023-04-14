import { ATTACHMENTS_DIR } from "./constants.ts";
import { readDirectory } from "./utils.ts";

export interface Attachment {
  filename: string;
  content: string;
}

export const getAttachments = async (): Promise<Attachment[]> => {
  try {
    const files = await readDirectory(ATTACHMENTS_DIR);
    return files.map(({ name, content }) => ({
      filename: name,
      content,
    }));
  } catch (error) {
    console.error(`Error in getAttachments: ${error || error.message}`);
    return [];
  }
};
