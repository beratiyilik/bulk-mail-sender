import nodemailer, { Transporter } from "nodemailer";
import { EMAIL_CONFIG } from "./constants.ts";
import { delay } from "./utils.ts";

interface EmailOptions {
  recipient: string;
  subject: string;
  body: string;
  attachments?: any[];
}

class EmailSender {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.live.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: EMAIL_CONFIG.USER,
        pass: EMAIL_CONFIG.PASS,
      },
    });
  }

  public async sendEmail(options: EmailOptions): Promise<void> {
    const { recipient, subject, body, attachments } = options;
    const mailOptions = {
      from: `"${EMAIL_CONFIG.FULL_NAME}" <${EMAIL_CONFIG.USER}>`,
      to: recipient,
      subject,
      text: body,
      attachments,
    };
    try {
      await this.transporter.sendMail(mailOptions);
      // await delay(1000);
      console.info(`Email sent to ${recipient}`);
    } catch (error) {
      console.error(`Error sending email to ${recipient}:`, error);
    }
  }
}

export default EmailSender;
