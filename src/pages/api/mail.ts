import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { SMTPError } from "nodemailer/lib/smtp-connection";

export interface ResponseMailProps {
  code?: string;
  message?: string;
}

export interface RequestMailProps {
  name: string;
  email: string;
  message: string;
  formName: string;
}

const Mail = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseMailProps>
): Promise<void> => {
  if (req.method === "POST") {
    const body = req.body as RequestMailProps;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // send mail with defined transport object
    await transporter
      .sendMail({
        from: `"${body.name}" <${body.email}>`,
        to: "contact@accords-library.com",
        subject: `New ${body.formName} from ${body.name}`,
        text: body.message,
      })
      .catch((reason: SMTPError) => {
        res.status(reason.responseCode ?? 500).json({
          code: reason.code,
          message: reason.response,
        });
      });
  }

  res.status(200).json({ code: "OKAY" });
};
export default Mail;
