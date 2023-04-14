import dotenv from "dotenv";
dotenv.config();

const EMAIL_FULL_NAME = process.env.EMAIL_FULL_NAME;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

export const EMAIL_CONFIG = {
  FULL_NAME: EMAIL_FULL_NAME,
  USER: EMAIL_USER,
  PASS: EMAIL_PASS,
};

export const RECIPIENTS_DIR = process.env.RECIPIENTS_DIR;
export const TEMPLATES_DIR = process.env.TEMPLATES_DIR;

export const DELAY = process.env.DELAY;

export const ATTACHMENTS_DIR = process.env.ATTACHMENTS_DIR;
