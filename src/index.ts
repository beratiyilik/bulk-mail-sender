import "./override-console.ts";
import { getRecipients } from "./recipients.ts";
import { getTemplates } from "./templates.ts";
import { DELAY } from "./constants.ts";
import { getRandomTemplate, scheduleEmails, delay as wait } from "./utils.ts";
import EmailSender from "./email-sender.ts";
import { getAttachments } from "./attachments.ts";

const main = async () => {
  try {
    const [recipients, templates, attachments] = await Promise.all([
      getRecipients(),
      getTemplates(),
      getAttachments(),
    ]);
    const delay = Number(DELAY);
    const emailSender = new EmailSender();
    const initialNumberOfRecipients = recipients.length;

    const sendEmailToNextRecruiter = async () => {
      const recipient = recipients.shift();

      if (!recipient) {
        console.info(`${initialNumberOfRecipients} number of emails sent`);
        await wait(100);
        process.exit(0);
      }

      const { email } = recipient;
      const { subject, body } = getRandomTemplate(templates);

      await emailSender.sendEmail({
        recipient: email,
        subject,
        body,
        attachments,
      });
    };

    scheduleEmails(sendEmailToNextRecruiter, delay);
  } catch (error) {
    console.error(`Error in main: ${error || error.message}`);
  }
};

main();
